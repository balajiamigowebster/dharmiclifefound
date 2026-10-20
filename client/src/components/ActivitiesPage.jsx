import React from 'react';
import { Home, ChevronRight, ArrowRight, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { activitiesData } from '../data/activitiesData';

export default function ActivitiesPage({ onNavigate, onSelectActivity }) {
  const handleCardClick = (slug) => {
    if (onSelectActivity) {
      onSelectActivity(slug);
    } else if (onNavigate) {
      onNavigate(slug);
    }
  };

  return (
    <div className="bg-white min-h-screen animate-fadeIn font-sans text-gray-800">
      
      {/* 1. Page Title & Breadcrumb Banner */}
      <div className="bg-[#1f1e1d] text-white py-12 relative overflow-hidden border-b-4 border-[#901C25]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-wide">
              Activities
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">
              Serving Humanity &bull; Preserving Dharma &bull; Dharmic Life Foundation
            </p>
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
            <span className="text-[#E48A2D] font-bold">Activities</span>
          </div>
        </div>
      </div>

      {/* 2. Top Intro Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
          <span className="w-8 h-0.5 bg-[#E48A2D]"></span>
          <span>Our Core Activities</span>
          <span className="w-8 h-0.5 bg-[#E48A2D]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
          Serving Humanity, Preserving Dharma
        </h2>
        <div className="w-20 h-1 bg-[#901C25] mx-auto mt-4 rounded-full"></div>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
          Grounding all action in righteousness, Karuna (compassion), and duty. Explore each of our dedicated community initiatives below to see how lives are touched and dignified every day.
        </p>
      </div>

      {/* 3. 7 Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activitiesData.map((act, index) => (
            <div
              key={act.id}
              onClick={() => handleCardClick(act.slug)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1.5"
            >
              {/* Image Container with Badges */}
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                  src={act.heroImage}
                  alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = '/images/about.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Index & Badge */}
                <div className="absolute top-4 left-4 bg-[#901C25] text-white px-3 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E48A2D]"></span>
                  <span>{act.badge}</span>
                </div>

                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold flex items-center justify-center shadow">
                  0{index + 1}
                </div>

                {/* Tagline over image bottom */}
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs italic font-serif line-clamp-1 opacity-90">
                  {act.tagline}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition-colors leading-snug">
                    {act.fullTitle}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {act.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#901C25] group-hover:text-[#E48A2D] flex items-center gap-1.5 transition">
                    <span className="uppercase tracking-wider">Explore Initiative</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                  </span>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                    Dharmic Seva
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
