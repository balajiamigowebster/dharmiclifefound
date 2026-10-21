import React from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const fallbackEvents = [
  {
    id: 1,
    title: 'Honoring the Unclaimed Souls',
    event_date: '08 Sep, 2023',
    location: 'Pondicherry Crematorium',
    summary: 'Solemn traditional cremation rites performed for unclaimed departed individuals with prayers for eternal peace.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/3-5.jpg',
    category: 'Moksha Seva',
    route: 'unclaimed-souls'
  },
  {
    id: 2,
    title: 'Annadhanam',
    event_date: '11 Sep, 2023',
    location: 'Pondicherry Community Center',
    summary: 'Nutritious meal distribution and prasadam served to over 1,200 homeless and underprivileged individuals.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/photo-2.jpg',
    category: 'Annadhanam',
    route: 'annadhanam'
  },
  {
    id: 3,
    title: 'Bridging the Digital Divide: Empowering Students Through Technology',
    event_date: '11 Aug, 2023',
    location: 'Government High School, Pondicherry',
    summary: 'Distribution of digital learning kits, tablets, and educational software to underprivileged students.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2023/01/7.jpg',
    category: 'Education',
    route: 'education-support'
  },
  {
    id: 4,
    title: 'Empowering Motherhood and Honoring Womanhood',
    event_date: '11 Sep, 2023',
    location: 'Women Welfare Center',
    summary: 'Maternal nutrition drive, prenatal wellness kits distribution, and vocational training workshop for mothers.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/9-2.jpg',
    category: 'Women Empowerment',
    route: 'women-empowerment'
  },
  {
    id: 5,
    title: 'Dressing with Dignity: Providing Warmth to the Homeless',
    event_date: '09 May, 2023',
    location: 'Beach Road & Bus Terminal Area',
    summary: 'Distribution of new clothing, warm blankets, and hygiene kits to street dwellers and destitute families.',
    image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2023/01/22.jpg',
    category: 'Relief',
    route: 'caring-for-homeless-people'
  }
];

export default function EventsSection({ content, events = [], onNavigate }) {
  const sectionBadge = content?.badge || 'Our events';
  const sectionTitle = content?.title || 'Dharmic Impact Across the Map';
  const sectionSubtitle =
    content?.subtitle ||
    'Glimpses of our regular community seva drives, cremation rites, educational camps, and public gatherings.';
  const ctaText = content?.ctaText || 'View All Programmes & Awards';

  const displayEvents =
    content?.items && content.items.length > 0
      ? content.items
      : events && events.length > 0
      ? events
      : fallbackEvents;

  const handleEventClick = (ev) => {
    if (ev.route && onNavigate) {
      onNavigate(ev.route);
    } else if (onNavigate) {
      onNavigate('events');
    }
  };

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            <span>{sectionBadge}</span>
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
            {sectionTitle}
          </h2>
          <div className="w-20 h-1 bg-[#901C25] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-600 text-base sm:text-lg">
            {sectionSubtitle}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayEvents.map((ev, idx) => (
            <div
              key={ev.id || idx}
              onClick={() => handleEventClick(ev)}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer transform hover:-translate-y-1.5"
            >
              {/* Event Image */}
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/images/about.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-[#901C25] text-white px-3 py-1.5 rounded-lg shadow text-xs font-bold flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#E48A2D]" />
                  <span>{ev.event_date}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-0.5 rounded-full text-[11px] font-semibold">
                  {ev.category}
                </div>
              </div>

              {/* Event Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                    <MapPin size={13} className="text-[#901C25]" />
                    <span>{ev.location}</span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-gray-900 group-hover:text-[#901C25] transition-colors leading-snug line-clamp-2">
                    {ev.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {ev.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#901C25] group-hover:text-[#E48A2D] flex items-center gap-1 transition">
                    <span>Explore Seva</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs font-medium text-gray-400">Completed Seva</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Events Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate ? onNavigate('events') : null}
            className="px-8 py-3.5 bg-[#901C25] hover:bg-[#73161d] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md transition transform active:scale-95 inline-flex items-center gap-2 group"
          >
            <span>{ctaText}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
