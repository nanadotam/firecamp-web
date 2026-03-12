'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
  className?: string
  onClick?: () => void
  external?: boolean
}

function ArrowIcon() {
  return (
    <motion.span
      initial={{ x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="inline-block"
    >
      →
    </motion.span>
  )
}

export default function Button({
  label,
  href,
  variant = 'primary',
  className = '',
  onClick,
  external = false,
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center gap-2 rounded-full px-8 py-4 text-[11px] uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer select-none'

  const primaryClasses =
    'border border-flame/40 bg-ember text-cream font-display shadow-[0_0_0_0_rgba(196,97,42,0)] hover:-translate-y-0.5 hover:bg-flame hover:shadow-[0_18px_40px_rgba(240,144,80,0.28)]'

  const ghostClasses =
    'border border-white/20 bg-white/5 text-cream font-display hover:-translate-y-0.5 hover:border-cream/60 hover:bg-white/10'

  const variantClass = variant === 'primary' ? primaryClasses : ghostClasses

  const content = (
    <>
      {label}
      <ArrowIcon />
    </>
  )

  if (onClick) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClasses} ${variantClass} ${className}`}
      >
        {content}
      </motion.button>
    )
  }

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variantClass} ${className}`}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`${baseClasses} ${variantClass} ${className}`}
      >
        {content}
      </Link>
    </motion.div>
  )
}
