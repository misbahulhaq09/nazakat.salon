import React from 'react'
import { brandData } from '../data/mediaData'
import ScrollExpand from './ScrollExpand'
import { ArrowRight, ArrowDown } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function Hero({ onOpenBooking }) {
  const scrollToFounder = () => {
    const el = document.getElementById('founder')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full bg-black">
      <ScrollExpand
        src={brandData.heroVideo || "/assets/hero-interior-1080p.mp4"}
        poster={brandData.heroPoster || "/assets/posters/hero-interior-animated.jpg"}
        mediaType="video"
        title="NAZAKAT"
        scrollHint="Scroll to Enter"
        useWindowScroll={true}
        startWidth={44}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.03}
        scrollDistance={0.45}
        holdDistance={0.1}
        smoothing={0.03}
        overlayScrim={0.32}
      >
        {/* Full-bleed Content that reveals as the frame expands */}
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center px-4 space-y-4 sm:space-y-5 pt-12 sm:pt-16">
          
          {/* Official Brand Emblem Badge */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#D4B59F] p-1.5 bg-black/90 shadow-[0_0_35px_rgba(212,181,159,0.45)]">
            <img
              src={brandData.logo}
              alt="Nazakat Official Emblem"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Grand Typography */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.04]">
            NAZAKAT
            <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-[#D4B59F] mt-2 font-display">
              SALON & ACADEMY
            </span>
          </h1>

          {/* Brand Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm tracking-ultra uppercase text-white/85 font-light">
            <span>Hair</span>
            <span className="text-[#FF3B8D]">•</span>
            <span>Skin</span>
            <span className="text-[#FF3B8D]">•</span>
            <span>Nails</span>
            <span className="text-[#FF3B8D]">•</span>
            <span>Bridal</span>
          </div>

          {/* Action CTA Buttons with Specular Light Reflection */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <SpecularButton
              size="md"
              radius={999}
              tint="#FF3B8D"
              tintOpacity={1}
              blur={0}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#D61A6E"
              intensity={1.2}
              shineSize={14}
              shineFade={36}
              thickness={1.5}
              speed={0.4}
              followMouse={true}
              proximity={220}
              autoAnimate={false}
              onClick={onOpenBooking}
              className="font-bold uppercase tracking-widest text-xs shadow-luxe-glow"
            >
              <span>Book Appointment</span>
              <ArrowRight size={14} />
            </SpecularButton>

            <SpecularButton
              size="md"
              radius={999}
              tint="#141210"
              tintOpacity={0.88}
              blur={10}
              textColor="#FFFFFF"
              lineColor="#FF3B8D"
              baseColor="#333333"
              onClick={scrollToFounder}
              className="border border-white/25 hover:border-signature-pink text-xs font-bold uppercase tracking-wider transition-all shadow-md px-6 py-3"
            >
              <span>Explore Salon</span>
              <ArrowDown size={14} />
            </SpecularButton>
          </div>

        </div>
      </ScrollExpand>
    </section>
  )
}
