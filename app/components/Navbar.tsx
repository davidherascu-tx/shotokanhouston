"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-charcoal/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bone p-1.5 shadow-md ring-1 ring-gold/40 transition-transform group-hover:scale-105">
            <Image
              src="/shotokan_houston_logo.webp"
              alt="Shotokan Karate-Do Center, Houston, TX — Tiger emblem"
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
            />
          </span>
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg font-bold uppercase tracking-widest text-bone group-hover:text-gold transition-colors">
              Shotokan Karate-Do Center
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-gold/90">
              Houston, TX · S.K.I.F.
            </div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                    active ? "text-gold" : "text-bone/90 hover:text-gold"
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  <span
                    className={`pointer-events-none absolute inset-x-4 -bottom-0.5 h-px bg-gold transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center rounded-sm border border-gold/80 bg-crimson px-5 py-2 text-sm font-semibold uppercase tracking-wider text-bone shadow-md transition-all hover:bg-crimson-light hover:shadow-lg hover:shadow-crimson/30"
            >
              Join Now
            </Link>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-bone hover:bg-white/10"
        >
          <span className="sr-only">Open menu</span>
          <div className="relative h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden bg-charcoal/95 backdrop-blur transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-4">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block border-b border-white/5 py-3 text-sm uppercase tracking-widest ${
                    active ? "text-gold" : "text-bone/90 hover:text-gold"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-4">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-sm bg-crimson px-5 py-3 text-sm font-semibold uppercase tracking-widest text-bone"
            >
              Join Now
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
