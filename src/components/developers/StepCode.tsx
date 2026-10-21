"use client";

import { CodeBlock, Tabs } from "@/components/blocks";
import type { Lang } from "@/data/developers";

const langs: { id: Lang; label: string; file: string }[] = [
  { id: "curl", label: "cURL", file: "shell" },
  { id: "node", label: "Node", file: "node.js" },
  { id: "python", label: "Python", file: "python" },
];

export function StepCode({ stepId, snippets }: { stepId: string; snippets: Record<Lang, string> }) {
  return (
    <Tabs
      label="Language"
      tabs={langs.map((l) => ({ id: `${stepId}-${l.id}`, label: l.label, content: <CodeBlock code={snippets[l.id]} label={l.file} /> }))}
    />
  );
}
