/**
 * Livestock of America — Phase 1 public site visibility.
 * Guests may only browse paths listed here; logged-in users keep full app access.
 * Set VITE_PHASE1_PUBLIC=false to restore the full public OFN site.
 */
export const PHASE1_PUBLIC_ENABLED = import.meta.env.VITE_PHASE1_PUBLIC !== 'false';

export function isPhase1PublicMode() {
  return PHASE1_PUBLIC_ENABLED;
}

export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('access_token') || localStorage.getItem('AccessToken'));
}

/** Guest header / mobile menu links (Phase 1 only). */
export const PHASE1_GUEST_NAV = [
  { to: '/', labelKey: 'phase1.nav.home', fallback: 'Home' },
  { to: '/directory', labelKey: 'phase1.nav.directory', fallback: 'Directory' },
  { to: '/knowledgebase', labelKey: 'phase1.nav.knowledgebase', fallback: 'Livestock Knowledgebase' },
  { to: '/animals', labelKey: 'phase1.nav.marketplace', fallback: 'Livestock Marketplace' },
  { to: '/events', labelKey: 'phase1.nav.events', fallback: 'Events' },
  { to: '/app/news', labelKey: 'phase1.nav.news', fallback: 'News Feed' },
  { to: '/about', labelKey: 'phase1.nav.about', fallback: 'About' },
  { to: '/blog', labelKey: 'phase1.nav.blog', fallback: 'Blog' },
  { to: '/contact-us', labelKey: 'phase1.nav.contact', fallback: 'Contact Us' },
  { to: '/login', labelKey: 'nav.login', fallback: 'Login' },
];

/** Guest footer site links (Phase 1 only). */
export const PHASE1_GUEST_FOOTER_SITE = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Directory', to: '/directory' },
  { label: 'Livestock Knowledgebase', to: '/knowledgebase' },
  { label: 'Livestock Marketplace', to: '/animals' },
  { label: 'News Feed', to: '/app/news' },
  { label: 'Blog', to: '/blog' },
  { label: 'Events', to: '/events' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'Login', to: '/login' },
  { label: 'Sign Up', to: '/signup' },
];

const EXACT_GUEST_PATHS = new Set([
  '/',
  '/directory',
  '/knowledgebase',
  '/livestock',
  '/plant-knowledgebase',
  '/ingredient-knowledgebase',
  '/animals',
  '/events',
  '/app/news',
  '/about',
  '/blog',
  '/contact-us',
  '/login',
  '/signup',
  '/forgot-password',
]);

const PREFIX_GUEST_PATHS = [
  '/directory/',
  '/livestock/',
  '/plant-knowledgebase/',
  '/ingredient-knowledgebase/',
  '/app/news/',
  '/contact-us/',
  '/marketplaces/livestock/',
];

/**
 * Returns true when an unauthenticated visitor may view this pathname.
 */
export function isPhase1PublicPath(pathname) {
  if (!PHASE1_PUBLIC_ENABLED) return true;

  if (pathname.startsWith('/blog/manage') || pathname.startsWith('/blog/authors')) {
    return false;
  }

  if (pathname.startsWith('/events/')) {
    return false;
  }

  if (EXACT_GUEST_PATHS.has(pathname)) return true;

  if (pathname.startsWith('/blog/')) return true;

  if (pathname === '/marketplaces/livestock' || pathname.startsWith('/marketplaces/livestock/')) {
    return true;
  }

  return PREFIX_GUEST_PATHS.some((prefix) => pathname.startsWith(prefix));
}
