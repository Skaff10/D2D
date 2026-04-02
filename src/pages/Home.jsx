import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Sparkles, Clock, Award, Star, ChevronRight, Maximize2 } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'

import heroImg from '../assets/imgi_3_shutHero.jpg'
import ceramicImg from '../assets/imgi_2_ceramiccoating.webp'
import interiorImg from '../assets/imgi_4_Interior.png'
import exteriorImg from '../assets/imgi_2_exterior2.jpg'
import paintImg from '../assets/imgi_5_paint-correction.webp'
import beforeAfterImg from '../assets/imgi_3_beforeaftercoating.webp'
import ferrariImg from '../assets/imgi_3_ferrari.png'
import porscheImg from '../assets/imgi_5_porsche.png'
import mercedesImg from '../assets/imgi_7_mercedes.png'
import bmwImg from '../assets/imgi_8_BMW.png'

const services = [
  {
    title: 'Exterior Detailing',
    description: 'Complete exterior cleaning with snow foam, two-bucket wash, paint decontamination, clay bar treatment, and tire dressing.',
    image: exteriorImg,
    price: 'Package Pricing',
  },
  {
    title: 'Interior Detailing',
    description: 'Deep interior cleaning — vacuuming, dashboard detailing, steam cleaning, steering wheel restoration, and fragrance application.',
    image: interiorImg,
    price: 'Package Pricing',
  },
  {
    title: 'Paint Correction',
    description: 'Multi-stage machine polishing to remove up to 90% of swirls, oxidation, and scratches for a mirror-like showroom finish.',
    image: paintImg,
    price: 'From $749',
  },
  {
    title: 'Ceramic Coating',
    description: 'SiO₂ nanotechnology protection against road salt, calcium, UV damage. 2-5 year warranty included.',
    image: ceramicImg,
    price: 'Contact Us',
  },
]

const whyChooseUs = [
  { icon: Shield, title: 'Premium Products', desc: 'Professional-grade detailing products only' },
  { icon: Sparkles, title: 'Expert Detail', desc: 'Meticulous attention to every surface' },
  { icon: Clock, title: 'Reliable Service', desc: 'On-time, every time — 7 days a week' },
  { icon: Award, title: 'Guaranteed Quality', desc: '100% satisfaction on every job' },
]

const stats = [
  { value: '500+', label: 'Cars Detailed' },
  { value: '4.9', label: 'Star Rating' },
  { value: '100%', label: 'Satisfaction' },
  { value: '7/7', label: 'Days Open' },
]

