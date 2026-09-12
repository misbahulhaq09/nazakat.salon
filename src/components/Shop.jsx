import React from 'react'
import { shopData } from '../data/mediaData'
import { useInViewVideo } from '../hooks/useInViewVideo'
import { ArrowRight } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

function ShopVideoCard({ item, onOpenBooking }) {
  const { videoRef } = useInViewVideo({ threshold: 0.25 })

  return (
    <div className="group relative rounded-xl overflow-hidden border border-white/15 bg-luxe-card shadow-lg hover:border-nude-beige/50 transition-all duration-500">
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
          onCanPlay={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.play().catch(() => {})
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] uppercase text-nude-beige font-medium">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-bold text-pure-white group-hover:text-nude-beige transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-signature-pink font-medium">
          {item.tagline}
        </p>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/50">Salon Exclusive</span>
          <SpecularButton
            onClick={onOpenBooking}
            size="sm"
            radius={999}
            tint="#181412"
            tintOpacity={1}
            textColor="#FFFFFF"
            lineColor="#FF3B8D"
            baseColor="#2A1E24"
            className="text-[11px] uppercase tracking-wider font-bold shadow-md hover:border-signature-pink transition-all px-4 py-2"
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
    <section id="shop" className="relative py-20 sm:py-24 bg-luxe-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="mb-2 w-full max-w-xs mx-auto">
            <StrokeText
              text="EXCLUSIVE SHOP"
              strokeColor="#FF3B8D"
              fillColor="#FF3B8D"
              strokeWidth={1.6}
              fontSize={48}
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
            Curated Salon Products
          </h2>
          <p className="text-sm text-white/70">
            Professional hair & skin care brands available at Nazakat Salon Raipur.
          </p>
        </div>

        {/* 6 Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopData.map((item) => (
            <ShopVideoCard key={item.id} item={item} onOpenBooking={onOpenBooking} />
          ))}
        </div>

      </div>
    </section>
  )
}
