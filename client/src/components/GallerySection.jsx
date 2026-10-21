import React, { useState } from 'react';
import { Eye, X, ZoomIn } from 'lucide-react';
import { getMediaUrl } from '../config';

export default function GallerySection({ content, gallery = [] }) {
  const [activePhoto, setActivePhoto] = useState(null);

  const fallbackPhotos = [
    { id: 1, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/21-3-580x580.jpg', title: 'Community Outreach & Food Distribution' },
    { id: 2, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/07/98-580x580.jpg', title: 'Daily Annadhanam Camp in Pondicherry' },
    { id: 3, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/1-20-580x580.jpg', title: 'Student Educational Kit Distribution' },
    { id: 4, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/police-2-580x580.jpg', title: 'Police & Civic Coordination for Rites' },
    { id: 5, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/18-4-580x580.jpg', title: 'Women Empowerment Tailoring Workshop' },
    { id: 6, image: 'https://amigowebster.in/dharmiclifefoundation/wp-content/uploads/2026/04/5-9-580x580.jpg', title: 'Dedicated Volunteer Relief Team' }
  ];

  const sectionBadge = content?.badge || 'Moments of Grace';
  const sectionTitle = content?.title || 'Our Seva in Pictures';
  const sectionSubtitle =
    content?.subtitle ||
    'Witness our on-ground compassion across streets, government schools, communities, and crematoriums.';

  const rawPhotos =
    content?.items && content.items.length > 0
      ? content.items
      : gallery.length > 0
      ? gallery
      : fallbackPhotos;

  const photos = rawPhotos.map((item) => ({
    ...item,
    image: getMediaUrl(item.image)
  }));

  return (
    <section id="gallery" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E48A2D] mb-2">
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
            <span>{sectionBadge}</span>
            <span className="w-6 h-0.5 bg-[#E48A2D]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-gray-900 leading-tight">
            {sectionTitle}
          </h2>
          <p className="mt-3 text-gray-600 text-base">
            {sectionSubtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => setActivePhoto(item)}
              className="relative group rounded-2xl overflow-hidden aspect-square bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title || 'Dharmic Life Gallery'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[#901C25]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 transform scale-75 group-hover:scale-100 transition-transform">
                  <ZoomIn size={22} className="text-white" />
                </div>
                <h4 className="font-serif font-bold text-sm sm:text-base leading-snug drop-shadow">
                  {item.title}
                </h4>
                <span className="text-xs text-amber-200 mt-1 uppercase tracking-wider font-semibold">View Full</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#E48A2D] transition p-2"
              aria-label="Close modal"
            >
              <X size={30} />
            </button>
            <img
              src={activePhoto.image}
              alt={activePhoto.title}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-white text-base font-serif font-medium text-center">
              {activePhoto.title}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
