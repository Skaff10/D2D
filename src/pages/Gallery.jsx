import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'

import img1 from '../assets/dk/imgi_2_ceramiccoating.webp'
import img2 from '../assets/dk/imgi_2_exterior2.jpg'
import img3 from '../assets/dk/imgi_2_headlight-Restoration.png'
import img4 from '../assets/dk/imgi_3_beforeaftercoating.webp'
import img5 from '../assets/dk/imgi_3_ceramic-sealant-spray.jpg'
import img6 from '../assets/dk/imgi_3_shutHero.jpg'
import img7 from '../assets/dk/imgi_4_Ceramic-coating.webp'
import img8 from '../assets/dk/imgi_4_Interior.png'
import img9 from '../assets/dk/imgi_4_monthly.webp'
import img10 from '../assets/dk/imgi_5_paint-correction.webp'
import img11 from '../assets/dk/imgi_5_wheelcoating.webp'
import img12 from '../assets/dk/imgi_6_cleaning-engine.webp'
import img13 from '../assets/dk/imgi_7_gloss-enhancer.webp'
import img14 from '../assets/dk/imgi_2_ceramic.png'
import img15 from '../assets/images/brand/imgi_10_cadillac.webp'

const galleryImages = [
  { src: img4, alt: 'Before and after ceramic coating', category: 'Ceramic Coating' },
  { src: img1, alt: 'Ceramic coating application', category: 'Ceramic Coating' },
  { src: img2, alt: 'Exterior detailing result', category: 'Exterior' },
  { src: img10, alt: 'Paint correction process', category: 'Paint Correction' },
  { src: img8, alt: 'Interior detailing', category: 'Interior' },
  { src: img3, alt: 'Headlight restoration', category: 'Exterior' },
  { src: img5, alt: 'Ceramic sealant spray application', category: 'Ceramic Coating' },
  { src: img11, alt: 'Wheel coating protection', category: 'Exterior' },
  { src: img12, alt: 'Engine bay cleaning', category: 'Exterior' },
  { src: img9, alt: 'Monthly maintenance wash', category: 'Exterior' },
  { src: img13, alt: 'Gloss enhancer application', category: 'Paint Correction' },
  { src: img7, alt: 'Ceramic coating finish', category: 'Ceramic Coating' },
  { src: img6, alt: 'Premium car detailing in progress', category: 'Exterior' },
  { src: img14, alt: 'Ceramic coating protection', category: 'Ceramic Coating' },
  { src: img15, alt: 'Cadillac detailing', category: 'Exterior' },
]

const categories = ['All', 'Exterior', 'Interior', 'Ceramic Coating', 'Paint Correction']

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <>
      <Helmet>
        <title>Auto Detailing Gallery in Montreal | Down2Detail</title>
        <meta name="description" content="View our portfolio of professional auto detailing results in Montreal & Saint-Hubert. Before/after photos of paint correction, ceramic coating, and interior detailing." />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Work"
            title="Detailing Gallery"
            description="See the results for yourself. Every vehicle receives our full attention and expertise."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-white/[0.1] text-white border border-white/[0.12]'
                    : 'bg-transparent text-white/40 hover:text-white/70 border border-white/[0.04] hover:border-white/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden ${
                    i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  onClick={() => setLightbox(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      i % 5 === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'
                    }`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="section-tag text-white/70">{img.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
