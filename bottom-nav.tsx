"use client"

import { useState } from "react"
import { BottomNav, type Tab } from "@/components/bottom-nav"
import { StatsView } from "@/components/stats-view"
import { TodayView } from "@/components/today-view"
import { useChallengeStore } from "@/hooks/use-challenge-store"

export default function Page() {
  const [tab, setTab] = useState<Tab>("today")
  const store = useChallengeStore()

  return (
    <main className="min-h-dvh bg-background">
      {!store.hydrated ? (
        <div className="flex min-h-dvh items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
        </div>
      ) : tab === "today" ? (
        <TodayView store={store} />
      ) : (
        <StatsView store={store} />
      )}

      <BottomNav active={tab} onChange={setTab} />
    </main>
  )
}
