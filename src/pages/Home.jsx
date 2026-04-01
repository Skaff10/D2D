import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Sparkles, Clock, Award, Star, ChevronRight } from 'lucide-react'
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
                <Sparkles size={14} />
                Premium Auto Detailing
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6">
                Bringing Your Car's{' '}
                <span className="text-gradient">Shine</span>{' '}
                Back to Life
              </h1>
              <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                Professional detailing services in Montreal & Saint-Hubert. We use premium products and expert techniques to deliver showroom-quality results, every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 text-base pulse-glow"
                >
                  Book Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-primary text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-base"
                >
                  Our Services
                  <ChevronRight size={18} />
                </Link>
              </div>

              {/* Mini Stats */}
              <div className="flex gap-8 mt-10 pt-10 border-t border-white/10">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="font-heading text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-text-secondary text-xs mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="relative rounded-2xl overflow-hidden glow-orange">
                <img
                  src={heroImg}
                  alt="Premium car detailing service by Down2Detail"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 glass rounded-xl p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Star size={22} className="text-primary" fill="#f97316" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">4.9 Rating</p>
                    <p className="text-text-secondary text-xs">500+ Cars Detailed</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== BRAND LOGOS ===== */}
      <section className="py-12 bg-surface border-y border-border-warm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-text-muted text-xs uppercase tracking-[0.2em] mb-8">Trusted by owners of</p>
          <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap opacity-40">
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
                className="h-10 md:h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-20 lg:py-28 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden img-zoom">
                <img
                  src={beforeAfterImg}
                  alt="Before and after ceramic coating by Down2Detail"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-3 block">About Down2Detail</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Your Car Deserves More than an{' '}
                <span className="text-gradient">Ordinary Wash</span>
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-6">
                At Down2Detail, we believe auto detailing is an art, not just a service. Based in Saint-Hubert and serving the Greater Montreal Area, we combine premium products with meticulous hand techniques to deliver results that basic car washes simply can't match.
              </p>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                From paint correction and ceramic coating to deep interior cleaning — every vehicle receives our full attention and expertise.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
              >
                Learn More About Us
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="What We Offer"
            title="From a Simple Wash to Comprehensive Detailing"
            description="We offer a range of premium services to keep your car looking and feeling its best year-round."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card rounded-2xl overflow-hidden card-hover border border-border-warm/50"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-primary/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                    {service.price}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    to="/booking"
                    className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Book Now
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-primary text-white hover:text-primary font-medium px-6 py-3 rounded-lg transition-all duration-300"
            >
              View All Services
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-20 lg:py-28 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Why Down2Detail"
            title="The Down2Detail Difference"
            description="We don't cut corners. Every detail matters to us — that's what sets us apart."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center card-hover"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={26} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Testimonials"
            title="What Our Clients Say"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border-warm/50 card-hover"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-primary" fill="#f97316" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Book Your Premium{' '}
              <span className="text-gradient">Car Wash</span>{' '}
              Today
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
              Ready to give your car the treatment it deserves? Book your appointment now and experience the Down2Detail difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 text-base"
              >
                Book Now
                <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+14384838175"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-primary text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-base"
              >
                Call Us: 438-483-8175
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
