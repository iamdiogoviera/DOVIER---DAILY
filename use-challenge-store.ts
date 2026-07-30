"use client"

import { useMemo, useState } from "react"
import { Flame, PartyPopper, RotateCcw } from "lucide-react"
import { Confetti } from "@/components/confetti"
import { ExerciseCard } from "@/components/exercise-card"
import { ExerciseDetail } from "@/components/exercise-detail"
import { ProgressRing } from "@/components/progress-ring"
import { EXERCISES, type Exercise } from "@/lib/exercises"
import { getDailyMessage } from "@/lib/motivational"
import type { useChallengeStore } from "@/hooks/use-challenge-store"

type Store = ReturnType<typeof useChallengeStore>

export function TodayView({ store }: { store: Store }) {
  const [selected, setSelected] = useState<Exercise | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const dateLabel = useMemo(() => {
    const formatted = new Intl.DateTimeFormat("pt-PT", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date())
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
  }, [])

  const message = useMemo(() => getDailyMessage(), [])

  const handleToggle = (id: string) => {
    // Evaluated with pre-toggle values (state update is async): checking the
    // last remaining exercise completes the whole challenge.
    const willComplete = !store.isDone(id) && store.completedCount === store.total - 1
    store.toggle(id)
    if (willComplete) setShowConfetti(true)
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col px-5 pb-28 pt-8">
      <Confetti active={showConfetti} onDone={() => setShowConfetti(false)} />

      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          DOVIER Daily
        </p>
        <h1 className="mt-1 text-balance text-2xl font-semibold leading-tight">
          {dateLabel}
        </h1>
      </header>

      {/* Progress + streak hero */}
      <div className="mb-5 flex flex-col items-center rounded-3xl border border-border bg-card p-6">
        <ProgressRing progress={store.progress}>
          {store.allComplete ? (
            <>
              <PartyPopper className="mb-1 size-7 text-primary" />
              <span className="text-balance px-6 text-center text-lg font-semibold leading-tight">
                Desafio concluído!
              </span>
            </>
          ) : (
            <>
              <span className="text-5xl font-bold tabular-nums leading-none">
                {store.completedCount}
                <span className="text-2xl text-muted-foreground">/{store.total}</span>
              </span>
              <span className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                Exercícios
              </span>
            </>
          )}
        </ProgressRing>

        <div className="mt-5 flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2">
          <Flame
            className={`size-5 ${store.streak > 0 ? "text-primary" : "text-muted-foreground"}`}
            fill={store.streak > 0 ? "currentColor" : "none"}
          />
          <span className="text-[15px] font-semibold tabular-nums">
            {store.streak}
          </span>
          <span className="text-[13px] text-muted-foreground">
            {store.streak === 1 ? "dia seguido" : "dias seguidos"}
          </span>
        </div>
      </div>

      {/* Motivational message */}
      <div className="mb-6 rounded-2xl border border-primary/25 bg-primary/5 px-5 py-4">
        <p className="text-balance text-[14px] leading-relaxed text-foreground/90">
          &ldquo;{message}&rdquo;
        </p>
      </div>

      {/* Exercises */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          Exercícios de hoje
        </h2>
        {store.completedCount > 0 && (
          <button
            type="button"
            onClick={store.resetToday}
            className="flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Reiniciar
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        {EXERCISES.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            done={store.isDone(exercise.id)}
            onToggle={() => handleToggle(exercise.id)}
            onOpen={() => setSelected(exercise)}
          />
        ))}
      </div>

      <ExerciseDetail
        exercise={selected}
        done={selected ? store.isDone(selected.id) : false}
        onToggle={() => {
          if (selected) handleToggle(selected.id)
        }}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
