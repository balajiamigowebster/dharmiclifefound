// Central Configuration for Dharmic Life Foundation
export const DIRECT_MEDIA_URL = 'https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry';
export const LIVE_BACKEND_URL = 'http://dharmiclifefoundation.com/api';

// Resolve Backend Base URL: use relative '' on Vercel to proxy via vercel.json rewrites (no Mixed Content / CORS errors)
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

// Helper to resolve media URLs (images and videos in /uploads or uploaded to backend)
export function getMediaUrl(url) {
  if (!url) return '';

  // 1. Normalize node256 cPanel URL (fix renamed folder dharmiclife -> dharmiclifepondicherry)
  if (url.includes('node256.iseencloud.net/~amigoweb/dharmiclife/')) {
    return url
      .replace('https://node256.iseencloud.net/~amigoweb/dharmiclife/', 'https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry/')
      .replace('http://node256.iseencloud.net/~amigoweb/dharmiclife/', 'https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry/');
  }

  // 2. Normalize old WordPress domain amigowebster.in to direct cPanel URL
  if (url.includes('amigowebster.in/dharmiclife/')) {
    return url
      .replace('https://amigowebster.in/dharmiclife/', 'https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry/')
      .replace('http://amigowebster.in/dharmiclife/', 'https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry/');
  }

  // 3. Normalize relative old path /dharmiclife/uploads/
  if (url.startsWith('/dharmiclife/uploads/') || url.startsWith('dharmiclife/uploads/')) {
    const clean = url.startsWith('/') ? url : `/${url}`;
    return `https://node256.iseencloud.net/~amigoweb/dharmiclifepondicherry${clean.replace('/dharmiclife', '')}`;
  }

  // 4. New backend uploads saved in dharmiclife-file/uploads/
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const clean = url.startsWith('/') ? url : `/${url}`;
    return BACKEND_URL ? `${BACKEND_URL}${clean}` : clean;
  }

  // 5. Absolute http / https / data URLs (already clean)
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // 6. Local static images
  if (url.startsWith('/images/') || url.startsWith('images/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }

  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return cleanPath;
}

export default {
  BACKEND_URL,
  API_BASE_URL,
  LIVE_BACKEND_URL,
  DIRECT_MEDIA_URL,
  getMediaUrl
};
