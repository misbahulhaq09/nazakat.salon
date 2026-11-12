import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import Training from './components/Training'
import Founder from './components/Founder'
import StarVisits from './components/StarVisits'
import Shop from './components/Shop'
import InstagramFeed from './components/InstagramFeed'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [currentMode, setCurrentMode] = useState('salon')

  const handleOpenBooking = (service = 'Hair Artistry & Balayage') => {
    setSelectedService(service)
    setBookingOpen(true)
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const isMobile = window.innerWidth < 768

    const ctx = gsap.context(() => {
      // 1. Initial Hero Mount Animation (if present)
      if (document.querySelector('.reveal-hero-logo')) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(
          '.reveal-hero-logo',
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 1.1 }
        )
        .fromTo(
          '.reveal-hero-title',
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1 },
          '-=0.7'
        )
        .fromTo(
          '.reveal-hero-sub',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.6'
        )
      }

      // 2. Scroll-driven Section Headings Animation
      const titles = document.querySelectorAll('section h2, .reveal-title')
      titles.forEach((title) => {
        gsap.fromTo(
          title,
          { y: isMobile ? 18 : 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Refresh ScrollTrigger after DOM setup
      ScrollTrigger.refresh()
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-jet-black text-pure-white selection:bg-signature-pink selection:text-pure-white antialiased overflow-x-clip">
      {/* HEADER: Sticky Header with Dual Mode Toggle [ SALON SERVICES | PROFESSIONAL ACADEMY ] */}
      <Navbar
        currentMode={currentMode}
        onModeChange={(mode) => setCurrentMode(mode)}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Sections */}
      <main>
        {/* SECTION 1: Luxury Hero Banner (Untouched with original video & scroll expand) */}
        <Hero onOpenBooking={() => handleOpenBooking('Hair Artistry & Balayage')} />

        {/* SECTION 2: Interactive Service Menu (Promoted to Block 2 with 4-Column Visual Category Cards) */}
        <Services onOpenBooking={handleOpenBooking} />

        {/* SECTION 3: Before & After Transformation Vault (Promoted to Block 3 with 9:16 Video Hub & Filter Tabs) */}
        <BeforeAfter onOpenBooking={handleOpenBooking} />

        {/* SECTION 4: Nazakat Academy Spotlight (Warm beige hub, Course Cards, Syllabus Download & Classrooms) */}
        <Training onOpenBooking={handleOpenBooking} />

        {/* SECTION 5: Social Proof, Founder Bio & Celebrity Visits */}
        <div className="theme-light-sections bg-white text-[#181412]">
          <Founder />
        </div>
        <StarVisits />

        {/* SECTION 6: Curated Product Boutique & Hair Science */}
        <Shop onOpenBooking={handleOpenBooking} />

        {/* SECTION 7: Instagram Community Reels */}
        <InstagramFeed />

        {/* FOOTER: Location / Google Maps, Hours, WhatsApp Concierge */}
        <Footer onOpenBooking={handleOpenBooking} />
      </main>

      {/* Booking & Admissions Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </div>
  )
}
