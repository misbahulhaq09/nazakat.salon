import React from 'react'
import { brandData } from '../data/mediaData'
import { Instagram, MapPin, Phone, Sparkles, ArrowUp, Clock, ExternalLink } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function Footer({ onOpenBooking }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative bg-jet-black border-t border-[#D4B59F]/20 pt-20 pb-12 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Minimal Luxury Sign-off Callout */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-6">
          {/* Logo badge */}
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D4B59F]/40 p-0.5 mx-auto bg-black shadow-lg">
            <img src={brandData.logo} alt="Nazakat Logo" className="w-full h-full object-cover rounded-full" />
          </div>

          <div className="space-y-2">
            <h2 className="font-sans text-3xl sm:text-5xl text-pure-white font-extrabold tracking-wider">
              NAZAKAT
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#D4B59F] tracking-[0.22em] font-medium uppercase">
              SALON & ACADEMY
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs tracking-widest uppercase text-pure-white/70 font-light">
            <span>Hair Artistry</span>
            <span className="text-signature-pink">•</span>
            <span>Clinical Skin</span>
            <span className="text-signature-pink">•</span>
            <span>Nails</span>
            <span className="text-signature-pink">•</span>
            <span>Bridal Couture</span>
            <span className="text-signature-pink">•</span>
            <span>Professional Academy</span>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <SpecularButton
              onClick={() => onOpenBooking('Hair Artistry & Balayage')}
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
              className="text-xs uppercase tracking-luxury font-medium shadow-luxe-glow cursor-pointer"
            >
              <span>Book Salon Experience</span>
            </SpecularButton>

            <a
              href="https://wa.me/919826100000?text=Hello%20Nazakat%20Salon,%20I%20would%20like%20to%20chat%20with%20the%20concierge."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-signature-pink text-xs font-bold uppercase tracking-wider text-white transition-all bg-white/5 hover:bg-white/10"
            >
              <span>WhatsApp Concierge</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Location, Operating Hours & Contact Info Strip */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10 border-t border-b border-white/10 text-xs text-pure-white/80">
          
          {/* Destination */}
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-signature-pink shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-pure-white font-bold uppercase tracking-wider text-[11px]">Flagship Destination</p>
              <p className="text-white/60 font-light leading-relaxed">Shankar Nagar / City Center, Raipur, Chhattisgarh 492001</p>
              <a
                href="https://maps.google.com/?q=Nazakat+Salon+Raipur"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#D4B59F] hover:text-signature-pink underline underline-offset-2 transition-colors pt-1"
              >
                <span>Directions on Google Maps</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-signature-pink shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-pure-white font-bold uppercase tracking-wider text-[11px]">Salon & Academy Hours</p>
              <p className="text-white/80 font-medium">Monday – Sunday</p>
              <p className="text-white/60 font-light">10:30 AM – 8:30 PM (All 7 Days)</p>
              <p className="text-[10px] text-signature-pink font-semibold">Prior appointment recommended</p>
            </div>
          </div>

          {/* Instagram */}
          <div className="flex items-start gap-3">
            <Instagram size={20} className="text-signature-pink shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-pure-white font-bold uppercase tracking-wider text-[11px]">Social Community</p>
              <a
                href={brandData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4B59F] hover:text-signature-pink font-semibold transition-colors block"
              >
                {brandData.instagram}
              </a>
              <p className="text-white/60 font-light text-[11px]">Daily reels, transformations & student showcases.</p>
            </div>
          </div>

          {/* WhatsApp Concierge */}
          <div className="flex items-start gap-3">
            <Phone size={20} className="text-signature-pink shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-pure-white font-bold uppercase tracking-wider text-[11px]">Direct Concierge</p>
              <a
                href="https://wa.me/919826100000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4B59F] hover:text-signature-pink font-semibold transition-colors block"
              >
                +91 98261 00000
              </a>
              <p className="text-white/60 font-light text-[11px]">Instant booking & admissions helpline.</p>
            </div>
          </div>

        </div>

        {/* Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-pure-white/40 font-light">
          <p>© {new Date().getFullYear()} Nazakat Salon & Academy. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-pure-white/60 hover:text-[#D4B59F] transition-colors uppercase tracking-wider cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  )
}
