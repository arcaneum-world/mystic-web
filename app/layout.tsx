import "./globals.css";
import Header from "@/components/Header";
import CodeRedirector from "@/components/CodeRedirector";

export const metadata = {
  title: "Arcaneum",
  description: "Discover your magic",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <Header />
        {/* client-side fix for email links that land with ?code in wrong place */}
        <CodeRedirector />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
