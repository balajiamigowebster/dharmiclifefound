import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trusteesData } from '../data/trusteesData';

export default function TeamSection({ onNavigate }) {
  return (
    <section id="trustees" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            <span>Our Trustees</span>
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
            Trustees &amp; Leadership
          </h2>
          <div className="w-20 h-1 bg-[#901C25] mx-auto mt-4 rounded-full"></div>
          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            Trustees are the backbone of Dharmic Life Foundation. Guiding our mission with integrity, transparency, and relentless dedication to Dharma.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {trusteesData.map((member) => (
            <div
              key={member.id}
              onClick={() => onNavigate ? onNavigate('trustees') : null}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group text-center cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/images/about.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Seniority badge */}
                  <div className="absolute top-3 left-3 w-7 h-7 rounded-lg bg-[#901C25] text-white font-bold text-xs flex items-center justify-center shadow">
                    0{member.id}
                  </div>
                </div>

                {/* Text */}
                <div className="p-5">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[#E48A2D] block">
                    {member.badge}
                  </span>
                  <h3 className="text-base font-bold font-serif text-gray-900 mt-1 group-hover:text-[#901C25] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {member.designation}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <span className="text-xs font-semibold text-[#901C25] group-hover:text-[#E48A2D] flex items-center justify-center gap-1 transition">
                  <span>View Full Profile</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
