"use client";

import { useState, useSyncExternalStore } from "react";

const KEY = "invonexa-cookies";

function hasChoice() {
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, hasChoice, () => true);
  const [dismissed, setDismissed] = useState(false);

  if (stored || dismissed) return null;

  const choose = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      // storage unavailable; just dismiss
    }
    setDismissed(true);
  };

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded-xl border border-line bg-background p-4 shadow-lg reveal reveal-rise is-visible sm:flex sm:items-center sm:gap-4">
      <p className="flex-1 text-base text-ink-2">We use cookies to improve your experience and measure usage.</p>
      <div className="mt-3 flex gap-2 sm:mt-0">
        <button onClick={() => choose("essential")} className="rounded-lg bg-fill px-3 py-1.5 text-base font-medium">
          Essential only
        </button>
        <button onClick={() => choose("all")} className="rounded-lg bg-brand px-3 py-1.5 text-base font-medium text-white">
          Accept all
        </button>
      </div>
    </div>
  );
}
