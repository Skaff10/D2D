import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.08 }}
      className="group h-full"
    >
      <div className="dark-card overflow-hidden card-hover h-full flex flex-col">
        {/* Top 40% — Image area */}
        <div className="aspect-[4/3] bg-zinc-800 border-b border-zinc-700 relative flex items-center justify-center">
          <img src={service.cover_pic} alt={service.title} className="w-full h-full object-cover" />
        </div>

        {/* Bottom 60% — Info area */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex-1 mb-4">
            <h3 className="serif-heading text-lg sm:text-xl text-white group-hover:text-primary/90 transition-colors mb-2">
              {service.name}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-1 mb-3">
              {service.shortDescription}
            </p>
            <p className="price-mono text-primary text-sm font-semibold">
              {service.priceString}
            </p>
          </div>

          <Link
            to={`/services/${service.id}`}
            className="btn-filled w-full justify-center text-sm mt-auto"
          >
            Learn More
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
