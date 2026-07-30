import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, isPhase1PublicMode, isPhase1PublicPath } from './phase1PublicAccess';

/**
 * Blocks unauthenticated visitors from non–Phase 1 routes.
 * Logged-in users pass through unchanged.
 */
export default function PublicPhase1Guard({ children }) {
  const location = useLocation();

  if (!isPhase1PublicMode() || isLoggedIn()) {
    return children;
  }

  if (isPhase1PublicPath(location.pathname)) {
    return children;
  }

  return <Navigate to="/" replace state={{ phase1Blocked: location.pathname }} />;
}
