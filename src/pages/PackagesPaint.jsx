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
    pageTitle: "Paint Polish & Protection Packages | Down2Detail",
    metaDesc:
      "View our Paint Polish & Protection packages — Silver, Gold, Platinum, and Diamond — with honest pricing for sedan, SUV, and truck.",
    heroBadge: "[02]",
    heroTitle: "Paint Polish & Protection",
    heroSub:
      "Professional paint correction and protection services for a showroom finish.",
    backToPackages: "← Back to Packages",
    breadcrumbPackages: "Packages",
    breadcrumbCurrent: "Paint Polish & Protection",
    sedan: "Sedan / Coupe / Crossover",
    midSuv: "Compact / Mid-Size SUV",
    truck: "Full-Size SUV / Pickup",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
    diamond: "Diamond",
    mostPopular: "Most Popular",
    silver_s1: "Hand Wash",
    silver_s2: "Paint Decontamination",
    silver_s3: "Gloss Enhancer (Fine Machine Polish)",
    silver_s4: "Paint Sealant (up to 3 months)",
    gold_s1: "Hand Wash",
    gold_s2: "Paint Decontamination",
    gold_s3: "One-Step Polish (Light Swirls Removed ~50–60% defect removal)",
    gold_s4: "Paint Sealant (up to 3 months)",
    platinum_s1: "Hand Wash",
    platinum_s2: "Paint Decontamination",
    platinum_s3:
      "2-Step Paint Correction (Rotary + Wool Pad, DA + Foam Pad — ~90% defect removal)",
    platinum_s4: "Paint Sealant (up to 3 months)",
    diamond_s1: "Hand Wash",
    diamond_s2: "Paint Decontamination",
    diamond_s3:
      "3-Step Paint Correction (Rotary + Wool Pad, DA + Microfibre, DA + Foam — ~95–99% defect removal)",
    diamond_s4: "1-Year Paint Ceramic Coating",
    addonTitle: "Available Add-Ons",
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
    ctaTitle: "Ready to book?",
    ctaSub: "Contact us to schedule your paint correction.",
    bookThisPackage: "Book This Package",
  },
  fr: {
    pageTitle: "Forfaits Polissage & Protection de Peinture | Down2Detail",
    metaDesc:
      "Consultez nos forfaits polissage et protection — Argent, Or, Platine et Diamant — avec tarification transparente.",
    heroBadge: "[02]",
    heroTitle: "Polissage & Protection de Peinture",
    heroSub:
      "Services professionnels de correction et protection de peinture.",
    backToPackages: "← Retour aux forfaits",
    breadcrumbPackages: "Forfaits",
    breadcrumbCurrent: "Polissage & Protection de Peinture",
    sedan: "Berline / Coupé / Crossover",
    midSuv: "VUS Compact / Intermédiaire",
    truck: "Grand VUS / Camionnette",
    silver: "Argent",
    gold: "Or",
    platinum: "Platine",
    diamond: "Diamant",
    mostPopular: "Le Plus Populaire",
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
    addonTitle: "Suppléments Disponibles",
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
    ctaSub: "Contactez-nous pour planifier votre correction de peinture.",
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

function PriceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-9 w-28 bg-neutral-700 rounded-lg mb-1" />
      <div className="h-3 w-16 bg-neutral-800 rounded mt-2" />
    </div>
  );
}

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
        <p className="price-mono text-3xl font-bold text-white">${value}</p>

      </motion.div>
    </AnimatePresence>
  );
}

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

function ServiceItem({ text, checkColor = "#C9A84C" }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-300">
      <Check size={14} style={{ color: checkColor }} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </li>
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
export default function PackagesPaint() {
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

          {/* Cards Row 1 — Silver & Gold */}
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-6"
            style={{alignItems: "start" }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Silver */}
            <motion.div
            
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "rgba(192,192,192,0.25)" }}
            >
              <h3 style={{
                textAlign: "center",
                color: "#C0C0C0",
                fontSize: "13.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-family-mono)",
                marginBottom: "1rem",
              }}>
                {t.silver}
              </h3>
              <ul className="space-y-2 pb-14">
                {[t.silver_s1, t.silver_s2, t.silver_s3, t.silver_s4].map((s) => (
                  <ServiceItem key={s} text={s} checkColor="#C0C0C0" />
                ))}
              </ul>
              <div style={{ position: "absolute", bottom: "1rem", right: "1.25rem" }}>
                <PriceDisplay
                  value={getPrice("silver", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
            </motion.div>

            {/* Gold */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "rgba(201,168,76,0.35)" }}
            >
              <h3 style={{
                textAlign: "center",
                color: "#C9A84C",
                fontSize: "13.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-family-mono)",
                marginBottom: "1rem",
              }}>
                {t.gold}
              </h3>
              <ul className="space-y-2 pb-14">
                {[t.gold_s1, t.gold_s2, t.gold_s3, t.gold_s4].map((s) => (
                  <ServiceItem key={s} text={s} checkColor="#C9A84C" />
                ))}
              </ul>
              <div style={{ position: "absolute", bottom: "1rem", right: "1.25rem" }}>
                <PriceDisplay
                  value={getPrice("gold", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Cards Row 2 — Platinum & Diamond */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            style={{alignItems: "start" }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Platinum */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{ borderColor: "rgba(168,216,234,0.35)" }}
            >
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                style={{ background: "#A8D8EA", color: "#0a1a20" }}>
                {t.mostPopular}
              </span>
              <h3 style={{
                textAlign: "center",
                color: "#A8D8EA",
                fontSize: "13.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-family-mono)",
                marginBottom: "1rem",
              }}>
                {t.platinum}
              </h3>
              <ul className="space-y-2 pb-14">
                {[t.platinum_s1, t.platinum_s2, t.platinum_s3, t.platinum_s4].map((s) => (
                  <ServiceItem key={s} text={s} checkColor="#A8D8EA" />
                ))}
              </ul>
              <div style={{ position: "absolute", bottom: "1rem", right: "1.25rem" }}>
                <PriceDisplay
                  value={getPrice("platinum", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
            </motion.div>

            {/* Diamond */}
            <motion.div
              variants={cardVariants}
              className="relative dark-card p-6 flex flex-col"
              style={{  borderColor: "rgba(229,229,229,0.3)" }}
            >
              <h3 style={{
                textAlign: "center",
                color: "#E5E5E5",
                fontSize: "13.5px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-family-mono)",
                marginBottom: "1rem",
              }}>
                {t.diamond}
              </h3>
              <ul className="space-y-2 pb-14">
                {[t.diamond_s1, t.diamond_s2, t.diamond_s3, t.diamond_s4].map((s) => (
                  <ServiceItem key={s} text={s} checkColor="#E5E5E5" />
                ))}
              </ul>
              <div style={{ position: "absolute", bottom: "1rem", right: "1.25rem" }}>
                <PriceDisplay
                  value={getPrice("diamond", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
                  loading={loading}
                />
              </div>
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
                  { name: t.addon_ceramic1y,    price: "+$99"              },
                  { name: t.addon_ceramic2y,    price: "+$149"             },
                  { name: t.addon_ceramic3y,    price: "+$249"             },
                  { name: t.addon_ceramic8y,    price: "+$499"             },
                  { name: t.addon_wheelCaliper, price: t.contactForPricing },
                  { name: t.addon_glass,        price: "+$149"             },
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
                to="/booking?category=paint"
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
