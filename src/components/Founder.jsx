import React, { useState, useEffect, useRef } from 'react'
import { founderData } from '../data/mediaData'
import { Award, Users, Sparkles, BookOpen } from 'lucide-react'
import StrokeText from './StrokeText'
import GlareHover from './GlareHover'

function AnimatedCounter({ target, suffix = '', label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1800
          const stepTime = 30
          const totalSteps = duration / stepTime
          const increment = target / totalSteps

          const timer = setInterval(() => {
            start += increment
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, stepTime)

          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="p-4 rounded-xl bg-white border border-[#9E6F4D]/20 shadow-sm hover:shadow-md hover:border-signature-pink/40 transition-all duration-300">
      <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#181412]">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-[11px] text-[#5C524C] uppercase tracking-wider font-medium mt-0.5 block">
        {label}
      </span>
    </div>
  )
}

export default function Founder() {
  return (
    <section id="founder" className="relative py-20 sm:py-28 bg-white text-[#181412] overflow-hidden border-t border-b border-[#181412]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Founder Graphic Banner with GlareHover */}
          <div className="lg:col-span-7 relative reveal-media">
            <GlareHover
              width="100%"
              height="auto"
              background="#ffffff"
              borderRadius="1rem"
              borderColor="rgba(24, 20, 18, 0.15)"
              glareColor="#ffffff"
              glareOpacity={0.45}
              glareAngle={-30}
              glareSize={280}
              transitionDuration={750}
              playOnce={false}
              className="shadow-2xl group w-full"
            >
              <div className="relative aspect-video w-full bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={founderData.image || "/assets/founder-nazakat-ali.png"}
                  alt="Nazakat Ali - Founder & Creative Director"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Minimal clean label at bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <span className="text-xs uppercase tracking-wider text-white font-medium drop-shadow-md">
                    Nazakat Ali • Founder
                  </span>
                  <span className="w-2 h-2 rounded-full bg-signature-pink shadow-md" />
                </div>
              </div>
            </GlareHover>
          </div>

          {/* Right Column: Founder Info + Terrova-style Bento Stats Counters */}
          <div className="lg:col-span-5 space-y-6 reveal-text">
            <div>
              <div className="mb-3 w-full">
                <StrokeText
                  text="MEET OUR FOUNDER"
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
                  align="left"
                />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#181412] tracking-tight">
                Nazakat Ali
              </h2>
              <p className="text-xs sm:text-sm text-[#9E6F4D] uppercase tracking-wider font-semibold mt-1">
                Founder & Creative Director
              </p>
            </div>

            <div className="h-[2px] w-16 bg-signature-pink" />

            {/* Direct Quote */}
            <blockquote className="text-sm sm:text-base text-[#38302B] border-l-2 border-[#9E6F4D] pl-4 py-1 leading-relaxed italic">
              "{founderData.quote}"
            </blockquote>

            {/* Terrova Bento Stats Cards with Live Counting Numbers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <AnimatedCounter target={15} suffix="+" label="Years Mastery" />
              <AnimatedCounter target={10000} suffix="+" label="Happy Clients" />
              <AnimatedCounter target={50} suffix="+" label="Masterclasses" />
              <AnimatedCounter target={100} suffix="%" label="Bespoke Care" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
