'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import about from '@/content/about.json'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
}

export default function About() {
  return (
    <section id="about" className="bg-black overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left: Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 xl:p-20">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0 }}
          >
            <SectionLabel text={about.overline} className="mb-6" />
          </motion.div>

          <motion.h2
            className="font-display font-bold text-cream leading-tight mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.08 }}
          >
            {about.headline}
          </motion.h2>

          <motion.p
            className="font-body text-ash max-w-lg leading-[1.8] mb-8"
            style={{ fontSize: '16px' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.16 }}
          >
            {about.body}
          </motion.p>

          <motion.blockquote
            className="font-body italic text-gold text-lg border-l-2 border-gold/40 pl-5 mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.24 }}
          >
            &ldquo;{about.quote}&rdquo;
          </motion.blockquote>

          <motion.a
            href={about.cta_href}
            className="inline-flex items-center gap-2 font-body text-flame text-[14px] hover:underline underline-offset-4 transition-all group"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.32 }}
          >
            {about.cta_label}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>

        {/* Right: Image */}
        <motion.div
          className="relative min-h-[400px] lg:min-h-0 overflow-hidden"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 }}
        >
          <Image
            src={about.image}
            alt="About FIRE CAMP"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Warm glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_60%,rgba(240,144,80,0.2)_0%,rgba(10,10,10,0.1)_70%)]" />
        </motion.div>
      </div>
    </section>
  )
}
