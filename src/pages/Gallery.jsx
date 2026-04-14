import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useLang } from '../context/LanguageContext'
import { translations } from '../translations'
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

const staticGalleryImages = [
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

export default function Gallery() {
  const { lang } = useLang();
  const t = translations[lang].gallery;

  const [galleryImages, setGalleryImages] = useState(staticGalleryImages)
  const [lightbox, setLightbox] = useState(null)

  // Fetch from Firestore — if docs exist, use them; otherwise keep static fallback
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
        console.log('Gallery: using static fallback images')
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
          {/* Grid */}
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
