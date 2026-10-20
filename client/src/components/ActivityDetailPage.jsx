import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Check,
  ArrowRight,
  Phone,
  Mail,
  Heart,
  Sparkles,
  Share2,
  X,
  Clock
} from 'lucide-react';
import { activitiesData } from '../data/activitiesData';

export default function ActivityDetailPage({ activitySlug, onNavigate }) {
  // Find current activity or default to first
  const currentActivity = activitiesData.find(a => a.slug === activitySlug) || activitiesData[0];

  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState(null);

  // Find previous and next activities
  const currentIndex = activitiesData.findIndex(a => a.slug === currentActivity.slug);
  const prevActivity = currentIndex > 0 ? activitiesData[currentIndex - 1] : activitiesData[activitiesData.length - 1];
  const nextActivity = currentIndex < activitiesData.length - 1 ? activitiesData[currentIndex + 1] : activitiesData[0];

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-[#1f1e1d] text-white py-12 relative overflow-hidden border-b-4 border-[#901C25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-1 block">
              Our Core Activities
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white tracking-wide">
              {currentActivity.name}
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#E48A2D] transition flex items-center gap-1.5 text-white"
            >
              <Home size={14} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <button
              onClick={() => onNavigate('activities')}
              className="hover:text-[#E48A2D] transition text-gray-300"
            >
              Activities
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#E48A2D] font-bold truncate max-w-[150px] sm:max-w-none">
              {currentActivity.breadcrumbTitle}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid (8 cols main + 4 cols sidebar) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Full Title & Tagline */}
            <div>
              <div className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-[#901C25] text-xs font-bold uppercase rounded-full mb-3">
                {currentActivity.badge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-gray-900 leading-tight">
                {currentActivity.fullTitle}
              </h2>
            </div>

            {/* Sacred Quote Card */}
            <div className="bg-gradient-to-r from-[#FFFDF9] to-[#FFF6ED] border-l-4 border-[#901C25] p-6 sm:p-8 rounded-r-2xl shadow-sm border border-gray-100">
              <div className="text-2xl sm:text-3xl font-serif italic font-bold text-[#8B2613] leading-relaxed whitespace-pre-line">
                {currentActivity.quote}
              </div>
              {currentActivity.quoteAuthor && (
                <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mt-2">
                  — {currentActivity.quoteAuthor}
                </div>
              )}
              {currentActivity.quoteMeaning && (
                <p className="mt-3 text-sm sm:text-base text-gray-700 font-sans leading-relaxed border-t border-amber-100 pt-3">
                  {currentActivity.quoteMeaning}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-gray-50 max-h-[460px]">
              <img
                src={currentActivity.heroImage}
                alt={currentActivity.name}
                className="w-full h-full object-cover max-h-[460px]"
                onError={(e) => { e.target.src = '/images/about.jpg'; }}
              />
            </div>

            {/* Body Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-sans">
              {currentActivity.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Key Highlight Banner */}
            {currentActivity.keyHighlight && (
              <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-6 rounded-r-xl shadow-sm space-y-2">
                <h4 className="text-lg font-bold font-serif text-[#8B2613]">
                  {currentActivity.keyHighlight.title}
                </h4>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                  {currentActivity.keyHighlight.text}
                </p>
              </div>
            )}

            {/* Custom Sections (e.g. Udaliyal / Manoviyal or Education Pillars) */}
            {currentActivity.customSections && (
              <div className="space-y-6 pt-2">
                {currentActivity.customSections.map((sec, idx) => (
                  <div key={idx} className="bg-stone-50 border border-stone-200 rounded-xl p-6 sm:p-7 space-y-4">
                    <h4 className="text-xl font-bold font-serif text-gray-900">
                      {sec.title}
                    </h4>
                    {sec.description && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {sec.description}
                      </p>
                    )}
                    {sec.points && (
                      <ul className="space-y-2.5 pt-1">
                        {sec.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                            <span className="w-5 h-5 rounded-full bg-[#901C25] text-white flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={12} className="stroke-[3]" />
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Photo Gallery Grid */}
            {currentActivity.galleryImages && currentActivity.galleryImages.length > 0 && (
              <div className="space-y-4 pt-4">
                <h4 className="text-xl font-bold font-serif text-gray-900 flex items-center gap-2">
                  <Sparkles size={20} className="text-[#E48A2D]" />
                  <span>Field Seva &amp; Drive Photos</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {currentActivity.galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className="relative h-44 rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md cursor-pointer group"
                    >
                      <img
                        src={img}
                        alt={`${currentActivity.name} Seva ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/images/about.jpg'; }}
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1 bg-white/90 text-gray-900 text-xs font-bold rounded-full shadow">
                          View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline / History of Seva */}
            {currentActivity.timeline && currentActivity.timeline.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h4 className="text-xl font-bold font-serif text-gray-900 flex items-center gap-2">
                  <Calendar size={20} className="text-[#901C25]" />
                  <span>Documented Service Drives</span>
                </h4>
                <div className="space-y-3">
                  {currentActivity.timeline.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:bg-amber-50/40 transition"
                    >
                      <div className="px-3 py-1 bg-[#901C25] text-white text-xs font-bold rounded-md shrink-0 whitespace-nowrap mt-0.5">
                        {item.date}
                      </div>
                      <div className="text-sm font-medium text-gray-800 leading-relaxed flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#901C25] shrink-0" />
                        <span>{item.venue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Tagline Banner */}
            {currentActivity.footerTagline && (
              <div className="bg-[#F4ECE1] py-4 px-6 rounded-xl text-center border border-[#EEDAC5]">
                <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#611A0D]">
                  {currentActivity.footerTagline}
                </span>
              </div>
            )}

            {/* Prev / Next Activity Pagination Nav */}
            <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onNavigate(prevActivity.slug)}
                className="w-full sm:w-auto flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#901C25] bg-white hover:bg-stone-50 transition group text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-[#901C25] group-hover:text-white flex items-center justify-center transition shrink-0">
                  <ChevronLeft size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Previous</span>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-[#901C25] transition line-clamp-1">
                    {prevActivity.name}
                  </span>
                </div>
              </button>

              <button
                onClick={() => onNavigate(nextActivity.slug)}
                className="w-full sm:w-auto flex items-center justify-end gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#901C25] bg-white hover:bg-stone-50 transition group text-right"
              >
                <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Next</span>
                  <span className="text-sm font-bold text-gray-800 group-hover:text-[#901C25] transition line-clamp-1">
                    {nextActivity.name}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-[#901C25] group-hover:text-white flex items-center justify-center transition shrink-0">
                  <ChevronRight size={20} />
                </div>
              </button>
            </div>

          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Widget 1: All Core Activities List */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-gray-900 pb-3 border-b border-gray-200">
                Core Activities
              </h3>
              <ul className="mt-4 space-y-2">
                {activitiesData.map((act) => {
                  const isActive = act.slug === currentActivity.slug;
                  return (
                    <li key={act.id}>
                      <button
                        onClick={() => onNavigate(act.slug)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center justify-between ${
                          isActive
                            ? 'bg-[#901C25] text-white shadow-sm'
                            : 'text-gray-700 hover:bg-white hover:text-[#901C25]'
                        }`}
                      >
                        <span className="truncate pr-2">{act.name}</span>
                        <ChevronRight size={15} className={isActive ? 'text-white' : 'text-gray-400'} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Widget 2: Direct Contact / Support Card */}
            <div className="bg-gradient-to-br from-[#901C25] to-[#73161d] rounded-2xl p-6 text-white shadow-lg space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E48A2D]">
                Get Involved
              </span>
              <h4 className="text-xl font-bold font-serif leading-snug">
                Join Us in Upholding Dharma
              </h4>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                Connect with our team to volunteer, sponsor meals, support education, or participate in upcoming community programmes.
              </p>

              <div className="pt-2 space-y-2.5 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin size={15} className="text-[#E48A2D]" />
                  <span>Pondicherry, India</span>
                </div>
                <div className="flex items-center gap-2 truncate">
                  <Mail size={15} className="text-[#E48A2D]" />
                  <a href="mailto:dharmiclifestyle@gmail.com" className="hover:underline">
                    dharmiclifestyle@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-3 bg-white hover:bg-stone-100 text-[#901C25] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow flex items-center justify-center gap-2 group"
                >
                  <span>Contact Us</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Widget 3: Trust Motto */}
            <div className="p-6 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 text-center space-y-2">
              <div className="text-2xl">🕉️</div>
              <h5 className="font-bold text-sm text-[#901C25] font-serif">
                Humanity is the Mother of Dharma
              </h5>
              <p className="text-xs text-gray-600 leading-relaxed">
                Dharmic Life Foundation &bull; Registered Public Charitable Trust (Reg: 15 Oct 2021)
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 3. Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
            <img
              src={lightboxImage}
              alt="Enlarged view"
              className="w-full h-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* 4. Bottom Call-To-Action Banner */}
      <section className="bg-gradient-to-r from-[#901C25] via-[#7d1820] to-[#901C25] text-white py-14 border-t-4 border-[#E48A2D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider mb-1">
                Results in few seconds
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Your story starts from here
              </h3>
              <p className="text-white/80 text-sm">
                Ready to contribute or participate in our initiatives? Join our compassionate movement.
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-3.5 bg-white text-[#901C25] hover:bg-stone-100 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg transition transform active:scale-95 flex items-center gap-2 group"
              >
                <span>Make it Happen</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
