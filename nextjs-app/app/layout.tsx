import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { withBasePath } from "@/lib/base-path";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "傅冠豪 (Kuan-Hao Fu, MD)",
  description: "神經外科醫師 | 臨床研究員",
  icons: {
    icon: [
      { url: withBasePath('/favicon.ico') },
      { url: withBasePath('/icon-16x16.png'), sizes: '16x16', type: 'image/png' },
      { url: withBasePath('/icon-32x32.png'), sizes: '32x32', type: 'image/png' },
      { url: withBasePath('/icon-192x192.png'), sizes: '192x192', type: 'image/png' },
      { url: withBasePath('/icon-512x512.png'), sizes: '512x512', type: 'image/png' },
    ],
    apple: withBasePath('/apple-icon.png'),
  },
  manifest: withBasePath('/site.webmanifest'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} antialiased`}
      >
        <div id="layout-wrapper" className="min-h-screen bg-[var(--nejm-cream)]">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
