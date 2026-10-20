import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { submitNewsletter } from '../api';

export default function Footer({ onOpenContact, onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setLoading(true);
    try {
      await submitNewsletter(email);
      setSubscribed(true);
      setEmail('');
    } catch (e) {
      // fallback
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#1c1917] text-white pt-16 pb-8 border-t-4 border-[#901C25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: About / Logo (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-xl inline-block shadow-md">
              <img
                src="/images/logo.jpeg"
                alt="Dharmic Life Foundation"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              Dharmic Life Foundation is a charitable Trust dedicated to feeding the hungry, supporting homeless communities, and spreading kindness through social service.
            </p>
          </div>

          {/* Col 2: Get In Touch! (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold font-serif text-white tracking-wide relative inline-block">
              Get In Touch!
              <span className="block w-10 h-0.5 bg-[#E48A2D] mt-1.5"></span>
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={17} className="text-[#E48A2D] shrink-0 mt-0.5" />
                <span>Pondicherry, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={17} className="text-[#E48A2D] shrink-0" />
                <a
                  href="mailto:dharmiclifestyle@gmail.com"
                  className="hover:text-[#E48A2D] transition truncate"
                >
                  dharmiclifestyle@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold font-serif text-white tracking-wide relative inline-block">
              Quick Links
              <span className="block w-10 h-0.5 bg-[#E48A2D] mt-1.5"></span>
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="/trust"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('trust');
                    else handleScrollTo('about');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  About Us (Trust)
                </a>
              </li>
              <li>
                <a
                  href="/trustees"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('trustees');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Trustees &amp; Leadership
                </a>
              </li>
              <li>
                <a
                  href="/activities"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('activities');
                    else handleScrollTo('activities');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Activities
                </a>
              </li>
              <li>
                <a
                  href="/event-page"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('events');
                    else handleScrollTo('events');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Upcoming Events
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('gallery');
                    else handleScrollTo('gallery');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="/testimonials"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('testimonials');
                    else handleScrollTo('testimonials');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('contact');
                    else handleScrollTo('contact');
                  }}
                  className="hover:text-[#E48A2D] transition block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) onNavigate('admin');
                  }}
                  className="text-stone-400 hover:text-[#E48A2D] transition block font-medium"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Updates (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold font-serif text-white tracking-wide relative inline-block">
              Stay Connected
              <span className="block w-10 h-0.5 bg-[#E48A2D] mt-1.5"></span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Subscribe to receive weekly seva reports, Annadhanam updates, and event invitations.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-green-950/60 border border-green-700/60 text-green-300 text-xs rounded-xl">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E48A2D]"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#901C25] hover:bg-[#73161d] rounded-lg text-white flex items-center justify-center transition"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            &copy; 2026 Copyrights by <span className="text-white font-semibold">Dharmic Life Foundation</span> . All Rights Reserved | Designed by <a href="https://amigowebster.in" target="_blank" rel="noreferrer" className="text-[#E48A2D] hover:underline">amigowebster</a>
            <span className="mx-2 text-stone-600">|</span>
            <a
              href="/admin"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('admin');
              }}
              className="text-stone-400 hover:text-white transition"
            >
              Admin Portal
            </a>
          </p>

          <div className="flex items-center gap-4 text-white">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#25D366] hover:text-white transition"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#1877F2] hover:text-white transition"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#E4405F] hover:text-white transition"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
