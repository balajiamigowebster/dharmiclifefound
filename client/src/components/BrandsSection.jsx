import React from 'react';

export default function BrandsSection() {
  const brands = [1, 2, 3, 4, 5, 6];

  return (
    <div className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-gray-400 font-bold mb-8">
          Trusted by Community Partners & Patrons
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
          {brands.map((num) => (
            <div key={num} className="h-10 sm:h-12 flex items-center justify-center p-2 hover:scale-110 transition-transform">
              <img
                src={`/images/brand-${num}.png`}
                alt={`Partner Brand ${num}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
