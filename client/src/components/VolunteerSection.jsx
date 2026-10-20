import React from 'react';
import { Users, Droplets, GraduationCap, Coins, ArrowRight, Heart } from 'lucide-react';

export default function VolunteerSection({ onOpenVolunteer, onNavigate }) {
  const metrics = [
    { label: 'Save Water & Health Initiatives', value: 90, icon: Droplets },
    { label: 'Education & Child Support', value: 80, icon: GraduationCap },
    { label: 'Food Relief & Annadhanam Seva', value: 95, icon: Coins },
  ];

  return (
    <section id="volunteer" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
              <img
                src="https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/4-12.jpg"
                alt="Community volunteers serving meals"
                className="w-full h-[440px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.src = '/images/about.jpg'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"></div>
              
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-amber-100 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#E48A2D]/20 text-[#E48A2D] flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 font-serif">120+ Active Volunteers</h4>
                    <p className="text-xs text-gray-500">Uniting across districts with unconditional empathy.</p>
                  </div>
                </div>
                <button
                  onClick={onOpenVolunteer}
                  className="w-full mt-3 py-2.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs sm:text-sm font-bold rounded-lg transition flex items-center justify-center gap-2"
                >
                  <span>Become a Volunteer</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Progress Bars & Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
                <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
                <span>Get involved now</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
                Only Possible because of Friends Like You
              </h2>
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              Dharmic Life Foundation believes that transformative social impact happens when compassionate hearts unite. Every meal served, every destitute soul cremated with Vedic respect, and every student sponsored is powered by dedicated patrons and community volunteers.
            </p>

            {/* Impact Metric Progress Bars */}
            <div className="space-y-4 pt-2">
              {metrics.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-gray-800">
                    <span className="flex items-center gap-2">
                      <item.icon size={15} className="text-[#901C25]" />
                      <span>{item.label}</span>
                    </span>
                    <span className="font-bold text-[#E48A2D]">{item.value}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#901C25] to-[#E48A2D] rounded-full transition-all duration-1000"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenVolunteer}
                className="px-6 py-3 bg-[#901C25] hover:bg-[#73161d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md transition transform active:scale-95"
              >
                Join As Volunteer
              </button>
              <button
                onClick={() => onNavigate ? onNavigate('contact') : null}
                className="px-6 py-3 bg-white border border-gray-300 hover:bg-stone-50 text-gray-800 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition"
              >
                Contact Team
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
