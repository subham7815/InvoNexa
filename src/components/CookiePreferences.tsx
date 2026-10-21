"use client";

const KEY = "invonexa-cookies";

/** Clears the stored cookie choice and reloads so the consent banner appears again. */
export function CookiePreferences({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        try {
          localStorage.removeItem(KEY);
        } catch {
          // storage unavailable; reload still resets the banner state
        }
        window.location.reload();
      }}
    >
      Cookie preferences
    </button>
  );
}
