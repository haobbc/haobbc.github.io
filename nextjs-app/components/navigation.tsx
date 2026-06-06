"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Presentation, HeartPulse, Link as LinkIcon } from "lucide-react"

const navItems = [
  { href: "/", label: "首頁", icon: Home, match: (p: string | null) => p === "/" },
  {
    href: "/slides",
    label: "教學簡報",
    icon: Presentation,
    match: (p: string | null) => !!p?.startsWith("/slides"),
  },
  {
    href: "/articles",
    label: "衛教文章",
    icon: HeartPulse,
    match: (p: string | null) => !!p?.startsWith("/articles"),
  },
  {
    href: "/links",
    label: "快速連結",
    icon: LinkIcon,
    match: (p: string | null) => !!p?.startsWith("/links"),
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-blue-400 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-200 group-hover:scale-110">
            <span className="text-white font-bold text-lg">傅</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white group-hover:text-blue-100 transition-colors leading-tight">
              傅冠豪 MD
            </span>
            <span className="text-xs text-blue-200 leading-tight">
              Kuan-Hao Fu
            </span>
          </div>
        </Link>

        <div className="flex gap-2">
          {navItems.map(({ href, label, icon: Icon, match }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                match(pathname)
                  ? "bg-white text-blue-800 shadow-md scale-105"
                  : "text-white hover:bg-blue-700 hover:shadow-md"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
