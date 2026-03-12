'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import Navigation from '@/components/nav/Navigation'
import Footer from '@/components/sections/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import messagesData from '@/content/messages.json'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

interface Message {
  id: string
  title: string
  speaker: string
  series: string
  duration: string
  thumbnail: string
  youtube_id: string
  description: string
}

function MessageCard({
  message,
  onPlay,
}: {
  message: Message
  onPlay: (id: string) => void
}) {
  return (
    <motion.div
      className="group bg-charcoal border border-smoke rounded-2xl overflow-hidden flex flex-col cursor-pointer hover:border-ember/50 transition-all duration-300"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: EASE }}
      onClick={() => onPlay(message.youtube_id)}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-smoke">
        <Image
          src={message.thumbnail}
          alt={message.title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-ember flex items-center justify-center shadow-lg">
            <Play size={24} className="text-cream ml-1" fill="currentColor" />
          </div>
        </div>
        {/* Series badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-ember text-cream text-[10px] font-display font-bold uppercase tracking-wider rounded-sm">
            {message.series}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3
          className="font-display font-bold text-cream leading-tight mb-2"
          style={{ fontSize: '20px' }}
        >
          {message.title}
        </h3>
        <p className="font-body text-ash mb-3" style={{ fontSize: '13px' }}>
          {message.speaker} &middot; {message.duration}
        </p>
        <p
          className="font-body text-ash leading-relaxed flex-1 line-clamp-2"
          style={{ fontSize: '14px' }}
        >
          {message.description}
        </p>
        <button
          className="mt-4 self-start font-display font-bold text-flame text-[11px] uppercase tracking-widest border border-flame/40 px-4 py-2 rounded-sm hover:bg-flame/10 transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation()
            onPlay(message.youtube_id)
          }}
        >
          Watch Now →
        </button>
      </div>
    </motion.div>
  )
}

export default function MessagesPage() {
  const [activeYear, setActiveYear] = useState(messagesData.years[0]?.year ?? '')
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const currentYear = messagesData.years.find((y) => y.year === activeYear)

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
            <SectionLabel text={messagesData.page_overline} className="mb-6" />
            <h1
              className="font-display font-black text-cream leading-none tracking-tight mb-6"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
            >
              {messagesData.page_title}
            </h1>
            <p className="font-body text-ash max-w-xl leading-relaxed" style={{ fontSize: '17px' }}>
              {messagesData.subtitle}
            </p>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{ background: 'linear-gradient(to bottom, transparent, #0A0A0A)' }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
          {/* Year Tabs */}
          {messagesData.years.length > 1 && (
            <div className="flex gap-3 mb-12">
              {messagesData.years.map((y) => (
                <button
                  key={y.year}
                  onClick={() => setActiveYear(y.year)}
                  className={`px-6 py-2 rounded-sm font-display font-bold text-[11px] uppercase tracking-widest transition-all duration-200 ${
                    activeYear === y.year
                      ? 'bg-ember text-cream'
                      : 'border border-smoke text-ash hover:border-ember/50 hover:text-cream'
                  }`}
                >
                  {y.year}
                </button>
              ))}
            </div>
          )}

          {/* Message Grid */}
          {currentYear && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {currentYear.messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onPlay={setActiveVideoId}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            key="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center px-6"
            onClick={() => setActiveVideoId(null)}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute top-6 right-6 p-2 text-cream/60 hover:text-cream transition-colors"
              aria-label="Close video"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="FIRE CAMP Message"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
