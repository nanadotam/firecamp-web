'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/sections/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import podcastData from '@/content/podcast.json'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function PodcastPage() {
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
            <SectionLabel text={podcastData.page_overline} className="mb-6" />
            <h1
              className="font-display font-black text-cream leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              {podcastData.page_title}
            </h1>
            <p className="font-body text-ash max-w-xl leading-relaxed mb-8" style={{ fontSize: '17px' }}>
              {podcastData.subtitle}
            </p>

            {/* Platform Links */}
            <div className="flex flex-wrap gap-3">
              {podcastData.platform_links.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  className="inline-flex items-center px-5 py-2.5 border border-ember text-cream font-display font-bold text-[11px] uppercase tracking-widest rounded-sm hover:bg-ember/20 transition-all duration-200"
                >
                  {platform.name} →
                </a>
              ))}
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
          />
        </div>

        {/* Episodes */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16 space-y-6">
          {podcastData.episodes.map((episode, i) => (
            <motion.div
              key={episode.id}
              className="group bg-charcoal border border-smoke rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 hover:border-ember/40 transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            >
              {/* Thumbnail */}
              <div className="relative w-full md:w-48 shrink-0 aspect-square md:aspect-auto overflow-hidden bg-smoke">
                <Image
                  src={episode.thumbnail}
                  alt={episode.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 192px"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
                {/* Play icon */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center">
                    <Play size={20} className="text-cream ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Episode badge */}
                  <span className="inline-block px-2 py-0.5 bg-ember/20 text-ember border border-ember/30 text-[10px] font-display font-bold uppercase tracking-wider rounded-sm mb-3">
                    {episode.episode}
                  </span>

                  <h2
                    className="font-display font-bold text-cream leading-tight mb-2"
                    style={{ fontSize: '22px' }}
                  >
                    {episode.title}
                  </h2>

                  <p className="font-body text-ash mb-3" style={{ fontSize: '13px' }}>
                    {episode.guest} &middot; {episode.duration} &middot; {episode.date}
                  </p>

                  <p className="font-body text-ash leading-relaxed" style={{ fontSize: '14px' }}>
                    {episode.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <button className="inline-flex items-center gap-2 bg-ember hover:bg-flame text-cream px-5 py-2.5 text-[11px] font-display font-bold uppercase tracking-widest rounded-sm transition-all duration-300">
                    <Play size={12} fill="currentColor" />
                    Listen Now
                  </button>
                  <div className="flex gap-2">
                    {podcastData.platform_links.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.href}
                        className="text-[11px] font-body text-ash hover:text-cream transition-colors duration-200 underline underline-offset-2"
                      >
                        {platform.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
