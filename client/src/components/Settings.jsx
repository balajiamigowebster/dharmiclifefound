import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  FileText, 
  CreditCard, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  ShieldAlert 
} from 'lucide-react';

export default function Settings({ 
  settings, 
  onSaveSettings, 
  onResetData, 
  onRestoreData 
}) {
  const [formData, setFormData] = useState({
    companyName: settings?.companyName || '',
    companyEmail: settings?.companyEmail || '',
    companyPhone: settings?.companyPhone || '',
    companyAddress: settings?.companyAddress || '',
    taxId: settings?.taxId || '',
    currency: settings?.currency || '$',
    currencyCode: settings?.currencyCode || 'USD',
    invoicePrefix: settings?.invoicePrefix || 'INV-',
    defaultPaymentTerms: settings?.defaultPaymentTerms || 'Net 15 days',
    bankDetails: settings?.bankDetails || '',
    footerNote: settings?.footerNote || 'Thank you for your business!'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    window.open('/api/backup', '_blank');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (confirm('Are you sure you want to restore this backup? It will replace existing data.')) {
          onRestoreData(json);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings & Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Configure your business profile, invoice branding, currency, and payment details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">Company Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company / Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tax Registration ID (GST / EIN / VAT)
              </label>
              <input
                type="text"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.companyEmail}
                onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.companyPhone}
                onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Address (Appears on Invoice Header)
              </label>
              <textarea
                rows={3}
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Currency & Invoice Numbering */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">Currency & Invoicing Preferences</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Currency Symbol
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="$">$ (USD / CAD / AUD)</option>
                <option value="₹">₹ (INR - Indian Rupee)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - British Pound)</option>
                <option value="¥">¥ (JPY / CNY)</option>
                <option value="AED">AED (UAE Dirham)</option>
                <option value="SGD">S$ (Singapore Dollar)</option>
                <option value="CHF">CHF (Swiss Franc)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Currency Code
              </label>
              <input
                type="text"
                placeholder="USD, INR, EUR"
                value={formData.currencyCode}
                onChange={(e) => setFormData({ ...formData, currencyCode: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Invoice Number Prefix
              </label>
              <input
                type="text"
                placeholder="INV-"
                value={formData.invoicePrefix}
                onChange={(e) => setFormData({ ...formData, invoicePrefix: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment & Banking Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-bold text-slate-900">Payment & Bank Instructions</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bank Wire / UPI / Payment Details (Shown on Printed Invoices)
              </label>
              <textarea
                rows={4}
                value={formData.bankDetails}
                onChange={(e) => setFormData({ ...formData, bankDetails: e.target.value })}
                placeholder="Bank Name, Account #, Routing / IFSC, UPI ID or PayPal link"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Payment Terms
              </label>
              <input
                type="text"
                value={formData.defaultPaymentTerms}
                onChange={(e) => setFormData({ ...formData, defaultPaymentTerms: e.target.value })}
                placeholder="e.g. Net 15. Due upon receipt."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Footer Thank You Note
              </label>
              <input
                type="text"
                value={formData.footerNote}
                onChange={(e) => setFormData({ ...formData, footerNote: e.target.value })}
                placeholder="Thank you for your business!"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Check className="w-4 h-4" />
              Settings saved successfully!
            </span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition active:scale-95 flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            Save Settings
          </button>
        </div>
      </form>

      {/* Backup, Restore & Reset Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <ShieldAlert className="w-5 h-5 text-slate-600" />
          <h2 className="text-base font-bold text-slate-900">Data Management & Backup</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Download JSON */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Export Backup</h3>
              <p className="text-xs text-slate-500 mt-1">Download your full database as a JSON backup</p>
            </div>
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export JSON
            </button>
          </div>

          {/* Restore JSON */}
          <div className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Restore Backup</h3>
              <p className="text-xs text-slate-500 mt-1">Upload a previous JSON backup file</p>
            </div>
            <label className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset to Sample */}
          <div className="border border-rose-100 bg-rose-50/30 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-rose-800">Reset Data</h3>
              <p className="text-xs text-rose-600/80 mt-1">Revert database to default realistic demo sample</p>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm('Are you sure you want to reset all data to sample demo data? This will overwrite current records.')) {
                  onResetData();
                }
              }}
              className="mt-4 w-full py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
