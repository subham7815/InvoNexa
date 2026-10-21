"use client";

import { useEffect, useRef, useState } from "react";

/** Reports whether the element is (or has been, when `once`) inside the viewport. */
export function useInView<T extends Element>({ once = true, margin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, margin]);

  return [ref, inView] as const;
}

/** Cycles 0..length-1 every `ms` while `active`. */
export function useLoop(length: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => clearInterval(t);
  }, [length, ms, active]);
  return i;
}
