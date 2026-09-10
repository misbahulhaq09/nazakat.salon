import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Founder from './components/Founder'
import Services from './components/Services'
import Training from './components/Training'
import StarVisits from './components/StarVisits'
import BeforeAfter from './components/BeforeAfter'
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

      // 2. Scroll-driven Section Headings Animation (excluding pinned sections)
      const titles = document.querySelectorAll('section:not(#services):not(#training) h2, .reveal-title')
      titles.forEach((title) => {
        gsap.fromTo(
          title,
          { y: isMobile ? 20 : 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
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

      // 3. Staggered Grid Card Animations (Star Visits, Shop, Instagram)
      const grids = document.querySelectorAll('#star-visits .grid, #shop .grid, #instagram .grid')
      grids.forEach((grid) => {
        const items = Array.from(grid.children)
        gsap.fromTo(
          items,
          { y: isMobile ? 20 : 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: isMobile ? 0.06 : 0.12,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // 4. Scroll-driven Paragraphs, Quotes and Text Blocks
      const textBlocks = document.querySelectorAll('blockquote, .reveal-text p')
      textBlocks.forEach((tb) => {
        gsap.fromTo(
          tb,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: tb,
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
      {/* Navigation */}
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero / Home - Saamne Ka Front Area (Signature Black Luxury Theme) */}
        <Hero onOpenBooking={() => setBookingOpen(true)} />

        {/* 2. Lower Content Sections - Neeche Ka Area (White Luxury Background Theme) */}
        <div className="theme-light-sections bg-[#FAF8F5] text-[#181412]">
          {/* Founder Section */}
          <Founder />

          {/* Services Catalogue */}
          <Services onOpenBooking={() => setBookingOpen(true)} />

          {/* Academy & Training */}
          <Training onOpenBooking={() => setBookingOpen(true)} />

          {/* Star Visits */}
          <StarVisits />

          {/* Before & After */}
          <BeforeAfter onOpenBooking={() => setBookingOpen(true)} />

          {/* Shop & Boutique */}
          <Shop onOpenBooking={() => setBookingOpen(true)} />

          {/* Instagram Reels Feed */}
          <InstagramFeed />

          {/* Final Contact / CTA Footer */}
          <Footer onOpenBooking={() => setBookingOpen(true)} />
        </div>
      </main>

      {/* Booking & Admissions Modal */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  )
}
