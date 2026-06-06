"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Presentation, HeartPulse, Link as LinkIcon } from "lucide-react"

const navItems = [
  { href: "/", label: "首頁", labelEn: "Home", icon: Home, match: (p: string) => p === "/" },
  {
    href: "/slides",
    label: "教學簡報",
    labelEn: "Teaching Slides",
    icon: Presentation,
    match: (p: string) => p.startsWith("/slides"),
  },
  {
    href: "/articles",
    label: "衛教文章",
    labelEn: "Patient Education",
    icon: HeartPulse,
    match: (p: string) => p.startsWith("/articles"),
  },
  {
    href: "/links",
    label: "快速連結",
    labelEn: "Quick Links",
    icon: LinkIcon,
    match: (p: string) => p.startsWith("/links"),
  },
]

export function Navigation() {
  const pathname = usePathname() || "/"

  return (
    <nav className="sticky top-0 z-50 bg-[var(--nejm-paper)]/95 backdrop-blur-sm border-b border-[var(--nejm-rule)] shadow-[0_1px_0_0_var(--nejm-burgundy)]">
      <div className="container mx-auto max-w-6xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center border border-[var(--nejm-burgundy)] bg-[var(--nejm-paper)] text-[var(--nejm-burgundy)] font-serif text-lg font-semibold transition-colors group-hover:bg-[var(--nejm-burgundy)] group-hover:text-[var(--nejm-paper)]">
            傅
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-semibold text-[var(--nejm-ink)]">
              Kuan-Hao Fu, <span className="italic font-normal">MD</span>
            </span>
            <span className="editorial-label-muted text-[0.6rem]">
              Neurosurgery · Clinical Research
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ href, label, labelEn, icon: Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "group relative flex items-center gap-1.5 px-3 py-2 text-sm transition-colors",
                  active
                    ? "text-[var(--nejm-burgundy)]"
                    : "text-[var(--nejm-charcoal)] hover:text-[var(--nejm-burgundy)]"
                )}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                <span className="hidden sm:inline font-medium tracking-wide">{label}</span>
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-2 -bottom-px h-0.5 bg-[var(--nejm-burgundy)] transition-transform origin-left",
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                  aria-hidden="true"
                />
                <span className="sr-only">{labelEn}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
