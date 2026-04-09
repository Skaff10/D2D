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
    // Meta
    pageTitle: "Packages & Pricing | Down2Detail Auto Detailing",
    metaDesc:
      "View all auto detailing packages from Down2Detail. Transparent pricing for Exterior & Interior Detail, Paint Polish & Protection, and Monthly Plans.",
    // Hero
    heroBadge: "TRANSPARENT PRICING",
    heroTitle: "Our Packages",
    heroSub:
      "Professional auto detailing with honest, upfront pricing — no hidden fees.",
    // Vehicle labels
    sedan: "Sedan",
    midSuv: "Mid SUV",
    truck: "Truck",
    sedanCoupeXover: "Sedan / Coupe / Crossover",
    compactMidSuv: "Compact / Mid-Size SUV",
    fullSizePickup: "Full-Size SUV / Pickup",
    // Section headings
    detailHeading: "Exterior & Interior Detail",
    paintHeading: "Paint Polish & Protection",
    monthlyHeading: "Monthly Plans",
    monthlySub: "Exclusive for loyal customers",
    // Package names
    essential: "Essential",
    signature: "Signature",
    elite: "Elite",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
    diamond: "Diamond",
    monthlyRefresh: "Monthly Refresh",
    ceramicRefresh: "Ceramic Refresh",
    // Badges
    bestValue: "Best Value",
    mostPopular: "Most Popular",
    everyFourSix: "Every 4–6 Months",
    // Includes line prefix
    includes: "Includes",
    // Services – Essential
    essential_s1: "Wheel & Tire Cleaning",
    essential_s2: "Hand Wash",
    essential_s3: "Door Jamb Cleaning",
    essential_s4: "Interior Vacuum",
    essential_s5: "Interior Wipe Down",
    essential_s6: "Winter Mats Cleaning",
    essential_s7: "Windows & Glass Cleaning",
    // Services – Signature additions
    signature_s1: "Detailed Brush Cleaning",
    signature_s2: "Tire Dressing",
    signature_s3: "Floor & Carpet Shampoo",
    // Services – Elite additions
    elite_s1: "Pre Rinse & Snow Foam Application",
    elite_s2: "Engine Bay Detail",
    elite_s3: "Fabric Seat Shampoo / Leather Seat Treatment",
    // Services – Silver
    silver_s1: "Hand Wash",
    silver_s2: "Paint Decontamination",
    silver_s3: "Gloss Enhancer (Fine Machine Polish)",
    silver_s4: "Paint Sealant (up to 3 months)",
    // Services – Gold
    gold_s1: "Hand Wash",
    gold_s2: "Paint Decontamination",
    gold_s3: "One-Step Polish (Light Swirls Removed ~50–60% defect removal)",
    gold_s4: "Paint Sealant (up to 3 months)",
    // Services – Platinum
    platinum_s1: "Hand Wash",
    platinum_s2: "Paint Decontamination",
    platinum_s3:
      "2-Step Paint Correction (Rotary + Wool Pad, DA + Foam Pad — ~90% defect removal)",
    platinum_s4: "Paint Sealant (up to 3 months)",
    // Services – Diamond
    diamond_s1: "Hand Wash",
    diamond_s2: "Paint Decontamination",
    diamond_s3:
      "3-Step Paint Correction (Rotary + Wool Pad, DA + Microfibre, DA + Foam — ~95–99% defect removal)",
    diamond_s4: "1-Year Paint Ceramic Coating",
    // Services – Monthly Refresh
    monthlyRefresh_s1: "Basic Exterior Package",
    monthlyRefresh_s2: "Standard Interior Package",
    monthlyRefresh_s3: "Summer Carpet / Winter Mat Detailing",
    // Services – Ceramic Refresh
    ceramicRefresh_s1: "Advanced Exterior Package",
    ceramicRefresh_s2: "Standard Interior Package",
    ceramicRefresh_s3: "Ceramic Coating Topper",
    // Add-ons – Detail
    addonTitle: "Available Add-Ons",
    addon_odor: "Odor Treatment",
    addon_pet: "Pet Hair Removal",
    addon_fabric: "Fabric & Textile Sealant",
    addon_leather: "Leather & Synthetic Ceramic Coating",
    addon_clay: "Paint Decontamination (Clay Treatment)",
    addon_sealant: "Paint Sealant (up to 3 months)",
    // Add-ons – Paint
    addon_ceramic1y: "1-Year Paint Ceramic Coating",
    addon_ceramic2y: "2-Year Paint Ceramic Coating",
    addon_ceramic3y: "3-Year Paint Ceramic Coating",
    addon_ceramic8y: "8-Year Paint Ceramic Coating",
    addon_wheelCaliper: "Wheel & Brake Caliper Ceramic Coating",
    addon_glass: "Windshields & Glass Ceramic Coating",
    addon_plastics: "Plastics & Trim Ceramic Coating",
    addon_leatherCeramic: "Leather & Synthetics Ceramic Coating",
    addon_upgrade2y: "2-Year Ceramic Coating Upgrade",
    addon_upgrade3y: "3-Year Ceramic Coating Upgrade",
    addon_upgrade8y: "8-Year Ceramic Coating Upgrade",
    contactForPricing: "Contact for pricing",
    // CTA
    ctaTitle: "Ready to book?",
    ctaSub: "Contact us to schedule your detail.",
    ctaBtn: "Get a Quote",
  },
  fr: {
    pageTitle: "Forfaits & Tarifs | Down2Detail Esthétique Auto",
    metaDesc:
      "Consultez tous nos forfaits d'esthétique automobile chez Down2Detail. Tarifs transparents pour le détail extérieur & intérieur, le polissage & la protection, et les plans mensuels.",
    heroBadge: "TARIFICATION TRANSPARENTE",
    heroTitle: "Nos Forfaits",
    heroSub:
      "Esthétique automobile professionnelle avec des prix honnêtes et clairs — sans frais cachés.",
    sedan: "Berline",
    midSuv: "VUS Intermédiaire",
    truck: "Camion",
    sedanCoupeXover: "Berline / Coupé / Multisegment",
    compactMidSuv: "VUS Compact / Intermédiaire",
    fullSizePickup: "Grand VUS / Camionnette",
    detailHeading: "Détail Extérieur & Intérieur",
    paintHeading: "Polissage & Protection de Peinture",
    monthlyHeading: "Plans Mensuels",
    monthlySub: "Exclusif pour nos clients fidèles",
    essential: "Essentiel",
    signature: "Signature",
    elite: "Élite",
    silver: "Argent",
    gold: "Or",
    platinum: "Platine",
    diamond: "Diamant",
    monthlyRefresh: "Actualisation Mensuelle",
    ceramicRefresh: "Actualisation Céramique",
    bestValue: "Meilleure Valeur",
    mostPopular: "Le Plus Populaire",
    everyFourSix: "Aux 4–6 Mois",
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
    silver_s1: "Lavage à la main",
    silver_s2: "Décontamination peinture",
    silver_s3: "Rehausseur de brillance (polissage fin)",
    silver_s4: "Scellant peinture (3 mois)",
    gold_s1: "Lavage à la main",
    gold_s2: "Décontamination peinture",
    gold_s3: "Polissage une étape (rayures légères ~50–60% défauts retirés)",
    gold_s4: "Scellant peinture (3 mois)",
    platinum_s1: "Lavage à la main",
    platinum_s2: "Décontamination peinture",
    platinum_s3:
      "Correction 2 étapes (Rotatif + Patte laine, DA + Patte mousse — ~90% défauts retirés)",
    platinum_s4: "Scellant peinture (3 mois)",
    diamond_s1: "Lavage à la main",
    diamond_s2: "Décontamination peinture",
    diamond_s3:
      "Correction 3 étapes (Rotatif + Laine, DA + Microfibre, DA + Mousse — ~95–99% défauts retirés)",
    diamond_s4: "Revêtement céramique peinture 1 an",
    monthlyRefresh_s1: "Forfait extérieur de base",
    monthlyRefresh_s2: "Forfait intérieur standard",
    monthlyRefresh_s3: "Entretien tapis été / tapis d'hiver",
    ceramicRefresh_s1: "Forfait extérieur avancé",
    ceramicRefresh_s2: "Forfait intérieur standard",
    ceramicRefresh_s3: "Applicateur de revêtement céramique",
    addonTitle: "Suppléments Disponibles",
    addon_odor: "Traitement des odeurs",
    addon_pet: "Retrait poils d'animaux",
    addon_fabric: "Scellant tissu & textile",
    addon_leather: "Revêtement céramique cuir & synthétique",
    addon_clay: "Décontamination peinture (argile)",
    addon_sealant: "Scellant peinture (3 mois)",
    addon_ceramic1y: "Revêtement céramique peinture 1 an",
    addon_ceramic2y: "Revêtement céramique peinture 2 ans",
    addon_ceramic3y: "Revêtement céramique peinture 3 ans",
    addon_ceramic8y: "Revêtement céramique peinture 8 ans",
    addon_wheelCaliper: "Céramique jantes & étriers de frein",
    addon_glass: "Céramique pare-brise & vitres",
    addon_plastics: "Céramique plastiques & garnitures",
    addon_leatherCeramic: "Céramique cuir & synthétiques",
    addon_upgrade2y: "Mise à niveau céramique 2 ans",
    addon_upgrade3y: "Mise à niveau céramique 3 ans",
    addon_upgrade8y: "Mise à niveau céramique 8 ans",
    contactForPricing: "Contactez-nous",
    ctaTitle: "Prêt à réserver?",
    ctaSub: "Contactez-nous pour planifier votre détail.",
    ctaBtn: "Obtenir un devis",
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

/** Add-on row for paint section */
function AddonRow({ name, price }) {
  return (
    <div className="flex items-center justify-between gap-2 py-2 border-b border-neutral-800">
      <span className="text-sm text-neutral-300">{name}</span>
      <span className="text-xs font-semibold text-[#C9A84C] whitespace-nowrap">{price}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function Packages() {
  const { lang } = useLang();
  const t = translations[lang];
  const { prices, loading } = usePackagePrices();

  // Independent vehicle toggles per section
  const [activeDetailVehicle, setActiveDetailVehicle] = useState("sedan");
  const [activePaintVehicle, setActivePaintVehicle] = useState("sedan");
  const [activeMonthlyVehicle, setActiveMonthlyVehicle] = useState("sedanCoupeXover");

  const detailVehicles = [
    { key: "sedan",  label: t.sedan  },
    { key: "midSuv", label: t.midSuv },
    { key: "truck",  label: t.truck  },
  ];

  const paintVehicles = [
    { key: "sedan",  label: t.sedan  },
    { key: "midSuv", label: t.midSuv },
    { key: "truck",  label: t.truck  },
  ];

  const monthlyVehicles = [
    { key: "sedanCoupeXover", label: t.sedanCoupeXover    },
    { key: "compactMidSuv",   label: t.compactMidSuv      },
    { key: "fullSizePickup",  label: t.fullSizePickup      },
  ];

  // Safe price getter
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
      {/* 1 · HERO BANNER                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Layered dark gradient background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 70%), linear-gradient(180deg, #0a0a0a 0%, #120800 50%, #0a0a0a 100%)",
          }}
        />
        {/* Ambient grid lines */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <motion.div
          className="relative z-10 text-center px-4 py-32"
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

        {/* Animated scroll chevron */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} className="text-neutral-500" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 2 · EXTERIOR & INTERIOR DETAIL                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="section-tag block mb-3" style={{ color: "#e46904ff" }}>
              [01]
            </span>
            <h2 className="serif-heading text-3xl md:text-4xl text-white mb-10">
              {t.detailHeading}
            </h2>
          </motion.div>

          <VehicleToggle
            options={detailVehicles}
            active={activeDetailVehicle}
            onChange={setActiveDetailVehicle}
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
                  value={getPrice("essential", activeDetailVehicle)}
                  vehicleLabel={t[activeDetailVehicle]}
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
                  value={getPrice("signature", activeDetailVehicle)}
                  vehicleLabel={t[activeDetailVehicle]}
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
                  value={getPrice("elite", activeDetailVehicle)}
                  vehicleLabel={t[activeDetailVehicle]}
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

      {/* Divider */}
      <div className="divider mx-auto max-w-7xl px-4" />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 3 · PAINT POLISH & PROTECTION                                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="section-tag block mb-3" style={{ color: "#e46904ff" }}>
              [02]
            </span>
            <h2 className="serif-heading text-3xl md:text-4xl text-white mb-10">
              {t.paintHeading}
            </h2>
          </motion.div>

          <VehicleToggle
            options={paintVehicles}
            active={activePaintVehicle}
            onChange={setActivePaintVehicle}
          />

          {/* Cards Row 1 — Silver & Gold */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Silver */}
            <motion.div variants={cardVariants} className="dark-card p-6 flex flex-col">
              <span className="section-tag block mb-2">{t.silver}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("silver", activePaintVehicle)}
                  vehicleLabel={t[activePaintVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.silver_s1, t.silver_s2, t.silver_s3, t.silver_s4].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>

            {/* Gold */}
            <motion.div variants={cardVariants} className="dark-card p-6 flex flex-col">
              <span className="section-tag block mb-2">{t.gold}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("gold", activePaintVehicle)}
                  vehicleLabel={t[activePaintVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.gold_s1, t.gold_s2, t.gold_s3, t.gold_s4].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Cards Row 2 — Platinum & Diamond */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Platinum */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "rgba(59,130,246,0.4)" }}
            >
              <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {t.mostPopular}
              </span>
              <span className="section-tag block mb-2">{t.platinum}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("platinum", activePaintVehicle)}
                  vehicleLabel={t[activePaintVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.platinum_s1, t.platinum_s2, t.platinum_s3, t.platinum_s4].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>

            {/* Diamond */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "#C9A84C" }}
            >
              <span className="section-tag block mb-2">{t.diamond}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("diamond", activePaintVehicle)}
                  vehicleLabel={t[activePaintVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.diamond_s1, t.diamond_s2, t.diamond_s3, t.diamond_s4].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Paint Add-Ons */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 dark-card p-6"
          >
            <p className="section-tag mb-5">{t.addonTitle}</p>
            <div className="grid sm:grid-cols-2 gap-x-10">
              <div>
                {[
                  { name: t.addon_ceramic1y,  price: "+$99"              },
                  { name: t.addon_ceramic2y,  price: "+$149"             },
                  { name: t.addon_ceramic3y,  price: "+$249"             },
                  { name: t.addon_ceramic8y,  price: "+$499"             },
                  { name: t.addon_wheelCaliper, price: t.contactForPricing },
                  { name: t.addon_glass,      price: "+$149"             },
                ].map((a) => (
                  <AddonRow key={a.name} name={a.name} price={a.price} />
                ))}
              </div>
              <div>
                {[
                  { name: t.addon_plastics,      price: t.contactForPricing },
                  { name: t.addon_leatherCeramic, price: t.contactForPricing },
                  { name: t.addon_upgrade2y,     price: "+$149"             },
                  { name: t.addon_upgrade3y,     price: "+$249"             },
                  { name: t.addon_upgrade8y,     price: "+$499"             },
                ].map((a) => (
                  <AddonRow key={a.name} name={a.name} price={a.price} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider mx-auto max-w-7xl px-4" />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4 · MONTHLY PLANS                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="section-tag block mb-3" style={{ color: "#e46904ff" }}>
              [03]
            </span>
            <h2 className="serif-heading text-3xl md:text-4xl text-white mb-2">
              {t.monthlyHeading}
            </h2>
            <p className="text-neutral-500 text-sm mb-10">{t.monthlySub}</p>
          </motion.div>

          <VehicleToggle
            options={monthlyVehicles}
            active={activeMonthlyVehicle}
            onChange={setActiveMonthlyVehicle}
          />

          <motion.div
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Monthly Refresh */}
            <motion.div variants={cardVariants} className="dark-card p-6 flex flex-col">
              <span className="section-tag block mb-1">{t.monthlyRefresh}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("monthlyRefresh", activeMonthlyVehicle)}
                  vehicleLabel={t[activeMonthlyVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.monthlyRefresh_s1, t.monthlyRefresh_s2, t.monthlyRefresh_s3].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>

            {/* Ceramic Refresh */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "#C9A84C" }}
            >
              <span className="absolute top-3 right-3 bg-[#C9A84C] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {t.everyFourSix}
              </span>
              <span className="section-tag block mb-1">{t.ceramicRefresh}</span>
              <div className="mb-5">
                <PriceDisplay
                  value={getPrice("ceramicRefresh", activeMonthlyVehicle)}
                  vehicleLabel={t[activeMonthlyVehicle]}
                  loading={loading}
                />
              </div>
              <ul className="space-y-2 flex-1">
                {[t.ceramicRefresh_s1, t.ceramicRefresh_s2, t.ceramicRefresh_s3].map((s) => (
                  <ServiceItem key={s} text={s} />
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 5 · CTA BANNER                                                     */}
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
              <p className="text-neutral-400 mb-8 relative z-10">{t.ctaSub}</p>
              <Link to="/contact" className="btn-filled_2 relative z-10">
                {t.ctaBtn}
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
