"use client";

import { useMemo, useRef, useState } from "react";
import { Field } from "@/components/forms";
import { buttonClass } from "@/components/ui";

const targets = [
  { value: "ES", label: "Spain · Veri*Factu / Facturae", currency: "EUR", vat: 21 },
  { value: "IT", label: "Italy · FatturaPA", currency: "EUR", vat: 22 },
  { value: "DE", label: "Germany · XRechnung", currency: "EUR", vat: 19 },
  { value: "FR", label: "France · Factur-X", currency: "EUR", vat: 20 },
  { value: "PL", label: "Poland · KSeF FA(3)", currency: "PLN", vat: 23 },
  { value: "MX", label: "Mexico · CFDI 4.0", currency: "MXN", vat: 16 },
  { value: "NO", label: "Norway · Peppol BIS 3.0", currency: "NOK", vat: 25 },
  { value: "SG", label: "Singapore · InvoiceNow", currency: "SGD", vat: 9 },
  { value: "GB", label: "United Kingdom · Peppol BIS", currency: "GBP", vat: 20 },
];

const terms = [
  { value: "0", label: "Due on receipt" },
  { value: "14", label: "Net 14 days" },
  { value: "30", label: "Net 30 days" },
  { value: "60", label: "Net 60 days" },
];

type Party = { name: string; taxId: string; address: string };
type Line = { id: number; description: string; qty: string; price: string; vat: string };

const START = "2026-10-21";

const initial = {
  target: "ES",
  number: "INV-2026-0001",
  date: START,
  terms: "30",
  seller: { name: "Costa Azul Distribuciones SL", taxId: "ESB12345678", address: "Calle Ejemplo 1, 28001 Madrid" } as Party,
  buyer: { name: "Acme Trading Ltd", taxId: "", address: "" } as Party,
  notes: "",
};

