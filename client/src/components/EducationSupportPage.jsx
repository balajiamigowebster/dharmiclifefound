import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Calendar,
  MapPin,
  Film,
  Image as ImageIcon,
  Sparkles,
  BookOpen,
  GraduationCap,
  X,
  ArrowRight
} from 'lucide-react';
import { educationSupportDrives } from '../data/educationSupportDrives';

export default function EducationSupportPage({ onNavigate }) {
  const [lightboxImage, setLightboxImage] = useState(null);

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
              Educational Support
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
            <span className="text-[#E48A2D] font-bold">Education Support</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Educational Support Initiative" Intro Widget (Exact Original HTML & Design) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        
        {/* Sub-Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 leading-tight">
            Education Support (Investing in Education and Transforming Lives)
          </h2>
          <div className="w-16 h-1 bg-[#901C25] mx-auto mt-2.5 rounded-full"></div>
        </div>

        <div className="education-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-xl shadow-lg overflow-hidden font-serif">
          
          {/* Hero Banner / Tamil Poem Section */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <div className="text-base sm:text-lg italic font-serif text-[#FFD700] leading-relaxed whitespace-pre-line mb-3">
              "அன்ன சத்திரம் ஆயிரம் வைத்தல், 
              ஆலயம் பதினாயிரம் நாட்டல்,
              பின்னருள்ள தருமங்கள் யாவும், 
              பெயர் விளங்கி ஒளிர நிறுத்தல், 
              அன்னயாவினும் புண்ணியம் கோடி 
              ஆங்கோர் ஏழைக்கு எழுத்தறிவித்தல்"
            </div>
            <div className="text-sm font-bold text-[#F8EBE1] tracking-wider uppercase">
              - மகாகவி சுப்பிரமணிய பாரதி
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans text-gray-700 leading-relaxed text-base">
            
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg font-medium text-gray-800 text-sm sm:text-base">
              Mahakavi Subramania Bharati taught that helping a poor person get an education is one of the greatest forms of charity—teaching even one poor person to read and write is worth a million blessings.
            </div>

            <p>
              Education is a powerful tool that transforms lives, builds confidence, and creates opportunities for a better future. We believe that no child or student should ever be denied education because of poverty.
            </p>

            {/* Support for Govt Institutions Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-lg p-6 space-y-2">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>📚</span>
                <span>Educational Support in Puducherry</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800">
                <strong>Dharmic Life Foundation</strong> is committed to supporting Government educational institutions in Puducherry, with the support and guidance of the Education Department, Puducherry.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1">
                We aim to stand alongside vulnerable students and government institutions, helping them access better educational resources, modern learning opportunities, and advanced knowledge.
              </p>
            </div>

            {/* Future Growth Card */}
            <div className="bg-[#FAF4EB] border border-[#E5D2C1] rounded-lg p-6 space-y-2 mt-4">
              <h3 className="text-[#5C1D12] font-serif font-bold text-lg sm:text-xl flex items-center gap-2">
                <span>🌟</span>
                <span>Our Growing Vision</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
                As our Foundation is in the early stages of its educational journey, we are currently extending support primarily to educational institutions. However, our vision is much bigger.
              </p>
              <p className="text-sm sm:text-base text-gray-800 pt-1 leading-relaxed">
                In the future, we aspire to directly support deserving individual students facing financial difficulties who may otherwise be unable to continue their studies, contributing toward an educated, empowered, and equitable society.
              </p>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Empowering Minds • Transforming Lives • Education for All
            </div>
          </div>

        </div>
      </div>

      {/* 3. Documented Drives Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="border-b border-gray-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E48A2D]">
            <Sparkles size={15} />
            <span>Documented Institutional Sponsorships</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mt-1">
            Dr. Ambedkar Government Law College Drives ({educationSupportDrives.length} Documented)
          </h3>
        </div>
      </div>

      {/* 4. Documented Drives List - Video & Image Media Containers */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {educationSupportDrives.map((drive) => {
          const hasVideo = drive.videos && drive.videos.length > 0;
          const hasImages = drive.images && drive.images.length > 0;

          return (
            <div
              key={drive.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Drive Header Bar */}
              <div className="bg-[#FAF8F5] border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#901C25] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {drive.id}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-gray-900 leading-snug">
                    {drive.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {hasVideo && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                      <Film size={12} />
                      <span>Video Available</span>
                    </span>
                  )}
                  {hasImages && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      <ImageIcon size={12} />
                      <span>{drive.images.length} Photos</span>
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-stone-100 px-2.5 py-0.5 rounded-full">
                    <GraduationCap size={12} className="text-[#901C25]" />
                    <span>Govt Law College</span>
                  </span>
                </div>
              </div>

              {/* Media Content */}
              <div className="p-6">
                
                {/* When drive has video: 2-column layout - Evenly Aligned */}
                {hasVideo ? (
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                      
                      {/* Left: Photos - Exact matching height */}
                      <div className="w-full">
                        <div
                          onClick={() => setLightboxImage(drive.images[0])}
                          className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group"
                        >
                          <img
                            src={drive.images[0]}
                            alt={drive.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => { e.target.src = '/images/act-education.jpg'; }}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="px-3 py-1 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow">
                              View Photo
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Authentic HTML5 Video Player - Exact matching height */}
                      <div className="w-full">
                        <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-300 bg-black shadow-inner flex items-center justify-center">
                          <video
                            src={drive.videos[0]}
                            controls
                            preload="metadata"
                            controlsList="nodownload"
                            className="w-full h-full object-contain"
                            poster={drive.images[0] || '/images/act-education.jpg'}
                          >
                            Your browser does not support HTML5 video.
                          </video>
                        </div>
                      </div>

                    </div>

                    {/* Additional thumbs below media grid */}
                    {drive.images.length > 1 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                          <ImageIcon size={14} className="text-[#901C25]" />
                          <span>Photos ({drive.images.length}):</span>
                        </span>
                        <div className="flex items-center gap-2 overflow-x-auto py-1">
                          {drive.images.map((thumb, tIdx) => (
                            <div
                              key={tIdx}
                              onClick={() => setLightboxImage(thumb)}
                              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 cursor-pointer hover:border-[#901C25] hover:opacity-100 opacity-80 transition"
                            >
                              <img
                                src={thumb}
                                alt=""
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Standard Image Grid */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {drive.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative h-56 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm cursor-pointer group"
                      >
                        <img
                          src={img}
                          alt={`${drive.title} - ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => { e.target.src = '/images/act-education.jpg'; }}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow">
                            View Full Photo
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* 5. Full-Screen Lightbox Modal */}
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
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
            <img
              src={lightboxImage}
              alt="Education Support Record"
              className="w-full h-full max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* 6. Bottom Call-To-Action Banner */}
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
                Ready to contribute or support educational resources for underprivileged students? Join our compassionate movement.
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
