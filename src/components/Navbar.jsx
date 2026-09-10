import React, { useState, useEffect } from 'react'
import { brandData } from '../data/mediaData'
import { Menu, X, Sparkles, Instagram } from 'lucide-react'
import CurvedLoop from './CurvedLoop'
import SpecularButton from './SpecularButton'

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Founder', href: '#founder' },
    { label: 'Academy', href: '#training' },
    { label: 'Star Visits', href: '#star-visits' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Boutique', href: '#shop' },
    { label: 'Instagram', href: '#instagram' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#D4B59F] border-b border-[#bda08b] text-[#181412] shadow-md ${
        isScrolled
          ? 'py-2.5 bg-[#D4B59F]/95 backdrop-blur-md shadow-lg'
          : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a
          href="#"
          className="flex items-center gap-3.5 sm:gap-4 group focus:outline-none shrink-0 mr-4 md:mr-8 lg:mr-10 xl:mr-14"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          {/* Enhanced luxury emblem badge */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#181412]/35 p-[2px] bg-black shadow-md group-hover:border-[#181412] transition-all duration-300">
            <img
              src={brandData.logo}
              alt="Nazakat Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif tracking-[0.24em] text-base sm:text-lg lg:text-xl font-bold text-[#181412] group-hover:text-black transition-colors duration-300 leading-tight">
              NAZAKAT
            </span>
            <span className="text-[8px] sm:text-[9.5px] tracking-[0.32em] text-[#523B2C] uppercase font-bold mt-0.5 whitespace-nowrap">
              Salon & Academy • Raipur
            </span>
          </div>
        </a>

        {/* Desktop Interactive CurvedLoop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center flex-1 h-12 max-w-2xl xl:max-w-3xl mx-2 xl:mx-6 overflow-hidden">
          <CurvedLoop
            items={navLinks}
            onItemClick={(href) => {
              const el = document.querySelector(href)
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            speed={1.4}
            curveAmount={18}
            direction="left"
            interactive={true}
            pauseOnHover={true}
            viewBox="0 0 1200 60"
            pathD="M-100,28 Q600,48 1300,28"
            className="curved-loop-navbar-text"
            jacketClassName="curved-loop-jacket--navbar"
          />
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={brandData.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#181412] hover:text-white hover:scale-110 transition-all"
            title="Follow on Instagram"
            aria-label="Nazakat Instagram"
          >
            <Instagram size={18} />
          </a>

          <SpecularButton
            onClick={onOpenBooking}
            size="sm"
            radius={999}
            tint="#181412"
            tintOpacity={1}
            textColor="#ffffff"
            lineColor="#FF3B8D"
            baseColor="#3d2c22"
            intensity={1.2}
            shineSize={14}
            shineFade={35}
            thickness={1.4}
            followMouse={true}
            className="text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md"
          >
            <span>Book Appointment</span>
          </SpecularButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#181412] hover:text-black focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#D4B59F] border-b border-[#bda08b] shadow-2xl px-6 py-6 mt-3 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3 pb-4 border-b border-[#181412]/20">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm uppercase tracking-wider font-bold text-[#181412] hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <SpecularButton
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenBooking()
              }}
              size="md"
              radius={999}
              tint="#181412"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#FF3B8D"
              baseColor="#3d2c22"
              intensity={1.2}
              shineSize={16}
              shineFade={35}
              thickness={1.5}
              followMouse={true}
              className="w-full text-xs font-bold tracking-widest uppercase shadow-lg"
            >
              <span>Book Bespoke Experience</span>
            </SpecularButton>
            <a
              href={brandData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-center text-[#523B2C] font-semibold py-1 flex items-center justify-center gap-2 tracking-wider hover:text-[#181412]"
            >
              <Instagram size={14} />
              {brandData.instagram}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
