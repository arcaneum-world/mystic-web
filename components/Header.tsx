'use client';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const nav = [
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
    <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/arcaneum-logo.jpeg"
            alt="Arcaneum Logo"
            width={36}
            height={36}
            className="rounded-md"
            priority
          />
          <span className="text-lg font-semibold tracking-wide">Arcaneum</span>
        </Link>

        <nav className="flex items-center gap-3 text-sm">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-md px-3 py-2 transition",
                  active
                    ? "bg-violet-700 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
