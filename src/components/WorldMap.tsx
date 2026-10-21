import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-110m.json";
import { countries } from "@/data/content";

// ISO 3166-1 numeric ids used by world-atlas.
const LIVE = new Set(["724", "276", "250", "300", "380", "620", "348", "372"]);
const SOON = new Set(["191", "036", "604", "784", "152", "616"]);

const W = 960;
const H = 500;

const topo = world as unknown as Topology;
const collection = feature(topo, topo.objects.countries as GeometryCollection);
const projection = geoNaturalEarth1().fitSize([W, H], { type: "Sphere" });
const pathGen = geoPath(projection);

const shapes = collection.features
  .filter((f) => f.id !== "010") // drop Antarctica
  .map((f, i) => ({ id: String(f.id ?? ""), key: `${f.id ?? "x"}-${i}`, d: pathGen(f) ?? "" }));

const markers = countries
  .map((c) => ({ name: c.name, p: projection(c.coords as [number, number]) }))
  .filter((m): m is { name: string; p: [number, number] } => !!m.p);

/** Static SVG world map highlighting live and upcoming markets. Server-rendered. */
export function WorldMap() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map of live and upcoming countries" className="h-auto w-full">
      {shapes.map((s) => (
        <path
          key={s.key}
          d={s.d}
          className={
            `stroke-white ${LIVE.has(s.id) ? "fill-brand" : SOON.has(s.id) ? "fill-brand-tint-2" : "fill-fill-2"}`
          }
          strokeWidth={0.5}
        />
      ))}
      {markers.map((m) => (
        <circle key={m.name} cx={m.p[0]} cy={m.p[1]} r={4} className="pulse-dot fill-navy" style={{ transformOrigin: `${m.p[0]}px ${m.p[1]}px` }} />
      ))}
    </svg>
  );
}
