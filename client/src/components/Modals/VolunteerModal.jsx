import React, { useState } from 'react';
import { X, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitVolunteer } from '../../api';

export default function VolunteerModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please provide your name, email, and phone number.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await submitVolunteer({
        full_name: name,
        email,
        phone,
        skills,
        message
      });
      setSuccess(true);
    } catch (err) {
      setError('Failed to submit application. Please try again.');
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
    setSkills('');
    setMessage('');
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
            <Users className="w-5 h-5 text-[#E48A2D]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#E48A2D]">Join Our Mission</span>
          </div>
          <h3 className="text-2xl font-bold font-serif">Become a Volunteer</h3>
          <p className="text-sm text-white/80 mt-1">Dedicate your time, empathy, and skills to uplift our community.</p>
        </div>

        {/* Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Family, {name}!</h4>
              <p className="text-gray-600 mb-6">
                Thank you for offering your hands in service. Our coordinator will reach out to you via <span className="font-semibold text-gray-900">{phone}</span> or <span className="font-semibold text-gray-900">{email}</span> for the upcoming orientation.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-[#901C25] text-white font-semibold rounded-xl hover:bg-[#73161d] transition"
              >
                Close Window
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

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
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
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Area of Interest / Skills</label>
                <input
                  type="text"
                  placeholder="e.g. Annadhanam distribution, Teaching, Medical help, Social media"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#901C25] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">How would you like to contribute?</label>
                <textarea
                  rows="3"
                  placeholder="Tell us about your availability, motivation, or prior volunteering experience..."
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
                {loading ? 'Submitting Application...' : 'Submit Volunteer Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
