import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function ActivityModal({ activity, onClose }) {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 bg-[#E48A2D] text-white text-xs font-bold rounded-full uppercase tracking-wider mb-2">
              Dharmic Initiative
            </span>
            <h3 className="text-2xl font-bold font-serif leading-tight drop-shadow">{activity.title}</h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-base font-bold text-[#901C25] mb-1">Our Core Objective</h4>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {activity.description}
            </p>
          </div>

          <div className="bg-amber-50/60 border-l-4 border-[#E48A2D] p-4 rounded-r-xl">
            <h5 className="text-sm font-bold text-gray-900 mb-1">Impact & Implementation</h5>
            <p className="text-gray-600 text-sm leading-relaxed">
              {activity.full_content || activity.description}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider">How You Can Support This Cause</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                <span>Sponsor daily materials & provisions</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                <span>Participate on-ground as a volunteer</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                <span>Spread awareness across social channels</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                <span>Dedicate a seva on special family days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
