"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Field, FormShell } from "./forms";
import { buttonClass, type Variant } from "./ui";

const Ctx = createContext<() => void>(() => {});
export const useContactModal = () => useContext(Ctx);

/** Contact-sales fields, shared by the modal and the /contact page. */
export function ContactForm() {
  return (
    <FormShell
      endpoint="/api/contact"
      submitLabel="Send message"
      success={(id) => (
        <>
          <p className="text-lg font-medium">Thanks — we&apos;ve got your message.</p>
          <p className="mt-1">Our team will reply within one business day. Reference: {id}</p>
        </>
      )}
      fields={(e) => (
        <>
          <Field name="name" label="Full name" required error={e.name} />
          <Field name="email" label="Work email" type="email" required error={e.email} />
          <Field name="company" label="Company" required error={e.company} />
          <Field name="message" label="How can we help?" rows={3} error={e.message} />
        </>
      )}
    />
  );
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(0);
  const show = useCallback(() => {
    setKey((k) => k + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <Ctx.Provider value={show}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/50 p-4" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="reveal reveal-pop is-visible w-full max-w-md rounded-xl bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h2 id="contact-title" className="text-2xl font-medium">
                Contact sales
              </h2>
              <button aria-label="Close" onClick={() => setOpen(false)} className="text-2xl leading-none text-ink-3">
                ×
              </button>
            </div>
            <ContactForm key={key} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function ContactButton({ variant = "secondary", children }: { variant?: Variant; children: ReactNode }) {
  const show = useContactModal();
  return (
    <button type="button" onClick={show} className={buttonClass(variant)}>
      {children}
    </button>
  );
}
