import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield, Sparkles, Heart, Award, Users, Car, Star, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ceramicImg from '../assets/dk/down2detail.png'

const values = [
  {
    icon: Shield,
    title: 'Premium Products Only',
    desc: 'We use professional-grade detailing products — never cheap substitutes. Every product is carefully selected for performance and paint safety.',
  },
  {
    icon: Sparkles,
    title: 'Meticulous Attention to Detail',
    desc: 'We don\'t rush. Every vent, crevice, and panel gets the attention it deserves. That\'s why it\'s called detailing.',
  },
  {
    icon: Heart,
    title: 'Passion-Driven Service',
    desc: 'We genuinely love what we do. Cars aren\'t just vehicles to us — they\'re works of art that deserve proper care.',
  },
  {
    icon: Award,
    title: '100% Satisfaction Guaranteed',
    desc: 'We stand behind our work with complete confidence. If you\'re not satisfied, we\'ll make it right — period.',
  },
]

const stats = [
  { icon: Car, value: '3yrs', label: 'In Business' },
  { icon: Star, value: '4.9', label: 'Star Rating' },
  { icon: Users, value: '400+', label: 'Happy Clients' },
  { icon: Award, value: '100%', label: 'Satisfaction Rate' },
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Down2Detail | Auto Detailing in Montreal & Saint-Hubert</title>
        <meta name="description" content="Learn about Down2Detail — professional auto detailing experts in Montreal & Saint-Hubert, QC. Our story, values, and commitment to quality auto care." />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="About Us"
            title="Our Story"
            description="From car enthusiasts to professional detailers — how Down2Detail became Montreal's trusted name in auto care."
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden ">
                  <img
                    src={ceramicImg}
                    alt="Down2Detail team at work"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 glass rounded-xl p-4 hidden md:block">
                  <p className="price-mono text-primary text-xl">1000+</p>
                  <p className="text-text-secondary text-xs mt-1">Cars Detailed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag block mb-4">OUR JOURNEY</span>
              <h2 className="serif-heading text-3xl md:text-4xl mb-6">
                From a Simple Wash to{' '}
                <span className="serif-heading-italic">Comprehensive Detailing</span>
              </h2>
              <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  Down2Detail was born from a simple belief: your car deserves better than a quick, automated wash that leaves swirl marks and misses hidden areas. Based in Saint-Hubert and serving the entire Greater Montreal Area, we've built our reputation on doing things the right way.
                </p>
                <p>
                  We specialize in professional-grade auto detailing — from thorough exterior washes using pH-neutral products and the two-bucket method, to multi-stage paint correction, ceramic coating, and deep interior cleaning. Every vehicle that comes to us receives the same level of care and attention, regardless of size or price.
                </p>
                <p>
                  Whether you drive a daily commuter or a luxury sports car, we treat every vehicle as if it were our own. That's the Down2Detail promise.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="shield-badge mx-auto mb-3 w-12 h-12 rounded-xl">
                  <stat.icon size={20} className="text-primary/60" />
                </div>
                <p className="price-mono text-2xl md:text-3xl text-primary mb-1">{stat.value}</p>
                <p className="text-text-secondary text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Why Choose Us"
            title="What Sets Us Apart"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="dark-card p-6 card-hover"
              >
                <div className="shield-badge mb-4 w-11 h-11 rounded-xl">
                  <val.icon size={18} className="text-primary/60" />
                </div>
                <h3 className="serif-heading text-xl text-white mb-2">{val.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif-heading text-3xl md:text-4xl mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-text-secondary text-base mb-8">
              Book your appointment today and see why hundreds of car owners trust Down2Detail.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/booking" className="btn-filled">
                Book Now
                <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
