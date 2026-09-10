import React from 'react'
import { beforeAfterData } from '../data/mediaData'
import { ArrowRight } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

export default function BeforeAfter({ onOpenBooking }) {
  const mainTransformations = beforeAfterData.slice(0, 3)
  const hairRestorations = beforeAfterData.slice(3)

  return (
    <section id="transformations" className="relative py-20 sm:py-24 bg-jet-black overflow-hidden border-t border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="mb-2 w-full max-w-md mx-auto">
            <StrokeText
              text="BEFORE & AFTER"
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
            Client Transformations
          </h2>
          <p className="text-sm text-white/70">
            Real results created by Nazakat salon stylists in Raipur.
          </p>
        </div>

        {/* The 3 Main Transformations */}
        <div className="space-y-12 lg:space-y-16">
          {mainTransformations.map((item, index) => {
            const isReversed = index % 2 !== 0
            return (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image Showcase */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'} group`}>
                  <div className="relative rounded-xl overflow-hidden border border-white/15 bg-luxe-card shadow-xl">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Direct Text Column */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'} space-y-3`}>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-signature-pink font-semibold">
                      {item.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-pure-white mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs text-nude-beige font-medium">
                      {item.stats}
                    </span>
                  </div>

                  <div className="pt-1">
                    <SpecularButton
                      onClick={onOpenBooking}
                      size="sm"
                      radius={999}
                      tint="#181412"
                      tintOpacity={1}
                      textColor="#FFFFFF"
                      lineColor="#FF3B8D"
                      baseColor="#3D1828"
                      className="text-xs uppercase tracking-wider font-bold shadow-md hover:border-signature-pink transition-all px-5 py-2.5"
                    >
                      <span>Book Similar Look</span>
                      <ArrowRight size={13} />
                    </SpecularButton>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Hair Fixing & Restoration Cards */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-pure-white">
              Hair Care & Restoration
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {hairRestorations.map((item) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden border border-white/15 bg-luxe-card shadow-lg group"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-4 right-4 bg-black/75 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-signature-pink font-semibold block">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-pure-white">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
