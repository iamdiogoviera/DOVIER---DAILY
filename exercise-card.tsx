"use client"

import { useMemo } from "react"
import { dateKey } from "@/lib/storage"
import { cn } from "@/lib/utils"

const WEEKDAYS = ["S", "T", "Q", "Q", "S", "S", "D"] // Mon..Sun (pt)

export function CalendarGrid({ completedDays }: { completedDays: string[] }) {
  const done = useMemo(() => new Set(completedDays), [completedDays])
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const todayKey = dateKey()

  const monthLabel = useMemo(() => {
    const label = new Intl.DateTimeFormat("pt-PT", {
      month: "long",
      year: "numeric",
    }).format(now)
    return label.charAt(0).toUpperCase() + label.slice(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month])

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1)
    // Convert JS Sunday=0 to Monday-first index.
    const startOffset = (firstDay.getDay() + 6) % 7
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const arr: (number | null)[] = []
    for (let i = 0; i < startOffset; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [year, month])

  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {monthLabel}
      </p>

      <div className="mb-2 grid grid-cols-7 gap-1.5">
        {WEEKDAYS.map((w, i) => (
          <div
            key={i}
            className="text-center font-mono text-[10px] text-muted-foreground/70"
          >
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />
          const key = dateKey(new Date(year, month, day))
          const isDone = done.has(key)
          const isToday = key === todayKey
          return (
            <div
              key={key}
              className={cn(
                "flex aspect-square items-center justify-center rounded-lg text-[13px] tabular-nums transition-colors",
                isDone
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "bg-secondary text-muted-foreground",
                isToday && !isDone && "ring-2 ring-primary/60",
                isToday && isDone && "ring-2 ring-primary-foreground/40",
              )}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
