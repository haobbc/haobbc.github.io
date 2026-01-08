import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "簡報 | 傅冠豪 (Kuan-Hao Fu, MD)",
};

export default function SlideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {children}
    </div>
  );
}
