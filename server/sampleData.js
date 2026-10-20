module.exports = {
  settings: {
    companyName: "Apex Digital Solutions",
    companyEmail: "billing@apexdigital.io",
    companyPhone: "+1 (555) 349-8821",
    companyAddress: "742 Innovation Way, Suite 500\nSan Francisco, CA 94105\nUnited States",
    taxId: "US-EIN 84-2910492",
    currency: "$",
    currencyCode: "USD",
    invoicePrefix: "INV-",
    defaultPaymentTerms: "Net 15 (Payment due within 15 days of invoice date)",
    bankDetails: "Bank: Silicon Valley Bank\nAccount Name: Apex Digital Solutions LLC\nAccount #: 4920-1928-3382\nRouting/SWIFT: SVBLUS6S\nUPI / PayPal: pay@apexdigital.io",
    footerNote: "Thank you for your business! Please remit payment using the bank details above."
  },

  customers: [
    {
      id: "cust-1",
      name: "Starlight Media Group",
      email: "accounts@starlightmedia.com",
      phone: "+1 (415) 892-1102",
      address: "100 Pine Street, 14th Floor\nSan Francisco, CA 94111",
      taxId: "US-EIN 91-8273645",
      notes: "Preferred billing on 1st of every month",
      createdAt: "2026-09-15T10:00:00Z"
    },
    {
      id: "cust-2",
      name: "Nexus Cloud Systems",
      email: "finance@nexuscloud.io",
      phone: "+1 (206) 555-0199",
      address: "500 108th Ave NE, Suite 1100\nBellevue, WA 98004",
      taxId: "WA-REG 603-912-441",
      notes: "Requires PO number on all invoices",
      createdAt: "2026-09-20T14:30:00Z"
    },
    {
      id: "cust-3",
      name: "Aurora Wellness & Spa",
      email: "hello@aurorawellness.co",
      phone: "+1 (303) 777-4411",
      address: "1801 California St\nDenver, CO 80202",
      taxId: "CO-TAX 448-109",
      notes: "Small business client",
      createdAt: "2026-10-01T09:15:00Z"
    }
  ],

  products: [
    {
      id: "prod-1",
      name: "Custom Web Application Development",
      description: "Full-stack React & Node.js application engineering and API integrations",
      price: 120,
      unit: "hr",
      taxRate: 10,
      createdAt: "2026-09-10T08:00:00Z"
    },
    {
      id: "prod-2",
      name: "UI/UX Design System & Prototyping",
      description: "Figma design system, high-fidelity responsive wireframes and interaction specs",
      price: 95,
      unit: "hr",
      taxRate: 10,
      createdAt: "2026-09-10T08:00:00Z"
    },
    {
      id: "prod-3",
      name: "Monthly Cloud DevOps & Security",
      description: "24/7 uptime monitoring, automated backups, security patching and SSL renewals",
      price: 650,
      unit: "month",
      taxRate: 0,
      createdAt: "2026-09-10T08:00:00Z"
    },
    {
      id: "prod-4",
      name: "Performance & SEO Audit",
      description: "Comprehensive Core Web Vitals optimization, accessibility & technical SEO report",
      price: 850,
      unit: "audit",
      taxRate: 10,
      createdAt: "2026-09-10T08:00:00Z"
    }
  ],

  invoices: [
    {
      id: "inv-1",
      invoiceNumber: "INV-2026-0001",
      customerId: "cust-1",
      customerName: "Starlight Media Group",
      customerEmail: "accounts@starlightmedia.com",
      customerPhone: "+1 (415) 892-1102",
      customerAddress: "100 Pine Street, 14th Floor\nSan Francisco, CA 94111",
      customerTaxId: "US-EIN 91-8273645",
      issueDate: "2026-10-01",
      dueDate: "2026-10-16",
      status: "Paid",
      items: [
        {
          id: "item-1",
          description: "Custom Web Application Development - Sprint 1 & 2",
          quantity: 40,
          unitPrice: 120,
          taxRate: 10,
          amount: 4800
        },
        {
          id: "item-2",
          description: "UI/UX Design System & Prototyping - Design Specs",
          quantity: 15,
          unitPrice: 95,
          taxRate: 10,
          amount: 1425
        }
      ],
      subtotal: 6225,
      discountType: "percent",
      discountValue: 5,
      discountAmount: 311.25,
      taxRate: 10,
      taxAmount: 591.38,
      shipping: 0,
      total: 6505.13,
      amountPaid: 6505.13,
      balanceDue: 0,
      paymentMethod: "Bank Transfer",
      paidAt: "2026-10-12T15:20:00Z",
      notes: "Includes 5% early payment discount applied.",
      terms: "Net 15. All payments via Bank Wire or ACH.",
      createdAt: "2026-10-01T11:00:00Z",
      updatedAt: "2026-10-12T15:20:00Z"
    },
    {
      id: "inv-2",
      invoiceNumber: "INV-2026-0002",
      customerId: "cust-2",
      customerName: "Nexus Cloud Systems",
      customerEmail: "finance@nexuscloud.io",
      customerPhone: "+1 (206) 555-0199",
      customerAddress: "500 108th Ave NE, Suite 1100\nBellevue, WA 98004",
      customerTaxId: "WA-REG 603-912-441",
      issueDate: "2026-10-10",
      dueDate: "2026-10-25",
      status: "Pending",
      items: [
        {
          id: "item-3",
          description: "Monthly Cloud DevOps & Security - October 2026",
          quantity: 1,
          unitPrice: 650,
          taxRate: 0,
          amount: 650
        },
        {
          id: "item-4",
          description: "Performance & SEO Audit - Infrastructure Benchmarks",
          quantity: 1,
          unitPrice: 850,
          taxRate: 10,
          amount: 850
        }
      ],
      subtotal: 1500,
      discountType: "fixed",
      discountValue: 0,
      discountAmount: 0,
      taxRate: 10,
      taxAmount: 85,
      shipping: 0,
      total: 1585,
      amountPaid: 0,
      balanceDue: 1585,
      paymentMethod: null,
      paidAt: null,
      notes: "PO Reference: PO-99214-NX",
      terms: "Payment due within 15 days of receipt.",
      createdAt: "2026-10-10T09:40:00Z",
      updatedAt: "2026-10-10T09:40:00Z"
    },
    {
      id: "inv-3",
      invoiceNumber: "INV-2026-0003",
      customerId: "cust-3",
      customerName: "Aurora Wellness & Spa",
      customerEmail: "hello@aurorawellness.co",
      customerPhone: "+1 (303) 777-4411",
      customerAddress: "1801 California St\nDenver, CO 80202",
      customerTaxId: "CO-TAX 448-109",
      issueDate: "2026-09-22",
      dueDate: "2026-10-07",
      status: "Overdue",
      items: [
        {
          id: "item-5",
          description: "UI/UX Design System - Mobile Booking Flow",
          quantity: 12,
          unitPrice: 95,
          taxRate: 10,
          amount: 1140
        }
      ],
      subtotal: 1140,
      discountType: "percent",
      discountValue: 0,
      discountAmount: 0,
      taxRate: 10,
      taxAmount: 114,
      shipping: 0,
      total: 1254,
      amountPaid: 400,
      balanceDue: 854,
      paymentMethod: "Credit Card (Partial)",
      paidAt: null,
      notes: "Partial payment of $400 received on Sept 28. Remaining balance overdue.",
      terms: "Due upon receipt.",
      createdAt: "2026-09-22T16:00:00Z",
      updatedAt: "2026-09-28T10:15:00Z"
    }
  ]
};
