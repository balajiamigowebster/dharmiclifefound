import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function DonateBanner({ onOpenDonation }) {
  return (
    <section className="relative py-16 bg-gradient-to-r from-[#901C25] via-[#73161d] to-[#901C25] text-white overflow-hidden shadow-inner">
      {/* Background patterned overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold uppercase rounded-full tracking-wider mb-3">
              <Sparkles size={13} />
              <span>Donate now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
              Be the Change for One Child Life
            </h2>
            <p className="mt-2 text-white/85 text-sm sm:text-base leading-relaxed">
              Every small offering becomes a beacon of light. Your generous contribution directly funds daily warm meals, tuition fees for government school students, and sacred funeral ceremonies.
            </p>
          </div>

          {/* Right Action */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              {['₹500', '₹1,000', '₹2,500'].map((amt) => (
                <button
                  key={amt}
                  onClick={() => onOpenDonation()}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-sm font-semibold transition"
                >
                  {amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenDonation()}
              className="px-8 py-3.5 bg-[#E48A2D] hover:bg-[#c9751e] text-white font-bold rounded-xl shadow-xl transition transform active:scale-95 flex items-center gap-2.5 group"
            >
              <Heart size={18} className="fill-white group-hover:scale-110 transition" />
              <span>Donate Now</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
