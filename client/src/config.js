// Central Configuration for Dharmic Life Foundation
// All uploads and media are served directly from dharmiclife-file/uploads/
export const LIVE_BACKEND_URL = 'http://dharmiclifefoundation.com/api';

// Resolve Backend Base URL: use relative '' on Vercel so /api and /uploads proxy seamlessly through Vercel
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return '';
  }
  return LIVE_BACKEND_URL;
})();

// Full API URL prefix
export const API_BASE_URL = BACKEND_URL ? `${BACKEND_URL}` : '/api';

// Helper to resolve media URLs directly from dharmiclife-file/uploads/
export function getMediaUrl(url) {
  if (!url) return '';

  // Extract relative upload path from any legacy domain string
  // e.g. "https://amigowebster.in/dharmiclife/uploads/images/5.jpg" -> "/uploads/images/5.jpg"
  // e.g. "https://node256.../uploads/videos/V1.mp4" -> "/uploads/videos/V1.mp4"
  if (url.includes('/uploads/')) {
    const uploadPath = url.substring(url.indexOf('/uploads/'));
    return BACKEND_URL ? `${BACKEND_URL}${uploadPath}` : uploadPath;
  }

  if (url.startsWith('uploads/')) {
    const clean = `/${url}`;
    return BACKEND_URL ? `${BACKEND_URL}${clean}` : clean;
  }

  // Preserve local static frontend assets (/images/act-*.jpg)
  if (url.startsWith('/images/') || url.startsWith('images/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }

  // Absolute http / https / data URLs if external
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return cleanPath;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  getMediaUrl
};
