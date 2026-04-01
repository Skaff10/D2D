import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Shield, Sparkles, Heart, Award, Users, Car, Star, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ceramicImg from '../assets/imgi_2_ceramiccoating.webp'
import beforeAfterImg from '../assets/imgi_3_beforeaftercoating.webp'

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
  { icon: Car, value: '500+', label: 'Cars Detailed' },
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
      <section className="pt-32 pb-16 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="About Us"
            title="Our Story"
            description="From car enthusiasts to professional detailers — how Down2Detail became Montreal's trusted name in auto care."
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden img-zoom">
                  <img
                    src={ceramicImg}
                    alt="Down2Detail team at work"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass rounded-xl p-5 hidden md:block">
                  <p className="text-primary font-heading text-2xl font-bold">500+</p>
                  <p className="text-text-secondary text-sm">Cars Detailed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                From a Simple Wash to{' '}
                <span className="text-gradient">Comprehensive Detailing</span>
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
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
      <section className="py-16 bg-surface border-y border-border-warm">
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
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-text-secondary text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 page-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Why Choose Us"
            title="What Sets Us Apart"
          />

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border-warm/50 card-hover"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <val.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">{val.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Book your appointment today and see why hundreds of car owners trust Down2Detail.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-lg transition-all"
            >
              Book Now
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
