"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { useEffect, useRef } from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import land110 from "world-atlas/land-110m.json";
import { countries } from "@/data/content";

/** Palette is read from the --dx-* tokens in globals.css so the globe follows the theme. */
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const alpha = (hex: string, a: number) => `${hex}${Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0")}`;

/** Auto-rotating, draggable orthographic globe with pulsing markers on live countries. */
export function HeroGlobe() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const box = wrap.current;
    if (!el || !box) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    const topo = land110 as unknown as Topology;
    const land = feature(topo, topo.objects.land);
    const graticule = geoGraticule10();
    const BRAND = token("--dx-red");
    const SPHERE = token("--dx-surface");
    const LAND = token("--dx-red-soft");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let size = 0;
    let rotation = 10;
    let tilt = -25;
    let dragging = false;
    let last = [0, 0];
    let visible = true;
    let raf = 0;
    const projection = geoOrthographic().clipAngle(90);
    const path = geoPath(projection, ctx);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = box.clientWidth;
      el.width = size * dpr;
      el.height = size * dpr;
      el.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      projection.translate([size / 2, size / 2]).scale(size / 2 - 4);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      projection.rotate([rotation, tilt]);

      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = SPHERE;
      ctx.fill();

      ctx.beginPath();
      path(graticule);
      ctx.strokeStyle = alpha(BRAND, 0.12);
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.beginPath();
      path(land);
      ctx.fillStyle = LAND;
      ctx.fill();
      ctx.strokeStyle = alpha(BRAND, 0.35);
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = alpha(BRAND, 0.4);
      ctx.lineWidth = 1;
      ctx.stroke();

      const pulse = (Math.sin(t / 400) + 1) / 2;
      for (const c of countries) {
        // Hide markers on the far side of the globe.
        const [lon, lat] = c.coords;
        if (geoDistance([lon, lat], [-rotation, -tilt]) > Math.PI / 2 - 0.05) continue;
        const p = projection([lon, lat]);
        if (!p) continue;
        ctx.beginPath();
        ctx.arc(p[0], p[1], 4 + pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = alpha(BRAND, 0.25 - pulse * 0.2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2);
        ctx.fillStyle = BRAND;
        ctx.fill();
      }
    };

    let prev = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = now - prev;
      prev = now;
      if (!dragging && !reduce) rotation += dt * 0.012;
      draw(now);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      last = [e.clientX, e.clientY];
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      rotation += (e.clientX - last[0]) * 0.4;
      tilt = Math.max(-60, Math.min(20, tilt - (e.clientY - last[1]) * 0.3));
      last = [e.clientX, e.clientY];
    };
    const onUp = () => (dragging = false);

    resize();
    draw(0);
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(box);
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[520px]">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand/10 blur-3xl" />
      <canvas ref={canvas} aria-label="Globe showing InvoNexa's live countries" role="img" className="block w-full cursor-grab touch-none active:cursor-grabbing" />
    </div>
  );
}
