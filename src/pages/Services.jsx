import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, DollarSign, CheckCircle2 } from 'lucide-react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import SectionHeading from '../components/ui/SectionHeading'

import ceramicImg from '../assets/imgi_2_ceramiccoating.webp'
import interiorImg from '../assets/imgi_4_Interior.png'
import exteriorImg from '../assets/imgi_2_exterior2.jpg'
import paintImg from '../assets/imgi_5_paint-correction.webp'

const fallbackServices = [
  {
    id: 'exterior-detailing',
    name: 'Exterior Detailing',
    description: 'More Than Just a Wash — Wheels & tires deep cleaned with pH-balanced cleaner, pre-rinse & snow foam, detailed brush cleaning (grille, emblems, trim), door jamb cleaning, contact wash (two-bucket method) with pH-neutral shampoo, paint decontamination (iron remover + clay bar), air blow & microfiber towel drying, tire dressing, and glass cleaning.',
    price: 'Package Pricing',
    duration: '2-3 hours',
    isActive: true,
    image: exteriorImg,
    features: ['Snow foam pre-wash', 'Two-bucket method', 'Iron remover + clay bar', 'Door jamb cleaning', 'Tire dressing', 'Coating-safe process'],
  },
  {
    id: 'interior-detailing',
    name: 'Interior Detailing',
    description: 'Deep Clean, Restore & Refresh Your Cabin — Interior vacuuming (floor, mats, trunk), dashboard, door panels & center console detailed, vents, buttons & knobs cleaned with soft detailing brushes, steering wheel deep cleaned to factory matte finish, steam cleaning of high-touch surfaces, headliner spot-cleaning, and interior fragrance application.',
    price: 'Package Pricing',
    duration: '2-4 hours',
    isActive: true,
    image: interiorImg,
    features: ['Full vacuuming', 'Steam sanitization', 'Leather treatment', 'Steering wheel restoration', 'Headliner spot-clean', 'Fragrance application'],
  },
  {
    id: 'paint-correction',
    name: 'Paint Correction',
    description: 'Multi-Stage Perfection & Showroom Finish — Our most advanced polishing service using multiple machine steps of cutting and refining compounds. Removes up to 90% of imperfections like heavy swirls, oxidation, scratches, and etching. The result is a mirror-like, showroom-quality finish with unmatched clarity and depth.',
    price: 'From $749.99',
    duration: '4-8 hours',
    isActive: true,
    image: paintImg,
    features: ['Exterior detail wash', 'Paint decontamination', 'Multi-stage correction', '3-month polymer sealant', 'Detailing light inspection', 'Final quality check'],
  },
  {
    id: 'ceramic-coating',
    name: 'Ceramic Coating',
    description: 'Professional ceramic coating installer in Montreal. SiO₂ nanotechnology protection against Quebec road salt, calcium, and industrial fallout. Provides a hydrophobic layer that keeps your car cleaner for longer, with superior UV protection and an incredible depth of gloss. 2-5 year warranty included.',
    price: 'Contact for Pricing',
    duration: '1-2 days',
    isActive: true,
    image: ceramicImg,
    features: ['SiO₂ nanotechnology', 'Road salt protection', 'UV damage prevention', 'Hydrophobic finish', '2-5 year warranty', 'Paint correction prerequisite'],
  },
]

export default function Services() {
  const [services, setServices] = useState(fallbackServices)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const q = query(collection(db, 'services'), where('isActive', '==', true))
        const snapshot = await getDocs(q)
        if (!snapshot.empty) {
          const firestoreServices = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setServices(firestoreServices.map((s, i) => ({
            ...s,
            image: fallbackServices[i]?.image || fallbackServices[0].image,
            features: s.features || fallbackServices[i]?.features || [],
          })))
        }
      } catch (err) {
        console.log('Using fallback services:', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <>
      <Helmet>
        <title>Auto Detailing Services in Montreal & Saint-Hubert | Down2Detail</title>
        <meta name="description" content="Explore Down2Detail's professional auto detailing services in Montreal & Saint-Hubert. Exterior detailing, interior detailing, paint correction, and ceramic coating. Book now!" />
      </Helmet>

      {/* Hero Banner */}
      <section className="pt-32 pb-16 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Services"
            title="Premium Auto Detailing Services"
            description="We offer a full range of premium services using professional-grade products to keep your vehicle in showroom condition year-round."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-card rounded-2xl h-[500px] shimmer" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border-warm/50 card-hover group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <span className="flex items-center gap-1 bg-primary/10 text-primary text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                        <DollarSign size={14} />
                        {service.price}
                      </span>
                    </div>

                    {service.duration && (
                      <div className="flex items-center gap-1.5 text-text-muted text-sm mb-3">
                        <Clock size={14} />
                        <span>{service.duration}</span>
                      </div>
                    )}

                    <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-5">
                        {service.features.slice(0, 6).map((f, j) => (
                          <div key={j} className="flex items-center gap-1.5 text-text-secondary text-xs">
                            <CheckCircle2 size={12} className="text-primary shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/booking?service=${encodeURIComponent(service.name)}`}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-black font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
                    >
                      Book Now
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 page-gradient">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Contact us for a free consultation and we'll recommend the perfect service for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-8 py-3.5 rounded-lg transition-all"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+14384838175"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-primary text-white font-medium px-8 py-3.5 rounded-lg transition-all"
            >
              Call: 438-483-8175
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
