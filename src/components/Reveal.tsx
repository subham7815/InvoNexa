"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

type Variant = "rise" | "rise-sm" | "fade" | "pop";

export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  as,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const Tag = (as ?? "div") as ElementType;
  const [ref, visible] = useInView<HTMLElement>();
  const style: CSSProperties = { animationDelay: `${delay}ms` };
  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal reveal-${variant} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
