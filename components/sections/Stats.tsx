'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import stats from '@/content/stats.json'

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (inView && !startedRef.current) {
      startedRef.current = true
      const steps = 40
      const increment = target / steps
      const interval = duration / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, interval)
      return () => clearInterval(timer)
    }
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function Stats() {
  return (
    <section className="bg-charcoal py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="surface-panel relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-flame/60 to-transparent" />
          <div className="absolute -left-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-flame/10 blur-3xl" />
          <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-gold/10 blur-3xl" />
          <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center text-center py-10 px-4 ${
                index < stats.items.length - 1
                  ? 'lg:border-r border-white/10'
                  : ''
              } ${
                index === 0 || index === 2
                  ? 'border-r border-white/10'
                  : ''
              } ${
                index < 2
                  ? 'border-b border-white/10 lg:border-b-0'
                  : ''
              }`}
            >
              <div className="absolute inset-x-8 top-0 h-px overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent [animation:var(--animate-shimmer-line)]" />
              </div>
              <div
                className="font-display text-cream leading-none"
                style={{ fontSize: 'clamp(40px, 5vw, 56px)' }}
              >
                <CountUp target={parseInt(item.number)} />
                <span className="text-flame">{item.suffix}</span>
              </div>
              <p className="font-body text-ash text-[13px] uppercase tracking-[0.22em] mt-4">
                {item.label}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
