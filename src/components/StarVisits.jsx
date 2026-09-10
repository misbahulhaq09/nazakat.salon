import React from 'react'
import { starVisitsData } from '../data/mediaData'
import StrokeText from './StrokeText'

export default function StarVisits() {
  return (
    <section id="star-visits" className="relative py-20 sm:py-24 bg-luxe-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="mb-2 w-full max-w-sm mx-auto">
            <StrokeText
              text="STAR VISITS"
              strokeColor="#FF3B8D"
              fillColor="#FF3B8D"
              strokeWidth={1.6}
              fontSize={52}
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
            Celebrity & Guest Visits
          </h2>
          <p className="text-sm text-white/70">
            Memorable visits to Nazakat Salon & Academy Raipur.
          </p>
        </div>

        {/* 3-Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {starVisitsData.map((star, index) => (
            <div
              key={star.id}
              className="group relative rounded-xl overflow-hidden border border-white/15 bg-luxe-card shadow-xl transition-all duration-500 hover:border-nude-beige/50"
            >
              {/* Image Frame */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                <img
                  src={star.image}
                  alt={star.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Number badge */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs text-nude-beige font-medium">
                  0{index + 1}
                </div>

                {/* Minimal Label at Bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-base font-bold text-pure-white">
                    {star.title}
                  </h3>
                  <p className="text-xs text-nude-beige mt-0.5">
                    {star.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
