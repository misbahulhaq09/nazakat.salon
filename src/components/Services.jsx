import React, { useRef } from 'react'
import { ArrowRight, Sparkles, Check, Clock } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

const serviceCategories = [
  {
    id: 'hair',
    number: '01',
    name: 'Hair Artistry & Balayage',
    tagline: 'Precision Cuts • Custom Blonding • Scalp Therapy',
    startingPrice: '₹4,999',
    duration: '90-180 mins',
    video: '/assets/service-hair-highlights.mp4',
    poster: '/assets/posters/service-hair-highlights.jpg',
    subServices: [
      'Seamless French Balayage & Foilayage',
      'Precision Architectural Haircuts',
      'Japanese Scalp Spa & Hydro-Detox',
      'Keratin & Molecular Bond Repair',
      'Global Blonding & Color Correction'
    ],
    popular: 'Most Booked'
  },
  {
    id: 'skin',
    number: '02',
    name: 'Clinical Skin & Hydra-Facials',
    tagline: 'Hydra-Dermabrasion • LED Phototherapy • Cellular Glow',
    startingPrice: '₹2,499',
    duration: '60-90 mins',
    video: '/assets/service-hydra-facial.mp4',
    poster: '/assets/posters/service-hydra-facial.jpg',
    subServices: [
      'Multi-Step Medical Hydra-Facial',
      'Photodynamic Red/Blue LED Therapy',
      'Oxygen Infusion & Hyaluronic Quench',
      'Clinical Pore Clarifying Sanctuary',
      'Lymphatic Drainage & Instant Lift'
    ],
    popular: null
  },
  {
    id: 'nails',
    number: '03',
    name: 'Nail Couture & Aesthetics',
    tagline: 'Russian Manicure • Bespoke Gel • Hydro Pedicure',
    startingPrice: '₹1,999',
    duration: '45-75 mins',
    video: '/assets/service-nail-art.mp4',
    poster: '/assets/service-nail-poster.jpg',
    subServices: [
      'Signature Gel Sculpting & Extensions',
      'Hand-Painted Couture Nail Art',
      'Russian Dry Cuticle Architecture',
      'Therapeutic Hydro-Foot Spa & Massage',
      'Luxe Warm Paraffin Deep Conditioning'
    ],
    popular: null
  },
  {
    id: 'bridal',
    number: '04',
    name: 'Bridal & Couture Makeup',
    tagline: 'High Definition • Cinematic Glow • Royal Draping',
    startingPrice: '₹15,000',
    duration: '180-240 mins',
    video: '/assets/insta-reel-1-transformation.mp4',
    poster: '/assets/before-after-bridal.png',
    subServices: [
      'HD & Airbrush Cinematic Bridal Looks',
      'Pre-Bridal Clinical Skin Regimen',
      'Dupatta Draping & Hair Architecture',
      'Engagement & Red Carpet Glamour',
      'Private Suite VIP Consultation'
    ],
    popular: 'Signature Luxury'
  }
]

function ServiceCard({ service, onOpenBooking }) {
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-white border border-[#181412]/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-signature-pink/40 transition-all duration-300 flex flex-col justify-between"
    >
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={service.video}
          poster={service.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-bold tracking-wider">
            {service.number}
          </span>
          {service.popular && (
            <span className="px-2.5 py-1 rounded-full bg-signature-pink text-white text-[10px] uppercase font-bold tracking-wider shadow-md">
              {service.popular}
            </span>
          )}
        </div>

        {/* Starting Price Pill at bottom-right of video */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/20 text-white">
          <span className="text-[10px] text-white/70 block uppercase tracking-wider font-medium">From</span>
          <span className="font-sans text-sm sm:text-base font-bold text-white">{service.startingPrice}</span>
        </div>

        {/* Duration estimate */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] text-white/80 font-medium">
          <Clock size={12} className="text-[#D4B59F]" />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-sans text-lg sm:text-xl font-bold text-[#181412] leading-snug">
            {service.name}
          </h3>
          <p className="text-xs text-[#523B2C] font-normal leading-relaxed">
            {service.tagline}
          </p>

          {/* Sub-services checklist */}
          <div className="pt-3 border-t border-[#181412]/10 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8A7A70] font-bold block">
              Includes & Treatments:
            </span>
            <ul className="space-y-1.5 text-xs text-[#3D332D]">
              {service.subServices.slice(0, 4).map((sub, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check size={13} className="text-signature-pink shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Direct Action Button */}
        <div className="pt-4 border-t border-[#181412]/10">
          <SpecularButton
            onClick={() => onOpenBooking(service.name)}
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
            className="w-full text-xs font-bold uppercase tracking-wider justify-center shadow-md py-2.5 cursor-pointer"
          >
            <span>Book Service</span>
            <ArrowRight size={13} />
          </SpecularButton>
        </div>
      </div>
    </div>
  )
}

export default function Services({ onOpenBooking }) {
  return (
    <section id="services" className="relative py-16 sm:py-24 bg-[#FAF8F5] text-[#181412] border-t border-[#181412]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-2">
          <div className="w-full max-w-xs mx-auto">
            <StrokeText
              text="OUR SERVICES"
              strokeColor="#FF3B8D"
              fillColor="#FF3B8D"
              strokeWidth={1.6}
              fontSize={40}
              fontWeight={900}
              letterSpacing={1.5}
              trigger="scroll"
              fillMode="wipe"
              drawDuration={1.2}
              fillDelay={0.2}
              align="center"
            />
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#181412] tracking-tight">
            Interactive Service Menu
          </h2>
          <p className="text-xs sm:text-sm text-[#523B2C] font-normal leading-relaxed">
            Select your desired beauty and grooming ritual. Instant pricing, bespoke consultations, and direct booking.
          </p>
        </div>

        {/* 4-Column Visual Category Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {serviceCategories.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenBooking={onOpenBooking}
            />
          ))}
        </div>

        {/* Bottom Assurance Strip */}
        <div className="mt-12 pt-8 border-t border-[#181412]/10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-[#523B2C] font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-signature-pink" />
            100% Authentic Luxury Formulations
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-signature-pink" />
            Certified Master Stylists & Educators
          </span>
          <span className="flex items-center gap-2">
            <Sparkles size={14} className="text-signature-pink" />
            Private Suites & Sanitized Tools
          </span>
        </div>

      </div>
    </section>
  )
}
