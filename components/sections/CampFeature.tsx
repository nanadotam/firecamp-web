'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import firecamp2026 from '@/content/firecamp2026.json'

export default function CampFeature() {
  return (
    <section
      id="register"
      className="relative min-h-[80vh] flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={firecamp2026.background_image}
          alt="FIRE CAMP 2026"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Ember Rise Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(10,10,10,0.90) 0%, rgba(42,31,24,0.85) 50%, rgba(196,97,42,0.75) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-3xl"
        >
          <SectionLabel text={firecamp2026.overline} className="mb-8" />

          <h2 className="font-display font-black leading-none tracking-tight mb-4">
            <span
              className="block text-cream"
              style={{ fontSize: 'clamp(64px, 10vw, 120px)' }}
            >
              {firecamp2026.headline_line1}
            </span>
            <span
              className="block text-flame"
              style={{ fontSize: 'clamp(64px, 10vw, 120px)' }}
            >
              {firecamp2026.headline_line2}
            </span>
          </h2>

          <p className="font-display font-bold text-gold text-2xl lg:text-3xl mb-8 tracking-wide">
            {firecamp2026.theme}
          </p>

          <div className="flex flex-wrap gap-6 mb-10 font-body text-ash text-[15px]">
            <span>{firecamp2026.dates}</span>
            <span className="text-smoke">·</span>
            <span>{firecamp2026.duration}</span>
            <span className="text-smoke">·</span>
            <span>{firecamp2026.location}</span>
          </div>

          <p className="font-body text-cream/90 text-xl mb-2 leading-relaxed">
            {firecamp2026.description}
          </p>
          <p className="font-body text-ash mb-10">
            {firecamp2026.sub_description}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              label={firecamp2026.cta_primary.label}
              href={firecamp2026.cta_primary.href}
              variant="primary"
            />
            <Button
              label={firecamp2026.cta_secondary.label}
              href={firecamp2026.cta_secondary.href}
              variant="ghost"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
