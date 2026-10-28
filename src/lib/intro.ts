"use client";

import { useSyncExternalStore } from "react";

// The preloader flips this once per full page load; hero animations wait for it.
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
