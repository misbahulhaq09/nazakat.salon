import React, { useState, useEffect, useRef } from 'react'
import { trainingData } from '../data/mediaData'
import { ArrowUpRight } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function TrainingVideoPlayer({ video, isActive }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    if (isActive) {
      const playPromise = v.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          v.muted = true
          v.play().catch(() => {})
        })
      }
    } else {
      v.pause()
    }
  }, [isActive])

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black shadow-2xl">
      <div className="aspect-video w-full relative">
        <video
          ref={videoRef}
          src={video.video}
          poster={video.poster}
          autoPlay={isActive}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={(e) => {
            e.currentTarget.muted = true
            if (isActive) e.currentTarget.play().catch(() => {})
          }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute bottom-3 left-4 right-4 pointer-events-none">
          <p className="text-sm sm:text-base font-semibold text-pure-white">{video.title}</p>
          <p className="text-xs text-nude-beige">{video.subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export default function Training({ onOpenBooking }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0)
  const sectionRef = useRef(null)
  const pinContainerRef = useRef(null)
  const videoPanelsRef = useRef([])
  const scrollTriggerRef = useRef(null)

  // Stage progress targets for click shortcut:
  // 0: Lecture Hall, 1: Hair Crafting, 2: Studio Classroom, 3: Teammate Grooming
  const stageTargets = [0.05, 0.36, 0.69, 0.95]

  const handleItemClick = (idx) => {
    if (!scrollTriggerRef.current) return
    const st = scrollTriggerRef.current
    const targetProgress = stageTargets[idx]
    const targetScroll = st.start + targetProgress * (st.end - st.start)
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const panels = videoPanelsRef.current.filter(Boolean)
    if (!sectionRef.current || !pinContainerRef.current || panels.length < 4) return

    const ctx = gsap.context(() => {
      // Set initial video card panel states: Panel 0 visible, Panels 1, 2, 3 hidden
      gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1 })
      gsap.set([panels[1], panels[2], panels[3]], {
        autoAlpha: 0,
        y: 20,
        scale: 0.98,
      })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinContainerRef.current,
          start: 'top top',
          end: () => `+=${isMobile ? window.innerHeight * 1.1 : window.innerHeight * 1.4}`,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            let idx = 0
            if (p < 0.25) idx = 0
            else if (p < 0.52) idx = 1
            else if (p < 0.78) idx = 2
            else idx = 3

            setSelectedVideoIndex((prev) => (prev !== idx ? idx : prev))
          },
        },
      })

      scrollTriggerRef.current = tl.scrollTrigger

      // Responsive timeline mapping scroll progress across 4 training videos:
      // Total duration = 100
      // 0 - 8: Video 0 (Lecture Hall) settled
      // 8 - 32: Video 0 -> Video 1 transition
      // 32 - 40: Video 1 (Hair Crafting) settled
      // 40 - 64: Video 1 -> Video 2 transition
      // 64 - 72: Video 2 (Studio Classroom) settled
      // 72 - 94: Video 2 -> Video 3 transition
      // 94 - 100: Video 3 (Teammate Grooming) settled
      tl
        .to({}, { duration: 8 })
        .to(panels[0], { autoAlpha: 0, y: -20, scale: 0.98, duration: 24 }, 8)
        .to(panels[1], { autoAlpha: 1, y: 0, scale: 1, duration: 24 }, 8)
        .to({}, { duration: 8 })
        .to(panels[1], { autoAlpha: 0, y: -20, scale: 0.98, duration: 24 }, 40)
        .to(panels[2], { autoAlpha: 1, y: 0, scale: 1, duration: 24 }, 40)
        .to({}, { duration: 8 })
        .to(panels[2], { autoAlpha: 0, y: -20, scale: 0.98, duration: 22 }, 72)
        .to(panels[3], { autoAlpha: 1, y: 0, scale: 1, duration: 22 }, 72)
        .to({}, { duration: 6 })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section id="training" ref={sectionRef} className="relative bg-jet-black overflow-hidden border-t border-b border-white/10">
      {/* Pinned Cinematic Stage */}
      <div ref={pinContainerRef} className="w-full flex flex-col justify-center py-10 sm:py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
          <div className="max-w-2xl space-y-2">
            <div className="mb-2 w-full max-w-xs">
              <StrokeText
                text="ACADEMY"
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pure-white tracking-tight">
              Nazakat Academy
            </h2>
            <p className="text-sm text-white/70 pt-1">
              Professional Hair Dressing, Skin Aesthetics & Makeup Courses in Raipur.
            </p>
          </div>

          <SpecularButton
            onClick={onOpenBooking}
            size="sm"
            radius={999}
            tint="#181412"
            tintOpacity={1}
            textColor="#FFFFFF"
            lineColor="#FF3B8D"
            baseColor="#2A1E24"
            className="self-start md:self-end text-xs uppercase tracking-wider font-bold shadow-md shrink-0 hover:border-signature-pink transition-all px-5 py-2.5"
          >
            <span>Inquire Admissions</span>
            <ArrowUpRight size={14} />
          </SpecularButton>
        </div>

        {/* Live Video Stage & Switcher */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center mb-10">
          
          {/* Main Visual Stage (Stacked CSS Grid) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 grid-rows-1 w-full items-center">
              {trainingData.videos.map((vid, index) => {
                const isCurrentActive = index === selectedVideoIndex
                return (
                  <div
                    key={vid.id}
                    ref={(el) => (videoPanelsRef.current[index] = el)}
                    className="col-start-1 row-start-1 w-full will-change-[transform,opacity]"
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      visibility: index === 0 ? 'visible' : 'hidden',
                      transform: index === 0 ? 'none' : 'translate3d(0, 20px, 0)',
                    }}
                  >
                    <TrainingVideoPlayer video={vid} isActive={isCurrentActive} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right-Side Training Video Indicators */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs uppercase tracking-wider text-nude-beige font-semibold block mb-1">
              Training Videos:
            </span>
            {trainingData.videos.map((vid, idx) => {
              const isSelected = idx === selectedVideoIndex
              return (
                <div
                  key={vid.id}
                  onClick={() => handleItemClick(idx)}
                  className={`p-3.5 rounded-xl cursor-pointer border transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-luxe-card border-nude-beige shadow-md ring-1 ring-signature-pink/30'
                      : 'bg-black/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-0.5">
                    <p className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${isSelected ? 'text-signature-pink' : 'text-pure-white'}`}>
                      {vid.title}
                    </p>
                    <p className="text-xs text-white/60 truncate max-w-[240px]">
                      {vid.subtitle}
                    </p>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${isSelected ? 'bg-signature-pink scale-110 shadow-sm' : 'bg-white/20'}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
