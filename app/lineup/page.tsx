'use client'

import { useState } from 'react'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/sections/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import lineupData from '@/content/lineup.json'

type SessionType =
  | 'worship'
  | 'ministry'
  | 'devotion'
  | 'workshop'
  | 'prayer'
  | 'logistics'
  | 'ceremony'

const typeBadgeStyles: Record<SessionType, string> = {
  worship: 'bg-flame/20 text-flame border-flame/30',
  ministry: 'bg-ember/20 text-ember border-ember/30',
  devotion: 'bg-gold/20 text-gold border-gold/30',
  workshop: 'bg-smoke/60 text-cream border-smoke',
  prayer: 'bg-ash/20 text-ash border-ash/30',
  logistics: 'bg-smoke/40 text-ash/70 border-smoke/50',
  ceremony: 'bg-gold/20 text-gold border-gold/30',
}

function getTypeStyle(type: string): string {
  return typeBadgeStyles[type as SessionType] ?? 'bg-smoke/40 text-ash border-smoke/50'
}

export default function LineupPage() {
  const [openDays, setOpenDays] = useState<Record<number, boolean>>(
    Object.fromEntries(lineupData.days.map((_, i) => [i, true]))
  )

  const toggle = (i: number) => {
    setOpenDays((prev) => ({ ...prev, [i]: !prev[i] }))
  }

  return (
    <>
      <Navigation />
      <main className="bg-black min-h-screen">
        {/* Page Hero */}
        <div
          className="relative pt-40 pb-24 px-6"
          style={{
            background: 'linear-gradient(135deg, #0A0A0A 0%, #2A1F18 60%, #C4612A 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <SectionLabel text={lineupData.section_overline} className="mb-6" />
            <h1
              className="font-display font-black text-cream leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              {lineupData.section_title}
            </h1>
            <p className="font-body text-ash max-w-xl leading-relaxed" style={{ fontSize: '17px' }}>
              {lineupData.subtitle}
            </p>
          </div>
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
          />
        </div>

        {/* Day Cards */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 space-y-6">
          {lineupData.days.map((day, i) => (
            <div
              key={i}
              className="bg-charcoal border border-smoke rounded-2xl overflow-hidden"
            >
              {/* Day Header — clickable on mobile */}
              <button
                className="w-full text-left px-8 py-6 flex items-center justify-between gap-4 group md:cursor-default"
                onClick={() => toggle(i)}
                aria-expanded={openDays[i]}
              >
                <div className="flex items-center gap-6">
                  <span
                    className="font-display font-black text-ember shrink-0"
                    style={{ fontSize: 'clamp(20px, 3vw, 32px)' }}
                  >
                    {day.day}
                  </span>
                  <div>
                    <p className="font-body text-ash text-sm">{day.date}</p>
                    <p
                      className="font-display font-bold text-cream"
                      style={{ fontSize: '15px' }}
                    >
                      {day.theme}
                    </p>
                  </div>
                </div>
                <span
                  className={`md:hidden text-ash transition-transform duration-300 ${openDays[i] ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </button>

              {/* Sessions */}
              <div
                className={`${openDays[i] ? 'block' : 'hidden md:block'} border-t border-smoke/60 px-8 py-4 space-y-3`}
              >
                {day.sessions.map((session, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-4 py-3 border-b border-smoke/30 last:border-0"
                  >
                    <span
                      className="font-display font-bold text-ash shrink-0 tabular-nums"
                      style={{ fontSize: '13px', minWidth: '72px' }}
                    >
                      {session.time}
                    </span>
                    <span
                      className="font-body text-cream flex-1 leading-snug"
                      style={{ fontSize: '15px' }}
                    >
                      {session.title}
                    </span>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full border text-[10px] font-display font-bold uppercase tracking-wider ${getTypeStyle(session.type)}`}
                    >
                      {session.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-24">
          <div
            className="rounded-2xl p-12 text-center"
            style={{ background: 'linear-gradient(135deg, #1C1410 0%, #2A1F18 50%, #C4612A20 100%)', border: '1px solid #2A1F18' }}
          >
            <SectionLabel text="May 4–9, 2026" className="mb-4 justify-center" />
            <h2
              className="font-display font-black text-cream mb-4"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Reserve Your Spot at FIRE CAMP 2026
            </h2>
            <p className="font-body text-ash mb-8 max-w-md mx-auto" style={{ fontSize: '16px' }}>
              Don&apos;t miss a single session. Register now and secure your place.
            </p>
            <Button label="Register Now" href="/#register" variant="primary" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
