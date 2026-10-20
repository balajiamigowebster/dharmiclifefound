import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2, 
  Copy, 
  DollarSign, 
  Filter, 
  Download,
  AlertCircle 
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/formatters';

export default function InvoiceList({
  invoices,
  settings,
  onNewInvoice,
  onViewInvoice,
  onEditInvoice,
  onDuplicateInvoice,
  onDeleteInvoice,
  onRecordPayment
}) {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currency = settings?.currency || '$';

  const statuses = [
    { id: 'all', label: 'All Invoices' },
    { id: 'paid', label: 'Paid' },
    { id: 'pending', label: 'Pending' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'draft', label: 'Draft' }
  ];

  // Filtering
  const filtered = invoices.filter((inv) => {
    const matchesStatus =
      selectedStatus === 'all' ||
      (inv.status || '').toLowerCase() === selectedStatus.toLowerCase();

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(q)) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(q)) ||
      (inv.customerEmail && inv.customerEmail.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage, filter, create, and track payments for all customer bills
          </p>
        </div>
        <button
          onClick={onNewInvoice}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          Create Invoice
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((s) => {
            const count = s.id === 'all' 
              ? invoices.length 
              : invoices.filter(i => (i.status || '').toLowerCase() === s.id).length;
            const isActive = selectedStatus === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{s.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice #, customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">No invoices found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {searchQuery || selectedStatus !== 'all'
                ? "No invoices match your current filter or search criteria. Try resetting them."
                : "You haven't created any invoices yet. Click below to generate your first invoice."}
            </p>
            <div className="mt-5">
              <button
                onClick={onNewInvoice}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
              >
                <Plus className="w-4 h-4" />
                Create Invoice
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-xs font-semibold text-slate-500 border-b border-slate-100 uppercase tracking-wider">
                  <th className="py-3 px-6">Invoice #</th>
                  <th className="py-3 px-6">Customer</th>
                  <th className="py-3 px-6">Issue Date</th>
                  <th className="py-3 px-6">Due Date</th>
                  <th className="py-3 px-6">Total Amount</th>
                  <th className="py-3 px-6">Balance Due</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map((inv) => {
                  const badge = getStatusBadge(inv.status);
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50/60 transition group">
                      <td className="py-4 px-6 font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => onViewInvoice(inv)}>
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900">{inv.customerName}</div>
                        {inv.customerEmail && (
                          <div className="text-xs text-slate-400">{inv.customerEmail}</div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {formatDate(inv.issueDate)}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {formatDate(inv.dueDate)}
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">
                        {formatCurrency(inv.total, currency)}
                      </td>
                      <td className="py-4 px-6">
                        {inv.balanceDue > 0 ? (
                          <span className="font-semibold text-rose-600">
                            {formatCurrency(inv.balanceDue, currency)}
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-emerald-600">Settled</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                          {badge.label}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onViewInvoice(inv)}
                            title="View & Print Invoice"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {inv.status !== 'Paid' && (
                            <button
                              onClick={() => onRecordPayment(inv)}
                              title="Record Payment"
                              className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            >
                              <DollarSign className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => onEditInvoice(inv)}
                            title="Edit Invoice"
                            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDuplicateInvoice(inv)}
                            title="Duplicate as New"
                            className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteInvoice(inv.id)}
                            title="Delete Invoice"
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