const testimonials = [
  {
    name: 'Alexandre M.',
    text: 'Incredible work on my Tesla Model 3. The ceramic coating looks absolutely flawless. Highly recommend Down2Detail!',
    rating: 5,
  },
  {
    name: 'Sarah L.',
    text: 'Best interior detailing I\'ve ever had. My car looks and smells brand new. The attention to detail is unmatched.',
    rating: 5,
  },
  {
    name: 'Marc-André B.',
    text: 'Paint correction brought my BMW back to showroom condition. These guys really know what they\'re doing.',
    rating: 5,
  },
]

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Premium Auto Detailing in Montreal & Saint-Hubert | Down2Detail</title>
        <meta name="description" content="Down2Detail offers professional auto detailing in Montreal & Saint-Hubert, QC. Paint correction, ceramic coating, interior & exterior detailing. Serving the Greater Montreal Area. Book today!" />
        <link rel="canonical" href="https://down2detail.ca/" />
      </Helmet>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 page-gradient" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="serif-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6">
                Bringing Your Car's{' '}
                <span className="serif-heading-italic text-gradient">Shine</span>{' '}
                Back to Life
              </h1>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Professional detailing, advanced technology, and showroom-quality results.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="btn-filled">
                  Book Now
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>

              {/* Mini floating cards like reference [01] [02] */}
              <div className="flex gap-4 mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="dark-card p-4 flex-1 max-w-[200px]"
                >
                  <span className="section-tag block mb-2">[01]</span>
                  <p className="text-white text-sm font-medium leading-snug">Mobile Service Available</p>
                  <div className="flex justify-end mt-3">
                    <div className="shield-badge">
                      <Shield size={14} className="text-white/40" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="dark-card p-4 flex-1 max-w-[200px]"
                >
                  <span className="section-tag block mb-2">[02]</span>
                  <p className="text-white text-sm font-medium leading-snug">Trusted by 500+ Car Owners</p>
                  <div className="flex justify-end mt-3">
                    <div className="shield-badge">
                      <Award size={14} className="text-white/40" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={heroImg}
                  alt="Premium car detailing service by Down2Detail"
                  className="w-full h-[580px] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
              </div>

              {/* Floating overlay cards like reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute top-6 right-6 glass rounded-xl p-3 max-w-[160px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Star size={14} className="text-primary" fill="#f97316" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-xs">4.9 Rating</p>
                    <p className="text-white/40 text-[10px]">500+ Detailed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BRAND LOGOS ===== */}
      <section className="py-12 bg-surface border-y border-white/[0.04] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center section-tag mb-8">Trusted by owners of</p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap opacity-30">
            {[
              { src: bmwImg, alt: 'BMW' },
              { src: mercedesImg, alt: 'Mercedes' },
              { src: porscheImg, alt: 'Porsche' },
              { src: ferrariImg, alt: 'Ferrari' },
            ].map((brand) => (
              <img
                key={brand.alt}
                src={brand.src}
                alt={brand.alt}
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW — Reference "Your Car Deserves More" section ===== */}
      <section className="py-20 lg:py-28 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Bento-style layout */}
              <div className="space-y-4">
                <p className="text-text-secondary text-sm leading-relaxed">
                  To ensure your car looks stunning — <span className="text-white font-medium">Down2Detail</span>
                </p>
                <div className="dark-card p-5 mt-4">
                  <p className="text-white text-sm leading-relaxed">
                    We deliver professional detailing with cutting-edge technology
                  </p>
                </div>
                <div className="relative rounded-2xl overflow-hidden img-zoom mt-4">
                  <img
                    src={beforeAfterImg}
                    alt="Before and after ceramic coating by Down2Detail"
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                Your Car Deserves More than an{' '}
                <span className="serif-heading-italic">Ordinary Wash</span>
              </h2>
              <div className="flex gap-3 mb-8">
                <Link to="/booking" className="btn-filled">
                  Book Now
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                At Down2Detail, we believe auto detailing is an art, not just a service. Based in Saint-Hubert and serving the Greater Montreal Area, we combine premium products with meticulous hand techniques to deliver results that basic car washes simply can't match.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== KEY USP / WHY CHOOSE US — Bento-grid style ===== */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Why Down2Detail"
            title="The Down2Detail Difference"
            description="We don't cut corners. Every detail matters to us — that's what sets us apart."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large feature card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="dark-card p-6 lg:row-span-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="section-tag">[KEY USP LIST]</span>
                  <div className="expand-btn">
                    <Sparkles size={14} className="text-white/40" />
                  </div>
                </div>
                <h3 className="serif-heading text-2xl text-white mb-3">Premium Products & Technology</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Highly skilled team dedicated to meticulous detailing.
                </p>
              </div>
              <div className="mt-8 dark-card p-3 flex items-center gap-3 bg-white/[0.02]">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-white text-xs font-medium">Eco friendly</p>
                  <p className="text-white/40 text-[10px]">Premium products</p>
                </div>
                <ChevronRight size={14} className="text-white/30 ml-auto" />
              </div>
            </motion.div>

            {/* Safe Paint-Friendly Process card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="dark-card p-5"
            >
              <div className="flex justify-end mb-4">
                <div className="shield-badge">
                  <Shield size={14} className="text-white/40" />
                </div>
              </div>
              <h3 className="serif-heading text-xl text-white mb-2">Safe Paint-Friendly Process</h3>
            </motion.div>

            {/* Description card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="dark-card overflow-hidden"
            >
              <img
                src={ceramicImg}
                alt="Ceramic coating process"
                className="w-full h-full object-cover min-h-[200px]"
              />
            </motion.div>

            {/* Detail text card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="dark-card p-5"
            >
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                Our techniques protect your car's paintwork from swirl marks, scratches, and harsh chemicals — preserving your vehicle's value and shine
              </p>
              <Link to="/services" className="btn-outline text-xs py-2 px-4">
                Learn more
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION — Reference style with monospace labels ===== */}
      <section className="py-20 lg:py-28 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Offer"
            title="From a Simple Wash to Comprehensive Detailing"
            description="We offer a range of premium services to keep your car looking and feeling its best year-round."
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                {/* Service label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="section-tag">
                    [SERVICE] [{String(i + 1).padStart(2, '0')}] / {service.title.toUpperCase()}
                  </span>
                  <div className="expand-btn opacity-60 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} className="text-white/50" />
                  </div>
                </div>

                <div className="dark-card overflow-hidden">
                  {/* Card header with gradient */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="section-tag block mb-1">[SERVICE] [{String(i + 1).padStart(2, '0')}]</span>
                        <p className="price-mono text-white text-lg mt-2">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden mx-4 rounded-xl mb-4">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="px-5 pb-5">
                    <h3 className="serif-heading text-xl text-white mb-2 group-hover:text-primary/90 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    <Link
                      to="/booking"
                      className="btn-outline text-xs py-2 px-4"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">
              View All Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
          />

          <div className="grid md:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="dark-card p-6 card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-primary" fill="#f97316" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/[0.06] rounded-full flex items-center justify-center">
                    <span className="text-white/60 font-medium text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-text-muted text-xs">Verified Customer</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 lg:py-28 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                Book Your Premium Car Wash Today
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="btn-filled">
                  Book Now
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={exteriorImg}
                  alt="Premium car detailing"
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
              {/* Floating detail card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl overflow-hidden w-36 h-36"
              >
                <img
                  src={interiorImg}
                  alt="Interior detail"
                  className="w-full h-full object-cover"
                  style={{ border: '2px solid rgba(249, 115, 22, 0.3)' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
