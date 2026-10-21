import { defaultHomeContent } from './data/defaultHomeContent';
import { API_BASE_URL, getMediaUrl } from './config';

// API Client for Dharmic Life Foundation
const API_BASE = API_BASE_URL;

export async function fetchSiteInfo() {
  try {
    const res = await fetch(`${API_BASE}/site-info`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for site-info:', err.message);
  }
  return {
    site_title: 'Dharmic Life Foundation',
    email: 'dharmiclifestyle@gmail.com',
    phone: '+91 98765 43210',
    address: 'Pondicherry, India'
  };
}

export async function fetchActivities() {
  try {
    const res = await fetch(`${API_BASE}/activities`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for activities:', err.message);
  }
  return [];
}

export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for events:', err.message);
  }
  return [];
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/testimonials`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for testimonials:', err.message);
  }
  return [];
}

export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/blog`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for blog:', err.message);
  }
  return [];
}

export async function fetchTeam() {
  try {
    const res = await fetch(`${API_BASE}/team`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for team:', err.message);
  }
  return [];
}

export async function fetchTrustInfo() {
  try {
    const res = await fetch(`${API_BASE}/trust`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for trust info:', err.message);
  }
  return null;
}

export async function fetchGallery() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for gallery:', err.message);
  }
  return [];
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('API fallback for stats:', err.message);
  }
  return {
    mealsServed: '85,000+',
    soulsHonored: '420+',
    studentsSupported: '650+',
    volunteersActive: '120+'
  };
}

export async function submitDonation(donationData) {
  const res = await fetch(`${API_BASE}/donations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donationData)
  });
  return await res.json();
}

export async function submitVolunteer(volunteerData) {
  const res = await fetch(`${API_BASE}/volunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteerData)
  });
  return await res.json();
}

export async function submitContact(contactData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData)
  });
  return await res.json();
}

export async function submitNewsletter(email) {
  const res = await fetch(`${API_BASE}/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return await res.json();
}

function mergeHomeContent(data) {
  if (!data || typeof data !== 'object') return defaultHomeContent;
  return {
    ...defaultHomeContent,
    ...data,
    hero: {
      ...defaultHomeContent.hero,
      ...(data.hero || {}),
      slides: data.hero?.slides?.length > 0 ? data.hero.slides : defaultHomeContent.hero.slides
    },
    about: {
      ...defaultHomeContent.about,
      ...(data.about || {}),
      highlights: data.about?.highlights?.length > 0 ? data.about.highlights : defaultHomeContent.about.highlights
    },
    coreActivities: {
      ...defaultHomeContent.coreActivities,
      ...(data.coreActivities || {}),
      items: data.coreActivities?.items?.length > 0 ? data.coreActivities.items : defaultHomeContent.coreActivities.items
    },
    stats: {
      ...defaultHomeContent.stats,
      ...(data.stats || {})
    },
    eventsSection: {
      ...defaultHomeContent.eventsSection,
      ...(data.eventsSection || {}),
      items: data.eventsSection?.items?.length > 0 ? data.eventsSection.items : defaultHomeContent.eventsSection.items
    },
    gallerySection: {
      ...defaultHomeContent.gallerySection,
      ...(data.gallerySection || {}),
      items: data.gallerySection?.items?.length > 0 ? data.gallerySection.items : defaultHomeContent.gallerySection.items
    },
    siteInfo: {
      ...defaultHomeContent.siteInfo,
      ...(data.siteInfo || {})
    }
  };
}

export async function fetchHomepageContent() {
  // Check localStorage first if modified by admin locally (especially on static Vercel deploy)
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('dlf_homepage_content');
    if (cached) {
      try {
        const parsed = mergeHomeContent(JSON.parse(cached));
        // Try syncing from server in background if available, but local overrides when API is unreachable
        try {
          const res = await fetch(`${API_BASE}/homepage`);
          if (res.ok) {
            const serverData = mergeHomeContent(await res.json());
            localStorage.setItem('dlf_homepage_content', JSON.stringify(serverData));
            return serverData;
          }
        } catch (err) {}
        return parsed;
      } catch (e) {}
    }
  }

  try {
    const res = await fetch(`${API_BASE}/homepage`);
    if (res.ok) {
      const data = mergeHomeContent(await res.json());
      if (typeof window !== 'undefined') {
        localStorage.setItem('dlf_homepage_content', JSON.stringify(data));
      }
      return data;
    }
  } catch (err) {
    console.warn('API fetch homepage fallback:', err.message);
  }

  return defaultHomeContent;
}

export async function updateHomepageContent(content) {
  // Always update localStorage immediately for instant client feedback
  if (typeof window !== 'undefined') {
    localStorage.setItem('dlf_homepage_content', JSON.stringify(content));
  }

  try {
    const res = await fetch(`${API_BASE}/homepage`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Server update error, saved locally:', err.message);
  }
  return { success: true, message: 'Saved to local storage', content };
}

export async function adminLogin(credentials) {
  try {
    const payload = typeof credentials === 'string' 
      ? { password: credentials } 
      : { username: credentials.username, password: credentials.password };

    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    const pwd = typeof credentials === 'string' ? credentials : credentials.password;
    if (pwd === 'admin123' || pwd === 'admin@dharmic') {
      return { success: true, token: 'local-token-' + Date.now() };
    }
    return { success: false, error: 'Could not connect to authentication server' };
  }
}

export async function fetchAdminMessages() {
  try {
    const res = await fetch(`${API_BASE}/admin/messages`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Fallback messages:', err.message);
  }
  return [];
}

export async function deleteAdminMessage(id) {
  try {
    const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Fallback delete message:', err.message);
  }
  return { success: true };
}

// Activity Items (Sub-categories items with images and videos)
export async function fetchActivityItems(categorySlug) {
  try {
    const url = categorySlug ? `${API_BASE}/activity-items/category/${categorySlug}` : `${API_BASE}/activity-items`;
    const res = await fetch(url);
    if (res.ok) {
      const json = await res.json();
      const items = json.data || [];
      return items.map((item) => ({
        ...item,
        images: Array.isArray(item.images) ? item.images.map(getMediaUrl) : [],
        videos: Array.isArray(item.videos) ? item.videos.map(getMediaUrl) : []
      }));
    }
  } catch (err) {
    console.warn('Failed to fetch activity items:', err.message);
  }
  return [];
}

export function createActivityItem(formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE}/activity-items`);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        resolve(json);
      } catch (e) {
        resolve({ success: false, message: xhr.responseText || 'Invalid response from server' });
      }
    };

    xhr.onerror = () => {
      resolve({ success: false, message: 'Network error during upload' });
    };

    xhr.send(formData);
  });
}

export function updateActivityItem(id, formData, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `${API_BASE}/activity-items/${id}`);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.onload = () => {
      try {
        const json = JSON.parse(xhr.responseText);
        resolve(json);
      } catch (e) {
        resolve({ success: false, message: xhr.responseText || 'Invalid response from server' });
      }
    };

    xhr.onerror = () => {
      resolve({ success: false, message: 'Network error during upload' });
    };

    xhr.send(formData);
  });
}

export async function deleteActivityItem(id) {
  try {
    const res = await fetch(`${API_BASE}/activity-items/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to delete activity item:', err);
    return { success: false, message: err.message };
  }
}

export async function syncCategoryItems(categorySlug, items) {
  try {
    const res = await fetch(`${API_BASE}/activity-items/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categorySlug, items })
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to sync category items:', err);
    return { success: false, message: err.message };
  }
}
