'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import nav from '@/content/nav.json'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.28)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="#home" className="flex items-center gap-3 shrink-0">
              <Image
                src="/logo/FIRE-CAMP-LOGO-White-Variant.svg"
                width={56}
                height={56}
                alt="FIRE CAMP"
                priority
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <div className="font-display text-sm uppercase tracking-[0.24em] text-cream">
                  Fire Camp
                </div>
                <div className="font-body text-[11px] uppercase tracking-[0.28em] text-ash">
                  Zion Impact Ministries
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[13px] text-ash hover:text-cream uppercase tracking-[0.18em] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href={nav.cta.href}
                className="inline-flex items-center gap-2 rounded-full border border-flame/50 bg-ember px-6 py-3 text-[11px] font-display uppercase tracking-[0.18em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-flame hover:shadow-[0_16px_40px_rgba(240,144,80,0.24)]"
              >
                {nav.cta.label}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-cream hover:text-flame transition-colors"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed top-20 left-0 right-0 z-40 border-b border-white/10 bg-charcoal/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
              {nav.links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-body text-[15px] text-ash hover:text-cream uppercase tracking-widest transition-colors py-2 border-b border-smoke/60"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.links.length * 0.06, duration: 0.3 }}
              >
                <Link
                  href={nav.cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 bg-ember hover:bg-flame text-cream px-6 py-3.5 text-[11px] font-display font-bold uppercase tracking-[0.15em] rounded-sm transition-all duration-300"
                >
                  {nav.cta.label} →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
