'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import data from '@/content/testimonies.json'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

export default function Testimonies() {
  return (
    <section className="bg-charcoal py-24 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel text={data.section_overline} className="mb-6" />
          </motion.div>

          <motion.h2
            className="font-display font-black text-cream leading-tight"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          >
            {data.section_title}
          </motion.h2>

          <motion.p
            className="font-body text-ash max-w-xl mt-4 leading-relaxed"
            style={{ fontSize: '16px' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
          >
            {data.subtitle}
          </motion.p>
        </div>

        {/* Testimony Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {data.testimonies.map((testimony, i) => (
            <motion.div
              key={testimony.id}
              className="group bg-black border border-smoke rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(196,97,42,0.2)]"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
            >
              {/* Photo */}
              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={testimony.image}
                  alt={testimony.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 border-l-2 border-gold relative">
                {/* Decorative quote mark */}
                <span
                  className="absolute top-4 left-6 font-display font-black leading-none pointer-events-none select-none"
                  style={{ fontSize: '80px', color: 'rgba(240,144,80,0.10)', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                {/* Quote */}
                <p
                  className="font-body italic text-cream/90 leading-[1.7] relative z-10 mt-2"
                  style={{ fontSize: '15px' }}
                >
                  {testimony.quote}
                </p>

                {/* Attribution */}
                <div className="mt-4 pt-4 border-t border-smoke/60">
                  <p
                    className="font-display font-bold text-cream uppercase tracking-wider"
                    style={{ fontSize: '13px' }}
                  >
                    {testimony.name}
                  </p>
                  <p className="font-body text-ash mt-0.5" style={{ fontSize: '12px' }}>
                    {testimony.location} &middot; {testimony.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
        >
          <Button label={data.cta.label} href={data.cta.href} variant="primary" />
        </motion.div>
      </div>
    </section>
  )
}
