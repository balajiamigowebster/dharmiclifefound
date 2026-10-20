import React, { useState } from 'react';
import { X, DollarSign, Check, CreditCard, Building, Banknote } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function PaymentModal({ invoice, settings, onSave, onClose }) {
  if (!invoice) return null;

  const currency = settings?.currency || '$';
  const balance = Number(invoice.balanceDue) || 0;

  const [amount, setAmount] = useState(balance > 0 ? balance : invoice.total);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState('');

  const methods = [
    'Bank Transfer',
    'Credit Card',
    'Cash',
    'UPI',
    'Cheque',
    'PayPal'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const payVal = Number(amount);
    if (!payVal || payVal <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    onSave(invoice.id, {
      amount: payVal,
      paymentMethod,
      paymentDate,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Record Payment</h3>
            <p className="text-xs text-slate-500">Invoice: {invoice.invoiceNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Summary Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex justify-between items-center text-sm">
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Total Invoice</p>
              <p className="text-base font-bold text-slate-900">{formatCurrency(invoice.total, currency)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-rose-600 font-semibold uppercase">Remaining Balance</p>
              <p className="text-base font-bold text-rose-600">{formatCurrency(balance, currency)}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Amount ({currency}) *
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                min="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {balance > 0 && amount !== balance && (
                <button
                  type="button"
                  onClick={() => setAmount(balance)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 font-semibold rounded-md hover:bg-blue-200"
                >
                  Pay Full
                </button>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {methods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              required
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reference / Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Transaction / Reference Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Wire Ref #TXN-99881, Cheque #4019"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-sm transition active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Confirm Payment</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
