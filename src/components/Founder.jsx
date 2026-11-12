import React, { useState, useEffect, useRef } from 'react'
import { founderData } from '../data/mediaData'
import StrokeText from './StrokeText'

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
    <div ref={ref} className="p-4 sm:p-5 rounded-xl bg-white border border-[#9E6F4D]/20 shadow-sm hover:shadow-md hover:border-signature-pink/40 transition-all duration-300">
      <span className="block font-sans text-2xl sm:text-3xl font-extrabold text-[#181412]">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 reveal-text text-center flex flex-col items-center">
          <div>
            <div className="mb-4 w-full flex justify-center">
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
                align="center"
              />
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#181412] tracking-tight">
              Nazakat Ali
            </h2>
            <p className="text-xs sm:text-sm text-[#9E6F4D] uppercase tracking-wider font-semibold mt-1.5">
              Founder & Creative Director
            </p>
          </div>

          <div className="h-[2px] w-16 bg-signature-pink" />

          {/* Direct Quote */}
          <blockquote className="text-base sm:text-lg text-[#38302B] max-w-2xl mx-auto border-y border-[#9E6F4D]/25 py-4 px-4 leading-relaxed italic">
            "{founderData.quote}"
          </blockquote>

          {/* Bento Stats Cards with Live Counting Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 w-full pt-2">
            <AnimatedCounter target={15} suffix="+" label="Years Mastery" />
            <AnimatedCounter target={10000} suffix="+" label="Happy Clients" />
            <AnimatedCounter target={50} suffix="+" label="Masterclasses" />
            <AnimatedCounter target={100} suffix="%" label="Bespoke Care" />
          </div>
        </div>
      </div>
    </section>
  )
}
