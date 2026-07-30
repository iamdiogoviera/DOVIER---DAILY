"use client"

import { useMemo } from "react"
import { Award, CalendarCheck, Flame, Target } from "lucide-react"
import { CalendarGrid } from "@/components/calendar-grid"
import { parseKey } from "@/lib/storage"
import type { useChallengeStore } from "@/hooks/use-challenge-store"

type Store = ReturnType<typeof useChallengeStore>

export function StatsView({ store }: { store: Store }) {
  // Completion rate since the first recorded day.
  const completionRate = useMemo(() => {
    if (store.completedDays.length === 0) return 0
    const sorted = [...store.completedDays].sort()
    const first = parseKey(sorted[0])
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    first.setHours(0, 0, 0, 0)
    const span = Math.max(
      1,
      Math.round((today.getTime() - first.getTime()) / 86400000) + 1,
    )
    return Math.round((store.completedDays.length / span) * 100)
  }, [store.completedDays])

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 pb-28 pt-8">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          Estatísticas
        </p>
        <h1 className="mt-1 text-2xl font-semibold leading-tight">
          O teu progresso
        </h1>
      </header>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <StatCard
          icon={<CalendarCheck className="size-4" />}
          label="Dias concluídos"
          value={store.totalCompletedDays}
        />
        <StatCard
          icon={<Flame className="size-4" />}
          label="Streak atual"
          value={store.streak}
        />
        <StatCard
          icon={<Award className="size-4" />}
          label="Recorde de streak"
          value={store.bestStreak}
        />
        <StatCard
          icon={<Target className="size-4" />}
          label="Taxa de conclusão"
          value={`${completionRate}%`}
        />
      </div>

      <CalendarGrid completedDays={store.completedDays} />

      {store.totalCompletedDays === 0 && (
        <p className="mt-6 text-center text-[13px] leading-relaxed text-muted-foreground">
          Ainda não concluíste nenhum dia. Completa todos os exercícios de hoje
          para começar a tua streak.
        </p>
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </div>
      <p className="text-3xl font-bold tabular-nums leading-none">{value}</p>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  )
}
