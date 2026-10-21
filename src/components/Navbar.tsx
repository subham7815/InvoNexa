"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isActive, navLinks, navMenus } from "@/data/nav";
import { ContactButton } from "./ContactModal";
import { ButtonLink, Container, Logo } from "./ui";

const Chevron = ({ open }: { open: boolean }) => (
  <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
    <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

const linkBase = "rounded-lg px-3.5 py-2 text-[15px] font-medium transition-colors";
const linkClass = (active: boolean) =>
  `${linkBase} ${active ? "bg-brand-tint text-navy" : "text-ink-2 hover:bg-fill hover:text-ink"}`;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Open state is keyed to the pathname so any navigation closes menus without an effect.
  const [desk, setDesk] = useState<{ menu: string | null; path: string }>({ menu: null, path: "" });
  const [mob, setMob] = useState<{ open: boolean; section: string | null; path: string }>({ open: false, section: null, path: "" });
  const navRef = useRef<HTMLElement>(null);
  const openMenu = desk.path === pathname ? desk.menu : null;
  const mobileOpen = mob.path === pathname && mob.open;
  const mobileSection = mob.path === pathname ? mob.section : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setDesk({ menu: null, path: pathname });
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDesk({ menu: null, path: pathname });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const setMenu = (menu: string | null) => setDesk({ menu, path: pathname });

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur transition-colors duration-200 ${
        scrolled || mobileOpen ? "border-b border-line bg-background/95" : "border-b border-transparent bg-background/70"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav ref={navRef} className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                  {l.label}
                </Link>
              );
            })}
            {navMenus.map((m) => {
              const open = openMenu === m.label;
              const childActive = m.items.some((i) => isActive(pathname, i.href));
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => setMenu(m.label)}
                  onMouseLeave={() => setMenu(null)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("[role=menuitem]"));
                    const i = items.indexOf(document.activeElement as HTMLElement);
                    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
                    items[next]?.focus();
                  }}
                >
                  <button
                    aria-haspopup="menu"
                    aria-expanded={open}
                    onClick={() => setMenu(open ? null : m.label)}
                    className={`flex items-center gap-1.5 ${linkClass(childActive || open)}`}
                  >
                    {m.label}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <div className="absolute left-0 top-full pt-2">
                      <div role="menu" aria-label={m.label} className="dropdown-in w-80 rounded-xl border border-line bg-background p-2 shadow-[0_12px_40px_rgb(0_0_0/0.1)]">
                        {m.items.map((i) => {
                          const active = isActive(pathname, i.href);
                          return (
                            <Link
                              key={i.href}
                              href={i.href}
                              role="menuitem"
                              aria-current={active ? "page" : undefined}
                              className={`block rounded-lg px-3.5 py-2.5 transition-colors ${active ? "bg-brand-tint" : "hover:bg-fill"}`}
                            >
                              <span className="block text-[15px] font-medium text-ink">{i.label}</span>
                              {i.description && <span className="block text-sm text-ink-3">{i.description}</span>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <ContactButton>Contact sales</ContactButton>
          <ButtonLink href="/get-started">Get started</ButtonLink>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-lg bg-fill lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMob({ open: !mobileOpen, section: null, path: pathname })}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            {mobileOpen ? <path d="m4 4 12 12M16 4 4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </Container>

      {mobileOpen && (
        <div id="mobile-menu" className="dropdown-in fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-background lg:hidden">
          <Container className="space-y-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-3 text-lg font-medium ${isActive(pathname, l.href) ? "bg-brand-tint text-navy" : "hover:bg-fill"}`}
              >
                {l.label}
              </Link>
            ))}
            {navMenus.map((m) => {
              const open = mobileSection === m.label;
              return (
                <div key={m.label}>
                  <button
                    aria-expanded={open}
                    onClick={() => setMob({ open: true, section: open ? null : m.label, path: pathname })}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-lg font-medium hover:bg-fill"
                  >
                    {m.label}
                    <Chevron open={open} />
                  </button>
                  {open && (
                    <div className="ml-3 space-y-0.5 border-l border-line pl-3">
                      {m.items.map((i) => (
                        <Link
                          key={i.href}
                          href={i.href}
                          aria-current={isActive(pathname, i.href) ? "page" : undefined}
                          className={`block rounded-lg px-3 py-2.5 text-base ${isActive(pathname, i.href) ? "bg-brand-tint text-navy" : "text-ink-2 hover:bg-fill"}`}
                        >
                          {i.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex flex-col gap-2 pt-4">
              <ButtonLink href="/get-started">Get started</ButtonLink>
              <ContactButton>Contact sales</ContactButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
