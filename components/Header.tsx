"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/tarot", label: "Tarot" },
  { href: "/astrology", label: "Astrology" },
  { href: "/learn", label: "Learn" },
  { href: "/profile", label: "Profile" },
  { href: "/account", label: "Account" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={
          "rounded-md px-3 py-2 text-sm md:text-[13px] transition " +
          (active
            ? "bg-violet-600 text-white"
            : "text-neutral-200 hover:bg-neutral-800")
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-3 py-2 md:px-4 md:py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/arcaneum-logo.jpg?v=2"
            alt="Arcaneum Logo"
            width={24}
            height={24}
            className="rounded md:h-7 md:w-7"
            priority
          />
          <span className="text-base font-semibold md:text-lg">Arcaneum</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-200 ring-1 ring-neutral-700 hover:bg-neutral-800 md:hidden"
        >
          Menu
          <span className="i">▾</span>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden">
          <nav className="mx-auto flex max-w-5xl flex-col gap-1 px-3 pb-3">
            {NAV.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
