"use client";

import { useSyncExternalStore } from "react";

// Computed once at module load time — safe during prerendering
const BUILD_YEAR = new Date().getFullYear();

function getServerSnapshot() {
  return BUILD_YEAR;
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
