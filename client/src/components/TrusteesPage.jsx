import React from 'react';
import {
  Home,
  ChevronRight,
  ArrowRight,
  Users,
  Compass
} from 'lucide-react';
import { trusteesData } from '../data/trusteesData';

export default function TrusteesPage({ onNavigate }) {
  return (
    <div className="bg-[#FAF8F5] min-h-screen animate-fadeIn font-sans text-gray-800">
      
      {/* 1. Page Title & Breadcrumb Banner (Matching Welowe Theme Post Breadcrumb) */}
      <div
        className="relative bg-cover bg-center py-16 sm:py-24 text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/breadcrumb-01.jpg'), url('https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2023/01/breadcrumb-01.jpg')"
        }}
      >
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-wide drop-shadow-md">
            Trustees
          </h1>

          <div className="mt-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-white/90">
            <button
              onClick={() => onNavigate ? onNavigate('home') : null}
              className="hover:text-[#E48A2D] transition flex items-center gap-1.5 text-white/90 hover:underline"
            >
              <Home size={14} />
              <span>Home</span>
            </button>
            <span className="text-white/60">&gt;</span>
            <span className="text-[#E48A2D] font-semibold">Trustees</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Roles of Trustees" Widget (Matching Exact trustees-widget from Live WordPress) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="trustees-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-md overflow-hidden font-serif">
          
          {/* Hero Quote Banner */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-7 sm:p-10 text-center relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FFD700] tracking-wide mb-2.5 font-serif">
              Trustees &amp; Leadership
            </h2>
            <p className="text-sm sm:text-base md:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              “Trustees are the backbone of Dharmic Life Foundation. Without their dedication, upholding the principles of Dharma would not be possible.”
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base leading-relaxed">
              Being a trustee does not mean that one must contribute to the Trust only through financial support. The <strong>Dharmic Life Foundation</strong> values and recognizes pure-hearted, service-minded individuals committed to the path of Dharma.
            </div>

            {/* Principles of Trusteeship Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🏛️</span>
                <span>Principles of Trusteeship</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                Anyone may become a trustee of the Trust if they truly demonstrate the qualities, commitment, and dedication deserving of such a responsibility. Trusteeship is not based solely on financial contribution, but on <strong>selfless service, character, commitment, and devotion</strong> to the ideals of Dharma.
              </p>
            </div>

            {/* Pathway to Trusteeship Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌱</span>
                <span>The Pathway to Trusteeship</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                Anyone aspiring to become a Trustee of the Dharmic Life Foundation must begin from the foundation and grow through dedicated service:
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start sm:items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-xs sm:text-sm">
                  <span className="bg-[#8B2613] text-white font-bold px-3 py-1 rounded-full text-xs shrink-0 shadow-sm">
                    Step 1
                  </span>
                  <span><strong>Learn:</strong> Become a student of the Trust and understand the core principles of Dharma.</span>
                </div>
                <div className="flex items-start sm:items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-xs sm:text-sm">
                  <span className="bg-[#8B2613] text-white font-bold px-3 py-1 rounded-full text-xs shrink-0 shadow-sm">
                    Step 2
                  </span>
                  <span><strong>Serve:</strong> Actively serve as a dedicated volunteer in foundation activities.</span>
                </div>
                <div className="flex items-start sm:items-center gap-3 bg-[#FFFDF9] p-3.5 rounded-lg border border-[#EEDAC5] text-xs sm:text-sm">
                  <span className="bg-[#8B2613] text-white font-bold px-3 py-1 rounded-full text-xs shrink-0 shadow-sm">
                    Step 3
                  </span>
                  <span><strong>Lead:</strong> Based on dedication, character, and commitment, the Trustee Committee considers candidates for Trusteeship.</span>
                </div>
              </div>
            </div>

            {/* Seniority Note Banner */}
            <div className="text-center font-bold text-[#611A0D] py-3.5 px-4 bg-[#FFF6ED] rounded-lg border border-[#EEDAC5] text-sm sm:text-base">
              📋 Order of Seniority of Trustees (Based on Years of Service to the Trust)
            </div>

          </div>

          {/* Footer Tagline */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Character • Selfless Service • Commitment • Dharma
            </div>
          </div>

        </div>
      </div>

      {/* 3. Trustees Profiles List (5 Authentic Trustees Matching Live Site Verbatim) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {trusteesData.map((trustee) => {
          const splitIndex = trustee.quotePosition || trustee.paragraphs.length;
          const preQuote = trustee.paragraphs.slice(0, splitIndex);
          const postQuote = trustee.paragraphs.slice(splitIndex);

          return (
            <div
              key={trustee.id}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10"
            >
              {/* Left Column: Authentic Portrait Photo */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-lg overflow-hidden border border-[#eedac5] shadow-md bg-stone-100 group relative">
                  <img
                    src={trustee.image}
                    alt={trustee.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      if (trustee.fallbackImage && e.target.src !== trustee.fallbackImage) {
                        e.target.src = trustee.fallbackImage;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Right Column: Exact dlf-executive-card */}
              <div className="flex-1 w-full bg-white rounded-2xl border border-[rgba(139,30,30,0.12)] shadow-xl p-6 sm:p-10 space-y-6">
                
                {/* Header Section */}
                <div className="text-center flex flex-col items-center">
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 border ${
                    trustee.badge.includes('Former')
                      ? 'bg-stone-100 text-stone-700 border-stone-200'
                      : 'bg-[#FCF4E8] text-[#B75E18] border-[rgba(183,94,24,0.2)]'
                  }`}>
                    {trustee.badge}
                  </span>

                  <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold font-serif text-[#8B1E1E] leading-tight">
                    {trustee.name}
                  </h2>

                  <div className="text-xs sm:text-[13px] font-semibold text-[#7C4D12] uppercase tracking-wider flex items-center justify-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-[#D97706] text-[9px]">◆</span>
                    <span>{trustee.designation}</span>
                    <span className="text-[#D97706] text-[9px]">◆</span>
                  </div>

                  {trustee.tenure && (
                    <div className="mt-3 px-4 py-1.5 bg-[#FFF9F5] border border-[#F1E4D5] rounded-full text-xs font-semibold text-[#8B1E1E] tracking-wide">
                      {trustee.tenure}
                    </div>
                  )}
                </div>

                {/* Centered Gradient Divider */}
                <div className="h-[2px] w-[70%] mx-auto bg-gradient-to-r from-transparent via-[#8B1E1E] to-transparent rounded"></div>

                {/* Body Content */}
                <div className="space-y-4 text-[14.5px] leading-relaxed text-[#4A5568] text-justify font-sans">
                  
                  {/* Pre-quote paragraphs */}
                  {preQuote.map((p, idx) => (
                    <p
                      key={idx}
                      className={idx === 0 ? 'text-[15px] font-medium text-[#2D3748]' : ''}
                    >
                      {p}
                    </p>
                  ))}

                  {/* Quote Box (Exact .dlf-quote-box) */}
                  {trustee.quote && (
                    <div className="relative bg-gradient-to-br from-[#FFF9F5] to-[#FFF4ED] border-l-4 border-[#8B1E1E] rounded-r-xl p-5 pl-12 my-6 shadow-sm">
                      <div className="absolute top-2 left-3.5 text-3xl font-serif text-[#8B1E1E]/35 leading-none select-none">
                        “
                      </div>
                      <blockquote className="font-serif text-[15.5px] font-semibold italic text-[#6D1B1B] leading-relaxed m-0 text-left">
                        {trustee.quote}
                      </blockquote>
                    </div>
                  )}

                  {/* Post-quote paragraphs (e.g. for Radha Ramanathan) */}
                  {postQuote.map((p, idx) => (
                    <p key={`post-${idx}`}>
                      {p}
                    </p>
                  ))}

                  {/* Metric Cards Grid (Exact .dlf-metrics-grid) */}
                  {trustee.metrics && trustee.metrics.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6 pt-2">
                      {trustee.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-[#F1E4D5] rounded-xl p-3.5 text-center hover:border-[#D97706] hover:shadow-md transition duration-200"
                        >
                          <span className="block font-serif text-2xl sm:text-[26px] font-extrabold text-[#8B1E1E] leading-tight">
                            {m.value}
                          </span>
                          <span className="block text-[11.5px] font-semibold uppercase text-slate-500 tracking-wide mt-1">
                            {m.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights (Exact .dlf-highlights) */}
                  {trustee.highlights && trustee.highlights.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-dashed border-gray-200 space-y-3">
                      {trustee.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-left">
                          <div className="w-2 h-2 rounded-full bg-[#8B1E1E] mt-2 shrink-0"></div>
                          <p className="text-[13.5px] leading-relaxed text-[#4A5568] m-0">
                            <strong className="text-gray-900">{h.title}:</strong> {h.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Statement & Navigation Bar */}
      <div className="bg-[#7A0A0A] text-white py-10 px-4 text-center border-t-4 border-[#D4A017] mt-12">
        <p className="max-w-4xl mx-auto text-base sm:text-lg font-medium text-[#FEE180] leading-relaxed mb-6">
          Through these efforts, Dharmic Life Foundation strives to promote healthy living, moral values, compassion, and social responsibility for the betterment of society.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate ? onNavigate('activities') : null}
            className="px-6 py-3 bg-[#D4A017] hover:bg-[#b88b14] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Compass size={16} />
            <span>Explore Core Activities</span>
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('trust') : null}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-white/20 transition flex items-center gap-2"
          >
            <Users size={16} />
            <span>About The Trust</span>
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('contact') : null}
            className="px-6 py-3 bg-white text-[#7A0A0A] hover:bg-stone-100 font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>Contact Us</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
