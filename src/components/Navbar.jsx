import React, { useState, useEffect } from 'react'
import { brandData } from '../data/mediaData'
import { Menu, X, Instagram, Sparkles, GraduationCap, Scissors } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function Navbar({ onOpenBooking, currentMode = 'salon', onModeChange }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMode, setActiveMode] = useState(currentMode)

  useEffect(() => {
    setActiveMode(currentMode)
  }, [currentMode])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleMode = (mode) => {
    setActiveMode(mode)
    if (onModeChange) onModeChange(mode)
    const targetId = mode === 'academy' ? '#training' : '#services'
    const el = document.querySelector(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const salonLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Boutique', href: '#shop' },
    { label: 'About', href: '#founder' },
    { label: 'Contact', href: '#contact' },
  ]

  const academyLinks = [
    { label: 'Courses', href: '#training' },
    { label: 'Faculty & Stars', href: '#star-visits' },
    { label: 'Student Work', href: '#transformations' },
    { label: 'Admissions', href: '#contact' },
  ]

  const currentLinks = activeMode === 'salon' ? salonLinks : academyLinks

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#D4B59F] border-b border-[#bda08b] text-[#181412] ${
        isScrolled
          ? 'py-2 bg-[#D4B59F]/95 backdrop-blur-md shadow-lg'
          : 'py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Utility Bar: Dual Mode Switcher */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#181412]/15 text-[11px] font-semibold tracking-wider">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#523B2C] uppercase text-[10px] tracking-widest hidden sm:inline">
              Mode:
            </span>
            <div className="inline-flex items-center p-0.5 rounded-full bg-black/10 border border-black/15 shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleMode('salon')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeMode === 'salon'
                    ? 'bg-[#181412] text-white shadow-sm'
                    : 'text-[#181412] hover:text-black hover:bg-black/5'
                }`}
              >
                <Scissors size={12} className={activeMode === 'salon' ? 'text-signature-pink' : ''} />
                <span>Salon Services</span>
              </button>
              <button
                type="button"
                onClick={() => handleToggleMode('academy')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeMode === 'academy'
                    ? 'bg-[#181412] text-white shadow-sm'
                    : 'text-[#181412] hover:text-black hover:bg-black/5'
                }`}
              >
                <GraduationCap size={13} className={activeMode === 'academy' ? 'text-signature-pink' : ''} />
                <span>Professional Academy</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] text-[#523B2C] uppercase tracking-widest">
            <span className="hidden md:inline">Raipur, CG • Flagship Destination</span>
            <a
              href={brandData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#181412] transition-colors"
              title="Nazakat Instagram"
            >
              <Instagram size={13} />
              <span className="hidden sm:inline">@nazakat_salon</span>
            </a>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#181412]/35 p-[2px] bg-black shadow-md group-hover:border-[#181412] transition-all duration-300">
              <img
                src={brandData.logo}
                alt="Nazakat Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans tracking-[0.22em] text-base sm:text-lg lg:text-xl font-extrabold text-[#181412] group-hover:text-black transition-colors duration-300 leading-tight">
                NAZAKAT
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] text-[#523B2C] uppercase font-bold mt-0.5 whitespace-nowrap">
                {activeMode === 'salon' ? 'Luxury Salon • Raipur' : 'Beauty Academy • Raipur'}
              </span>
            </div>
          </a>

          {/* Clean, Uncluttered Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 mx-6">
            {currentLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-bold uppercase tracking-[0.16em] text-[#181412]/90 hover:text-black relative py-1 group transition-colors duration-200"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-signature-pink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <SpecularButton
              onClick={() => onOpenBooking(activeMode === 'academy' ? 'Academy Admission Inquiry' : 'Hair Artistry & Balayage')}
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
              className="text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-md px-5 py-2.5 cursor-pointer"
            >
              <span>{activeMode === 'academy' ? 'Apply for Batch' : 'Book Appointment'}</span>
            </SpecularButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#181412] hover:text-black focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#D4B59F] border-t border-[#bda08b] pt-4 pb-6 mt-3 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-3 pb-4 border-b border-[#181412]/20">
              {currentLinks.map((link) => (
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
                  onOpenBooking(activeMode === 'academy' ? 'Academy Admission Inquiry' : 'Hair Artistry & Balayage')
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
                className="w-full text-xs font-bold tracking-widest uppercase shadow-lg cursor-pointer"
              >
                <span>{activeMode === 'academy' ? 'Apply for Batch' : 'Book Appointment'}</span>
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
      </div>
    </header>
  )
}
