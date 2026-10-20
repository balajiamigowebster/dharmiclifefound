import React from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Mail, 
  DollarSign, 
  CheckCircle, 
  Download,
  Building2 
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/formatters';

export default function InvoicePrint({ 
  invoice, 
  settings, 
  onClose, 
  onRecordPayment 
}) {
  if (!invoice) return null;

  const currency = settings?.currency || '$';
  const badge = getStatusBadge(invoice.status);

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Invoice ${invoice.invoiceNumber} from ${settings?.companyName || 'Us'}`);
    const body = encodeURIComponent(
      `Hello ${invoice.customerName},\n\nPlease find attached the invoice ${invoice.invoiceNumber} for the amount of ${formatCurrency(invoice.total, currency)}.\nDue Date: ${formatDate(invoice.dueDate)}\n\nThank you for your business!`
    );
    window.open(`mailto:${invoice.customerEmail || ''}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="no-print bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-sm font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Invoices</span>
          </button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
            {badge.label}
          </span>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {invoice.status !== 'Paid' && (
            <button
              onClick={() => onRecordPayment(invoice)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
            >
              <DollarSign className="w-4 h-4" />
              <span>Record Payment</span>
            </button>
          )}

          <button
            onClick={handleEmail}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold transition"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm shadow-blue-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Container */}
      <div className="print-container bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-12 max-w-4xl mx-auto text-slate-800">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow">
                {settings?.companyName ? settings.companyName.charAt(0) : 'B'}
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {settings?.companyName || 'Business Name'}
              </h1>
            </div>
            <div className="text-xs text-slate-500 space-y-0.5 whitespace-pre-line leading-relaxed">
              {settings?.companyAddress && <p>{settings.companyAddress}</p>}
              {settings?.companyEmail && <p>Email: {settings.companyEmail}</p>}
              {settings?.companyPhone && <p>Phone: {settings.companyPhone}</p>}
              {settings?.taxId && <p>Tax ID: {settings.taxId}</p>}
            </div>
          </div>

          <div className="sm:text-right">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider mb-2">
              INVOICE
            </h2>
            <div className="space-y-1 text-sm">
              <p className="font-bold text-blue-600 text-base">
                #{invoice.invoiceNumber}
              </p>
              <p className="text-slate-600 text-xs">
                Issue Date: <strong className="text-slate-800">{formatDate(invoice.issueDate)}</strong>
              </p>
              <p className="text-slate-600 text-xs">
                Due Date: <strong className="text-slate-800">{formatDate(invoice.dueDate)}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bill-To & Invoice Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Billed To
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {invoice.customerName}
            </h3>
            <div className="text-xs text-slate-600 mt-1 whitespace-pre-line leading-relaxed space-y-0.5">
              {invoice.customerAddress && <p>{invoice.customerAddress}</p>}
              {invoice.customerEmail && <p>Email: {invoice.customerEmail}</p>}
              {invoice.customerPhone && <p>Phone: {invoice.customerPhone}</p>}
              {invoice.customerTaxId && <p>Tax ID: {invoice.customerTaxId}</p>}
            </div>
          </div>

          <div className="sm:text-right flex flex-col justify-end">
            <div className="inline-block sm:ml-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-left min-w-[220px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Payment Status
              </span>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                  <span className={`w-2 h-2 rounded-full ${badge.dot}`}></span>
                  {badge.label.toUpperCase()}
                </span>
              </div>
              {invoice.paymentMethod && (
                <p className="text-xs text-slate-500 mt-2">
                  Method: <strong className="text-slate-700">{invoice.paymentMethod}</strong>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-900">
                <th className="py-3 px-2 w-10">#</th>
                <th className="py-3 px-2">Item Description</th>
                <th className="py-3 px-2 text-center w-24">Qty</th>
                <th className="py-3 px-2 text-right w-32">Rate</th>
                <th className="py-3 px-2 text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {(invoice.items || []).map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-4 px-2 text-slate-400 text-xs font-medium">{idx + 1}</td>
                  <td className="py-4 px-2">
                    <p className="font-semibold text-slate-900">{item.description}</p>
                    {item.taxRate > 0 && (
                      <p className="text-[11px] text-slate-400">Tax: {item.taxRate}%</p>
                    )}
                  </td>
                  <td className="py-4 px-2 text-center text-slate-700 font-medium">{item.quantity}</td>
                  <td className="py-4 px-2 text-right text-slate-700 font-medium">
                    {formatCurrency(item.unitPrice, currency)}
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    {formatCurrency(item.amount, currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary & Bank Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
          {/* Payment & Bank Details */}
          <div className="space-y-4">
            {settings?.bankDetails && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Payment Instructions
                </h4>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">
                  {settings.bankDetails}
                </p>
              </div>
            )}

            {invoice.terms && (
              <div className="text-xs text-slate-500">
                <strong className="text-slate-700">Terms: </strong>
                {invoice.terms}
              </div>
            )}

            {invoice.notes && (
              <div className="text-xs text-slate-500">
                <strong className="text-slate-700">Notes: </strong>
                {invoice.notes}
              </div>
            )}
          </div>

          {/* Totals Breakdown */}
          <div className="space-y-2 text-sm sm:pl-8">
            <div className="flex justify-between text-slate-600 py-1">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(invoice.subtotal, currency)}
              </span>
            </div>

            {invoice.discountAmount > 0 && (
              <div className="flex justify-between text-slate-600 py-1">
                <span>Discount ({invoice.discountType === 'percent' ? `${invoice.discountValue}%` : 'Fixed'}):</span>
                <span className="font-semibold text-slate-800">
                  -{formatCurrency(invoice.discountAmount, currency)}
                </span>
              </div>
            )}

            {invoice.taxAmount > 0 && (
              <div className="flex justify-between text-slate-600 py-1">
                <span>Tax / VAT ({invoice.taxRate}%):</span>
                <span className="font-semibold text-slate-800">
                  +{formatCurrency(invoice.taxAmount, currency)}
                </span>
              </div>
            )}

            {invoice.shipping > 0 && (
              <div className="flex justify-between text-slate-600 py-1">
                <span>Shipping / Freight:</span>
                <span className="font-semibold text-slate-800">
                  +{formatCurrency(invoice.shipping, currency)}
                </span>
              </div>
            )}

            <div className="border-t-2 border-slate-900 pt-3 flex justify-between text-lg font-black text-slate-900">
              <span>Grand Total:</span>
              <span className="text-blue-600">
                {formatCurrency(invoice.total, currency)}
              </span>
            </div>

            {invoice.amountPaid > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold py-1">
                <span>Amount Paid:</span>
                <span>-{formatCurrency(invoice.amountPaid, currency)}</span>
              </div>
            )}

            <div className="bg-slate-100 rounded-lg p-3 flex justify-between text-base font-extrabold text-slate-900 mt-2">
              <span>Balance Due:</span>
              <span className={invoice.balanceDue > 0 ? 'text-rose-600' : 'text-emerald-600'}>
                {formatCurrency(invoice.balanceDue, currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Note & Signatory */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-6">
          <p className="text-center sm:text-left">
            {settings?.footerNote || 'Thank you for your business!'}
          </p>
          <div className="text-center sm:text-right border-t border-slate-300 pt-2 min-w-[180px]">
            <p className="font-bold text-slate-800">{settings?.companyName || 'Authorized Signatory'}</p>
            <p className="text-[11px] text-slate-400">Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
}
