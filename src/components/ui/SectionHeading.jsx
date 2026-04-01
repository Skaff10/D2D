import { motion } from 'framer-motion'

export default function SectionHeading({ subtitle, title, description, align = 'center', light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-[0.2em] mb-3">
          {subtitle}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`w-16 h-1 bg-primary rounded-full ${align === 'center' ? 'mx-auto' : ''} mb-4`} />
      {description && (
        <p className={`text-text-secondary max-w-2xl text-base md:text-lg leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
