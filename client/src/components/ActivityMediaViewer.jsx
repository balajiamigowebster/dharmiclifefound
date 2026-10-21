import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { getMediaUrl } from '../config';

/**
 * Universal Activity Media Viewer for all Activity Sub-categories
 * - When Video is present:
 *   Left column: Interactive Image slider with Next / Prev arrows (manual click only, no auto-move).
 *   Right column: HTML5 Video Player.
 * - When Only Images are present:
 *   If 1 image: Single centered/full photo card.
 *   If 2+ images: 2-column layout (Left side slider + Right side slider, or split gallery) with Next / Prev arrows.
 * - Clicking the image triggers onOpenLightbox (if provided).
 * - No auto-play/auto-move slider; changes only on user click.
 */
export default function ActivityMediaViewer({
  images = [],
  videos = [],
  title = 'Activity Media',
  defaultFallback = '/images/act-other.jpg',
  onOpenLightbox
}) {
  // Normalize images and videos to guaranteed arrays
  let imgList = [];
  if (Array.isArray(images)) {
    imgList = images;
  } else if (typeof images === 'string') {
    try { imgList = JSON.parse(images); } catch (e) { imgList = [images]; }
  }
  if (!Array.isArray(imgList)) imgList = [];
  imgList = imgList.map(getMediaUrl);

  let vidList = [];
  if (Array.isArray(videos)) {
    vidList = videos;
  } else if (typeof videos === 'string') {
    try { vidList = JSON.parse(videos); } catch (e) { vidList = [videos]; }
  }
  if (!Array.isArray(vidList)) vidList = [];
  vidList = vidList.map(getMediaUrl);

  const hasVideo = vidList.length > 0;
  const hasImages = imgList.length > 0;

  // State for single image slider (used when video is present, or 1 slider mode)
  const [currentIndex, setCurrentIndex] = useState(0);

  // States for 2-column image slider when only images are present
  const [leftIndex, setLeftIndex] = useState(0);
  const [rightIndex, setRightIndex] = useState(imgList.length > 1 ? 1 : 0);

  // Manual handlers for single slider
  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + imgList.length) % imgList.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % imgList.length);
  };

  // Manual handlers for 2-column image sliders
  const handleLeftPrev = (e) => {
    e.stopPropagation();
    setLeftIndex((prev) => (prev - 1 + imgList.length) % imgList.length);
  };
  const handleLeftNext = (e) => {
    e.stopPropagation();
    setLeftIndex((prev) => (prev + 1) % imgList.length);
  };

  const handleRightPrev = (e) => {
    e.stopPropagation();
    setRightIndex((prev) => (prev - 1 + imgList.length) % imgList.length);
  };
  const handleRightNext = (e) => {
    e.stopPropagation();
    setRightIndex((prev) => (prev + 1) % imgList.length);
  };

  // Case 1: Video is available (Left = Image Slider with arrows, Right = Video player)
  if (hasVideo) {
    const currentPhoto = hasImages ? imgList[currentIndex] : defaultFallback;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Photos Slider with manual arrows */}
        <div className="w-full">
          <div
            onClick={() => onOpenLightbox && onOpenLightbox(imgList, currentIndex)}
            className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group select-none"
          >
            <img
              src={currentPhoto}
              alt={`${title} - Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              loading="lazy"
              onError={(e) => { e.target.src = defaultFallback; }}
            />

            {/* Lightbox hint overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
                <ImageIcon size={13} />
                <span>View Full Photo</span>
              </span>
            </div>

            {/* Left / Right Navigation Arrows (Show only if multiple images exist) */}
            {imgList.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
                  title="Previous Photo"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
                  title="Next Photo"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Photo Counter Pill */}
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm z-10">
                  {currentIndex + 1} / {imgList.length}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Authentic HTML5 Video Player */}
        <div className="w-full">
          <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-300 bg-black shadow-inner flex items-center justify-center">
            <video
              src={vidList[0]}
              controls
              preload="metadata"
              controlsList="nodownload"
              className="w-full h-full object-contain"
              poster={hasImages ? imgList[0] : defaultFallback}
            >
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Only Images (No Video)
  // If only 1 image:
  if (imgList.length <= 1) {
    const singlePhoto = imgList[0] || defaultFallback;
    return (
      <div className="max-w-3xl mx-auto">
        <div
          onClick={() => onOpenLightbox && onOpenLightbox(imgList, 0)}
          className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group"
        >
          <img
            src={singlePhoto}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
            onError={(e) => { e.target.src = defaultFallback; }}
          />
        </div>
      </div>
    );
  }

  // If 2 or more images: Show 2 images (Left slider + Right slider) with manual arrows
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left Slider */}
      <div className="w-full">
        <div
          onClick={() => onOpenLightbox && onOpenLightbox(imgList, leftIndex)}
          className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group select-none"
        >
          <img
            src={imgList[leftIndex] || defaultFallback}
            alt={`${title} - Left Photo ${leftIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            loading="lazy"
            onError={(e) => { e.target.src = defaultFallback; }}
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
              <ImageIcon size={13} />
              <span>View Full Photo</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleLeftPrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
            title="Previous Photo"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleLeftNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
            title="Next Photo"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm z-10">
            {leftIndex + 1} / {imgList.length}
          </div>
        </div>
      </div>

      {/* Right Slider */}
      <div className="w-full">
        <div
          onClick={() => onOpenLightbox && onOpenLightbox(imgList, rightIndex)}
          className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group select-none"
        >
          <img
            src={imgList[rightIndex] || defaultFallback}
            alt={`${title} - Right Photo ${rightIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            loading="lazy"
            onError={(e) => { e.target.src = defaultFallback; }}
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
              <ImageIcon size={13} />
              <span>View Full Photo</span>
            </span>
          </div>

          <button
            type="button"
            onClick={handleRightPrev}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
            title="Previous Photo"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleRightNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#901C25] text-white flex items-center justify-center transition shadow-lg z-10"
            title="Next Photo"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[11px] font-bold px-2.5 py-1 rounded-full pointer-events-none backdrop-blur-sm z-10">
            {rightIndex + 1} / {imgList.length}
          </div>
        </div>
      </div>
    </div>
  );
}
