'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import eventsData from '@/content/events.json'

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

interface EventCardProps {
  event: (typeof eventsData.events)[0]
  featured?: boolean
}

function EventCard({ event, featured = false }: EventCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
        featured ? 'min-h-[500px]' : 'min-h-[300px]'
      }`}
    >
      {/* Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center"
          sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
        />
      </div>

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 40%, transparent 70%)',
        }}
      />

      {/* Date Pill */}
      <div className="absolute top-4 left-4 z-10">
        <span className="inline-block bg-ember text-cream text-[10px] font-display font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full">
          {event.date}
        </span>
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 p-6 ${featured ? 'lg:p-10' : 'p-6'}`}
      >
        <p className="font-display text-[10px] text-flame uppercase tracking-[0.2em] mb-2">
          {event.subtitle} · {event.location}
        </p>
        <h3
          className={`font-display font-bold text-cream leading-tight mb-3 ${
            featured ? 'text-2xl lg:text-4xl' : 'text-xl'
          }`}
        >
          {event.title}
        </h3>
        <p className="font-body text-ash/80 text-[14px] leading-relaxed mb-5 max-w-lg">
          {event.description}
        </p>
        <a
          href={event.cta_href}
          className="inline-flex items-center gap-2 border border-cream/40 text-cream hover:border-cream hover:bg-cream/5 text-[11px] font-display font-bold uppercase tracking-[0.15em] px-6 py-3 rounded-sm transition-all duration-300"
        >
          {event.cta_label} →
        </a>
      </div>
    </motion.div>
  )
}

export default function Events() {
  const featured = eventsData.events.find((e) => e.featured)
  const secondary = eventsData.events.filter((e) => !e.featured)

  return (
    <section id="events" className="bg-black py-20 lg:py-32 border-t border-smoke">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel text={eventsData.section_overline} className="mb-6" />
          </motion.div>
          <motion.h2
            className="font-display font-black text-cream leading-tight"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {eventsData.section_title}
          </motion.h2>
        </div>

        {/* Events Grid */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Featured Event */}
          {featured && <EventCard event={featured} featured={true} />}

          {/* Secondary Events */}
          {secondary.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {secondary.map((event) => (
                <EventCard key={event.id} event={event} featured={false} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
