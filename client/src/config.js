// Central Configuration for Dharmic Life Foundation
export const DIRECT_MEDIA_URL = 'https://node256.iseencloud.net/~amigoweb/dharmiclife';
const LIVE_BACKEND_URL = 'https://node256.iseencloud.net/~amigoweb/dharmiclife';

// Resolve Backend Base URL
export const BACKEND_URL = (() => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (import.meta.env.PROD || (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app'))) {
    return LIVE_BACKEND_URL;
  }
  return '';
})();

// Full API URL prefix
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Helper to resolve media URLs (images and videos in /uploads or uploaded to backend)
export function getMediaUrl(url) {
  if (!url) return '';
  // Normalize amigowebster.in to direct server hostname to prevent Vercel 308 redirect loops
  if (url.includes('amigowebster.in/dharmiclife/uploads/')) {
    return url.replace('https://amigowebster.in/dharmiclife', DIRECT_MEDIA_URL).replace('http://amigowebster.in/dharmiclife', DIRECT_MEDIA_URL);
  }
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const clean = url.startsWith('/') ? url : `/${url}`;
    return `${DIRECT_MEDIA_URL}${clean}`;
  }
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/images/') || url.startsWith('images/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${DIRECT_MEDIA_URL}${cleanPath}`;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  DIRECT_MEDIA_URL,
  getMediaUrl
};
