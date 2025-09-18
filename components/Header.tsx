"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tarot", label: "Tarot" },
  { href: "/astrology", label: "Astrology" },
  { href: "/learn", label: "Learn" },
  { href: "/profile", label: "Profile" },
  { href: "/account", label: "Account" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-neutral-900 text-neutral-100">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Brand (clickable to Home) */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/arcaneum-logo.jpeg"
            alt="Arcaneum Logo"
            width={40}
            height={40}
            className="rounded"
            priority
          />
          <span className="text-lg font-semibold">Arcaneum</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded ${
                pathname === item.href
                  ? "bg-violet-600 text-white"
                  : "hover:bg-neutral-800"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
