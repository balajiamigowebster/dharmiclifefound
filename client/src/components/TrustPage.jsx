import React from 'react';
import { ChevronRight, Heart, Users, Home, ArrowLeft } from 'lucide-react';

export default function TrustPage({ onNavigate, onOpenDonation, onOpenVolunteer }) {
  return (
    <div className="bg-white min-h-screen animate-fadeIn">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-stone-900 text-white py-12 border-b-4 border-[#901C25] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E48A2D_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
                Trust
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 font-sans">
                About Us &bull; Dharmic Life Foundation Charitable Trust
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
              <span className="text-gray-300">About Us</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span className="text-[#E48A2D] font-bold">Trust</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Full Width Hero Banner (Matching exact dlf-hero) */}
      <div className="bg-gradient-to-br from-[#7A0A0A] to-[#580303] text-white py-14 px-4 text-center border-b-4 border-[#D4A017] shadow-inner">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-block bg-[#D4A017]/20 border border-[#D4A017] text-[#FFDF00] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">
            Est. October 2021
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight drop-shadow-md">
            Dharmic Life Foundation
          </h2>
          <p className="text-[#FEE180] text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
            Transforming Lives Through Righteous Conduct &amp; Universal Harmony
          </p>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Origin & Journey */}
        <section className="space-y-5">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Origin &amp; Journey
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            <strong className="text-gray-900 font-semibold">Dharmic Life Foundation</strong> was established by transforming the institution known as the <em className="text-[#7A0A0A] font-medium not-italic font-semibold">Academy of Dharmic Life</em>. The Academy was started in <strong className="text-gray-900">October 2020</strong> with the vision of educating people from all sections of society on overcoming the challenges of the COVID-19 pandemic through a Dharmic way of living—completely free of cost.
          </p>

          <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
            The organization was formally registered as a trust in Puducherry on <strong className="text-gray-900">15 October 2021</strong>, on the auspicious occasion of <em className="text-[#7A0A0A] font-serif font-bold">Vijayadashami</em>. It was founded by <strong className="text-gray-900 font-semibold">Mr. Balaji</strong> (Founder &amp; Managing Trustee) alongside his parents, <strong className="text-gray-900 font-semibold">Mr. V. Anbalagan @ Rajagopal</strong> and <strong className="text-gray-900 font-semibold">Mrs. N. Gomathi</strong>, as founding trustees.
          </p>

          {/* Founding Trustees Highlight Box */}
          <div className="mt-6 p-6 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D8] border-l-4 border-l-[#7A0A0A] shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4A017] mb-2">
              Founding Trustees &bull; Puducherry
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founder &amp; Managing Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mr. Balaji</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founding Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mr. V. Anbalagan @ Rajagopal</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 font-medium">Founding Trustee</p>
                <p className="text-base font-bold text-gray-900 font-serif">Mrs. N. Gomathi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Philosophy (2-Column Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* The Essence of Dharma */}
          <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] border-t-4 border-t-[#7A0A0A] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-white border border-[#EAE2D8] rounded-xl flex items-center justify-center mb-5 shadow-sm text-[#7A0A0A]">
              <svg className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M10 9H8"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#7A0A0A] mb-3">
              The Essence of Dharma
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Lifestyle reflects how a person or society thinks, lives, and behaves. In the Indian tradition, the principles of <strong className="text-gray-900">Karma (action)</strong> and <strong className="text-gray-900">Dharma (righteous conduct)</strong> serve as the foundation for modern living.
            </p>
          </div>

          {/* Promoting Healthy Living */}
          <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] border-t-4 border-t-[#7A0A0A] rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-14 h-14 bg-white border border-[#EAE2D8] rounded-xl flex items-center justify-center mb-5 shadow-sm text-[#7A0A0A]">
              <svg className="w-7 h-7 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold font-serif text-[#7A0A0A] mb-3">
              Promoting Healthy Living
            </h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              An unhealthy lifestyle directly impacts health and longevity. We conduct regular awareness programs and classes to help individuals harmonize with traditional values and universal laws of nature.
            </p>
          </div>

        </section>

        {/* Social Service Initiatives */}
        <section className="space-y-6 pt-4">
          <div className="relative pb-3 border-b-2 border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#7A0A0A]">
              Our Social Service Initiatives
            </h2>
            <div className="absolute -bottom-0.5 left-0 w-16 h-1 bg-[#D4A017] rounded-full"></div>
          </div>

          <p className="text-gray-600 text-base">
            Beyond lifestyle guidance, the trust actively engages in compassionate community welfare across multiple pillars:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            
            {/* 1. Food Provision */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M8 3v3M16 3v3"/>
                  <path d="M3 11a9 9 0 0 0 18 0H3z"/>
                  <path d="M6 18h12"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Food Provision</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Nourishing needy and underprivileged communities.</p>
              </div>
            </div>

            {/* 2. Dignified Cremation */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Dignified Cremation</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Performing final rites for unclaimed bodies with honor.</p>
              </div>
            </div>

            {/* 3. Educational Support */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Educational Support</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Empowering students and institutions with key learning resources.</p>
              </div>
            </div>

            {/* 4. Women's Empowerment */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Women's Empowerment</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Skill development and welfare programs for self-reliance.</p>
              </div>
            </div>

            {/* 5. Homeless Care */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Homeless Care</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Providing essential care, shelter, and basic human dignity.</p>
              </div>
            </div>

            {/* 6. Humanitarian Aid */}
            <div className="bg-[#FAF8F5] hover:bg-[#F5F0E8] border border-[#EAE2D8] hover:border-[#D4A017] rounded-xl p-5 flex items-start gap-4 transition-all duration-200">
              <div className="w-11 h-11 rounded-full bg-white border border-[#EAE2D8] flex items-center justify-center shrink-0 shadow-sm text-[#E05275]">
                <svg className="w-5 h-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </div>
              <div>
                <h4 className="text-base font-bold font-serif text-[#7A0A0A] mb-1">Humanitarian Aid</h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-snug">Ongoing social welfare activities for societal enhancement.</p>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Action Row */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#7A0A0A] text-[#7A0A0A] hover:bg-[#7A0A0A] hover:text-white rounded-xl font-bold text-sm transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenVolunteer()}
              className="px-6 py-3 bg-[#D4A017] hover:bg-[#b88b14] text-white rounded-xl font-bold text-sm shadow transition flex items-center gap-2"
            >
              <Users size={16} />
              <span>Join As Volunteer</span>
            </button>
          </div>
        </div>

      </div>

      {/* 5. Statement Banner (Matching exact dlf-footer-banner) */}
      <div className="bg-[#7A0A0A] text-white py-8 px-4 text-center border-t-4 border-[#D4A017]">
        <p className="max-w-4xl mx-auto text-base sm:text-lg font-medium text-[#FEE180] leading-relaxed">
          Through these efforts, Dharmic Life Foundation strives to promote healthy living, moral values, compassion, and social responsibility for the betterment of society.
        </p>
      </div>

    </div>
  );
}
