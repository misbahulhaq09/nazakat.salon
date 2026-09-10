import React, { useState } from 'react'
import { brandData } from '../data/mediaData'
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react'
import SpecularButton from './SpecularButton'

export default function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Hair Artistry & Balayage',
    date: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // Build pre-filled WhatsApp message
    const msg = encodeURIComponent(
      `Hello Nazakat Salon & Academy,\n\nI would like to book a bespoke consultation:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Service: ${formData.service}\n• Preferred Date: ${formData.date || 'Flexible'}\n• Notes: ${formData.notes || 'None'}\n\nPlease confirm availability.`
    )
    window.open(`https://wa.me/919826100000?text=${msg}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-[#D4B59F]/50 bg-luxe-card p-6 sm:p-8 shadow-[0_20px_50px_rgba(212,181,159,0.25)] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-pure-white/70 hover:text-[#D4B59F] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs uppercase tracking-ultra text-signature-pink font-medium">
            BESPOKE RESERVATION
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-pure-white font-normal">
            Begin Your Transformation
          </h3>
          <p className="text-xs text-pure-white/60 font-light">
            Reserve a salon consultation or inquiry for professional academy admissions.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 size={42} className="text-signature-pink mx-auto" />
            <h4 className="font-serif text-xl text-pure-white">Consultation Initiated</h4>
            <p className="text-xs text-pure-white/70 font-light">
              Connecting you directly with the Nazakat concierge on WhatsApp...
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                onClose()
              }}
              className="mt-4 px-6 py-2 rounded-full bg-signature-pink text-white text-xs font-bold uppercase tracking-wider hover:bg-signature-pink-dark transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block uppercase tracking-wider text-nude-beige/90 mb-1 font-light">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-pure-white placeholder-white/30 focus:border-signature-pink focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-nude-beige/90 mb-1 font-light">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98260 XXXXX"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-pure-white placeholder-white/30 focus:border-signature-pink focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider text-nude-beige/90 mb-1 font-light">
                Select Department / Interest
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-pure-white focus:border-signature-pink focus:outline-none transition-colors"
              >
                <option value="Hair Artistry & Balayage">Hair Artistry & Balayage</option>
                <option value="Clinical Skin Hydra-Facial">Clinical Skin & Hydra-Facial</option>
                <option value="Nail Couture & Pedicure">Nail Couture & Pedicure</option>
                <option value="Couture Bridal & Makeup">Couture Bridal & Makeup</option>
                <option value="Academy Admission Inquiry">Academy Admission Inquiry</option>
                <option value="Scalp Therapy & Hair Restoration">Scalp Therapy & Hair Restoration</option>
              </select>
            </div>

            <div>
              <label className="block uppercase tracking-wider text-nude-beige/90 mb-1 font-light">
                Preferred Date (Optional)
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-pure-white focus:border-signature-pink focus:outline-none transition-colors"
              />
            </div>

            <SpecularButton
              type="submit"
              size="md"
              radius={999}
              tint="#FF3B8D"
              tintOpacity={1}
              textColor="#ffffff"
              lineColor="#ffffff"
              baseColor="#D61A6E"
              intensity={1.2}
              shineSize={16}
              shineFade={36}
              thickness={1.5}
              followMouse={true}
              className="w-full text-xs uppercase tracking-luxury font-medium shadow-luxe-glow mt-6"
            >
              <Send size={14} />
              <span>Connect with Concierge</span>
            </SpecularButton>
          </form>
        )}
      </div>
    </div>
  )
}
