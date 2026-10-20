import React from 'react';
import {
  ArrowRight,
  Utensils,
  Flame,
  BookOpen,
  GraduationCap,
  Heart,
  Users,
  Sparkles,
  HeartHandshake,
  ShieldAlert
} from 'lucide-react';

export const coreActivitiesHomeList = [
  {
    id: 1,
    slug: 'annadhanam',
    title: 'Annadhanam (When Hunger ends, Dharma begins)',
    description: 'Distributing nutritious meals to the homeless and underprivileged families to ensure that no one in our community goes hungry.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/12-5.jpg',
    icon: Utensils,
    badge: 'Annam Parabrahma'
  },
  {
    id: 2,
    slug: 'unclaimed-souls',
    title: 'Honoring the Unclaimed Souls with Dignified Cremation',
    description: 'We provide honorable final ceremonies for unclaimed bodies, ensuring every individual is treated with dignity, regardless of their circumstances.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/Body-4.jpg',
    icon: Flame,
    badge: 'Vedic Last Rites'
  },
  {
    id: 3,
    slug: 'spreading-the-dharmic-way-of-life',
    title: 'Spreading the Dharmic Way of Life (Traditional life Education for the Public)',
    description: 'Inspiring lives rooted in Dharma by preserving sacred traditions and nurturing compassion, righteousness, and unity.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/18-2.jpg',
    icon: BookOpen,
    badge: 'Life Transformation'
  },
  {
    id: 4,
    slug: 'education-support',
    title: 'Educational Support (Investing in Education and Transforming lives)',
    description: 'Empowering students in government schools and colleges by providing tuition fees, uniforms, and study materials to ensure a bright future.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/4-14.jpg',
    icon: GraduationCap,
    badge: 'Vidya Dhanam'
  },
  {
    id: 5,
    slug: 'women-empowerment',
    title: 'Women Empowerment (Every Women Deserves Opportunity, Respect and Dignity)',
    description: 'Supporting women through vocational training and skill-building workshops to help them achieve financial independence and lead confident lives.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-13.jpg',
    icon: Heart,
    badge: 'Stree Shakti'
  },
  {
    id: 6,
    slug: 'caring-for-homeless-people',
    title: 'Compassion Begins with Caring for Homeless People',
    description: 'Reaching out to homeless individuals with seasonal clothing, warm blankets, hygiene kits, and nourishing food across streets.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/3.jpg',
    icon: HeartHandshake,
    badge: 'Karuna Seva'
  },
  {
    id: 7,
    slug: 'other-additional-activities',
    title: 'Other Additional Activities',
    description: 'Extending emergency disaster relief, victim family support, and humanitarian seva across boundaries wherever need arises.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/08/other-1-768x524.png',
    icon: Sparkles,
    badge: 'Humanitarian Seva'
  }
];

export default function CoreActivities({ onSelectActivity, onNavigate }) {
  const handleClick = (slug) => {
    if (onSelectActivity) {
      onSelectActivity(slug);
    } else if (onNavigate) {
      onNavigate(slug);
    }
  };

  return (
    <section id="activities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            <span>Our Core Activities</span>
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
            Serving Humanity, Preserving Dharma
          </h2>
          <div className="w-20 h-1 bg-[#901C25] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            Every initiative of Dharmic Life Foundation is centered on empathy, direct grassroots impact, and timeless righteous duty.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreActivitiesHomeList.map((act) => {
            const IconComponent = act.icon;
            return (
              <div
                key={act.id}
                onClick={() => handleClick(act.slug)}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1.5"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/images/about.jpg'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-[#901C25] text-white px-3 py-1 rounded-lg text-xs font-bold shadow flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E48A2D]"></span>
                    <span>{act.badge}</span>
                  </div>

                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-[#901C25] text-white flex items-center justify-center shadow-lg group-hover:bg-[#E48A2D] group-hover:scale-110 transition-all duration-300">
                    <IconComponent size={22} className="stroke-[2.2]" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition-colors leading-snug">
                      {act.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#901C25] group-hover:text-[#E48A2D] flex items-center gap-1.5 transition uppercase tracking-wider">
                      <span>Explore Initiative</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </span>
                    <span className="text-[11px] font-medium text-gray-400">
                      0{act.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
