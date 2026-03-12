'use client'

import { motion, type Variants } from 'framer-motion'
import { MapPin, Play, Heart, Users } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import nextsteps from '@/content/nextsteps.json'

const iconMap: Record<string, React.ReactNode> = {
  MapPin: <MapPin size={24} />,
  Play: <Play size={24} />,
  Heart: <Heart size={24} />,
  Users: <Users size={24} />,
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export default function NextSteps() {
  return (
    <section className="bg-black py-20 lg:py-32 border-t border-smoke">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel text={nextsteps.section_overline} className="mb-6" />
          </motion.div>
          <motion.h2
            className="font-display font-black text-cream leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          >
            {nextsteps.section_title}
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {nextsteps.steps.map((step) => (
            <motion.a
              key={step.id}
              href={step.href}
              variants={cardVariants}
              whileHover={{
                y: -4,
                borderColor: 'rgba(196, 97, 42, 0.4)',
                boxShadow: '0 0 40px rgba(196, 97, 42, 0.12)',
              }}
              className="group relative bg-charcoal border border-smoke rounded-xl p-8 cursor-pointer transition-colors duration-300 block"
            >
              {/* Icon */}
              <div className="text-flame mb-5">
                {iconMap[step.icon] || <MapPin size={24} />}
              </div>

              {/* Overline */}
              <p className="font-display text-[10px] text-ash uppercase tracking-[0.2em] mb-3">
                {step.overline}
              </p>

              {/* Title */}
              <h3
                className="font-display font-bold text-cream leading-tight mb-3"
                style={{ fontSize: '28px' }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p className="font-body text-ash text-[15px] leading-relaxed mb-6">
                {step.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-2 text-flame text-[13px] font-body">
                {step.cta}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
