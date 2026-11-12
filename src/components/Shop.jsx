import React from 'react'
import { shopData } from '../data/mediaData'
import { useInViewVideo } from '../hooks/useInViewVideo'
import { ArrowRight, ShieldCheck, Droplets, Sparkles, Check } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

const hairSciencePrinciples = [
  {
    icon: ShieldCheck,
    title: 'Molecular Disulfide Bond Multiplier',
    subtitle: 'Cortex-Level Reconstruction',
    desc: 'Olaplex & K18 biomimetic peptides reconnect broken keratin chains from bleaching and heat, restoring structural tensile strength.'
  },
  {
    icon: Droplets,
    title: 'Lipid Moisture Lock & pH 4.5 Sealing',
    subtitle: 'Cuticle Acidification Ritual',
    desc: 'Locks in micro-pigments and seals the hair cuticle post-balayage, eliminating porosity and ensuring up to 12 weeks of radiant shine.'
  },
  {
    icon: Sparkles,
    title: 'Prescriptive Home Care Continuity',
    subtitle: 'Customized Regimen',
    desc: 'Professional sulphate-free formulations specifically selected by our master stylists for Raipur water conditions and humidity.'
  }
]

function ShopVideoCard({ item, onOpenBooking }) {
  const { videoRef } = useInViewVideo({ threshold: 0.25 })

  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-luxe-card shadow-lg hover:border-signature-pink/50 transition-all duration-500 flex flex-col justify-between">
      {/* Video Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] uppercase text-[#D4B59F] font-bold tracking-wider">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-pure-white group-hover:text-signature-pink transition-colors">
            {item.title}
          </h3>
          <p className="text-xs text-[#D4B59F] font-medium">
            {item.tagline}
          </p>
          <p className="text-xs text-white/60 font-light leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-white/50 uppercase tracking-wider font-light">Authentic Salon Exclusive</span>
          <SpecularButton
            onClick={() => onOpenBooking(`Boutique Inquiry - ${item.title}`)}
            size="sm"
            radius={999}
            tint="#181412"
            tintOpacity={1}
            textColor="#FFFFFF"
            lineColor="#FF3B8D"
            baseColor="#2A1E24"
            className="text-[11px] uppercase tracking-wider font-bold shadow-md hover:border-signature-pink transition-all px-4 py-2 cursor-pointer"
          >
            <span>Inquire</span>
            <ArrowRight size={12} />
          </SpecularButton>
        </div>
      </div>
    </div>
  )
}

export default function Shop({ onOpenBooking }) {
  return (
    <section id="shop" className="relative py-20 sm:py-28 bg-luxe-black overflow-hidden border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="w-full max-w-xs mx-auto">
            <StrokeText
              text="EXCLUSIVE SHOP"
              strokeColor="#FF3B8D"
              fillColor="#FF3B8D"
              strokeWidth={1.6}
              fontSize={44}
              fontWeight={900}
              letterSpacing={1.5}
              trigger="scroll"
              fillMode="wipe"
              drawDuration={1.2}
              fillDelay={0.2}
              align="center"
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
            Curated Product Boutique & Hair Science
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Authorized flagship dispensary for Schwarzkopf Professional, Olaplex, Kevin Murphy, and clinical aesthetic skincare.
          </p>
        </div>

        {/* Hair Science & Restoration Cards (Clean responsive cards replacing static flyer) */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {hairSciencePrinciples.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3 hover:border-signature-pink/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-signature-pink/10 border border-signature-pink/30 flex items-center justify-center text-signature-pink">
                  <Icon size={20} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4B59F]">
                    {item.subtitle}
                  </span>
                  <h3 className="font-sans text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* 6 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {shopData.map((item) => (
            <ShopVideoCard key={item.id} item={item} onOpenBooking={onOpenBooking} />
          ))}
        </div>

      </div>
    </section>
  )
}
