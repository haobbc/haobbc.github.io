"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, FileText, BookOpen } from "lucide-react"

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
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              pathname === "/"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "text-white hover:bg-blue-700 hover:shadow-md"
            )}
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">首頁</span>
          </Link>
          <Link
            href="/notes"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              pathname?.startsWith("/notes")
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "text-white hover:bg-blue-700 hover:shadow-md"
            )}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">筆記</span>
          </Link>
          <Link
            href="/md-renderer"
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
              pathname === "/md-renderer"
                ? "bg-white text-blue-800 shadow-md scale-105"
                : "text-white hover:bg-blue-700 hover:shadow-md"
            )}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">論文渲染器</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
