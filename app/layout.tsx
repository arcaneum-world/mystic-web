import "./globals.css";
import Header from "@/components/Header";
import Starfield from "@/components/Starfield";

export const metadata = {
  title: "Arcaneum",
  description: "Discover your magic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased selection:bg-violet-500/30">
        {/* twinkly stars behind everything */}
        <Starfield />

        <Header />

        <main className="mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
