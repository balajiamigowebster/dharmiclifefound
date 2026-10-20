const fs = require('fs');
const path = require('path');
const sampleData = require('./sampleData');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'billing.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Database {
  constructor() {
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(raw);
      } else {
        // Initialize with realistic sample data
        this.data = JSON.parse(JSON.stringify(sampleData));
        this.save();
      }
    } catch (err) {
      console.error('Error reading database file, resetting to sample data:', err);
      this.data = JSON.parse(JSON.stringify(sampleData));
      this.save();
    }
  }

  save() {
    try {
      // Atomic write via temp file
      const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
      fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
      return true;
    } catch (err) {
      console.error('Failed to save database:', err);
      return false;
    }
  }

  // --- Settings ---
  getSettings() {
    return this.data.settings || {};
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }

  // --- Customers ---
  getCustomers() {
    return this.data.customers || [];
  }

  getCustomer(id) {
    return (this.data.customers || []).find(c => c.id === id);
  }

  addCustomer(customer) {
    const id = customer.id || `cust-${Date.now()}`;
    const newCust = {
      ...customer,
      id,
      createdAt: customer.createdAt || new Date().toISOString()
    };
    this.data.customers = this.data.customers || [];
    this.data.customers.push(newCust);
    this.save();
    return newCust;
  }

  updateCustomer(id, updates) {
    const idx = (this.data.customers || []).findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.data.customers[idx] = { ...this.data.customers[idx], ...updates };
    this.save();
    return this.data.customers[idx];
  }

  deleteCustomer(id) {
    const initialLen = (this.data.customers || []).length;
    this.data.customers = (this.data.customers || []).filter(c => c.id !== id);
    this.save();
    return this.data.customers.length < initialLen;
  }

  // --- Products ---
  getProducts() {
    return this.data.products || [];
  }

  getProduct(id) {
    return (this.data.products || []).find(p => p.id === id);
  }

  addProduct(product) {
    const id = product.id || `prod-${Date.now()}`;
    const newProd = {
      ...product,
      id,
      price: Number(product.price) || 0,
      taxRate: Number(product.taxRate) || 0,
      createdAt: product.createdAt || new Date().toISOString()
    };
    this.data.products = this.data.products || [];
    this.data.products.push(newProd);
    this.save();
    return newProd;
  }

  updateProduct(id, updates) {
    const idx = (this.data.products || []).findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = {
      ...this.data.products[idx],
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : this.data.products[idx].price,
      taxRate: updates.taxRate !== undefined ? Number(updates.taxRate) : this.data.products[idx].taxRate
    };
    this.save();
    return this.data.products[idx];
  }

  deleteProduct(id) {
    const initialLen = (this.data.products || []).length;
    this.data.products = (this.data.products || []).filter(p => p.id !== id);
    this.save();
    return this.data.products.length < initialLen;
  }

  // --- Invoices ---
  getInvoices() {
    return (this.data.invoices || []).sort((a, b) => new Date(b.createdAt || b.issueDate) - new Date(a.createdAt || a.issueDate));
  }

  getInvoice(id) {
    return (this.data.invoices || []).find(inv => inv.id === id || inv.invoiceNumber === id);
  }

  getNextInvoiceNumber() {
    const prefix = this.data.settings?.invoicePrefix || 'INV-';
    const currentYear = new Date().getFullYear();
    const invoices = this.data.invoices || [];
    
    // Find highest sequence number
    let maxNum = 0;
    invoices.forEach(inv => {
      const match = (inv.invoiceNumber || '').match(/(\d+)$/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    });

    const nextSeq = String(maxNum + 1).padStart(4, '0');
    return `${prefix}${currentYear}-${nextSeq}`;
  }

  addInvoice(invoiceData) {
    const id = invoiceData.id || `inv-${Date.now()}`;
    const invoiceNumber = invoiceData.invoiceNumber || this.getNextInvoiceNumber();

    // Calculate line items amounts
    const items = (invoiceData.items || []).map((item, idx) => {
      const qty = Number(item.quantity) || 1;
      const rate = Number(item.unitPrice) || 0;
      const amount = Number((qty * rate).toFixed(2));
      return {
        id: item.id || `item-${Date.now()}-${idx}`,
        description: item.description || 'Service / Product',
        quantity: qty,
        unitPrice: rate,
        taxRate: Number(item.taxRate) || 0,
        amount
      };
    });

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

    const discountType = invoiceData.discountType || 'percent';
    const discountVal = Number(invoiceData.discountValue) || 0;
    let discountAmount = 0;
    if (discountType === 'percent') {
      discountAmount = (subtotal * discountVal) / 100;
    } else {
      discountAmount = discountVal;
    }
    discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

    const discountedSubtotal = subtotal - discountAmount;
    const taxRate = Number(invoiceData.taxRate) || 0;
    const taxAmount = Number(((discountedSubtotal * taxRate) / 100).toFixed(2));
    const shipping = Number(invoiceData.shipping) || 0;
    const total = Number((discountedSubtotal + taxAmount + shipping).toFixed(2));

    const amountPaid = Number(invoiceData.amountPaid) || 0;
    const balanceDue = Number(Math.max(0, total - amountPaid).toFixed(2));

    // Determine status if not provided or based on payment
    let status = invoiceData.status || 'Draft';
    if (status !== 'Draft' && status !== 'Cancelled') {
      if (balanceDue === 0 && total > 0) {
        status = 'Paid';
      } else if (amountPaid > 0 && balanceDue > 0) {
        status = 'Pending';
      } else if (invoiceData.dueDate && new Date(invoiceData.dueDate) < new Date() && balanceDue > 0) {
        status = 'Overdue';
      } else if (status === 'Draft') {
        status = 'Draft';
      } else {
        status = 'Pending';
      }
    }

    const newInvoice = {
      ...invoiceData,
      id,
      invoiceNumber,
      items,
      subtotal: Number(subtotal.toFixed(2)),
      discountType,
      discountValue: discountVal,
      discountAmount: Number(discountAmount.toFixed(2)),
      taxRate,
      taxAmount,
      shipping: Number(shipping.toFixed(2)),
      total,
      amountPaid: Number(amountPaid.toFixed(2)),
      balanceDue,
      status,
      createdAt: invoiceData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.invoices = this.data.invoices || [];
    this.data.invoices.push(newInvoice);
    this.save();
    return newInvoice;
  }

  updateInvoice(id, updates) {
    const idx = (this.data.invoices || []).findIndex(inv => inv.id === id);
    if (idx === -1) return null;

    const existing = this.data.invoices[idx];
    const merged = { ...existing, ...updates };

    // Recalculate line items
    const items = (merged.items || []).map((item, i) => {
      const qty = Number(item.quantity) || 1;
      const rate = Number(item.unitPrice) || 0;
      const amount = Number((qty * rate).toFixed(2));
      return {
        id: item.id || `item-${Date.now()}-${i}`,
        description: item.description || '',
        quantity: qty,
        unitPrice: rate,
        taxRate: Number(item.taxRate) || 0,
        amount
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

    const discountType = merged.discountType || 'percent';
    const discountVal = Number(merged.discountValue) || 0;
    let discountAmount = 0;
    if (discountType === 'percent') {
      discountAmount = (subtotal * discountVal) / 100;
    } else {
      discountAmount = discountVal;
    }
    discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

    const discountedSubtotal = subtotal - discountAmount;
    const taxRate = Number(merged.taxRate) || 0;
    const taxAmount = Number(((discountedSubtotal * taxRate) / 100).toFixed(2));
    const shipping = Number(merged.shipping) || 0;
    const total = Number((discountedSubtotal + taxAmount + shipping).toFixed(2));

    const amountPaid = Number(merged.amountPaid) || 0;
    const balanceDue = Number(Math.max(0, total - amountPaid).toFixed(2));

    let status = merged.status || existing.status;
    if (status !== 'Cancelled') {
      if (balanceDue === 0 && total > 0) {
        status = 'Paid';
      } else if (amountPaid > 0 && balanceDue > 0) {
        status = 'Pending';
      } else if (merged.dueDate && new Date(merged.dueDate) < new Date() && balanceDue > 0 && status !== 'Draft') {
        status = 'Overdue';
      }
    }

    this.data.invoices[idx] = {
      ...merged,
      items,
      subtotal: Number(subtotal.toFixed(2)),
      discountType,
      discountValue: discountVal,
      discountAmount: Number(discountAmount.toFixed(2)),
      taxRate,
      taxAmount,
      shipping: Number(shipping.toFixed(2)),
      total,
      amountPaid: Number(amountPaid.toFixed(2)),
      balanceDue,
      status,
      updatedAt: new Date().toISOString()
    };

    this.save();
    return this.data.invoices[idx];
  }

  deleteInvoice(id) {
    const initialLen = (this.data.invoices || []).length;
    this.data.invoices = (this.data.invoices || []).filter(inv => inv.id !== id);
    this.save();
    return this.data.invoices.length < initialLen;
  }

  recordPayment(id, { amount, paymentMethod, notes, paymentDate }) {
    const inv = this.getInvoice(id);
    if (!inv) return null;

    const payAmount = Number(amount) || 0;
    const newPaid = Number((inv.amountPaid + payAmount).toFixed(2));
    const balance = Number(Math.max(0, inv.total - newPaid).toFixed(2));

    let status = inv.status;
    if (balance === 0) {
      status = 'Paid';
    } else if (newPaid > 0) {
      status = 'Pending';
    }

    return this.updateInvoice(id, {
      amountPaid: newPaid,
      paymentMethod: paymentMethod || inv.paymentMethod || 'Manual Payment',
      paidAt: paymentDate || new Date().toISOString(),
      status,
      notes: notes ? (inv.notes ? `${inv.notes}\n[Payment: ${paymentDate || new Date().toLocaleDateString()}] ${notes}` : notes) : inv.notes
    });
  }

  // --- Dashboard Metrics ---
  getDashboardStats() {
    const invoices = this.data.invoices || [];
    const customers = this.data.customers || [];
    const products = this.data.products || [];

    let totalBilled = 0;
    let totalReceived = 0;
    let totalOutstanding = 0;
    let totalOverdue = 0;
    let paidCount = 0;
    let pendingCount = 0;
    let overdueCount = 0;
    let draftCount = 0;

    const todayStr = new Date().toISOString().slice(0, 10);

    invoices.forEach(inv => {
      const tot = Number(inv.total) || 0;
      const paid = Number(inv.amountPaid) || 0;
      const bal = Number(inv.balanceDue) || 0;

      totalBilled += tot;
      totalReceived += paid;

      if (inv.status === 'Paid') {
        paidCount++;
      } else if (inv.status === 'Draft') {
        draftCount++;
      } else if (inv.status === 'Overdue' || (inv.dueDate && inv.dueDate < todayStr && bal > 0)) {
        overdueCount++;
        totalOverdue += bal;
        totalOutstanding += bal;
      } else if (inv.status === 'Pending') {
        pendingCount++;
        totalOutstanding += bal;
      }
    });

    const recentInvoices = [...invoices]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    return {
      totalBilled: Number(totalBilled.toFixed(2)),
      totalReceived: Number(totalReceived.toFixed(2)),
      totalOutstanding: Number(totalOutstanding.toFixed(2)),
      totalOverdue: Number(totalOverdue.toFixed(2)),
      invoiceCounts: {
        total: invoices.length,
        paid: paidCount,
        pending: pendingCount,
        overdue: overdueCount,
        draft: draftCount
      },
      customerCount: customers.length,
      productCount: products.length,
      recentInvoices,
      currency: this.data.settings?.currency || '$'
    };
  }

  // --- Reset & Backup ---
  resetToSample() {
    this.data = JSON.parse(JSON.stringify(sampleData));
    this.save();
    return this.data;
  }

  getBackupData() {
    return this.data;
  }

  restoreBackup(backupData) {
    if (backupData && typeof backupData === 'object') {
      this.data = {
        settings: backupData.settings || sampleData.settings,
        customers: Array.isArray(backupData.customers) ? backupData.customers : [],
        products: Array.isArray(backupData.products) ? backupData.products : [],
        invoices: Array.isArray(backupData.invoices) ? backupData.invoices : []
      };
      this.save();
      return true;
    }
    return false;
  }
}

module.exports = new Database();
