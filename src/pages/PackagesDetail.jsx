import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Check } from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { usePackagePrices } from "../hooks/usePackagePrices";
import { defaultPrices } from "../data/defaultPrices";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const translations = {
  en: {
    pageTitle: "Exterior & Interior Detail Packages | Down2Detail",
    metaDesc:
      "View our Exterior & Interior Detail packages — Essential, Signature, and Elite — with transparent pricing for sedan, SUV, and truck.",
    heroBadge: "[01]",
    heroTitle: "Exterior & Interior Detail",
    heroSub:
      "Choose the perfect interior and exterior cleaning package for your vehicle.",
    backToPackages: "← Back to Packages",
    breadcrumbPackages: "Packages",
    breadcrumbCurrent: "Exterior & Interior Detail",
    sedan: "Sedan",
    midSuv: "Mid SUV",
    truck: "Truck",
    essential: "Essential",
    signature: "Signature",
    elite: "Elite",
    bestValue: "Best Value",
    includes: "Includes",
    essential_s1: "Wheel & Tire Cleaning",
    essential_s2: "Hand Wash",
    essential_s3: "Door Jamb Cleaning",
    essential_s4: "Interior Vacuum",
    essential_s5: "Interior Wipe Down",
    essential_s6: "Winter Mats Cleaning",
    essential_s7: "Windows & Glass Cleaning",
    signature_s1: "Detailed Brush Cleaning",
    signature_s2: "Tire Dressing",
    signature_s3: "Floor & Carpet Shampoo",
    elite_s1: "Pre Rinse & Snow Foam Application",
    elite_s2: "Engine Bay Detail",
    elite_s3: "Fabric Seat Shampoo / Leather Seat Treatment",
    addonTitle: "Available Add-Ons",
    addon_odor: "Odor Treatment",
    addon_pet: "Pet Hair Removal",
    addon_fabric: "Fabric & Textile Sealant",
    addon_leather: "Leather & Synthetic Ceramic Coating",
    addon_clay: "Paint Decontamination (Clay Treatment)",
    addon_sealant: "Paint Sealant (up to 3 months)",
    ctaTitle: "Ready to book?",
    ctaSub: "Contact us to schedule your detail.",
    bookThisPackage: "Book This Package",
  },
  fr: {
    pageTitle: "Forfaits Détail Extérieur & Intérieur | Down2Detail",
    metaDesc:
      "Consultez nos forfaits de détail extérieur et intérieur — Essentiel, Signature et Élite — avec tarification transparente.",
    heroBadge: "[01]",
    heroTitle: "Détail Extérieur & Intérieur",
    heroSub:
      "Choisissez le forfait de nettoyage idéal pour votre véhicule.",
    backToPackages: "← Retour aux forfaits",
    breadcrumbPackages: "Forfaits",
    breadcrumbCurrent: "Détail Extérieur & Intérieur",
    sedan: "Berline",
    midSuv: "VUS Intermédiaire",
    truck: "Camion",
    essential: "Essentiel",
    signature: "Signature",
    elite: "Élite",
    bestValue: "Meilleure Valeur",
    includes: "Inclut",
    essential_s1: "Nettoyage roues & pneus",
    essential_s2: "Lavage à la main",
    essential_s3: "Nettoyage joints de portes",
    essential_s4: "Aspirateur intérieur",
    essential_s5: "Essuyage intérieur",
    essential_s6: "Nettoyage tapis d'hiver",
    essential_s7: "Nettoyage vitres & glaces",
    signature_s1: "Nettoyage détaillé à la brosse",
    signature_s2: "Application brillant pneus",
    signature_s3: "Shampooing tapis & plancher",
    elite_s1: "Pré-rinçage & mousse neigeuse",
    elite_s2: "Détail compartiment moteur",
    elite_s3: "Shampooing tissu / Traitement cuir",
    addonTitle: "Suppléments Disponibles",
    addon_odor: "Traitement des odeurs",
    addon_pet: "Retrait poils d'animaux",
    addon_fabric: "Scellant tissu & textile",
    addon_leather: "Revêtement céramique cuir & synthétique",
    addon_clay: "Décontamination peinture (argile)",
    addon_sealant: "Scellant peinture (3 mois)",
    ctaTitle: "Prêt à réserver?",
    ctaSub: "Contactez-nous pour planifier votre détail.",
    bookThisPackage: "Réserver ce forfait",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Skeleton shimmer shown on price slot while data is loading */
function PriceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-28 bg-neutral-700 rounded-lg mb-1" />
      <div className="h-3 w-16 bg-neutral-800 rounded mt-2" />
    </div>
  );
}

