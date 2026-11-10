import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';

export default function EventPage({ onNavigate }) {
  const [lightboxPoster, setLightboxPoster] = useState(null);

  const upcomingPosters = [
    {
      id: 1,
      src: '/images/upcoming-events.jpeg',
      title: '23rd Monthly Satsang (29th November 2026)',
      date: '2026-11-29'
    },
    {
      id: 2,
      src: '/images/upcoming-2nd.webp',
      title: 'November Month Annadhanam Program (17th – 24th November 2026)',
      date: '2026-11-24'
    },
    {
      id: 3,
      src: '/images/upcoming-3.jpeg',
      title: 'Udaliyal Dharmam Online Class (10th – 14th November 2026)',
      date: '2026-11-10'
    }
  ];

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800 pb-20">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-[#1f1e1d] text-white py-12 relative overflow-hidden border-b-4 border-[#901C25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
              Upcoming Events
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Upcoming Events &bull; Dharmic Life Foundation
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium bg-black/40 px-4 py-2 rounded-full border border-white/10">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-[#E48A2D] transition flex items-center gap-1.5 text-white"
            >
              <Home size={14} />
              <span>Home</span>
            </button>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#E48A2D] font-bold">Upcoming Events</span>
          </div>
        </div>
      </div>

      {/* 2. Top "Purpose of Our Programmes" Intro Widget */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="events-intro-widget bg-[#FFFDF9] border border-[#EEDAC5] rounded-2xl shadow-lg overflow-hidden font-serif">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#8B2613] to-[#B84318] text-white p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#FFD700] mb-2 font-serif">
              Upcoming Events &amp; Programmes
            </h2>
            <p className="text-base sm:text-lg italic text-[#F8EBE1] font-sans max-w-2xl mx-auto leading-relaxed">
              Promoting Dharma, preserving ancient traditions, and inspiring future generations.
            </p>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-6 font-sans">
            
            {/* Highlight Box */}
            <div className="bg-[#FFF6ED] border-l-4 border-[#B84318] p-5 rounded-r-lg text-sm sm:text-base text-gray-800 leading-relaxed font-normal">
              <strong className="font-bold text-[#8B2613]">Dharmic Life Foundation</strong> regularly conducts events, monthly Satsangs, and educational awareness programmes designed to bring our community together in service, learning, and celebration of timeless values.
            </div>

            {/* Objectives Card */}
            <div className="bg-[#FDF8F2] border border-dashed border-[#D3A17E] rounded-xl p-6">
              <h3 className="text-[#8B2613] font-serif font-bold text-lg sm:text-xl flex items-center gap-2 mb-4">
                <span>🌟 Purpose of Our Programmes</span>
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🛕</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Promote Dharma:</strong> Spreading awareness about living in harmony with nature and moral duties.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">📜</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Preserve Traditions:</strong> Safeguarding and honoring our rich ancient heritage and practices.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🏆</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Recognize Excellence:</strong> Honoring dedicated individuals who embody selfless service and character.
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FFFDF9] p-3 sm:p-3.5 rounded-lg border border-[#EEDAC5] text-sm">
                  <span className="text-[#B84318] text-lg shrink-0">🌱</span>
                  <span className="text-gray-700">
                    <strong className="text-gray-900 font-semibold">Inspire Youth:</strong> Encouraging the younger generation to embrace a Dharmic way of life.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Values */}
          <div className="bg-[#F4ECE1] py-4 px-6 text-center border-t border-[#EEDAC5]">
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#611A0D]">
              Heritage &bull; Service &bull; Youth Empowerment &bull; Dharmic Living
            </span>
          </div>

        </div>
      </div>

      {/* 3. Upcoming Event Posters Showcase (One by One, Descending Date Order) */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {upcomingPosters.map((poster) => (
          <div
            key={poster.id}
            className="bg-white border-2 border-[#901C25]/20 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div
              onClick={() => setLightboxPoster(poster)}
              className="relative cursor-pointer overflow-hidden bg-stone-100 group flex items-center justify-center p-3 sm:p-5"
            >
              <img
                src={poster.src}
                alt={poster.title}
                className="w-full h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.01]"
              />
              
              {/* Overlay on hover to expand */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-bold rounded-2xl m-3 sm:m-5">
                <Maximize2 size={22} />
                <span>Click to view full poster</span>
              </div>
            </div>

            <div className="p-3.5 bg-[#F8F4EE] border-t border-stone-200 text-center">
              <button
                onClick={() => setLightboxPoster(poster)}
                className="text-xs sm:text-sm text-[#901C25] hover:text-[#74151c] font-bold inline-flex items-center gap-1.5 transition"
              >
                <Maximize2 size={14} />
                <span>Enlarge Poster</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Poster Lightbox Modal */}
      {lightboxPoster && (
        <div
          onClick={() => setLightboxPoster(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl animate-scaleUp"
          >
            <div className="flex items-center justify-between p-4 bg-[#901C25] text-white">
              <span className="font-serif font-bold text-sm sm:text-base">{lightboxPoster.title}</span>
              <button
                onClick={() => setLightboxPoster(null)}
                className="p-1 rounded-full hover:bg-white/20 text-white transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-3 bg-stone-900 flex justify-center">
              <img
                src={lightboxPoster.src}
                alt={lightboxPoster.title}
                className="max-h-[85vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
