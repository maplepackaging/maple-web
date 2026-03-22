"use client";

import { useSyncExternalStore } from "react";

function getServerSnapshot() {
  return 2026; // Fallback year for SSR
}

function getSnapshot() {
  return new Date().getFullYear();
}

function subscribe(_callback: () => void) {
  // Year doesn't change during a session, so no need to subscribe
  return () => {};
}

export function CopyrightYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <>{year}</>;
}
