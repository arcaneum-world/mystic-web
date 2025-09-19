import "./globals.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Special_Elite } from "next/font/google";

export const metadata: Metadata = {
  title: "Arcaneum",
  description: "Discover your magic",
};

const special = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={special.variable}>
      <body className="min-h-screen text-neutral-100 bg-space flex flex-col">
        {/* Galaxy background layers */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-galaxy animate-galaxy" />
          <div className="absolute inset-0 stars opacity-60 animate-twinkle" />
          <div className="absolute inset-0 stars2 opacity-40 animate-twinkle-slow" />
        </div>

        <Header />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
