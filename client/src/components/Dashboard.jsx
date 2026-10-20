import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  Plus, 
  Users, 
  Package, 
  Eye, 
  Printer, 
  DollarSign 
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/formatters';

export default function Dashboard({ 
  stats, 
  settings, 
  onNewInvoice, 
  onViewInvoice, 
  onRecordPayment, 
  setActiveTab 
}) {
  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currency = settings?.currency || stats.currency || '$';
  const counts = stats.invoiceCounts || {};

  const kpis = [
    {
      title: 'Total Invoiced',
      amount: stats.totalBilled,
      count: `${counts.total || 0} invoices`,
      icon: TrendingUp,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      title: 'Total Received',
      amount: stats.totalReceived,
      count: `${counts.paid || 0} paid`,
      icon: CheckCircle2,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-100'
    },
    {
      title: 'Pending Receivables',
      amount: stats.totalOutstanding,
      count: `${counts.pending || 0} pending`,
      icon: Clock,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-100'
    },
    {
      title: 'Overdue Balance',
      amount: stats.totalOverdue,
      count: `${counts.overdue || 0} overdue`,
      icon: AlertCircle,
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      borderColor: 'border-rose-100'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-2">
            Overview & Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {settings?.companyName || 'Business Dashboard'}
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Track receivables, generate clean professional invoices, manage customers and streamline your billing operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onNewInvoice}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6 border ${kpi.borderColor} shadow-sm hover:shadow-md transition`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{kpi.title}</span>
                <div className={`w-10 h-10 rounded-xl ${kpi.bgColor} flex items-center justify-center ${kpi.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {formatCurrency(kpi.amount, currency)}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <span>{kpi.count}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Status Bar & Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice Status Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Invoice Distribution</h3>
            <p className="text-xs text-slate-500 mt-1">Breakdown of all registered invoices by status</p>
          </div>

          <div className="my-6 space-y-3">
            {/* Status breakdown rows */}
            <div className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Paid
              </span>
              <span className="font-semibold text-slate-900">{counts.paid || 0}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-2 rounded-full" 
                style={{ width: `${counts.total ? ((counts.paid || 0) / counts.total) * 100 : 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm pt-1">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending
              </span>
              <span className="font-semibold text-slate-900">{counts.pending || 0}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-2 rounded-full" 
                style={{ width: `${counts.total ? ((counts.pending || 0) / counts.total) * 100 : 0}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-sm pt-1">
              <span className="flex items-center gap-2 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Overdue
              </span>
              <span className="font-semibold text-slate-900">{counts.overdue || 0}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-rose-500 h-2 rounded-full" 
                style={{ width: `${counts.total ? ((counts.overdue || 0) / counts.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('invoices')}
            className="w-full py-2.5 text-center text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition flex items-center justify-center gap-1.5"
          >
            <span>View All Invoices</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quick Actions</h3>
            <p className="text-xs text-slate-500 mt-1">Direct shortcuts to frequent billing workflows</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div 
              onClick={onNewInvoice}
              className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3 shadow group-hover:scale-105 transition">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Create Invoice</h4>
              <p className="text-xs text-slate-500 mt-1">Itemize products, calculate tax & print</p>
            </div>

            <div 
              onClick={() => setActiveTab('customers')}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 cursor-pointer transition group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center mb-3 shadow group-hover:scale-105 transition">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Customers ({stats.customerCount || 0})</h4>
              <p className="text-xs text-slate-500 mt-1">Manage client profiles and history</p>
            </div>

            <div 
              onClick={() => setActiveTab('products')}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 cursor-pointer transition group"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center mb-3 shadow group-hover:scale-105 transition">
                <Package className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900">Products & Catalog ({stats.productCount || 0})</h4>
              <p className="text-xs text-slate-500 mt-1">Services, standard rates and tax rates</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Currency: <strong>{currency} ({settings?.currencyCode || 'USD'})</strong></span>
            <span>Business: <strong>{settings?.companyName || 'Not Set'}</strong></span>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Invoices</h3>
            <p className="text-xs text-slate-500 mt-0.5">Most recent billing transactions and their current status</p>
          </div>
          <button
            onClick={() => setActiveTab('invoices')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
          >
            <span>See all {counts.total || 0} invoices</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-xs font-semibold text-slate-500 border-b border-slate-100 uppercase tracking-wider">
                <th className="py-3 px-6">Invoice #</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {(stats.recentInvoices || []).map((inv) => {
                const badge = getStatusBadge(inv.status);
                return (
                  <tr key={inv.id} className="hover:bg-slate-50/60 transition group">
                    <td className="py-4 px-6 font-semibold text-blue-600 cursor-pointer hover:underline" onClick={() => onViewInvoice(inv)}>
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{inv.customerName}</div>
                      {inv.customerEmail && (
                        <div className="text-xs text-slate-400">{inv.customerEmail}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div>{formatDate(inv.issueDate)}</div>
                      <div className="text-xs text-slate-400">Due: {formatDate(inv.dueDate)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">
                        {formatCurrency(inv.total, currency)}
                      </div>
                      {inv.balanceDue > 0 && inv.status !== 'Draft' && (
                        <div className="text-xs text-rose-600 font-medium">
                          Bal: {formatCurrency(inv.balanceDue, currency)}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        {badge.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewInvoice(inv)}
                          title="View / Print Invoice"
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {inv.status !== 'Paid' && inv.status !== 'Draft' && (
                          <button
                            onClick={() => onRecordPayment(inv)}
                            title="Record Payment"
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          >
                            <DollarSign className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
