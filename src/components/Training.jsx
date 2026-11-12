import React, { useState, useRef } from 'react'
import { trainingData } from '../data/mediaData'
import { GraduationCap, Clock, Award, BookOpen, Download, ArrowRight, CheckCircle2, Play } from 'lucide-react'
import StrokeText from './StrokeText'
import SpecularButton from './SpecularButton'

const featuredCourses = [
  {
    id: 'hair-mastery',
    title: 'Masterclass in Precision Hair Dressing & Cut Engineering',
    category: 'Hair Architecture',
    duration: '12 Weeks',
    level: 'Advanced Masterclass',
    badge: 'Flagship Program',
    fee: 'Batch Starting Soon',
    summary: 'Comprehensive mastery from foundational biomechanics to French editorial cuts, texturizing, and live client salon simulations.',
    modules: [
      'Architectural Sectioning & Precision Angles',
      'French Cutting & European Layering Techniques',
      'Advanced Blowouts, Heat Styling & Finishing',
      'Live Client Consultations & Salon Floor Simulation'
    ]
  },
  {
    id: 'bridal-hd',
    title: 'Advanced Bridal & High-Definition Makeup Artistry',
    category: 'Bridal Artistry',
    duration: '10 Weeks',
    level: 'Professional Diploma',
    badge: 'High Demand',
    fee: 'Batch Starting Soon',
    summary: 'Step-by-step editorial, royal bridal, and camera-ready HD airbrush artistry paired with professional hair draping.',
    modules: [
      'High-Definition & Airbrush Base Creation',
      'Contouring, Eye Architecture & Lash Crafting',
      'Traditional Royal & Modern Bridal Looks',
      'Dupatta Draping, Jewelry Placement & Portfolio'
    ]
  },
  {
    id: 'color-balayage',
    title: 'Color Chemistry & Creative Balayage Masterclass',
    category: 'Color Chemistry',
    duration: '8 Weeks',
    level: 'Specialization Course',
    badge: 'Industry Certified',
    fee: 'Batch Starting Soon',
    summary: 'Deep dive into color wheel physics, freehand French balayage, foilayage, root melts, and corrective chemistry.',
    modules: [
      'Pigment Neutralization & Decolorization Physics',
      'Freehand Contouring & Root Melting Rituals',
      'Toning Formulas, Glossing & Bond Multipliers',
      'Color Correction from Box Dye & Patchiness'
    ]
  }
]

export default function Training({ onOpenBooking }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const videoRef = useRef(null)

  const activeVideo = trainingData.videos[activeVideoIndex]

  const handleDownloadProspectus = (courseTitle) => {
    const text = encodeURIComponent(`Hello Nazakat Academy Raipur! I would like to download the full syllabus & prospectus for "${courseTitle}".`)
    window.open(`https://wa.me/919826100000?text=${text}`, '_blank')
  }

  return (
    <section id="training" className="relative py-16 sm:py-24 bg-[#F5EFEB] text-[#181412] border-t border-[#181412]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-2">
          <div className="w-full max-w-xs mx-auto">
            <StrokeText
              text="ACADEMY"
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
            Nazakat Professional Academy
          </h2>
          <p className="text-xs sm:text-sm text-[#523B2C] max-w-2xl mx-auto leading-relaxed">
            Where passion transforms into world-class artistry. International curriculum, personalized mentorship by Nazakat Ali, and live client floor exposure in Raipur.
          </p>
        </div>

        {/* Featured Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-18">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-white border border-[#181412]/15 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-signature-pink/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badges & Meta */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-signature-pink/10 text-signature-pink text-[11px] font-bold uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-[#8A7A70] flex items-center gap-1">
                    <Clock size={13} />
                    {course.duration}
                  </span>
                </div>

                {/* Course Title */}
                <h3 className="font-sans text-lg sm:text-xl font-bold text-[#181412] leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-[#523B2C] leading-relaxed">
                  {course.summary}
                </p>

                {/* Key Syllabus Modules */}
                <div className="pt-3 border-t border-[#181412]/10 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A7A70] block">
                    Core Curriculum Modules:
                  </span>
                  <ul className="space-y-2 text-xs text-[#3D332D]">
                    {course.modules.map((mod, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-signature-pink shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-[#181412]/10 space-y-2.5">
                <SpecularButton
                  onClick={() => onOpenBooking(`Academy Admission Inquiry - ${course.title}`)}
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
                  <span>Apply for Batch</span>
                  <ArrowRight size={13} />
                </SpecularButton>

                <button
                  type="button"
                  onClick={() => handleDownloadProspectus(course.title)}
                  className="w-full py-2 px-3 rounded-full border border-[#181412]/20 hover:border-[#181412] text-xs font-bold uppercase tracking-wider text-[#181412] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download Syllabus</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Academy Classrooms & Studio Tour */}
        <div className="rounded-2xl bg-white border border-[#181412]/15 p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Video Player */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-lg border border-black/10">
                <video
                  ref={videoRef}
                  key={activeVideo.id}
                  src={activeVideo.video}
                  poster={activeVideo.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-signature-pink">
                    Academy Tour
                  </span>
                  <h4 className="font-sans text-base sm:text-lg font-bold">{activeVideo.title}</h4>
                  <p className="text-xs text-white/80">{activeVideo.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Right: Classroom Selector Tabs */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-signature-pink block">
                World-Class Infrastructure
              </span>
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-[#181412]">
                Explore Our Training Classrooms
              </h3>
              <p className="text-xs text-[#523B2C] leading-relaxed">
                Take a virtual tour of our lecture theaters, ergonomic student styling stations, and live salon mock rooms.
              </p>

              <div className="pt-2 space-y-2">
                {trainingData.videos.map((vid, idx) => {
                  const isCurrent = activeVideoIndex === idx
                  return (
                    <button
                      key={vid.id}
                      type="button"
                      onClick={() => setActiveVideoIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isCurrent
                          ? 'bg-[#181412] text-white border-[#181412] shadow-md'
                          : 'bg-[#FAF8F5] text-[#181412] border-[#181412]/10 hover:border-signature-pink'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <span className={`text-xs font-bold block ${isCurrent ? 'text-signature-pink' : 'text-[#181412]'}`}>
                          {vid.title}
                        </span>
                        <span className={`text-[11px] line-clamp-1 ${isCurrent ? 'text-white/70' : 'text-[#8A7A70]'}`}>
                          {vid.subtitle}
                        </span>
                      </div>
                      <Play size={13} className={isCurrent ? 'text-signature-pink' : 'text-[#8A7A70]'} />
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
