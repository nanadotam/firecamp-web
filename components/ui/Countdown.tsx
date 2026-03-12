'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const TARGET_DATE = new Date('2026-05-04T00:00:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const now = new Date()
  const diff = TARGET_DATE.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

interface CountdownProps {
  variant?: 'hero' | 'popover'
}

export default function Countdown({ variant }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft())
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Track scroll for popover state (only needed when used without explicit variant)
  useEffect(() => {
    if (variant) return
    const handleScroll = () => {
      setIsScrolledPastHero(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [variant])

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ]

  // Hero overlay variant — rendered inside Hero.tsx
  if (variant === 'hero') {
    return (
      <motion.div
        className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-[1.5rem] border border-white/10 bg-black/30 px-3 py-3 backdrop-blur-xl md:gap-3 md:px-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      >
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3">
            <div className="flex min-w-[64px] flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-3 md:min-w-[72px] md:px-4">
              <span
                className="font-display leading-none text-cream tabular-nums"
                style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
              >
                {pad(unit.value)}
              </span>
              <span className="font-body text-ash uppercase tracking-widest mt-1" style={{ fontSize: '11px' }}>
                {unit.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="font-display font-black text-flame leading-none"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', marginTop: '-8px' }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </motion.div>
    )
  }

  // Global popover variant — rendered in app/page.tsx
  // Show popover only when scrolled past hero and not dismissed
  const showPopover = isScrolledPastHero && !dismissed

  return (
    <AnimatePresence>
      {showPopover && (
        <motion.div
          key="countdown-popover"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 bg-charcoal border border-smoke rounded-2xl shadow-2xl p-4 min-w-[220px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-display font-bold text-flame uppercase tracking-[0.15em]"
              style={{ fontSize: '9px' }}
            >
              FIRE CAMP 2026
            </span>
            <button
              onClick={() => setDismissed(true)}
              className="text-ash hover:text-cream transition-colors p-0.5"
              aria-label="Close countdown"
            >
              <X size={14} />
            </button>
          </div>

          {/* Compact countdown row */}
          <div className="flex items-center gap-2">
            {units.map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span
                    className="font-display font-bold text-cream leading-none tabular-nums"
                    style={{ fontSize: '28px' }}
                  >
                    {pad(unit.value)}
                  </span>
                  <span className="font-body text-ash uppercase tracking-widest mt-0.5" style={{ fontSize: '9px' }}>
                    {unit.label}
                  </span>
                </div>
                {i < units.length - 1 && (
                  <span className="font-display font-black text-flame leading-none mb-3" style={{ fontSize: '18px' }}>
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
