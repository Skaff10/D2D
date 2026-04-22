import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { fetchGalleryImages } from '../lib/galleryService'
import { useLang } from '../context/LanguageContext'
import { translations } from '../translations'
import SectionHeading from '../components/ui/SectionHeading'

const CATEGORIES = [
  'All',
  'Interior Detailing',
  'Exterior Detailing',
  'Paint Polish & Protection',
  'Ceramic Coating'
]

const SKELETON_HEIGHTS = ['h-48', 'h-64', 'h-80', 'h-56', 'h-72', 'h-48', 'h-80', 'h-64', 'h-56']

export default function Gallery() {
  const { lang } = useLang()
  const t = translations[lang].gallery

  const [galleryImages, setGalleryImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [imagesLoaded, setImagesLoaded] = useState(0)

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await fetchGalleryImages()
        setGalleryImages(data)
      } catch (err) {
        console.error('Gallery fetching error:', err)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  const filteredImages = galleryImages.filter(img => {
    if (activeCategory === 'All') return true
    return img.category === activeCategory
  })

  // Reset loaded count when category changes or images list changes
  useEffect(() => {
    setImagesLoaded(0)
  }, [activeCategory, galleryImages])

  const handleImageLoad = useCallback(() => {
    setImagesLoaded(prev => prev + 1)
  }, [])

  const imagesReady =
    !loading && (filteredImages.length === 0 || imagesLoaded >= filteredImages.length)

  const showSkeleton = loading || (!imagesReady && filteredImages.length > 0)

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const showPrev = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev > 0 ? prev - 1 : filteredImages.length - 1))
  }

  const showNext = (e) => {
    e.stopPropagation()
    setLightboxIndex(prev => (prev < filteredImages.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') showPrev(e)
      if (e.key === 'ArrowRight') showNext(e)
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredImages])

  return (
    <>
      <Helmet>
        <title>Auto Detailing Gallery in Montreal | Down2Detail</title>
        <meta
          name="description"
          content="View our portfolio of professional auto detailing results in Montreal & Saint-Hubert. Before/after photos of paint correction, ceramic coating, and interior detailing."
        />
      </Helmet>

      <section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.ourWork}
            title={t.detailingGallery}
            description={t.galleryDescription}
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters */}
          <div className="flex overflow-x-auto gap-2 mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-black '
                    : 'border border-border-warm text-white hover:bg-black/60 hover:border-primary/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Skeleton — shown while fetching OR while images are still downloading */}
          {showSkeleton && (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {SKELETON_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`rounded-2xl animate-pulse break-inside-avoid bg-white/5 ${h}`}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredImages.length === 0 && (
            <div className="flex justify-center items-center h-64 bg-black/20 rounded-2xl border border-border-warm/50">
              <p className="text-white/60">No images found for this category.</p>
            </div>
          )}

          {/* Image Grid
              Always mounted after data loads so images download in the background.
              Hidden via opacity until all onLoad callbacks have fired, then fades in. */}
          {!loading && filteredImages.length > 0 && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: imagesReady ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            >
              {filteredImages.map((img, index) => (
                <motion.div
                  key={img.id || index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden break-inside-avoid shadow-lg"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img.imageUrl || img.url}
                    alt={img.alt || 'Gallery image'}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    onLoad={handleImageLoad}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <ZoomIn
                      size={24}
                      className="text-white/80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50 group-hover:scale-100 transition-all duration-300"
                    />
                    <span className="text-primary text-xs uppercase tracking-wider font-semibold mb-1 block transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.category || 'Uncategorized'}
                    </span>
                    {img.alt && (
                      <p className="text-white text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {img.alt}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </section>

      {/* Lightbox */}
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
              onClick={closeLightbox}
            >

              {/* Image Container */}
              <div
                className="relative flex flex-col items-center max-w-5xl w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    className="absolute cursor-pointer top-2 right-2 sm:top-3 sm:right-3 text-white/70 hover:text-white transition-colors bg-black/50 hover:bg-black/80 p-2 rounded-full z-50"
                    onClick={closeLightbox}
                  >
                    <X size={24} />
                  </button>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      src={filteredImages[lightboxIndex].imageUrl || filteredImages[lightboxIndex].url}
                      alt={filteredImages[lightboxIndex].alt || 'Gallery image full view'}
                      className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
                    />
                  </AnimatePresence>
                </div>

                <div className="mt-6 text-center h-20">
                  <span className="text-primary text-sm uppercase tracking-wider font-semibold block mb-2">
                    {filteredImages[lightboxIndex].category || 'Uncategorized'}
                  </span>
                  {filteredImages[lightboxIndex].alt && (
                    <p className="text-white text-lg">{filteredImages[lightboxIndex].alt}</p>
                  )}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}