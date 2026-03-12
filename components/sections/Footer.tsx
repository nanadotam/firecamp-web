import Image from 'next/image'
import Link from 'next/link'
import footer from '@/content/footer.json'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-smoke">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: Logo + Tagline + Social */}
          <div className="flex flex-col">
            <Link href="#home" className="inline-block mb-5">
              <Image
                src="/logo/FIRE-CAMP-LOGO-White-Variant.svg"
                width={120}
                height={40}
                alt="FIRE CAMP"
              />
            </Link>
            <p className="font-body italic text-ash text-[14px] mb-6">
              &ldquo;{footer.tagline}&rdquo;
            </p>
            <div className="flex flex-col gap-2">
              {footer.social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="font-body text-[13px] text-ash hover:text-flame transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-flame/60" />
                  {s.handle ? s.handle : s.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-[11px] text-flame uppercase tracking-[0.2em] mb-6">
              Navigate
            </h4>
            <nav className="flex flex-col gap-3">
              {footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-[13px] text-ash hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Ministry + Hashtags */}
          <div>
            <h4 className="font-display text-[11px] text-flame uppercase tracking-[0.2em] mb-6">
              Ministry
            </h4>
            <p className="font-body text-cream text-[14px] font-medium mb-3">
              {footer.ministry}
            </p>
            <p className="font-body text-ash text-[13px] leading-relaxed">
              Building a brand that carries the weight of the Spirit.
            </p>
            <p className="font-display text-[11px] text-flame/70 mt-6 tracking-[0.1em]">
              {footer.hashtags}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-smoke">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-ash text-[12px]">{footer.copyright}</p>
          <p className="font-display text-[10px] text-flame/60 uppercase tracking-[0.15em]">
            {footer.hashtags}
          </p>
        </div>
      </div>
    </footer>
  )
}
