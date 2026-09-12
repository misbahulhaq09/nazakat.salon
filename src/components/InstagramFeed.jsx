import React, { useState, useEffect } from 'react'
import { instagramData, brandData } from '../data/mediaData'
import { useInViewVideo } from '../hooks/useInViewVideo'
import { Instagram, Play, Pause, Volume2, VolumeX, ArrowUpRight } from 'lucide-react'
import OrbitImages from './OrbitImages'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

const orbitImages = [
  {
    image: "/assets/posters/insta-reel-1-transformation.jpg",
    title: "Bridal Glam",
  },
  {
    image: "/assets/posters/insta-reel-2-salon-tour.jpg",
    title: "Salon Tour",
  },
  {
    image: "/assets/posters/insta-reel-3-skin-glow.jpg",
    title: "Skin Glow",
  },
  {
    image: "/assets/posters/insta-reel-4-nail-artistry.jpg",
    title: "Couture Nails",
  },
  {
    image: "/assets/posters/insta-reel-5-balayage.jpg",
    title: "Balayage",
  },
  {
    image: "/assets/posters/insta-reel-6-glow-therapy.jpg",
    title: "LED Therapy",
  },
]

function InstagramReelCard({ reel }) {
  const { videoRef } = useInViewVideo({ threshold: 0.3 })
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = (e) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  return (
    <div className="group relative rounded-xl overflow-hidden border border-white/15 bg-luxe-card shadow-lg hover:border-signature-pink/50 transition-all duration-500">
      {/* 9:16 Reel Aspect Ratio */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

        {/* Audio control */}
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full bg-black/60 text-white/80 hover:text-signature-pink border border-white/20 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>

        {/* Bottom Title Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1">
          <p className="text-xs font-semibold text-pure-white line-clamp-2 leading-snug">
            {reel.title}
          </p>
          <div className="flex items-center justify-between pt-0.5">
            <span className="text-[10px] text-signature-pink font-medium">{brandData.instagram}</span>
            <button
              onClick={togglePlay}
              className="p-1 text-white/70 hover:text-white"
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InstagramFeed() {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    if (window.innerWidth < 640) return 'mobile'
    if (window.innerWidth < 1024) return 'tablet'
    return 'desktop'
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const orbitConfig = {
    mobile: {
      baseWidth: 640,
      radiusX: 255,
      radiusY: 195,
      aspectRatio: "1.15 / 1",
      itemWidth: 46,
      itemHeight: 82,
      strokeFontSize: 36,
    },
    tablet: {
      baseWidth: 900,
      radiusX: 370,
      radiusY: 200,
      aspectRatio: "1.5 / 1",
      itemWidth: 58,
      itemHeight: 104,
      strokeFontSize: 44,
    },
    desktop: {
      baseWidth: 1200,
      radiusX: 480,
      radiusY: 230,
      aspectRatio: "1.9 / 1",
      itemWidth: 68,
      itemHeight: 120,
      strokeFontSize: 52,
    },
  }[screenSize]

  return (
    <section id="instagram" className="relative py-16 sm:py-24 bg-jet-black overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header with StrokeText */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
          <div className="max-w-2xl space-y-2">
            <div className="mb-2 w-full max-w-xs">
              <StrokeText
                text="INSTAGRAM"
                strokeColor="#FF3B8D"
                fillColor="#FF3B8D"
                strokeWidth={1.6}
                fontSize={orbitConfig.strokeFontSize}
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
              Latest from Instagram
            </h2>
            <p className="text-sm text-white/70 pt-1">
              Daily salon transformations and reels from Raipur.
            </p>
          </div>

          <SpecularButton
            href={brandData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            radius={999}
            tint="#181412"
            tintOpacity={1}
            textColor="#FFFFFF"
            lineColor="#FF3B8D"
            baseColor="#522036"
            className="self-start md:self-end border border-signature-pink text-xs uppercase tracking-wider font-bold shadow-md shrink-0 hover:bg-signature-pink hover:text-white transition-all px-5 py-2.5"
          >
            <span className="text-signature-pink font-extrabold group-hover:text-white">FOLLOW @NAZAKAT_SALON</span>
            <ArrowUpRight size={14} className="text-signature-pink" />
          </SpecularButton>
        </div>

        {/* OrbitImages Component Showcase with Instagram Profile as Background */}
        <div className="relative my-6 sm:my-12 py-3 sm:py-10 overflow-hidden rounded-2xl sm:rounded-3xl bg-black border border-white/10 shadow-2xl">
          {/* Background Wallpaper: Authentic Instagram Profile Page (Softly Blurred Depth) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center justify-center">
            <img
              src="/assets/instagram-profile-bg.png"
              alt="Nazakat Instagram Profile"
              className="w-full h-full object-cover object-center opacity-80 filter blur-[3.5px] scale-105"
            />
            {/* Soft edge vignette so the container borders blend smoothly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </div>

          <OrbitImages
            images={orbitImages}
            shape="ellipse"
            baseWidth={orbitConfig.baseWidth}
            radiusX={orbitConfig.radiusX}
            radiusY={orbitConfig.radiusY}
            rotation={-5}
            duration={30}
            itemWidth={orbitConfig.itemWidth}
            itemHeight={orbitConfig.itemHeight}
            responsive={true}
            aspectRatio={orbitConfig.aspectRatio}
            showPath={true}
            pathColor="rgba(255, 59, 141, 0.32)"
            pathWidth={1.8}
            className="w-full max-w-6xl mx-auto relative z-10"
            centerContent={
              <div className="flex flex-col items-center justify-center p-2.5 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 shadow-2xl text-center space-y-1 sm:space-y-2 w-[138px] xs:w-[155px] sm:w-[210px] md:w-[260px] pointer-events-auto transition-transform hover:scale-105 duration-300">
                <div className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full p-0.5 sm:p-1 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg shrink-0">
                  <img
                    src="/assets/logo.png"
                    alt="Nazakat Salon"
                    className="w-full h-full object-cover rounded-full bg-black"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-signature-pink border border-black flex items-center justify-center text-white">
                    <Instagram className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3" />
                  </div>
                </div>

                <div className="w-full px-1">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-white font-bold text-[11px] sm:text-sm md:text-base tracking-wide truncate">
                      @nazakat_salon
                    </span>
                    {/* Official Instagram Verified Blue Badge */}
                    <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0 fill-[#0095F6]" aria-label="Verified">
                      <path d="M10.52 2.45a2.25 2.25 0 0 1 2.96 0l1.04.91c.42.37.96.58 1.52.6l1.38.05a2.25 2.25 0 0 1 2.16 2.16l.05 1.38c.02.56.23 1.1.6 1.52l.91 1.04a2.25 2.25 0 0 1 0 2.96l-.91 1.04a2.25 2.25 0 0 0-.6 1.52l-.05 1.38a2.25 2.25 0 0 1-2.16 2.16l-1.38.05c-.56.02-1.1.23-1.52.6l-1.04.91a2.25 2.25 0 0 1-2.96 0l-1.04-.91a2.25 2.25 0 0 0-1.52-.6l-1.38-.05a2.25 2.25 0 0 1-2.16-2.16l-.05-1.38a2.25 2.25 0 0 0-.6-1.52l-.91-1.04a2.25 2.25 0 0 1 0-2.96l.91-1.04c.37-.42.58-.96.6-1.52l.05-1.38a2.25 2.25 0 0 1 2.16-2.16l1.38-.05c.56-.02 1.1-.23 1.52-.6l1.04-.91ZM16.28 9.22a.75.75 0 0 0-1.06-1.06L10.5 12.88 8.78 11.16a.75.75 0 0 0-1.06 1.06l2.25 2.25c.3.3.77.3 1.06 0l5.25-5.25Z" />
                    </svg>
                  </div>
                  <p className="text-[8.5px] sm:text-[10px] md:text-[11px] text-white/60 truncate leading-tight">
                    Raipur's #1 Luxury Salon
                  </p>
                </div>

                <a
                  href={brandData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gradient-to-r from-[#FF3B8D] to-[#D61A6E] text-white text-[8.5px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md hover:shadow-signature-pink/40 hover:opacity-95 transition-all"
                >
                  <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span>Follow on IG</span>
                </a>
              </div>
            }
          />
        </div>

        {/* 6 Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {instagramData.map((reel) => (
            <InstagramReelCard key={reel.id} reel={reel} />
          ))}
        </div>

      </div>
    </section>
  )
}
