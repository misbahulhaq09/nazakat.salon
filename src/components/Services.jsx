import React, { useState, useEffect, useRef } from 'react'
import { servicesData } from '../data/mediaData'
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// 1-2 line clean, simple, bold descriptions for each service (no clutter)
const cleanServiceData = [
  {
    id: "hair",
    number: "01",
    name: "Hair Artistry & Balayage",
    shortDesc: "Custom French balayage, precision haircuts, and restorative scalp therapy crafted for effortless luxury.",
    video: "/assets/service-hair-highlights.mp4",
    poster: "/assets/posters/service-hair-highlights.jpg",
  },
  {
    id: "skin",
    number: "02",
    name: "Clinical Skin & Hydra-Facial",
    shortDesc: "Deep hydra-facial treatments, clinical LED renewal, and cellular skincare in a calming private sanctuary.",
    video: "/assets/service-hydra-facial.mp4",
    poster: "/assets/posters/service-hydra-facial.jpg",
  },
  {
    id: "nail",
    number: "03",
    name: "Nail Couture & Pedicure",
    shortDesc: "Bespoke hand-painted gel nail extensions, bridal manicures, and restorative organic spa pedicures.",
    video: "/assets/service-nail-art.mp4",
    poster: "/assets/service-nail-poster.jpg",
  },
  {
    id: "bridal",
    number: "04",
    name: "Bridal & Couture Makeup",
    shortDesc: "Signature high-definition bridal artistry, editorial red-carpet glam, and personalized luxury makeup.",
    video: "/assets/insta-reel-1-transformation.mp4",
    poster: "/assets/before-after-bridal.png",
  },
]

export default function Services({ onOpenBooking }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const videoRef = useRef(null)
  const scrollTriggerInstance = useRef(null)

  const activeService = cleanServiceData[activeIndex]

  // Setup GSAP Pinning: Scrolling automatically selects 01 -> 02 -> 03 -> 04
  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return
    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        id: 'services-scroll-trigger',
        trigger: sectionRef.current,
        pin: pinContainerRef.current,
        start: 'top top',
        end: () => `+=${isMobile ? window.innerHeight * 1.6 : window.innerHeight * 2.2}`,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress
          let nextIdx = 0
          if (p < 0.25) nextIdx = 0
          else if (p < 0.50) nextIdx = 1
          else if (p < 0.75) nextIdx = 2
          else nextIdx = 3

          setActiveIndex((prev) => (prev !== nextIdx ? nextIdx : prev))
        },
      })

      scrollTriggerInstance.current = st
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Auto-play active video on change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [activeIndex])

  // Clicking a tab scrolls to the matching pinned stage
  const handleSelectTab = (index) => {
    setActiveIndex(index)
    if (scrollTriggerInstance.current) {
      const st = scrollTriggerInstance.current
      const progressSteps = [0.08, 0.35, 0.62, 0.90]
      const targetScroll = st.start + progressSteps[index] * (st.end - st.start)
      window.scrollTo({ top: targetScroll, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    const next = (activeIndex + 1) % cleanServiceData.length
    handleSelectTab(next)
  }

  const handlePrev = () => {
    const prev = (activeIndex - 1 + cleanServiceData.length) % cleanServiceData.length
    handleSelectTab(prev)
  }

  return (
    <section id="services" ref={sectionRef} className="relative bg-[#FAF8F5] text-[#181412]">
      {/* Pinned Stage Container */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-screen flex flex-col justify-center py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Top Header: Simple & Bold */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 border-b border-[#181412]/10 pb-6">
            <div className="max-w-xl space-y-2">
              <div className="mb-2 w-full max-w-md">
                <StrokeText
                  text="OUR SERVICES"
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#181412] tracking-tight">
                Discover Salon Services
              </h2>
            </div>

            {/* Circular Arrow Buttons to cycle manually */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                type="button"
                className="w-10 h-10 rounded-full border border-[#181412]/20 hover:border-signature-pink hover:bg-signature-pink hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-10 h-10 rounded-full border border-[#181412]/20 hover:border-signature-pink hover:bg-signature-pink hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Main Grid: Left Accordion + Right Circular Lens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Clean, simple, bold Accordion (auto-selected on scroll) */}
            <div className="lg:col-span-6 space-y-3">
              {cleanServiceData.map((service, index) => {
                const isActive = activeIndex === index

                return (
                  <div
                    key={service.id}
                    onClick={() => handleSelectTab(index)}
                    className={`rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden border ${
                      isActive
                        ? 'bg-white border-[#181412]/25 shadow-lg p-5 sm:p-6'
                        : 'bg-white/60 hover:bg-white border-[#181412]/10 p-4 sm:p-5'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <span className={`text-sm font-bold transition-colors duration-300 ${
                          isActive ? 'text-signature-pink' : 'text-[#8A7A70]'
                        }`}>
                          {service.number}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-[#181412] tracking-normal">
                          {service.name}
                        </h3>
                      </div>

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-signature-pink text-white rotate-90 shadow-sm'
                          : 'bg-[#FAF8F5] text-[#5C524C] border border-[#181412]/15'
                      }`}>
                        <ChevronRight size={13} />
                      </div>
                    </div>

                    {/* 1-2 Lines of Bold, Clean Text (No clutter, no bullet points) */}
                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-[#181412]/10 space-y-3.5 animate-fadeIn">
                        <p className="text-sm font-semibold text-[#2C2420] leading-relaxed">
                          {service.shortDesc}
                        </p>

                        <div>
                          <SpecularButton
                            size="sm"
                            radius={999}
                            tint="#FF3B8D"
                            tintOpacity={1}
                            textColor="#ffffff"
                            lineColor="#ffffff"
                            baseColor="#D61A6E"
                            intensity={1.2}
                            shineSize={14}
                            shineFade={35}
                            thickness={1.4}
                            followMouse={true}
                            onClick={(e) => {
                              e.stopPropagation()
                              onOpenBooking()
                            }}
                            className="text-xs font-bold uppercase tracking-wider shadow-sm"
                          >
                            <span>Book Experience</span>
                            <ArrowRight size={13} />
                          </SpecularButton>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right Column: Terrova Circular Lens & Sleek Number */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4">
              
              {/* Circular Lens Frame */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full p-2 bg-gradient-to-tr from-[#9E6F4D]/25 via-white to-signature-pink/30 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <video
                    ref={videoRef}
                    key={activeService.id}
                    src={activeService.video}
                    poster={activeService.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Terrova Clean Big Numeral at Bottom Right of Circle */}
              <div className="absolute bottom-2 right-2 sm:right-6 select-none pointer-events-none">
                <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-[#181412] tracking-tight">
                  {activeService.number}
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
