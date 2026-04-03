import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Droplets, Sun, Sparkles, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import FAQAccordion from './FAQAccordion'

const benefitIcons = [
  Droplets, // Hydrophobic
  Sun,      // UV-Resistant
  Shield,   // Scratch Resistant
  Zap,      // Chemical Resistant
  Sparkles, // Gloss Enhancing
  Shield,   // Acid Rain
  Shield,   // Bird Droppings
  Zap,      // Industrial Fallout
  Shield,   // Tree Sap
  Shield,   // Weather Erosion
]

export default function CeramicCoatingSection({ service }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      id="ceramic-coating"
      className="scroll-mt-32"
    >
      {/* Hero Banner */}
      <div className="relative dark-card overflow-hidden p-6 sm:p-8 lg:p-10 mb-8 border-primary/15">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25">
              <Shield size={13} className="text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">Premium Protection</span>
            </div>
          </div>

          <h3 className="serif-heading text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
            Ceramic Coating
          </h3>

          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {service.intro}
          </p>

          {/* Key Benefits Grid */}
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-4">Key Benefits</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {service.keyBenefits.map((benefit, i) => {
                const Icon = benefitIcons[i] || Shield
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/20 hover:bg-primary/[0.04] transition-all duration-300"
                  >
                    <Icon size={13} className="text-primary/70 shrink-0 mt-0.5" />
                    <span className="text-white/70 text-[11px] leading-tight">{benefit}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Is It Worth It */}
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-4">Is It Worth It?</span>
            <div className="flex flex-wrap gap-2">
              {service.worthIt.map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/15 text-xs text-primary/90 font-medium"
                >
                  <CheckCircle2 size={11} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Surfaces */}
          <div className="mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-4">Can Be Applied To</span>
            <div className="flex flex-wrap gap-2">
              {service.surfaces.map((surface, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60"
                >
                  {surface}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Main Paint Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="dark-card p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">Paint Coating</span>
          <h4 className="serif-heading text-xl text-white mb-6">Protection Levels</h4>

          <div className="space-y-3">
            {service.pricingTiers.map((tier, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl border transition-all duration-300 hover:border-primary/30 ${
                  i === 2
                    ? 'bg-primary/[0.06] border-primary/20'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}
              >
                {i === 2 && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-md bg-primary text-black text-[9px] font-mono font-bold uppercase tracking-wider">
                    Best Value
                  </span>
                )}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-medium text-sm mb-0.5">{tier.level}</p>
                    <p className="text-white/40 text-xs">{tier.durability}</p>
                  </div>
                  <span className="price-mono text-primary text-lg font-bold">{tier.price}</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/booking?service=Ceramic+Coating"
            className="btn-filled w-full justify-center mt-6"
          >
            Book Ceramic Coating
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Additional Surface Coatings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="dark-card p-6 sm:p-8"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">Add-On</span>
          <h4 className="serif-heading text-xl text-white mb-6">Additional Surface Coatings</h4>

          <div className="space-y-3">
            {service.additionalSurfaces.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-white font-medium text-sm">{item.surface}</p>
                  <span className="price-mono text-primary text-sm font-semibold whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-white/35 text-xs">{item.durability}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="btn-outline w-full justify-center mt-6 text-sm"
          >
            Contact for Custom Quote
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">FAQ</span>
          <h4 className="serif-heading text-xl text-white">Frequently Asked Questions</h4>
        </div>
        <FAQAccordion items={service.faq} />
      </motion.div>
    </motion.div>
  )
}
