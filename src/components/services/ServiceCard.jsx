import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../../context/LanguageContext'
import { translations } from '../../translations'
import { pushToDataLayer } from '../../utils/dataLayer'

export default function ServiceCard({ service, index, customPricing }) {
  const { lang } = useLang()
  const navigate = useNavigate()
  const t = translations[lang].serviceDetails
  const tGlobal = translations[lang]
  const serviceTrans = tGlobal.servicesList[service.id] || {}

  const packageIncludedServices = [
    'paint-decontamination',
    'floor-carpet-shampoo',
    'pet-hair-removal',
    'fabric-seat-shampoo',
    'paint-sealant',
    'car-wax'
  ]
  const isPackageIncluded = packageIncludedServices.includes(service.id)

  let displayPrice =
    service.priceString === 'Contact for Quote' ||
    service.priceString === 'Contact for Pricing'
      ? tGlobal.contactForPricing
      : service.priceString

  if (isPackageIncluded) {
    displayPrice = lang === 'fr' ? 'Inclus dans les forfaits' : 'Included in Packages'
  } else if (customPricing) {
    if (typeof customPricing === 'string') {
      displayPrice = customPricing;
    } else if (typeof customPricing === 'object') {
      const validVals = Object.values(customPricing).filter(v => typeof v === 'string' && v.match(/\d/));
      if (validVals.length > 0) {
        let minValStr = validVals[0];
        let minNum = Infinity;
        
        validVals.forEach(val => {
          const num = parseFloat(val.replace(/[^0-9.]/g, ''));
          if (!isNaN(num) && num < minNum) {
            minNum = num;
            minValStr = val;
          }
        });

        displayPrice = minValStr.toLowerCase().includes('starting') ? minValStr : `Starting at ${minValStr}`;
      }
    }
  }

  const buttonText = isPackageIncluded
    ? (lang === 'fr' ? 'Voir les forfaits' : 'View Packages')
    : tGlobal.navbar.bookNow

  const handleButtonClick = (e) => {
    e.stopPropagation()
    pushToDataLayer({ event: "cta_click", buttonText, component: "ServiceCard", pageLocation: window.location.pathname, serviceName: serviceTrans.name || service.name })
    if (isPackageIncluded) {
      navigate('/packages')
    } else {
      navigate(`/booking?service=${service.id}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.08 }}
      className="group h-full"
    >
      <div
        onClick={() => navigate(`/services/${service.id}`)}
        className="
          relative h-full flex flex-col overflow-hidden rounded-2xl
          bg-white/5 backdrop-blur-md
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
          transition-all duration-500
          hover:bg-white/10 hover:border-white/20
          hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
          hover:-translate-y-1 cursor-pointer
        "
      >
        {/* Shimmer overlay on hover */}
        <div
          className="
            pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100
            transition-opacity duration-700
            bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_50%,rgba(255,255,255,0.03)_100%)]
          "
        />

        {/* Image area */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={service.cover_pic}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient fade into card body */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Divider — glassy hairline */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Info area */}
        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="flex-1 mb-4">
            <h3 className="serif-heading text-lg sm:text-xl text-white group-hover:text-primary/90 transition-colors mb-2">
              {serviceTrans.name || service.name}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed line-clamp-1 mb-3">
              {serviceTrans.shortDescription || service.shortDescription}
            </p>
            <p className="price-mono text-primary text-sm font-semibold">
              {displayPrice}
            </p>
          </div>

          <button
            onClick={handleButtonClick}
            className="
              flex items-center justify-center gap-2 w-full mt-auto
              py-2.5 px-4 rounded-xl text-sm font-medium
              bg-primary border border-primary/50 text-white
              backdrop-blur-sm
              transition-all duration-300
              hover:bg-primary/90 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]
              hover:gap-3 z-20 relative
              cursor-pointer
              
            "
          >
            {buttonText}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}