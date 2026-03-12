'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import sermon from '@/content/sermon.json'

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

export default function Sermon() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="sermon" className="bg-black py-20 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.div {...fadeUp(0)}>
            <SectionLabel text={sermon.section_overline} className="mb-6" />
          </motion.div>

          <motion.h2
            className="font-display font-black text-cream leading-tight mb-4"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
            {...fadeUp(0.08)}
          >
            {sermon.title}
          </motion.h2>

          <motion.p
            className="font-body text-ash text-[14px] uppercase tracking-widest mb-4"
            {...fadeUp(0.16)}
          >
            {sermon.speaker} · {sermon.date}
          </motion.p>

          <motion.p
            className="font-body text-ash max-w-2xl leading-relaxed"
            style={{ fontSize: '16px' }}
            {...fadeUp(0.24)}
          >
            {sermon.description}
          </motion.p>
        </div>

        {/* Video Embed */}
        <motion.div
          className="relative aspect-video rounded-2xl overflow-hidden bg-charcoal border border-smoke mb-10"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
        >
          {!playing ? (
            <>
              {/* Thumbnail with play button */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-black flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(240,144,80,0.15)_0%,transparent_70%)]" />
                <motion.button
                  onClick={() => setPlaying(true)}
                  className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-ember hover:bg-flame transition-colors duration-300 shadow-[0_0_40px_rgba(196,97,42,0.5)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Play video"
                >
                  <Play size={28} className="text-cream ml-1" fill="#FFE1D2" />
                </motion.button>
                <div className="absolute bottom-6 left-6">
                  <p className="font-display text-[11px] text-flame uppercase tracking-[0.2em] mb-1">
                    Now Playing
                  </p>
                  <p className="font-display font-bold text-cream text-lg">
                    {sermon.title}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <iframe
              src={`${sermon.video_url}?autoplay=1`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          {...fadeUp(0.3)}
        >
          <Button label={sermon.watch_cta.label} href={sermon.watch_cta.href} variant="primary" />
          <a
            href={sermon.archive_cta.href}
            className="inline-flex items-center font-body text-flame text-[14px] hover:text-cream transition-colors duration-200 py-4"
          >
            {sermon.archive_cta.label}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
