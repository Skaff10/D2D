import { motion } from 'framer-motion'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../translations'

const categoryIcons = {
  exterior: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2" /><path d="M9 17h6" />
    </svg>
  ),
  interior: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h.01" /><path d="M10 12h.01" /><path d="M14 12h.01" /><path d="M18 12h.01" />
    </svg>
  ),
  'paint-polish': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  ),
  protection: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
}

export default function ServiceCategoryTabs({ categories, activeCategory, onCategoryChange }) {
  const { lang } = useLang();
  const t = translations[lang].services;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`
            relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-300 cursor-pointer border
            ${
              activeCategory === cat.id
                ? 'bg-primary/15 border-primary/40 text-white shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/20 hover:bg-white/[0.06]'
            }
          `}
        >
          <span className={activeCategory === cat.id ? 'text-primary' : 'text-white/40'}>
            {categoryIcons[cat.id]}
          </span>
          <span className="font-mono text-xs tracking-wider uppercase">
            {t[cat.id === 'paint-polish' ? 'paintPolish' : cat.id] || cat.label}
          </span>
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-xl border border-primary/30"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  )
}
