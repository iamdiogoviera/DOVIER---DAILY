"use client"

import { useEffect, useRef } from "react"

interface ConfettiProps {
  active: boolean
  onDone?: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  vr: number
  color: string
  life: number
}

const COLORS = ["#8fff6a", "#b6ff9c", "#ffffff", "#5ce65c", "#e8ffe0"]

export function Confetti({ active, onDone }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.scale(dpr, dpr)

    const particles: Particle[] = []
    const count = 160
    for (let i = 0; i < count; i++) {
      particles.push({
        x: w / 2 + (Math.random() - 0.5) * 120,
        y: h / 3,
        vx: (Math.random() - 0.5) * 14,
        vy: Math.random() * -16 - 4,
        size: Math.random() * 8 + 4,
        rotation: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 1,
      })
    }

    const gravity = 0.4
    let running = true
    const start = performance.now()

    const tick = (now: number) => {
      if (!running) return
      ctx.clearRect(0, 0, w, h)
      const elapsed = now - start

      particles.forEach((p) => {
        p.vy += gravity
        p.vx *= 0.99
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.vr
        if (elapsed > 1600) p.life -= 0.02

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      })

      if (elapsed < 2600) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, w, h)
        onDone?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [active, onDone])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
    />
  )
}
