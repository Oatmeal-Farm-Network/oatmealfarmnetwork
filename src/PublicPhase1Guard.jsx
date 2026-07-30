import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  isLoggedIn,
  isPhase1PublicMode,
  isPhase1PublicPath,
  isPhase1LoggedInPath,
} from './phase1PublicAccess';

/**
 * Phase 1 route guard for guests and logged-in users.
 * Hidden routes redirect to / (guests) or /account (logged-in).
 */
export default function PublicPhase1Guard({ children }) {
  const location = useLocation();

  if (!isPhase1PublicMode()) {
    return children;
  }

  if (isLoggedIn()) {
    if (isPhase1LoggedInPath(location.pathname)) {
      return children;
    }
    return <Navigate to="/account" replace state={{ phase1Blocked: location.pathname }} />;
  }

  if (isPhase1PublicPath(location.pathname)) {
    return children;
  }

  return <Navigate to="/" replace state={{ phase1Blocked: location.pathname }} />;
}
