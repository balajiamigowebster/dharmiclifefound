import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play, Film, X } from 'lucide-react';
import { getMediaUrl } from '../config';

/**
 * Universal Activity Media Viewer for all Activity Sub-categories
 * - Implements true Lazy Loading:
 *   - IntersectionObserver delays mounting heavy media until scrolled within 300px
 *   - Interactive Video Thumbnail with Play Button: zero black screen, plays instantly on user click
 *   - Images use loading="lazy" and decoding="async"
 * - 100% HTTPS secure media delivery
 */
export default function ActivityMediaViewer({
  images = [],
  videos = [],
  title = 'Activity Media',
  defaultFallback = '/images/act-other.jpg',
  onOpenLightbox
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Lazy loading observer: Only mount media when user scrolls within 300px
  useEffect(() => {
    if (!containerRef.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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

  // Pre-intersection placeholder: zero layout shift skeleton box
  if (!isVisible) {
    return (
      <div
        ref={containerRef}
        className="w-full h-72 sm:h-80 md:h-96 rounded-xl bg-stone-100 border border-gray-200 animate-pulse flex items-center justify-center text-gray-400 text-xs font-semibold"
      >
        <span className="flex items-center gap-2">
          <ImageIcon size={16} />
          <span>Loading activity media...</span>
        </span>
      </div>
    );
  }

  // Case 1: Video is available (Left = Image Slider with arrows, Right = Video with Thumbnail & On-Click Play)
  if (hasVideo) {
    const currentPhoto = hasImages ? imgList[currentIndex] : defaultFallback;

    return (
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start animate-fadeIn">
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
              decoding="async"
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

        {/* Right: Interactive Video Player with Photo Thumbnail & Click-to-Play */}
        <div className="w-full">
          {!isPlayingVideo ? (
            <div
              onClick={() => setIsPlayingVideo(true)}
              className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-300 bg-black shadow-md cursor-pointer group select-none flex items-center justify-center"
            >
              {/* Photo as video thumbnail */}
              <img
                src={currentPhoto}
                alt={`${title} - Video Thumbnail`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-95"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.src = defaultFallback; }}
              />

              {/* Cinematic dark gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 group-hover:via-black/20 transition-all pointer-events-none" />

              {/* Big stylish play button & label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#901C25] text-white flex items-center justify-center shadow-2xl transition transform group-hover:scale-110 group-hover:bg-[#a8222d] border-2 border-white/80">
                  <Play size={28} className="fill-white translate-x-0.5" />
                </div>
                <span className="px-3.5 py-1 bg-black/75 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow border border-white/20 tracking-wide">
                  Click to Play Video
                </span>
              </div>

              {/* Video badge top-left */}
              <div className="absolute top-3 left-3 bg-[#901C25]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow pointer-events-none">
                <Film size={12} />
                <span>Video Available</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-300 bg-black shadow-inner flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingVideo(false);
                }}
                className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-black/75 hover:bg-black text-white text-[11px] font-semibold rounded-full flex items-center gap-1 shadow-md border border-white/20 transition cursor-pointer"
                title="Switch back to photo thumbnail"
              >
                <X size={12} />
                <span>Close Video</span>
              </button>
              <video
                key={vidList[0]}
                src={vidList[0]}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              >
                <source src={vidList[0]} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Case 2: Only Images (No Video)
  // If only 1 image:
  if (imgList.length <= 1) {
    const singlePhoto = imgList[0] || defaultFallback;
    return (
      <div ref={containerRef} className="max-w-3xl mx-auto animate-fadeIn">
        <div
          onClick={() => onOpenLightbox && onOpenLightbox(imgList, 0)}
          className="relative w-full h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden border border-gray-200 bg-stone-100 shadow-sm cursor-pointer group"
        >
          <img
            src={singlePhoto}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.src = defaultFallback; }}
          />
        </div>
      </div>
    );
  }

  // If 2 or more images: Show 2 images (Left slider + Right slider) with manual arrows
  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start animate-fadeIn">
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
            decoding="async"
            onError={(e) => { e.target.src = defaultFallback; }}
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
              <ImageIcon size={13} />
              <span>View Full Photo</span>
            </span>
          </div>

          {/* Left / Right Navigation Arrows (Show only if more than 2 images exist) */}
          {imgList.length > 2 && (
            <>
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
            </>
          )}
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
            decoding="async"
            onError={(e) => { e.target.src = defaultFallback; }}
          />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="px-3.5 py-1.5 bg-white/95 text-gray-900 text-xs font-bold rounded-full shadow flex items-center gap-1.5">
              <ImageIcon size={13} />
              <span>View Full Photo</span>
            </span>
          </div>

          {/* Left / Right Navigation Arrows (Show only if more than 2 images exist) */}
          {imgList.length > 2 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
