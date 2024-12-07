import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star Wars Explorer",
  description: "Explore the Star Wars universe",
  openGraph: {
    title: "Star Wars Explorer",
    description: "Explore the Star Wars universe",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Star Wars Explorer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Star Wars Explorer",
    description: "Explore the Star Wars universe",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${GeistSans.className} bg-gradient-to-b from-black to-slate-900 text-white min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="py-6">
            <nav className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                Star Wars Explorer
              </h1>
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
