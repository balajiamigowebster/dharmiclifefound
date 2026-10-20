import React, { useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  UserPlus, 
  Calendar, 
  DollarSign, 
  Check, 
  Sparkles,
  HelpCircle 
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function InvoiceForm({
  invoice, // if editing
  customers,
  products,
  settings,
  nextInvoiceNumber,
  onSave,
  onClose,
  onQuickAddCustomer
}) {
  const currency = settings?.currency || '$';

  // Initialize form state
  const [formData, setFormData] = useState(() => {
    if (invoice) {
      return {
        ...invoice,
        items: invoice.items && invoice.items.length > 0 
          ? invoice.items 
          : [{ id: 'item-1', description: '', quantity: 1, unitPrice: 0, taxRate: 0, amount: 0 }]
      };
    }

    const today = new Date().toISOString().slice(0, 10);
    const dueDate = new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10);

    return {
      invoiceNumber: nextInvoiceNumber || 'INV-2026-0001',
      customerId: customers[0]?.id || '',
      customerName: customers[0]?.name || '',
      customerEmail: customers[0]?.email || '',
      customerPhone: customers[0]?.phone || '',
      customerAddress: customers[0]?.address || '',
      customerTaxId: customers[0]?.taxId || '',
      issueDate: today,
      dueDate: dueDate,
      status: 'Pending',
      items: [
        {
          id: `item-${Date.now()}`,
          description: '',
          quantity: 1,
          unitPrice: 0,
          taxRate: 0,
          amount: 0
        }
      ],
      discountType: 'percent',
      discountValue: 0,
      taxRate: 10,
      shipping: 0,
      amountPaid: 0,
      notes: settings?.footerNote || 'Thank you for your business!',
      terms: settings?.defaultPaymentTerms || 'Payment due within 15 days.'
    };
  });

  // When customer selection changes, auto-populate details
  const handleCustomerChange = (custId) => {
    const cust = customers.find(c => c.id === custId);
    if (cust) {
      setFormData(prev => ({
        ...prev,
        customerId: cust.id,
        customerName: cust.name,
        customerEmail: cust.email || '',
        customerPhone: cust.phone || '',
        customerAddress: cust.address || '',
        customerTaxId: cust.taxId || ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        customerId: '',
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        customerAddress: '',
        customerTaxId: ''
      }));
    }
  };

  // Item handlers
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    const current = { ...newItems[index], [field]: value };

    const qty = Number(current.quantity) || 0;
    const rate = Number(current.unitPrice) || 0;
    current.amount = Number((qty * rate).toFixed(2));

    newItems[index] = current;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const handleSelectProduct = (index, prodId) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;

    const newItems = [...formData.items];
    const current = {
      ...newItems[index],
      description: prod.name + (prod.description ? ` - ${prod.description}` : ''),
      unitPrice: prod.price,
      taxRate: prod.taxRate || 0,
      quantity: 1,
      amount: Number(prod.price)
    };
    newItems[index] = current;
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: `item-${Date.now()}`,
          description: '',
          quantity: 1,
          unitPrice: 0,
          taxRate: 0,
          amount: 0
        }
      ]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  // Totals calculation
  const subtotal = formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  let discountAmount = 0;
  if (formData.discountType === 'percent') {
    discountAmount = (subtotal * (Number(formData.discountValue) || 0)) / 100;
  } else {
    discountAmount = Number(formData.discountValue) || 0;
  }
  discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

  const discountedSubtotal = subtotal - discountAmount;
  const taxRate = Number(formData.taxRate) || 0;
  const taxAmount = Number(((discountedSubtotal * taxRate) / 100).toFixed(2));
  const shipping = Number(formData.shipping) || 0;
  const total = Number((discountedSubtotal + taxAmount + shipping).toFixed(2));
  const balanceDue = Math.max(0, total - (Number(formData.amountPaid) || 0));

  // Quick Due Date Presets
  const setDueDatePreset = (days) => {
    const d = new Date(formData.issueDate || Date.now());
    d.setDate(d.getDate() + days);
    setFormData(prev => ({ ...prev, dueDate: d.toISOString().slice(0, 10) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName.trim()) {
      alert('Please select or specify a customer.');
      return;
    }
    if (formData.items.length === 0 || !formData.items.some(i => i.description.trim())) {
      alert('Please add at least one line item with a description.');
      return;
    }

    onSave({
      ...formData,
      subtotal,
      discountAmount,
      taxAmount,
      total,
      balanceDue
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/70">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {invoice ? `Edit Invoice: ${invoice.invoiceNumber}` : 'Create New Invoice'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in client details, itemize products/services, and generate invoice
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                required
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-1.5 mt-1.5">
                <button
                  type="button"
                  onClick={() => setDueDatePreset(0)}
                  className="px-2 py-0.5 text-[10px] bg-slate-200/80 hover:bg-slate-300 rounded font-medium text-slate-700"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setDueDatePreset(15)}
                  className="px-2 py-0.5 text-[10px] bg-slate-200/80 hover:bg-slate-300 rounded font-medium text-slate-700"
                >
                  +15d
                </button>
                <button
                  type="button"
                  onClick={() => setDueDatePreset(30)}
                  className="px-2 py-0.5 text-[10px] bg-slate-200/80 hover:bg-slate-300 rounded font-medium text-slate-700"
                >
                  +30d
                </button>
              </div>
            </div>
          </div>

          {/* Customer Selection Section */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Customer Details
              </h3>
              <button
                type="button"
                onClick={onQuickAddCustomer}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <UserPlus className="w-3.5 h-3.5" />
                + Add New Customer
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Select Existing Customer
                </label>
                <select
                  value={formData.customerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose or enter custom customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.email ? `(${c.email})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Customer / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Studio LLC"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="billing@customer.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Phone / Tax ID (GST / EIN)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Tax ID"
                    value={formData.customerTaxId}
                    onChange={(e) => setFormData({ ...formData, customerTaxId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Billing Address
                </label>
                <textarea
                  rows={2}
                  placeholder="Street address, City, State, Postal code, Country"
                  value={formData.customerAddress}
                  onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Line Items
                </h3>
                <p className="text-xs text-slate-500">Pick from products catalog or add custom rows</p>
              </div>
              <button
                type="button"
                onClick={addItem}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Row
              </button>
            </div>

            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div 
                  key={item.id || index}
                  className="grid grid-cols-12 gap-2.5 items-start p-3 bg-slate-50/70 rounded-xl border border-slate-200"
                >
                  {/* Catalog Auto-pick */}
                  <div className="col-span-12 sm:col-span-5 space-y-1">
                    {products.length > 0 && (
                      <select
                        onChange={(e) => handleSelectProduct(index, e.target.value)}
                        defaultValue=""
                        className="w-full mb-1 text-xs py-1 px-2 border border-slate-200 bg-white rounded text-slate-600 focus:outline-none"
                      >
                        <option value="" disabled>-- Quick pick from Catalog --</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({currency}{p.price}/{p.unit || 'unit'})
                          </option>
                        ))}
                      </select>
                    )}
                    <input
                      type="text"
                      required
                      placeholder="Item description or service details..."
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Quantity */}
                  <div className="col-span-4 sm:col-span-2">
                    <label className="sm:hidden text-[10px] text-slate-500 block mb-0.5">Qty</label>
                    <input
                      type="number"
                      step="any"
                      min="0.01"
                      required
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-4 sm:col-span-2">
                    <label className="sm:hidden text-[10px] text-slate-500 block mb-0.5">Rate ({currency})</label>
                    <input
                      type="number"
                      step="any"
                      min="0"
                      required
                      placeholder="Rate"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Amount & Delete */}
                  <div className="col-span-4 sm:col-span-3 flex items-center justify-between gap-2 pt-1 sm:pt-0">
                    <div className="text-right flex-1">
                      <div className="text-xs text-slate-400 sm:hidden">Total</div>
                      <div className="text-sm font-bold text-slate-900">
                        {formatCurrency(item.amount, currency)}
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={formData.items.length <= 1}
                      onClick={() => removeItem(index)}
                      className={`p-1.5 rounded-lg transition ${
                        formData.items.length <= 1
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Financials Summary & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notes & Terms */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Payment Terms
                </label>
                <input
                  type="text"
                  value={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                  placeholder="e.g. Net 15 days from invoice date"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Client Notes / Instructions
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Thank you for your business. Remit payment to bank details provided."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Pending">Pending (Sent)</option>
                  <option value="Paid">Paid (Full)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(subtotal, currency)}</span>
              </div>

              {/* Discount Row */}
              <div className="flex items-center justify-between text-sm pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Discount:</span>
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                      className="w-16 px-2 py-0.5 text-xs text-right focus:outline-none"
                    />
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      className="bg-slate-100 text-xs px-1.5 py-0.5 border-l border-slate-200 focus:outline-none"
                    >
                      <option value="percent">%</option>
                      <option value="fixed">{currency}</option>
                    </select>
                  </div>
                </div>
                <span className="text-slate-900 font-semibold">
                  -{formatCurrency(discountAmount, currency)}
                </span>
              </div>

              {/* Tax Rate */}
              <div className="flex items-center justify-between text-sm pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Tax / VAT (%):</span>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={formData.taxRate}
                    onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                    className="w-16 px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-xs text-right focus:outline-none"
                  />
                </div>
                <span className="text-slate-900 font-semibold">
                  +{formatCurrency(taxAmount, currency)}
                </span>
              </div>

              {/* Shipping / Extra */}
              <div className="flex items-center justify-between text-sm pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600">Shipping / Fee ({currency}):</span>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    value={formData.shipping}
                    onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                    className="w-20 px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-xs text-right focus:outline-none"
                  />
                </div>
                <span className="text-slate-900 font-semibold">
                  +{formatCurrency(shipping, currency)}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-lg font-extrabold text-slate-900">
                <span>Grand Total:</span>
                <span className="text-blue-600">{formatCurrency(total, currency)}</span>
              </div>

              {/* Paid so far (if editing) */}
              {invoice && (
                <div className="flex justify-between items-center text-sm pt-1 text-slate-600">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-600 font-semibold">
                    {formatCurrency(formData.amountPaid, currency)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{invoice ? 'Update Invoice' : 'Create & Save Invoice'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
