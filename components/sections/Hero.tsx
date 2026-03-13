'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import Countdown from '@/components/ui/Countdown'
import hero from '@/content/hero.json'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const HERO_SLIDES = [
  { image: '/images/hero/FC-21.webp', alt: 'Fire Camp — Where God Shows Up' },
  { image: '/images/hero/FC-22.webp', alt: 'Fire Camp — Revival Atmosphere' },
  { image: '/images/hero/FC-23.webp', alt: 'Fire Camp — Prayer. Word. Encounter.' },
  { image: '/images/hero/FC-24.webp', alt: 'Fire Camp — Zion Impact Ministries' },
  { image: '/images/hero/FC-25.webp', alt: 'Fire Camp — Come Hungry' },
  { image: '/images/hero/FC-26.webp', alt: 'Fire Camp — You Will Not Leave the Same' },
]

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
})

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">

      {/* ── Swiper background slider ── */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: '.hero-pagination',
          }}
          loop={true}
          speed={1200}
          className="h-full w-full"
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.image} className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={slide.image === HERO_SLIDES[0].image}
                className="object-cover object-center"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/50" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.48)_0%,rgba(10,10,10,0.24)_22%,rgba(10,10,10,0.82)_84%,#0A0A0A_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(232,164,74,0.16),transparent_28%),radial-gradient(circle_at_78%_30%,rgba(240,144,80,0.16),transparent_32%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      <div className="absolute -left-24 top-40 h-64 w-64 rounded-full bg-flame/15 blur-3xl" />
      <div className="absolute bottom-16 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

      {/* ── Text content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-28 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="max-w-5xl">
            <motion.div {...fadeUp(0.1)}>
              <SectionLabel text={hero.overline} className="mb-8" />
            </motion.div>

            <motion.h1 className="font-display leading-[0.92] tracking-[-0.05em]" {...fadeUp(0.2)}>
              <span
                className="block text-cream text-balance"
                style={{ fontSize: 'clamp(58px, 9vw, 124px)' }}
              >
                {hero.headline_line1}
              </span>
              <span
                className="block bg-gradient-to-r from-[#FFF0DE] via-[#F8B56A] to-[#EF7B43] bg-clip-text text-transparent"
                style={{ fontSize: 'clamp(58px, 9vw, 124px)' }}
              >
                {hero.headline_line2}
              </span>
            </motion.h1>

            <motion.p
              className="font-body mt-6 max-w-2xl text-[17px] leading-8 text-[#E7D2C5] text-balance md:text-[18px]"
              {...fadeUp(0.35)}
            >
              {hero.subtext}
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...fadeUp(0.5)}>
              <Button label={hero.primary_cta.label} href={hero.primary_cta.href} variant="primary" />
              <Button label={hero.secondary_cta.label} href={hero.secondary_cta.href} variant="ghost" />
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4 text-[12px] uppercase tracking-[0.24em] text-[#D9BDAF]"
              {...fadeUp(0.65)}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm">
                <Sparkles size={14} className="text-flame" />
                Revival Atmosphere
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm">
                Prayer. Word. Encounter.
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Swiper pagination dots ── */}
      <div className="hero-pagination absolute bottom-20 left-1/2 z-20 -translate-x-1/2 flex gap-2" />

      <Countdown variant="hero" />

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-ash flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-ash/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
