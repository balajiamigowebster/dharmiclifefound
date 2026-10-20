import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle, Home, ChevronRight } from 'lucide-react';
import { submitContact } from '../api';

export default function ContactPage({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await submitContact({ name, email, phone, subject, message });
      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Contact
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                Connect with Dharmic Life Foundation
              </p>
            </div>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#E48A2D] transition flex items-center gap-1 text-white"
              >
                <Home size={14} />
                <span>Home</span>
              </button>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Contact</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Three Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Mailing Address */}
          <div className="bg-stone-50 hover:bg-[#FAF8F5] border border-gray-100 rounded-2xl p-8 flex items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#901C25] text-[#901C25] flex items-center justify-center shrink-0 shadow-sm">
              <MapPin size={26} className="text-[#901C25]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Mailing Address
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans pt-1">
                Pondicherry, India<br />
                <span className="text-xs text-gray-400">901 N Pitt Str., Suite 170 Alexandria, USA</span>
              </p>
            </div>
          </div>

          {/* Card 2: Quick Contact */}
          <div className="bg-stone-50 hover:bg-[#FAF8F5] border border-gray-100 rounded-2xl p-8 flex items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#E48A2D] text-[#E48A2D] flex items-center justify-center shrink-0 shadow-sm">
              <Phone size={26} className="text-[#E48A2D]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Quick Contact
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans pt-1">
                <a href="tel:+919876543210" className="hover:text-[#901C25] transition font-medium block">
                  +91 98765 43210
                </a>
                <span className="text-xs text-gray-400 block">(406) 555-0120</span>
              </p>
            </div>
          </div>

          {/* Card 3: Support Email */}
          <div className="bg-stone-50 hover:bg-[#FAF8F5] border border-gray-100 rounded-2xl p-8 flex items-start gap-5 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-white border-2 border-[#901C25] text-[#901C25] flex items-center justify-center shrink-0 shadow-sm">
              <Mail size={26} className="text-[#901C25]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif text-gray-900">
                Support Email
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-sans pt-1">
                <a href="mailto:dharmiclifestyle@gmail.com" className="hover:text-[#901C25] transition font-medium block truncate">
                  dharmiclifestyle@gmail.com
                </a>
                <span className="text-xs text-gray-400 block">info@cleanheart.com</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Leave Us A Message Form Section */}
      <div className="bg-stone-50/60 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2 inline-block">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
              Leave us a message
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
              Have queries regarding our Annadhanam drives, Dignified Cremation ceremonies, or student sponsorship? We welcome your heartfelt message.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you! Your message has been sent.</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Our foundation team has received your submission and will get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 bg-[#901C25] text-white rounded-xl font-bold text-sm hover:bg-[#73161d] transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-stone-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Write a Message *
                  </label>
                  <textarea
                    rows="6"
                    required
                    placeholder="Write a Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-stone-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#901C25] focus:bg-white transition resize-none"
                  ></textarea>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 bg-[#901C25] hover:bg-[#73161d] text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition transform active:scale-95 inline-flex items-center gap-2"
                  >
                    <Send size={16} />
                    <span>{loading ? 'Sending Message...' : 'Send a Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* 4. Google Maps Embed Section */}
      <div className="w-full h-96 sm:h-[450px] bg-gray-200 border-t border-gray-200">
        <iframe
          title="Dharmic Life Foundation Location Map"
          src="https://maps.google.com/maps?q=Pondicherry%2C%20India&t=m&z=13&output=embed&iwloc=near"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
}
