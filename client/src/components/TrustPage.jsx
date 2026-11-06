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

        {/* Core Philosophy */}
        <section className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed font-sans pt-2">
          <p>
            Lifestyle reflects how a person or society thinks, lives, and behaves. In the Indian tradition, the principles of <strong className="text-gray-900 font-semibold">Karma (action)</strong> and <strong className="text-gray-900 font-semibold">Dharma (righteous conduct)</strong> serve as the foundation for modern living. An unhealthy lifestyle directly impacts health and longevity. We conduct regular awareness programs and classes to help individuals harmonize with traditional values and universal laws of nature.
          </p>
        </section>

        {/* 4. Action Row */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
          {/* <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#7A0A0A] text-[#7A0A0A] hover:bg-[#7A0A0A] hover:text-white rounded-xl font-bold text-sm transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button> */}

          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenVolunteer()}
              className="px-6 py-3 bg-[#D4A017] hover:bg-[#b88b14] text-white rounded-xl font-bold text-sm shadow transition flex items-center gap-2"
            >
              <Users size={16} />
              <span>Join As Volunteer</span>
            </button>
          </div> */}
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
