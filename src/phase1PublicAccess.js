/**
 * Livestock of America — Phase 1 site visibility (guest + logged-in).
 * Set VITE_PHASE1_PUBLIC=false to restore the full OFN site for all users.
 */
export const PHASE1_PUBLIC_ENABLED = import.meta.env.VITE_PHASE1_PUBLIC !== 'false';

export function isPhase1PublicMode() {
  return PHASE1_PUBLIC_ENABLED;
}

/** True when Phase 1 nav/route restrictions apply to authenticated users. */
export function isPhase1LoggedInNavMode() {
  return PHASE1_PUBLIC_ENABLED && isLoggedIn();
}

export function isLoggedIn() {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('access_token') || localStorage.getItem('AccessToken'));
}

/**
 * Dropdown under "Livestock Knowledgebase" — same three options as full OFN Knowledgebases menu.
 */
export const PHASE1_KB_DROPDOWN = [
  { to: '/plant-knowledgebase', labelKey: 'nav.plants', fallback: 'Plants' },
  { to: '/livestock', labelKey: 'nav.livestock_breeds', fallback: 'Livestock Breeds' },
  { to: '/ingredient-knowledgebase', labelKey: 'nav.ingredients', fallback: 'Ingredients' },
];

/** Guest header / mobile menu links (Phase 1 only). */
export const PHASE1_GUEST_NAV = [
  { to: '/', labelKey: 'phase1.nav.home', fallback: 'Home' },
  { to: '/directory', labelKey: 'phase1.nav.directory', fallback: 'Directory' },
  {
    to: '/knowledgebase',
    labelKey: 'phase1.nav.knowledgebase',
    fallback: 'Livestock Knowledgebase',
    dropdown: PHASE1_KB_DROPDOWN,
  },
  { to: '/animals', labelKey: 'phase1.nav.marketplace', fallback: 'Livestock Marketplace' },
  { to: '/events', labelKey: 'phase1.nav.events', fallback: 'Events' },
  { to: '/app/news', labelKey: 'phase1.nav.news', fallback: 'News Feed' },
  { to: '/about', labelKey: 'phase1.nav.about', fallback: 'About' },
  { to: '/blog', labelKey: 'phase1.nav.blog', fallback: 'Blog' },
  { to: '/contact-us', labelKey: 'phase1.nav.contact', fallback: 'Contact Us' },
  { to: '/login', labelKey: 'nav.login', fallback: 'Login' },
];

/** Logged-in header / sidebar / mobile menu (Phase 1 only). */
export const PHASE1_LOGGED_IN_NAV = [
  { to: '/account', labelKey: 'nav.dashboard', fallback: 'Dashboard' },
  {
    to: '/knowledgebase',
    labelKey: 'phase1.nav.knowledgebase',
    fallback: 'Livestock Knowledgebase',
    dropdown: PHASE1_KB_DROPDOWN,
  },
  { to: '/animals', labelKey: 'phase1.nav.marketplace', fallback: 'Livestock Marketplace' },
  { to: '/events', labelKey: 'phase1.nav.events', fallback: 'Events' },
  { to: '/app/news', labelKey: 'phase1.nav.news', fallback: 'News Feed' },
  { to: '/about', labelKey: 'phase1.nav.about', fallback: 'About' },
  { to: '/blog', labelKey: 'phase1.nav.blog', fallback: 'Blog' },
  { to: '/contact-us', labelKey: 'phase1.nav.contact', fallback: 'Contact Us' },
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

const EXACT_LOGGED_IN_PATHS = new Set([
  '/',
  '/account',
  '/dashboard',
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
  '/accounts/new',
]);

const PREFIX_LOGGED_IN_PATHS = [
  '/account/',
  '/accounts/',
  '/livestock/',
  '/plant-knowledgebase/',
  '/ingredient-knowledgebase/',
  '/animals/',
  '/app/news/',
  '/contact-us/',
  '/marketplaces/livestock/',
];

/**
 * Returns true when an authenticated user may view this pathname in Phase 1 mode.
 * Dashboard account-management URLs stay reachable so the dashboard UI keeps working.
 */
export function isPhase1LoggedInPath(pathname) {
  if (!PHASE1_PUBLIC_ENABLED) return true;

  if (pathname.startsWith('/blog/manage') || pathname.startsWith('/blog/authors')) {
    return false;
  }

  if (pathname.startsWith('/events/')) {
    return false;
  }

  if (EXACT_LOGGED_IN_PATHS.has(pathname)) return true;

  if (pathname.startsWith('/blog/')) return true;

  if (pathname === '/marketplaces/livestock' || pathname.startsWith('/marketplaces/livestock/')) {
    return true;
  }

  return PREFIX_LOGGED_IN_PATHS.some((prefix) => pathname.startsWith(prefix));
}
