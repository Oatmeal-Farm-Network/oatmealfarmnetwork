/**
 * Local development login bypass (localhost only).
 * Credentials live in .env.development.local — never used in production builds.
 */
const DEV_EMAIL = (import.meta.env.VITE_DEV_LOGIN_EMAIL || '').trim().toLowerCase();
const DEV_PASSWORD = import.meta.env.VITE_DEV_LOGIN_PASSWORD || '';

export function isDevMockAuthEnabled() {
  return import.meta.env.DEV && !!DEV_EMAIL && !!DEV_PASSWORD;
}

export function tryDevMockLogin(email, password) {
  if (!isDevMockAuthEnabled()) return null;

  const normalized = String(email || '').trim().toLowerCase();
  if (normalized !== DEV_EMAIL || password !== DEV_PASSWORD) return null;

  return {
    AccessToken: 'dev-mock-token',
    PeopleID: 900001,
    PeopleFirstName: 'Sai',
    PeopleLastName: 'Dev',
    AccessLevel: 1,
  };
}

export function persistDevMockSession(data) {
  localStorage.setItem('access_token', data.AccessToken);
  localStorage.setItem('people_id', String(data.PeopleID));
  localStorage.setItem('first_name', data.PeopleFirstName);
  localStorage.setItem('last_name', data.PeopleLastName);
  localStorage.setItem('access_level', String(data.AccessLevel));
}
