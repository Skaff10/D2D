import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Info, Sparkles } from 'lucide-react'
import PricingDisplay from './PricingDisplay'

export default function ServiceCard({ service, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="dark-card overflow-hidden card-hover h-full flex flex-col">
        {/* Header */}
        <div className="p-5 pb-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <span className="section-tag block mb-2">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              <h3 className="serif-heading text-lg sm:text-xl text-white group-hover:text-primary/90 transition-colors">
                {service.name}
              </h3>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-4">
            <PricingDisplay price={service.price} />
          </div>
        </div>

        {/* Why Us */}
        <div className="px-5 mb-4">
          <div className="flex items-start gap-2 mb-2">
            <Info size={13} className="text-primary/60 mt-0.5 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Why Us</span>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {service.whyUs}
          </p>
        </div>

        {/* What's Included Preview (first 4 items) */}
        <div className="px-5 mb-4 flex-1">
          <div className="flex items-start gap-2 mb-2">
            <Sparkles size={12} className="text-primary/60 mt-0.5 shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">What's Included</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {service.included.slice(0, 4).map((item, j) => (
              <div key={j} className="flex items-start gap-2 text-text-secondary text-xs">
                <CheckCircle2 size={11} className="text-primary/50 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
            {service.included.length > 4 && !expanded && (
              <p className="text-white/25 text-xs font-mono pl-5">
                + {service.included.length - 4} more items
              </p>
            )}
          </div>
        </div>

        {/* Expandable Section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-2">
                {/* Remaining included items */}
                {service.included.length > 4 && (
                  <div className="grid grid-cols-1 gap-1.5 mb-5">
                    {service.included.slice(4).map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-text-secondary text-xs">
                        <CheckCircle2 size={11} className="text-primary/50 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Why It's Important */}
                <div className="pt-4 border-t border-white/[0.05]">
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Why It Matters</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {service.importance.map((item, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                        <span className="text-text-secondary leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="p-5 pt-3 mt-auto flex items-center justify-between gap-3 border-t border-white/[0.04]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-mono transition-colors cursor-pointer"
          >
            {expanded ? (
              <>
                <ChevronUp size={13} /> Show Less
              </>
            ) : (
              <>
                <ChevronDown size={13} /> View Details
              </>
            )}
          </button>
          <Link
            to={`/booking?service=${encodeURIComponent(service.name)}`}
            className="btn-outline text-xs py-2 px-4"
          >
            Book Now
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
