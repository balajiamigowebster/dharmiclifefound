import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContact } from '../../api';

export default function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide your name, email, and message.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await submitContact({ name, email, phone, subject, message });
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message. Please try again.');
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
    setSubject('');
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="bg-[#901C25] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X size={22} />
          </button>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#E48A2D]">Get In Touch</span>
          <h3 className="text-2xl font-bold font-serif">Contact Dharmic Life</h3>
          <p className="text-sm text-white/80 mt-1">We are here to answer your queries and welcome your support.</p>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. A representative from Dharmic Life Foundation will respond to you shortly at <span className="font-semibold text-gray-900">{email}</span>.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#901C25] text-white font-semibold rounded-xl hover:bg-[#73161d] transition"
              >
                Close
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

              {/* Direct Info */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-xs">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail size={14} className="text-[#901C25]" />
                  <span className="truncate">dharmiclifestyle@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={14} className="text-[#901C25]" />
                  <span>Pondicherry, India</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Inquiry regarding seva / support"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="How can we assist you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#901C25] hover:bg-[#73161d] text-white font-bold rounded-xl shadow-md transition transform active:scale-[0.99]"
              >
                {loading ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
