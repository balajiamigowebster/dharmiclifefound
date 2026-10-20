import React from 'react';
import { Heart, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function AboutUs({ onNavigate, onOpenDonation, onOpenVolunteer, content }) {
  const data = content || {};
  const defaultHighlights = [
    'Daily Annadhanam drives nourishing destitute elders and street dwellers',
    'Sacred traditional final cremation ceremonies for unclaimed deceased bodies',
    'Educational sponsorships, student tuition, school uniforms, and books',
    'Women vocational skill development workshops for financial freedom'
  ];

  const highlights = (data.highlights && data.highlights.length > 0)
    ? data.highlights
    : defaultHighlights;

  const badge = data.badge || 'About us';
  const title = data.title || 'Upholding Dharma through Selfless Service';
  const description1 = data.description1 || 'Dharmic Life Foundation is dedicated to restoring dignity to the forgotten and providing a pathway to a better life for the underserved. From ensuring a respectful final farewell to empowering the next generation through education, we believe that righteousness is found in service.';
  const quote = data.quote || '“Humanity is the Mother of Dharma. Grounding all action in righteousness, Karuna (compassion), and duty.”';
  const image = data.image || 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-18-769x1024.jpg';
  const experienceBadgeTitle = data.experienceBadgeTitle || '100% Volunteer Driven';
  const experienceBadgeSub = data.experienceBadgeSub || 'Every rupee contributed directly impacts lives on ground in Pondicherry.';

  return (
    <section id="about" className="py-20 bg-stone-50/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with frame & badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Back decorative border */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#901C25]/20 to-[#E48A2D]/20 transform -rotate-2"></div>
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={image}
                  alt="Dharmic Life Foundation Service"
                  className="w-full h-[480px] sm:h-[540px] object-cover hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = '/images/about.jpg'; }}
                />
                
                {/* Floating Experience Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-amber-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#901C25] text-white flex items-center justify-center font-bold text-xl shrink-0">
                    <Sparkles size={22} className="text-[#E48A2D]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm font-serif">{experienceBadgeTitle}</h5>
                    <p className="text-xs text-gray-600">{experienceBadgeSub}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Subtitle */}
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2.5">
                <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
                <span>{badge}</span>
              </div>
              
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
                {title}
              </h2>
            </div>

            {/* Description Paragraph */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              {description1}
            </p>

            {/* Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote / Highlight Strip */}
            <div className="p-4 rounded-xl bg-amber-50/70 border-l-4 border-[#E48A2D] text-xs sm:text-sm text-gray-800 italic">
              {quote}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/trust"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('trust');
                }}
                className="px-7 py-3.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg transition transform active:scale-95 flex items-center gap-2 group"
              >
                <span>Discover More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/trustees"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('trustees');
                }}
                className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition block"
              >
                Our Trustees
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
