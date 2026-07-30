"use client"

import { BarChart3, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export type Tab = "today" | "stats"

const TABS: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "today", label: "Hoje", icon: Home },
  { id: "stats", label: "Estatísticas", icon: BarChart3 },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: Tab
  onChange: (tab: Tab) => void
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/80 backdrop-blur-xl">
      <div
        className="mx-auto flex max-w-md items-center justify-around px-6 pt-2"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-xl py-2 transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.4 : 2} />
              <span className="text-[11px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
