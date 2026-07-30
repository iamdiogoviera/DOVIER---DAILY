"use client"

import { useEffect, useState } from "react"
import { Check, ListChecks, Lightbulb, TriangleAlert, X } from "lucide-react"
import type { Exercise } from "@/lib/exercises"
import { cn } from "@/lib/utils"

interface ExerciseDetailProps {
  exercise: Exercise | null
  done: boolean
  onToggle: () => void
  onClose: () => void
}

export function ExerciseDetail({
  exercise,
  done,
  onToggle,
  onClose,
}: ExerciseDetailProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (exercise) {
      setMounted(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [exercise])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  if (!exercise && !mounted) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={exercise?.name}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          exercise ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        onTransitionEnd={() => {
          if (!exercise) setMounted(false)
        }}
        className={cn(
          "relative flex max-h-[88vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl transition-transform duration-300 ease-out sm:rounded-3xl",
          exercise ? "translate-y-0" : "translate-y-full",
        )}
      >
        {exercise && (
          <>
            <div className="flex items-start justify-between gap-3 border-b border-border p-5 pb-4">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                  {exercise.target}
                </p>
                <h2 className="mt-1 text-balance text-2xl font-semibold leading-tight">
                  {exercise.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-5">
              <Section icon={<ListChecks className="size-4" />} title="Como fazer">
                <ol className="space-y-2.5">
                  {exercise.howTo.map((step, i) => (
                    <li key={i} className="flex gap-3 text-[14px] leading-relaxed">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[11px] text-primary">
                        {i + 1}
                      </span>
                      <span className="text-foreground/90">{step}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section title="Músculos trabalhados">
                <div className="flex flex-wrap gap-2">
                  {exercise.muscles.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[12px] font-medium text-primary"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </Section>

              <Section
                icon={<TriangleAlert className="size-4" />}
                title="Erros comuns"
              >
                <ul className="space-y-2">
                  {exercise.mistakes.map((m, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/90">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                      {m}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section icon={<Lightbulb className="size-4" />} title="Dicas">
                <ul className="space-y-2">
                  {exercise.tips.map((t, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground/90">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Section>
            </div>

            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={onToggle}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold transition-all duration-300 active:scale-[0.98]",
                  done
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                <Check className="size-5" strokeWidth={2.5} />
                {done ? "Concluído — desmarcar" : "Marcar como feito"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="mb-6 last:mb-0">
      <h3 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        {icon}
        {title}
      </h3>
      {children}
    </section>
  )
}
