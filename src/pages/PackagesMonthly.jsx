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
    pageTitle: "Monthly Plans | Down2Detail Auto Detailing",
    metaDesc:
      "Explore our exclusive Monthly Plans — Monthly Refresh and Ceramic Refresh — designed for loyal Down2Detail customers.",
    heroBadge: "[03]",
    heroTitle: "Monthly Plans",
    heroSub:
      "Keep your vehicle looking its best with our exclusive recurring plans.",
    monthlySub: "Exclusive for loyal customers",
    backToPackages: "← Back to Packages",
    breadcrumbPackages: "Packages",
    breadcrumbCurrent: "Monthly Plans",
    sedanCoupeXover: "Sedan / Coupe / Crossover",
    compactMidSuv: "Compact / Mid-Size SUV",
    fullSizePickup: "Full-Size SUV / Pickup",
    monthlyRefresh: "Monthly Refresh",
    ceramicRefresh: "Ceramic Refresh",
    everyFourSix: "Every 4–6 Months",
    monthlyRefresh_s1: "Basic Exterior Package",
    monthlyRefresh_s2: "Standard Interior Package",
    monthlyRefresh_s3: "Summer Carpet / Winter Mat Detailing",
    ceramicRefresh_s1: "Advanced Exterior Package",
    ceramicRefresh_s2: "Standard Interior Package",
    ceramicRefresh_s3: "Ceramic Coating Topper",
    ctaTitle: "Ready to book?",
    ctaSub: "Contact us to set up your monthly plan.",
    bookThisPackage: "Book This Package",
  },
  fr: {
    pageTitle: "Plans Mensuels | Down2Detail Esthétique Auto",
    metaDesc:
      "Découvrez nos plans mensuels exclusifs — Actualisation Mensuelle et Actualisation Céramique — pour nos clients fidèles.",
    heroBadge: "[03]",
    heroTitle: "Plans Mensuels",
    heroSub:
      "Gardez votre véhicule impeccable avec nos plans récurrents exclusifs.",
    monthlySub: "Exclusif pour nos clients fidèles",
    backToPackages: "← Retour aux forfaits",
    breadcrumbPackages: "Forfaits",
    breadcrumbCurrent: "Plans Mensuels",
    sedanCoupeXover: "Berline / Coupé / Multisegment",
    compactMidSuv: "VUS Compact / Intermédiaire",
    fullSizePickup: "Grand VUS / Camionnette",
    monthlyRefresh: "Actualisation Mensuelle",
    ceramicRefresh: "Actualisation Céramique",
    everyFourSix: "Aux 4–6 Mois",
    monthlyRefresh_s1: "Forfait extérieur de base",
    monthlyRefresh_s2: "Forfait intérieur standard",
    monthlyRefresh_s3: "Entretien tapis été / tapis d'hiver",
    ceramicRefresh_s1: "Forfait extérieur avancé",
    ceramicRefresh_s2: "Forfait intérieur standard",
    ceramicRefresh_s3: "Applicateur de revêtement céramique",
    ctaTitle: "Prêt à réserver?",
    ctaSub: "Contactez-nous pour mettre en place votre plan mensuel.",
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
        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-widest">
          {vehicleLabel}
        </p>
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

function ServiceItem({ text }) {
  return (
    <li className="flex items-start gap-2 text-sm text-neutral-300">
      <Check size={14} className="text-[#C9A84C] mt-0.5 shrink-0" />
      <span>{text}</span>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PackagesMonthly() {
  const { lang } = useLang();
  const t = translations[lang];
  const { prices, loading } = usePackagePrices();
  const [activeVehicle, setActiveVehicle] = useState("sedanCoupeXover");

  const vehicles = [
    { key: "sedanCoupeXover", label: t.sedanCoupeXover },
    { key: "compactMidSuv",   label: t.compactMidSuv   },
    { key: "fullSizePickup",  label: t.fullSizePickup   },
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
          <p className="text-neutral-500 text-sm mt-3">{t.monthlySub}</p>
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
                  value={getPrice("monthlyRefresh", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
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
                  value={getPrice("ceramicRefresh", activeVehicle)}
                  vehicleLabel={t[activeVehicle]}
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
                to="/booking?category=monthly"
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
