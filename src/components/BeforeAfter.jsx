import React, { useState, useRef } from 'react'
import { ArrowRight, Sparkles, Play, Pause, Check } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

const transformationVault = [
  {
    id: 'balayage-1',
    category: 'Hair Transformations',
    title: 'Sculpted French Balayage & Silk Gloss',
    stats: 'Micro-Balayage • Silk Gloss Bond • Root Melt',
    lookCta: 'Book This Exact Look (Balayage & Gloss)',
    video: '/assets/insta-reel-5-balayage.mp4',
    poster: '/assets/before-after-hair-curls.png',
    tag: 'Balayage Contouring'
  },
  {
    id: 'bridal-1',
    category: 'Bridal Artistry',
    title: 'The Regal Crimson & Gold Royal Bride',
    stats: 'Cinematic HD Airbrush • Traditional Draping',
    lookCta: 'Book This Exact Look (Regal Bridal HD)',
    video: '/assets/insta-reel-1-transformation.mp4',
    poster: '/assets/before-after-bridal.png',
    tag: 'Royal Bridal'
  },
  {
    id: 'precision-lob',
    category: 'Hair Transformations',
    title: 'Precision Parisian Lob & Mochaccino Ribbons',
    stats: 'Architectural Cut • Dimensional Highlights',
    lookCta: 'Book This Exact Look (Parisian Lob)',
    video: '/assets/insta-reel-2-salon-tour.mp4',
    poster: '/assets/before-after-hair-bob.png',
    tag: 'Precision Cut'
  },
  {
    id: 'keratin-spa',
    category: 'Hair Transformations',
    title: 'Keratin Molecular Anti-Frizz Revival',
    stats: 'Zero-Frizz • Mirror Shine • 4-Month Longevity',
    lookCta: 'Book This Exact Look (Keratin Revival)',
    video: '/assets/insta-reel-3-skin-glow.mp4',
    poster: '/assets/treatment-hair-spa.jpg',
    tag: 'Bond Repair'
  },
  {
    id: 'nail-couture',
    category: 'Bridal Artistry',
    title: 'Hand-Painted Couture Gel Nail Extensions',
    stats: 'Russian Cuticle Sculpting • Chrome Accents',
    lookCta: 'Book This Exact Look (Couture Nails)',
    video: '/assets/insta-reel-4-nail-artistry.mp4',
    poster: '/assets/service-nail-poster.jpg',
    tag: 'Nail Couture'
  },
  {
    id: 'academy-styling',
    category: 'Academy Tutorials',
    title: 'Masterclass: Sectioning & Balayage Technique',
    stats: 'Live Demonstration • Student Hands-On Station',
    lookCta: 'Apply for Masterclass (Hair Dressing)',
    video: '/assets/training-hair-styling.mp4',
    poster: '/assets/posters/training-hair-styling.jpg',
    tag: 'Academy Masterclass'
  }
]

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'Hair Transformations', label: 'Hair Transformations' },
  { id: 'Bridal Artistry', label: 'Bridal Artistry' },
  { id: 'Academy Tutorials', label: 'Academy Tutorials' },
]

function VaultCard({ item, onOpenBooking }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group rounded-2xl overflow-hidden border border-white/15 bg-luxe-card shadow-xl hover:border-signature-pink/60 transition-all duration-500 flex flex-col justify-between"
    >
      {/* 9:16 Vertical Reel Style Media Container */}
      <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full overflow-hidden bg-black cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={item.video}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 pointer-events-none" />

        {/* Top Tag Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] uppercase font-bold tracking-wider text-[#D4B59F]">
            {item.tag}
          </span>
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform"
            aria-label="Play/Pause"
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} className="ml-0.5" />}
          </button>
        </div>

        {/* In-Video Bottom Overlay */}
        <div className="absolute bottom-3 left-4 right-4 pointer-events-none space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-signature-pink font-semibold">
            {item.category}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-pure-white line-clamp-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-[11px] text-[#D4B59F]/90 font-light">
            {item.stats}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-black/50 border-t border-white/10">
        <SpecularButton
          onClick={() => onOpenBooking(item.lookCta)}
          size="sm"
          radius={999}
          tint="#FF3B8D"
          tintOpacity={1}
          textColor="#FFFFFF"
          lineColor="#FFFFFF"
          baseColor="#D61A6E"
          className="w-full text-xs uppercase tracking-wider font-bold shadow-md hover:scale-[1.02] transition-all py-2.5 justify-center cursor-pointer"
        >
          <span>{item.lookCta}</span>
          <ArrowRight size={13} />
        </SpecularButton>
      </div>
    </div>
  )
}

export default function BeforeAfter({ onOpenBooking }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredItems = activeFilter === 'all'
    ? transformationVault
    : transformationVault.filter(item => item.category === activeFilter)

  return (
    <section id="transformations" className="relative py-20 sm:py-28 bg-jet-black overflow-hidden border-t border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="w-full max-w-md mx-auto">
            <StrokeText
              text="BEFORE & AFTER"
              strokeColor="#FF3B8D"
              fillColor="#FF3B8D"
              strokeWidth={1.6}
              fontSize={46}
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
            Client Transformation Vault
          </h2>
          <p className="text-sm text-white/70 max-w-xl mx-auto">
            Real before & after results captured live at Nazakat Salon Raipur. Watch client transformations in 9:16 reels and reserve your matching look.
          </p>

          {/* Filter Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-signature-pink text-white shadow-luxe-glow scale-105'
                    : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Video Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <VaultCard
              key={item.id}
              item={item}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-white/50 uppercase tracking-widest">
            Have a custom Pinterest reference or Instagram look?
          </p>
          <button
            onClick={() => onOpenBooking('Custom Inspiration / Balayage Consultation')}
            className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-signature-pink hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
          >
            <span>Upload or Share Reference with Stylist on WhatsApp</span>
            <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </section>
  )
}
