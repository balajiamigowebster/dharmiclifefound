// API Client for Dharmic Life Foundation
const API_BASE = '/api';

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
