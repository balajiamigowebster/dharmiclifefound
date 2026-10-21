import React from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function TopBar({ siteInfo }) {
  const email = siteInfo?.email || 'dharmiclifestyle@gmail.com';
  const address = siteInfo?.address || 'Pondicherry';
  const facebook = siteInfo?.facebook || 'https://facebook.com';
  const twitter = siteInfo?.twitter || 'https://twitter.com';
  const instagram = siteInfo?.instagram || 'https://instagram.com';
  const pinterest = siteInfo?.pinterest || 'https://pinterest.com';

  return (
    <div className="bg-[#901C25] text-white text-xs border-b border-red-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between min-h-[42px] py-1.5">
        {/* Left: Email & Location */}
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 hover:text-[#E48A2D] transition duration-200"
          >
            <Mail size={13} className="text-[#E48A2D]" />
            <span className="font-medium tracking-wide">{email}</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 text-white/90">
            <MapPin size={13} className="text-[#E48A2D]" />
            <span>{address}</span>
          </div>
        </div>

        {/* Right: Social Links with Orange Box Background */}
        <div className="flex items-center">
          <div className="bg-[#E48A2D] text-white px-5 py-2 flex items-center gap-4 text-xs font-semibold rounded-bl-lg shadow-sm">
            <span className="text-[11px] tracking-wider uppercase opacity-90 hidden md:inline">Follow Us:</span>
            <a href={facebook} target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Facebook">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z"/></svg>
            </a>
            <a href={twitter} target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Twitter">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={instagram} target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Instagram">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={pinterest} target="_blank" rel="noreferrer" className="hover:opacity-80 transition" aria-label="Pinterest">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.18c-.06-.97-.12-2.46.03-3.52.13-.96.86-6.16.86-6.16s-.22-.44-.22-1.09c0-1.02.59-1.78 1.33-1.78.63 0 .93.47.93 1.04 0 .63-.4 1.58-.61 2.46-.17.74.37 1.34 1.1 1.34 1.32 0 2.34-1.39 2.34-3.4 0-1.78-1.28-3.02-3.1-3.02-2.11 0-3.35 1.58-3.35 3.22 0 .64.25 1.32.55 1.69.06.07.07.14.05.21-.06.24-.19.78-.22.89-.04.14-.12.17-.28.1-1.04-.48-1.69-2-1.69-3.22 0-2.62 1.9-5.02 5.49-5.02 2.88 0 5.12 2.05 5.12 4.8 0 2.86-1.8 5.17-4.3 5.17-.84 0-1.63-.44-1.9-.96l-.52 1.98c-.19.72-.7 1.62-1.04 2.18A12.02 12.02 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
