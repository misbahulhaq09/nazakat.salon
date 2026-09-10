import React from 'react'
import { brandData } from '../data/mediaData'
import { Instagram, MapPin, Phone, Sparkles, ArrowUp } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative bg-jet-black border-t border-nude-beige/15 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Luxury Sign-off Callout */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          {/* Logo badge */}
          <div className="w-16 h-16 rounded-full overflow-hidden border border-nude-beige/40 p-0.5 mx-auto bg-black">
            <img src={brandData.logo} alt="Nazakat Logo" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-5xl text-pure-white font-normal tracking-wide">
              NAZAKAT
            </h2>
            <p className="font-display text-lg sm:text-xl text-nude-beige tracking-ultra font-light">
              SALON & ACADEMY
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs tracking-ultra uppercase text-pure-white/70 font-light">
            <span>Hair</span>
            <span className="text-signature-pink">•</span>
            <span>Skin</span>
            <span className="text-signature-pink">•</span>
            <span>Nails</span>
            <span className="text-signature-pink">•</span>
            <span>Bridal</span>
          </div>

          <p className="text-xs sm:text-sm text-nude-beige font-light tracking-widest uppercase">
            Raipur, Chhattisgarh
          </p>

          <div className="pt-2">
            <SpecularButton
              onClick={onOpenBooking}
              size="md"
              radius={999}
              tint="#FF3B8D"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#D61A6E"
              intensity={1.2}
              shineSize={16}
              shineFade={36}
              thickness={1.5}
              followMouse={true}
              className="text-xs uppercase tracking-luxury font-medium shadow-luxe-glow"
            >
              <span>Book Bespoke Experience</span>
            </SpecularButton>
          </div>
        </div>

        {/* Minimal Location & Social Info Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-b border-nude-beige/10 text-xs text-pure-white/70">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-signature-pink shrink-0" />
            <div>
              <p className="text-pure-white font-medium">Flagship Destination</p>
              <p className="text-white/50 font-light">Raipur, Chhattisgarh, India</p>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-center gap-3">
            <Instagram size={18} className="text-signature-pink shrink-0" />
            <div>
              <p className="text-pure-white font-medium">Instagram</p>
              <a
                href={brandData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nude-beige hover:text-signature-pink transition-colors"
              >
                {brandData.instagram}
              </a>
            </div>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-3">
            <Phone size={18} className="text-signature-pink shrink-0" />
            <div>
              <p className="text-pure-white font-medium">Direct Concierge</p>
              <a
                href={brandData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-nude-beige hover:text-signature-pink transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-pure-white/40 font-light">
          <p>© {new Date().getFullYear()} Nazakat Salon & Academy. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-pure-white/60 hover:text-nude-beige transition-colors uppercase tracking-wider"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  )
}