const addDays = (iso: string, days: number) => {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return iso;
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const num = (s: string) => {
  const n = Number(s.replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
};

export function InvoiceGenerator() {
  const nextId = useRef(2);
  const [target, setTarget] = useState(initial.target);
  const [number, setNumber] = useState(initial.number);
  const [date, setDate] = useState(initial.date);
  const [payTerms, setPayTerms] = useState(initial.terms);
  const [seller, setSeller] = useState<Party>(initial.seller);
  const [buyer, setBuyer] = useState<Party>(initial.buyer);
  const [notes, setNotes] = useState(initial.notes);
  const [lines, setLines] = useState<Line[]>([{ id: 1, description: "Consulting services", qty: "10", price: "95.00", vat: "21" }]);
  const [attempted, setAttempted] = useState(false);

  const t = targets.find((x) => x.value === target) ?? targets[0];
  const fmt = useMemo(() => new Intl.NumberFormat("en-GB", { style: "currency", currency: t.currency }), [t.currency]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!number.trim()) e.number = "Enter an invoice number.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) e.date = "Choose a valid issue date.";
    if (!seller.name.trim()) e.sellerName = "Seller name is required.";
    if (!seller.taxId.trim()) e.sellerTax = "Seller tax ID is required.";
    if (!buyer.name.trim()) e.buyerName = "Buyer name is required.";
    if (lines.length === 0) e.lines = "Add at least one line item.";
    lines.forEach((l) => {
      if (!l.description.trim()) e[`d${l.id}`] = "Describe the item.";
      const q = num(l.qty);
      if (!(q > 0)) e[`q${l.id}`] = "Quantity must be above 0.";
      const p = num(l.price);
      if (!(p >= 0)) e[`p${l.id}`] = "Enter a valid price.";
      const v = num(l.vat);
      if (!(v >= 0 && v <= 100)) e[`v${l.id}`] = "VAT must be 0 to 100.";
    });
    return e;
  }, [number, date, seller, buyer, lines]);

  const totals = useMemo(() => {
    // Integer minor units; tax computed once per VAT rate group, then summed.
    const groups = new Map<number, number>();
    const computed = lines.map((l) => {
      const q = num(l.qty);
      const p = num(l.price);
      const v = num(l.vat);
      const lineNet = q > 0 && p >= 0 ? Math.round(q * p * 100) : 0;
      const rate = v >= 0 && v <= 100 ? v : 0;
      groups.set(rate, (groups.get(rate) ?? 0) + lineNet);
      return { l, lineNet };
    });
    const net = computed.reduce((s, c) => s + c.lineNet, 0);
    const vatGroups = Array.from(groups.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([rate, base]) => ({ rate, base, tax: Math.round((base * rate) / 100) }));
    const tax = vatGroups.reduce((s, g) => s + g.tax, 0);
    return { computed, vatGroups, net, tax, gross: net + tax };
  }, [lines]);

  const valid = Object.keys(errors).length === 0;
  const show = (k: string) => (attempted ? errors[k] : undefined);

  function update(id: number, patch: Partial<Line>) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function changeTarget(v: string) {
    setTarget(v);
    const next = targets.find((x) => x.value === v);
    if (next) setLines((ls) => ls.map((l) => ({ ...l, vat: String(next.vat) })));
  }

  function toJson() {
    const m = (c: number) => c / 100;
    return {
      country: target,
      format: t.label.split("·")[1]?.trim(),
      currency: t.currency,
      number,
      issueDate: date,
      dueDate: addDays(date, Number(payTerms)),
      paymentTerms: terms.find((x) => x.value === payTerms)?.label,
      seller,
      buyer,
      lines: totals.computed.map(({ l, lineNet }) => ({
        description: l.description,
        quantity: num(l.qty),
        unitPrice: num(l.price),
        vatRate: num(l.vat),
        net: m(lineNet),
      })),
      vat: totals.vatGroups.map((g) => ({ rate: g.rate, taxableAmount: m(g.base), tax: m(g.tax) })),
      totals: { net: m(totals.net), tax: m(totals.tax), gross: m(totals.gross) },
      notes,
    };
  }

  function download() {
    setAttempted(true);
    if (!valid) return;
    const blob = new Blob([JSON.stringify(toJson(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${number.replace(/[^\w.-]+/g, "_") || "invoice"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function print() {
    setAttempted(true);
    if (!valid) return;
    window.print();
  }

  function reset() {
    setTarget(initial.target);
    setNumber(initial.number);
    setDate(initial.date);
    setPayTerms(initial.terms);
    setSeller(initial.seller);
    setBuyer(initial.buyer);
    setNotes("");
    setLines([{ id: 1, description: "Consulting services", qty: "10", price: "95.00", vat: "21" }]);
    nextId.current = 2;
    setAttempted(false);
  }

  const partyFields = (kind: "seller" | "buyer", p: Party, set: (p: Party) => void) => (
    <fieldset className="space-y-4 rounded-xl border border-line bg-white p-6">
      <legend className="px-2 text-xl font-medium capitalize">{kind}</legend>
      <Field name={`${kind}-name`} label="Name" required value={p.name} onChange={(v) => set({ ...p, name: v })} error={show(`${kind}Name`)} />
      <Field name={`${kind}-tax`} label="Tax ID" required={kind === "seller"} value={p.taxId} onChange={(v) => set({ ...p, taxId: v })} error={show(`${kind}Tax`)} />
      <Field name={`${kind}-address`} label="Address" rows={2} value={p.address} onChange={(v) => set({ ...p, address: v })} />
    </fieldset>
  );

  return (
    <>
      <style>{`@media print { header, footer, nav, [role="dialog"], [data-no-print] { display: none !important; } main > section:not(:has([aria-label="Invoice preview"])) { display: none !important; } body { background: #fff !important; } }`}</style>
      <div className="grid gap-8 lg:grid-cols-2">
        <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-5 print:hidden" aria-label="Invoice details">
          <fieldset className="space-y-4 rounded-xl border border-line bg-white p-6">
            <legend className="px-2 text-xl font-medium">Invoice</legend>
            <Field name="target" label="Country and format" value={target} onChange={changeTarget} options={targets.map((x) => ({ value: x.value, label: x.label }))} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="number" label="Invoice number" required value={number} onChange={setNumber} error={show("number")} />
              <Field name="date" label="Issue date" type="date" required value={date} onChange={setDate} error={show("date")} />
            </div>
            <Field name="terms" label="Payment terms" value={payTerms} onChange={setPayTerms} options={terms} />
          </fieldset>

          {partyFields("seller", seller, setSeller)}
          {partyFields("buyer", buyer, setBuyer)}

          <fieldset className="space-y-4 rounded-xl border border-line bg-white p-6">
            <legend className="px-2 text-xl font-medium">Line items</legend>
            {show("lines") && (
              <p role="alert" className="text-sm text-critical">
                {errors.lines}
              </p>
            )}
            {lines.map((l, i) => (
              <div key={l.id} className="space-y-3 rounded-lg bg-fill p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm uppercase tracking-wider text-brand">Item {i + 1}</p>
                  <button
                    type="button"
                    onClick={() => setLines((ls) => ls.filter((x) => x.id !== l.id))}
                    className="rounded-md px-2 py-1 text-sm font-medium text-critical hover:bg-critical-soft focus-visible:outline-2 focus-visible:outline-critical"
                    aria-label={`Remove item ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
                <Field name={`desc-${l.id}`} label="Description" value={l.description} onChange={(v) => update(l.id, { description: v })} error={show(`d${l.id}`)} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field name={`qty-${l.id}`} label="Quantity" value={l.qty} onChange={(v) => update(l.id, { qty: v })} error={show(`q${l.id}`)} />
                  <Field name={`price-${l.id}`} label={`Unit price (${t.currency})`} value={l.price} onChange={(v) => update(l.id, { price: v })} error={show(`p${l.id}`)} />
                  <Field name={`vat-${l.id}`} label="VAT %" value={l.vat} onChange={(v) => update(l.id, { vat: v })} error={show(`v${l.id}`)} />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setLines((ls) => [...ls, { id: nextId.current++, description: "", qty: "1", price: "0.00", vat: String(t.vat) }])}
              className={buttonClass("secondary")}
            >
              + Add line item
            </button>
          </fieldset>

          <fieldset className="rounded-xl border border-line bg-white p-6">
            <legend className="px-2 text-xl font-medium">Notes</legend>
            <Field name="notes" label="Notes shown on the invoice" rows={3} value={notes} onChange={setNotes} />
          </fieldset>
        </form>

        <div className="lg:sticky lg:top-24 lg:h-fit print:static">
          <div className="mb-4 flex flex-wrap gap-2 print:hidden">
            <button type="button" onClick={download} className={buttonClass()}>
              Download JSON
            </button>
            <button type="button" onClick={print} className={buttonClass("secondary")}>
              Print / Save as PDF
            </button>
            <button type="button" onClick={reset} className={buttonClass("secondary")}>
              Reset
            </button>
          </div>
          {attempted && !valid && (
            <p role="alert" className="mb-4 rounded-lg border border-critical/30 bg-critical/5 p-3 text-base text-critical print:hidden">
              Fix the highlighted fields ({Object.keys(errors).length} {Object.keys(errors).length === 1 ? "issue" : "issues"}) to download or print.
            </p>
          )}

          <article aria-label="Invoice preview" className="rounded-xl border border-line bg-white p-6 sm:p-8 print:border-0 print:p-0">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <h2 className="text-3xl font-medium text-ink">Invoice</h2>
                <p className="font-mono text-base text-ink-2">{number || "—"}</p>
              </div>
              <dl className="text-right text-base text-ink-2">
                <div>
                  <dt className="inline text-ink-3">Issued </dt>
                  <dd className="inline">{date}</dd>
                </div>
                <div>
                  <dt className="inline text-ink-3">Due </dt>
                  <dd className="inline">{addDays(date, Number(payTerms))}</dd>
                </div>
                <div className="text-sm text-ink-3">{t.label}</div>
              </dl>
            </header>

            <div className="grid gap-5 py-5 sm:grid-cols-2">
              {[
                ["From", seller],
                ["Bill to", buyer],
              ].map(([label, p]) => (
                <div key={label as string}>
                  <p className="font-mono text-sm uppercase tracking-wider text-brand">{label as string}</p>
                  <p className="mt-1 text-lg font-medium text-ink">{(p as Party).name || "—"}</p>
                  {(p as Party).taxId && <p className="text-base text-ink-2">Tax ID {(p as Party).taxId}</p>}
                  {(p as Party).address && <p className="whitespace-pre-line text-base text-ink-2">{(p as Party).address}</p>}
                </div>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-base">
                <thead>
                  <tr className="border-b border-line text-sm text-ink-3">
                    <th className="py-2 pr-2 font-medium">Item</th>
                    <th className="px-2 text-right font-medium">Qty</th>
                    <th className="px-2 text-right font-medium">Price</th>
                    <th className="px-2 text-right font-medium">VAT</th>
                    <th className="py-2 pl-2 text-right font-medium">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {totals.computed.map(({ l, lineNet }) => (
                    <tr key={l.id} className="border-b border-line text-ink-2">
                      <td className="py-2 pr-2 text-ink">{l.description || "—"}</td>
                      <td className="px-2 text-right">{l.qty}</td>
                      <td className="px-2 text-right">{fmt.format(Math.max(0, num(l.price)) || 0)}</td>
                      <td className="px-2 text-right">{l.vat}%</td>
                      <td className="py-2 pl-2 text-right text-ink">{fmt.format(lineNet / 100)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="ml-auto mt-5 max-w-xs space-y-1 text-base">
              <div className="flex justify-between text-ink-2">
                <dt>Subtotal</dt>
                <dd>{fmt.format(totals.net / 100)}</dd>
              </div>
              {totals.vatGroups.map((g) => (
                <div key={g.rate} className="flex justify-between text-ink-2">
                  <dt>VAT {g.rate}%</dt>
                  <dd>{fmt.format(g.tax / 100)}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-line pt-2 text-xl font-medium text-ink">
                <dt>Total</dt>
                <dd>{fmt.format(totals.gross / 100)}</dd>
              </div>
            </dl>

            {notes && <p className="mt-6 whitespace-pre-line border-t border-line pt-4 text-base text-ink-2">{notes}</p>}
            <p className="mt-6 text-sm text-ink-3">Sample invoice generated with InvoNexa. Not a legally valid tax document.</p>
          </article>
        </div>
      </div>
    </>
  );
}
