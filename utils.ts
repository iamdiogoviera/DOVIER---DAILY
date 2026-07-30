"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { EXERCISES } from "@/lib/exercises"
import {
  type ChallengeState,
  computeBestStreak,
  computeStreak,
  dateKey,
  emptyState,
  loadState,
  saveState,
} from "@/lib/storage"

const TOTAL = EXERCISES.length

export function useChallengeStore() {
  const [state, setState] = useState<ChallengeState>(emptyState)
  const [hydrated, setHydrated] = useState(false)
  const today = dateKey()

  useEffect(() => {
    setState(loadState())
    setHydrated(true)
  }, [])

  // Persist whenever state changes (after hydration).
  useEffect(() => {
    if (hydrated) saveState(state)
  }, [state, hydrated])

  const todayDone = useMemo(() => state.daily[today] ?? [], [state.daily, today])

  const isDone = useCallback(
    (id: string) => todayDone.includes(id),
    [todayDone],
  )

  const allComplete = todayDone.length === TOTAL

  const toggle = useCallback(
    (id: string) => {
      setState((prev) => {
        const current = prev.daily[today] ?? []
        const next = current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id]

        const daily = { ...prev.daily, [today]: next }

        // Recompute completed-days membership for today.
        const fullyDone = next.length === TOTAL
        const completedSet = new Set(prev.completedDays)
        if (fullyDone) completedSet.add(today)
        else completedSet.delete(today)

        return {
          daily,
          completedDays: Array.from(completedSet),
        }
      })
    },
    [today],
  )

  const resetToday = useCallback(() => {
    setState((prev) => {
      const daily = { ...prev.daily, [today]: [] }
      const completedSet = new Set(prev.completedDays)
      completedSet.delete(today)
      return { daily, completedDays: Array.from(completedSet) }
    })
  }, [today])

  const streak = useMemo(
    () => computeStreak(state.completedDays),
    [state.completedDays],
  )
  const bestStreak = useMemo(
    () => computeBestStreak(state.completedDays),
    [state.completedDays],
  )

  return {
    hydrated,
    total: TOTAL,
    completedCount: todayDone.length,
    progress: TOTAL === 0 ? 0 : todayDone.length / TOTAL,
    allComplete,
    isDone,
    toggle,
    resetToday,
    streak,
    bestStreak,
    completedDays: state.completedDays,
    totalCompletedDays: state.completedDays.length,
  }
}
