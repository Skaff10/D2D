import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLang } from "../context/LanguageContext";

import imgDetail from "../assets/images/services/Exterior Detailing.avif";
import imgPaint from "../assets/images/services/Paint Polish Services.webp";
import imgMonthly from "../assets/images/services/Ceramic Coating.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────────────────────────────────────────
const translations = {
  en: {
    pageTitle: "Our Packages | Down2Detail Auto Detailing",
    metaDesc:
      "Explore our auto detailing packages: Exterior & Interior Detail, Paint Polish & Protection, and Monthly Plans.",
    heroBadge: "TRANSPARENT PRICING",
    heroTitle: "Our Packages",
    heroSub: "Choose a category to explore our services",
    card1Title: "Exterior & Interior Detail",
    card1Desc:
      "Full interior and exterior cleaning packages for every budget.",
    card1Price: "Starting from $99",
    card2Title: "Paint Polish & Protection",
    card2Desc:
      "From gloss enhancement to full paint correction and ceramic coating.",
    card2Price: "Starting from $349",
    card3Title: "Monthly Plans",
    card3Desc: "Exclusive recurring plans for our loyal customers.",
    card3Price: "Starting from $99.99/mo",
    viewPackages: "View Packages",
  },
  fr: {
    pageTitle: "Nos Forfaits | Down2Detail Esthétique Auto",
    metaDesc:
      "Découvrez nos forfaits d'esthétique automobile : Détail Extérieur & Intérieur, Polissage & Protection, et Plans Mensuels.",
    heroBadge: "TARIFICATION TRANSPARENTE",
    heroTitle: "Nos Forfaits",
    heroSub: "Choisissez une catégorie pour explorer nos services",
    card1Title: "Détail Extérieur & Intérieur",
    card1Desc: "Forfaits de nettoyage complet pour tous les budgets.",
    card1Price: "À partir de 99$",
    card2Title: "Polissage & Protection de Peinture",
    card2Desc:
      "Du rehausseur de brillance à la correction complète et revêtement céramique.",
    card2Price: "À partir de 349$",
    card3Title: "Plans Mensuels",
    card3Desc: "Plans récurrents exclusifs pour nos clients fidèles.",
    card3Price: "À partir de 99,99$/mois",
    viewPackages: "Voir les forfaits",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function PackagesOverview() {
  const { lang } = useLang();
  const t = translations[lang];
  const navigate = useNavigate();

  const categories = [
    {
      title: t.card1Title,
      desc: t.card1Desc,
      price: t.card1Price,
      img: imgDetail,
      route: "/packages/detail",
    },
    {
      title: t.card2Title,
      desc: t.card2Desc,
      price: t.card2Price,
      img: imgPaint,
      route: "/packages/paint",
    },
    {
      title: t.card3Title,
      desc: t.card3Desc,
      price: t.card3Price,
      img: imgMonthly,
      route: "/packages/monthly",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.metaDesc} />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO BANNER                                                       */}
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
      {/* CATEGORY CARDS                                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.route}
                variants={cardVariants}
                className="dark-card rounded-2xl border border-neutral-800 overflow-hidden cursor-pointer group hover:border-[#C9A84C] transition-all duration-300"
                onClick={() => navigate(cat.route)}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "var(--font-family-heading)" }}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                    {cat.desc}
                  </p>
                  <p className="text-sm font-semibold text-[#C9A84C] mb-5">
                    {cat.price}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-[#C9A84C] transition-colors">
                    {t.viewPackages}
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
