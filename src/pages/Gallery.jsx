import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useLang } from '../context/LanguageContext'
import { translations } from '../translations'
import SectionHeading from '../components/ui/SectionHeading'

export default function Gallery() {
  const { lang } = useLang();
  const t = translations[lang].gallery;

  const [galleryImages, setGalleryImages] = useState([])
  const [lightbox, setLightbox] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch from Firestore
  useEffect(() => {
    async function fetchGallery() {
      try {
        const snapshot = await getDocs(collection(db, 'gallery'))
        if (!snapshot.empty) {
          const firestoreImages = snapshot.docs.map(d => {
            const data = d.data()
            return { src: data.url, alt: data.alt || '', category: data.category || 'Exterior' }
          })
          setGalleryImages(firestoreImages)
        }
      } catch (err) {
        console.error('Gallery fetching error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  return (
    <>
      <Helmet>
        <title>Auto Detailing Gallery in Montreal | Down2Detail</title>
        <meta name="description" content="View our portfolio of professional auto detailing results in Montreal & Saint-Hubert. Before/after photos of paint correction, ceramic coating, and interior detailing." />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.ourWork}
            title={t.detailingGallery}
            description={t.galleryDescription}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid or Loader */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-white/60">No images found.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {galleryImages.map((img, i) => (
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
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
            <div className="flex flex-col items-center" onClick={e => e.stopPropagation()}>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              />
              {lightbox.alt && (
                <p className="text-white mt-4 text-center">{lightbox.alt}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
