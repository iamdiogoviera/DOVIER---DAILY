"use client"

import { Check, ChevronRight } from "lucide-react"
import type { Exercise } from "@/lib/exercises"
import { cn } from "@/lib/utils"

interface ExerciseCardProps {
  exercise: Exercise
  done: boolean
  onToggle: () => void
  onOpen: () => void
}

export function ExerciseCard({
  exercise,
  done,
  onToggle,
  onOpen,
}: ExerciseCardProps) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 active:scale-[0.99]",
        done && "border-primary/40 bg-primary/5",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={done ? `Marcar ${exercise.name} como não feito` : `Marcar ${exercise.name} como feito`}
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
          done
            ? "border-primary bg-primary text-primary-foreground scale-100"
            : "border-muted-foreground/40 text-transparent hover:border-primary/60",
        )}
      >
        <Check className={cn("size-4 transition-transform", done ? "scale-100" : "scale-0")} strokeWidth={3} />
      </button>

      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 items-center justify-between gap-2 text-left"
      >
        <span className="min-w-0">
          <span
            className={cn(
              "block truncate text-[15px] font-medium leading-tight transition-colors",
              done ? "text-muted-foreground line-through" : "text-foreground",
            )}
          >
            {exercise.name}
          </span>
          <span className="mt-0.5 block truncate font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {exercise.target}
          </span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  )
}