/** Animated price display */
function PriceDisplay({ value, vehicleLabel, loading }) {
  if (loading) return <PriceSkeleton />;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${value}-${vehicleLabel}`}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.22 }}
      >
        <p className="price-mono text-3xl font-bold text-white">
          ${value}
        </p>
        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">
          {vehicleLabel}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

/** Pill vehicle toggle */
function VehicleToggle({ options, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-10">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
            active === opt.key
              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
              : "bg-transparent border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-500"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/** Single service list item */
function ServiceItem({ text }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-300">
      <Check size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
      <span>{text}</span>
    </li>
  );
}

/** Add-on chip */
function AddonChip({ name, price }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-neutral-800/60 border border-neutral-700 rounded-lg px-3 py-2">
      <span className="text-sm text-neutral-300">{name}</span>
      <span className="text-xs font-semibold text-[#C9A84C] whitespace-nowrap">{price}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PackagesDetail() {
  const { lang } = useLang();
  const t = translations[lang];
  const { prices, loading } = usePackagePrices();
  const [activeVehicle, setActiveVehicle] = useState("sedan");

  const vehicles = [
    { key: "sedan", label: t.sedan },
    { key: "midSuv", label: t.midSuv },
    { key: "truck", label: t.truck },
  ];

  function getPrice(pkg, vehicle) {
    return prices?.[pkg]?.[vehicle] ?? defaultPrices[pkg][vehicle];
  }

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.metaDesc} />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO BANNER                                                       */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #120800 50%, #0a0a0a 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-4 py-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="section-tag block mb-5"
            style={{ color: "#e46904ff" }}
          >
            {t.heroBadge}
          </span>
          <h1
            className="mb-5 font-bold"
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {t.heroTitle}
          </h1>
          <p
            className="max-w-xl mx-auto"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
            }}
          >
            {t.heroSub}
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-neutral-500" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BACK LINK + BREADCRUMB                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Link
          to="/packages"
          className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-white transition-colors"
        >
          {t.backToPackages}
        </Link>
        <div className="flex items-center gap-2 text-xs text-neutral-600 mt-2">
          <Link
            to="/packages"
            className="text-neutral-500 hover:text-white transition-colors"
          >
            {t.breadcrumbPackages}
          </Link>
          <span>&gt;</span>
          <span className="text-neutral-400">{t.breadcrumbCurrent}</span>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* PACKAGES                                                          */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VehicleToggle
            options={vehicles}
            active={activeVehicle}
            onChange={setActiveVehicle}
          />

          {/* Cards */}
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* ── Essential ── */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
            >
              <span className="section-tag block mb-2">{t.essential}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("essential", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[
                  t.essential_s1, t.essential_s2, t.essential_s3,
                  t.essential_s4, t.essential_s5, t.essential_s6, t.essential_s7,
                ].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>

            {/* ── Signature ── */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card border-amber-700/40 p-6 flex flex-col"
              style={{ borderColor: "rgba(180,130,50,0.4)" }}
            >
              <span className="section-tag block mb-2">{t.signature}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("signature", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
              <p className="text-xs text-neutral-500 italic mb-3">
                {t.includes} {t.essential} +
              </p>
              <ul className="space-y-2 flex-1">
                {[t.signature_s1, t.signature_s2, t.signature_s3].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>

            {/* ── Elite ── */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "#C9A84C" }}
            >
              {/* Best Value badge */}
              <span className="absolute top-3 right-3 bg-[#C9A84C] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {t.bestValue}
              </span>
              <span className="section-tag block mb-2">{t.elite}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("elite", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
              <p className="text-xs text-neutral-500 italic mb-3">
                {t.includes} {t.signature} +
              </p>
              <ul className="space-y-2 flex-1">
                {[t.elite_s1, t.elite_s2, t.elite_s3].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Detail Add-Ons */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            <p className="section-tag text-center mb-5">{t.addonTitle}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <AddonChip name={t.addon_odor}    price="+$29"       />
              <AddonChip name={t.addon_pet}     price="$59–$129"   />
              <AddonChip name={t.addon_fabric}  price="+$49"       />
              <AddonChip name={t.addon_leather} price="+$149"      />
              <AddonChip name={t.addon_clay}    price="+$25"       />
              <AddonChip name={t.addon_sealant} price="+$25"       />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* CTA                                                               */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div
              className="dark-card p-12 relative overflow-hidden"
              style={{ borderColor: "rgba(249,115,22,0.25)" }}
            >
              {/* Glow accent */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(249,115,22,0.6) 0%, transparent 70%)",
                }}
              />
              <h2 className="serif-heading text-3xl md:text-4xl text-white mb-3 relative z-10">
                {t.ctaTitle}
              </h2>
              <p className="text-neutral-400 mb-8 relative z-10">
                {t.ctaSub}
              </p>
              <Link
                to="/booking?category=detail"
                className="btn-filled_2 relative z-10"
              >
                {t.bookThisPackage}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
