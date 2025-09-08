// Lightweight client-side stubs for CTA and Footer data.
// Replace with real API calls when backend endpoints are ready.

export async function getYoutubeVideoId(_token: string): Promise<{ videoId: string }> {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('videoId');
      if (stored && stored.trim()) return { videoId: stored.trim() };
    }
  } catch {}
  return { videoId: 'dQw4w9WgXcQ' };
}

export async function getContactInfo(_token: string): Promise<{ phone: string; email: string; address?: string }> {
  try {
    if (typeof window !== 'undefined') {
      const phone = localStorage.getItem('contact_phone');
      const email = localStorage.getItem('contact_email');
      const address = localStorage.getItem('contact_address');
      return {
        phone: phone && phone.trim() ? phone.trim() : '+90 242 745 08 09',
        email: email && email.trim() ? email.trim() : 'info@havacilar.com.tr',
        address: address && address.trim() ? address.trim() : 'Antalya, Türkiye',
      };
    }
  } catch {}
  return { phone: '+90 242 745 08 09', email: 'info@havacilar.com.tr', address: 'Antalya, Türkiye' };
}

export type WorkingHours = {
  weekday: { start: string; end: string };
  saturday: { start: string; end: string };
  sunday: { isOpen: boolean; start: string; end: string };
};

export async function getWorkingHours(_token: string): Promise<WorkingHours> {
  const defaults: WorkingHours = {
    weekday: { start: '09:00', end: '18:00' },
    saturday: { start: '10:00', end: '14:00' },
    sunday: { isOpen: false, start: '00:00', end: '00:00' },
  };
  try {
    if (typeof window !== 'undefined') {
      const wdStart = localStorage.getItem('wh_weekday_start') || defaults.weekday.start;
      const wdEnd = localStorage.getItem('wh_weekday_end') || defaults.weekday.end;
      const saStart = localStorage.getItem('wh_sat_start') || defaults.saturday.start;
      const saEnd = localStorage.getItem('wh_sat_end') || defaults.saturday.end;
      const suOpen = localStorage.getItem('wh_sun_open');
      const suStart = localStorage.getItem('wh_sun_start') || defaults.sunday.start;
      const suEnd = localStorage.getItem('wh_sun_end') || defaults.sunday.end;
      return {
        weekday: { start: wdStart, end: wdEnd },
        saturday: { start: saStart, end: saEnd },
        sunday: { isOpen: suOpen ? suOpen === 'true' : defaults.sunday.isOpen, start: suStart, end: suEnd },
      };
    }
  } catch {}
  return defaults;
}

export async function getSocialLinks(_token: string): Promise<{ facebook: string; twitter: string; instagram: string; youtube: string; linkedin: string }> {
  try {
    if (typeof window !== 'undefined') {
      return {
        facebook: localStorage.getItem('social_facebook') || '',
        twitter: localStorage.getItem('social_twitter') || '',
        instagram: localStorage.getItem('social_instagram') || '',
        youtube: localStorage.getItem('social_youtube') || '',
        linkedin: localStorage.getItem('social_linkedin') || '',
      };
    }
  } catch {}
  return { facebook: '', twitter: '', instagram: '', youtube: '', linkedin: '' };
}
