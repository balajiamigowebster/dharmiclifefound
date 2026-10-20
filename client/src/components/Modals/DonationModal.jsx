import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitDonation } from '../../api';

export default function DonationModal({ isOpen, onClose, initialCause = 'General Seva' }) {
  const [amount, setAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState(initialCause);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const presetAmounts = ['500', '1000', '2500', '5000', '10000'];

  const causes = [
    'Annadhanam (Hunger Relief)',
    'Honoring Unclaimed Souls (Dignified Cremation)',
    'Educational Support for Students',
    'Women Empowerment & Vocational Training',
    'Caring for Homeless Communities',
    'General Seva & Foundation Care'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalAmount = amount === 'custom' ? parseFloat(customAmount) : parseFloat(amount);
    if (!finalAmount || finalAmount <= 0) {
      setError('Please select or enter a valid donation amount.');
      return;
    }
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError('Please provide an email or phone number for the receipt.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await submitDonation({
        donor_name: name,
        donor_email: email,
        donor_phone: phone,
        amount: finalAmount,
        cause,
        payment_method: paymentMethod
      });
      setSuccess(true);
    } catch (err) {
      setError('Transaction simulated error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError('');
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#901C25] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="w-5 h-5 text-[#E48A2D] fill-[#E48A2D]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#E48A2D]">Selfless Giving</span>
          </div>
          <h3 className="text-2xl font-bold font-serif">Support Dharmic Life Foundation</h3>
          <p className="text-sm text-white/80 mt-1">Your contribution directly upholds Dharma and transforms lives.</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You, {name}!</h4>
              <p className="text-gray-600 mb-6">
                Your donation of <span className="font-bold text-[#901C25]">₹{amount === 'custom' ? customAmount : amount}</span> towards{' '}
                <span className="font-semibold text-gray-800">{cause}</span> has been successfully recorded. A confirmation receipt will be sent to your details.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 mb-6">
                "Humanity is the Mother of Dharma" — May you and your family be blessed with peace and prosperity.
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#901C25] text-white font-semibold rounded-xl hover:bg-[#73161d] transition"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Cause selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Select Seva / Cause
                </label>
                <select
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                >
                  {causes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Amount selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Choose Donation Amount (INR ₹)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setAmount(amt); setCustomAmount(''); }}
                      className={`py-2 px-3 text-sm font-semibold rounded-lg border transition ${
                        amount === amt
                          ? 'bg-[#901C25] text-white border-[#901C25] shadow-sm'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-[#E48A2D]'
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount('custom')}
                    className={`py-2 px-3 text-sm font-semibold rounded-lg border transition ${
                      amount === 'custom'
                        ? 'bg-[#901C25] text-white border-[#901C25]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#E48A2D]'
                    }`}
                  >
                    Custom ₹
                  </button>
                </div>

                {amount === 'custom' && (
                  <div className="relative mt-2">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      type="number"
                      min="100"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#901C25] focus:outline-none font-semibold text-gray-900"
                    />
                  </div>
                )}
              </div>

              {/* Donor info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI / QR', 'Net Banking', 'Debit/Credit Card'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition ${
                        paymentMethod === method
                          ? 'border-[#901C25] bg-red-50 text-[#901C25] font-semibold'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secure note */}
              <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-1">
                <ShieldCheck size={14} className="text-green-600" />
                <span>100% Tax-exempt & Secure Donation through Official Trust Account</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#901C25] hover:bg-[#73161d] text-white font-bold rounded-xl shadow-md transition transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {loading ? 'Processing Donation...' : `Donate ₹${amount === 'custom' ? (customAmount || '0') : amount} Now`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
