import { Link, useLocation } from "react-router-dom";
import {
  LocalBusinessSchema,
  WebSiteSchema,
  ServiceSchema,
  ReviewSchema,
  FAQSchema,
} from "../seo/schemas";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Shield,
  Sparkles,
  Clock,
  Award,
  Star,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Truck,
  Leaf,
} from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import SectionHeading from "../components/ui/SectionHeading";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import { pushToDataLayer } from "../utils/dataLayer";
import ceramicImg from "../assets/dk/imgi_2_ceramiccoating.webp";
import interiorImg from "/newImages/interior/p1.webp";
import exteriorImg from "/newImages/Exterior/p1.webp";
import paintImg from "/newImages/paint_correction/p4.webp";
import beforeAfterImg from "../assets/dk/img32.jpg";
import cadillacImg from "../assets/images/brand/imgi_10_cadillac.webp";
import chevroletImg from "../assets/images/brand/imgi_11_chevrolet.png";
import hondaImg from "../assets/images/brand/imgi_12_honda.png";
import toyotaImg from "../assets/images/brand/imgi_13_toyota.png";
import acuraImg from "../assets/images/brand/imgi_14_acura.png";
import lexusImg from "../assets/images/brand/imgi_15_lexus.png";
import ferrariImg from "../assets/images/brand/imgi_3_ferrari.png";
import lamborghiniImg from "../assets/images/brand/imgi_4_lamborghini.png";
import porscheImg from "../assets/images/brand/imgi_5_porsche.png";
import rollsRoyceImg from "../assets/images/brand/imgi_6_rolls-royce-bw.png";
import mercedesImg from "../assets/images/brand/imgi_7_mercedes.png";
import bmwImg from "../assets/images/brand/imgi_8_BMW.png";
import miniImg from "../assets/images/brand/imgi_9_mini.png";
import heroVideo from "../assets/videos/hero.mp4";
import heroPoster from "../assets/videos/hero-poster.jpg";
import { HeroTypewriter } from "../components/ui/HeroTypewriter";

const brandLogos = [
  { src: ferrariImg, alt: "Ferrari" },
  { src: lamborghiniImg, alt: "Lamborghini" },
  { src: porscheImg, alt: "Porsche" },
  { src: rollsRoyceImg, alt: "Rolls Royce" },
  { src: mercedesImg, alt: "Mercedes" },
  { src: bmwImg, alt: "BMW" },
  { src: cadillacImg, alt: "Cadillac" },
  { src: miniImg, alt: "Mini" },
  { src: lexusImg, alt: "Lexus" },
  { src: acuraImg, alt: "Acura" },
  { src: chevroletImg, alt: "Chevrolet" },
  { src: hondaImg, alt: "Honda" },
  { src: toyotaImg, alt: "Toyota" },
];

// ── Service area cities (shown as chips under the services heading) ──────────
const servicedCities = [
  "Montreal",
  "Laval",
  "Longueuil",
  "Brossard",
  "Saint-Hubert",
  "West Island",
  "Pointe-Claire",
  "Dorval",
  "Saint-Laurent",
];

export default function Home() {
  const { lang } = useLang();
  const location = useLocation();
  const t = translations[lang].home;
  const th = translations[lang].hero;
  const tn = translations[lang].navbar;

  const services = [
    {
      title: lang === "en" ? "Exterior Detailing" : "Esthétique Extérieure",
      description:
        lang === "en"
          ? "Complete exterior cleaning with snow foam, two-bucket wash, paint decontamination, clay bar treatment, and tire dressing."
          : "Nettoyage extérieur complet avec mousse de neige, lavage à deux seaux, décontamination de la peinture, traitement à la barre d'argile et lustrage des pneus.",
      image: exteriorImg,
      price:
        lang === "en" ? "Included in Packages" : "Inclus dans les forfaits",
    },
    {
      title: lang === "en" ? "Interior Detailing" : "Esthétique Intérieure",
      description:
        lang === "en"
          ? "Deep interior cleaning — vacuuming, dashboard detailing, steam cleaning, steering wheel restoration, and fragrance application."
          : "Nettoyage intérieur en profondeur — aspiration, détails du tableau de bord, nettoyage à la vapeur, restauration du volant et application de parfum.",
      image: interiorImg,
      price: lang === "en" ? "From $69.99" : "À partir de 69,99 $",
    },
    {
      title: lang === "en" ? "Paint Polish" : "Polissage de Peinture",
      description:
        lang === "en"
          ? "Multi-stage machine polishing to remove up to 90% of swirls, oxidation, and scratches for a mirror-like showroom finish."
          : "Polissage à la machine à plusieurs étapes pour éliminer jusqu'à 90 % des tourbillons, de l'oxydation et des rayures pour une finition miroir de salle d'exposition.",
      image: paintImg,
      price: lang === "en" ? "Contact Us" : "Contactez-nous",
    },
    {
      title: lang === "en" ? "Protection Services" : "Services de Protection",
      description:
        lang === "en"
          ? "SiO₂ nanotechnology protection against road salt, calcium, UV damage. 2-5 year warranty included."
          : "Protection par nanotechnologie SiO₂ contre le sel de voirie, le calcium, les dommages causés par les UV. Garantie de 2 à 5 ans incluse.",
      image: ceramicImg,
      price: lang === "en" ? "From $99.99" : "À partir de 99,99 $",
    },
  ];

  const serviceAnchors = {
    [lang === "en" ? "Exterior Detailing" : "Esthétique Extérieure"]:
      "/services#section-exterior",
    [lang === "en" ? "Interior Detailing" : "Esthétique Intérieure"]:
      "/services#section-interior",
    [lang === "en" ? "Paint Polish" : "Polissage de Peinture"]:
      "/services#section-paint-polish",
    [lang === "en" ? "Protection Services" : "Services de Protection"]:
      "/services#section-protection",
  };

  const whyChooseUs = [
    {
      icon: Shield,
      title: lang === "en" ? "Premium Products" : "Produits Premium",
      desc:
        lang === "en"
          ? "Professional-grade detailing products only"
          : "Produits d'esthétique de qualité professionnelle uniquement",
    },
    {
      icon: Sparkles,
      title: lang === "en" ? "Expert Detail" : "Détails Experts",
      desc:
        lang === "en"
          ? "Meticulous attention to every surface"
          : "Attention méticuleuse à chaque surface",
    },
    {
      icon: Clock,
      title: lang === "en" ? "Reliable Service" : "Service Fiable",
      desc:
        lang === "en"
          ? "On-time, every time — 7 days a week"
          : "À l'heure, à chaque fois — 7 jours sur 7",
    },
    {
      icon: Award,
      title: lang === "en" ? "Guaranteed Quality" : "Qualité Garantie",
      desc:
        lang === "en"
          ? "100% satisfaction on every job"
          : "100 % de satisfaction sur chaque travail",
    },
  ];

  const stats = [
    { value: "500+", label: t.carsDetailed },
    { value: "4.9", label: t.averageRating },
    { value: "100%", label: "Satisfaction" },
    { value: "7/7", label: lang === "en" ? "Days Open" : "Jours Ouverts" },
  ];

  const testimonials = [
    {
      name: "Sholmi Konfino",
      text: "I own a 2021 Ford F-150, and I decided to go ALL IN on a full detailing package at Down2Detail — paint correction, 5–7 year ceramic coating, full engine bay detailing, complete interior detailing with a 2-year ceramic protection on all plastics, fabric sealant on the seats, and a ceramic coating on the front windshield. Let me tell you… I was absolutely blown away. The truck looks....",
      rating: 5,
      url: "https://maps.app.goo.gl/bkxbKsKHSZyQBxr88",
    },
    {
      name: "Manouchka Guirand",
      text: "I had an incredible experience with DownToDetail! The service was not only fast but also extremely thorough …every small detail was carefully taken care of. The ceramic coating on my car looks amazing, and I couldn't be more satisfied with the results. The customer service was outstanding; they truly went above and beyond and made the whole process smooth and trustworthy. I'm so impressed that I'll be....",
      rating: 5,
      url: "https://maps.app.goo.gl/VBdXNusJQgfbjkkD7",
    },
    {
      name: "Nathaniel Great",
      text: "I really wanted to get my engine bay detailed and I booked an appointment with Down2Detail and the outcome is fabulous. They absolutely nailed it! My car looks brand new. Both inside and outside. Professional, thorough, and worth every penny. Best detailing service in Montreal. You should definitely check em out!",
      rating: 5,
      url: "https://maps.app.goo.gl/Zk5RQmpWSHfyvh9x9",
    },
    {
      name: "Daksh Garg",
      text: "Got my 2025 F-150 ceramic coated and I couldn't be happier. The quality of work is top-notch, the attention to detail is insane, and the truck looks better than brand new. Super professional, no shortcuts, no nonsense. Highly recommend if you want your vehicle done right.",
      rating: 5,
      url: "https://maps.app.goo.gl/VdA5XnKdNoCXVNY89",
    },
    {
      name: "Shaz Ali",
      text: "I had a first stage paint correction and a 4 year ceramic coating applied on my 2012 E92 335i xDrive, and the results were outstanding. The finish is incredibly glossy, smooth, and well-protected. It truly elevates the overall look of the car. The level of professionalism, care, and attention to detail throughout the process was excellent. Everything was clearly explained, timelines were respected, and the workmanship speaks....",
      rating: 5,
      url: "https://maps.app.goo.gl/6oAsh95oLJdHh3jJ9",
    },
    {
      name: "Mehedi Hasan Asfi",
      text: "I had a full interior detailing done, and the results were excellent. The interior came back looking like showroom condition—very clean, fresh, and well-finished. You can tell they take their time and pay attention to details. The price is a bit higher than regular car wash services, but for a premium service, it's definitely worth it. This is professional detailing, not a quick clean. I would recommend....",
      rating: 5,
      url: "https://maps.app.goo.gl/55fVMMMXCbFcQkU99",
    },
    {
      name: "Ferdous Ahmed",
      text: "I'm absolutely thrilled with the work Down2Detail did on my car. They were extraordinary and the results are amazing. My car needed a deep cleaning and paint correction, and when the job was done, it looked and felt brand new inside and out. The attention to detail and care they put into their work truly stand out. I highly recommend Down2Detail to anyone looking for professional, dedicated,....",
      rating: 5,
      url: "https://maps.app.goo.gl/KeCTG5GubGKoCsKp8",
    },
    {
      name: "Jobair Ahmed Jisan",
      text: "Took their 2 step paint correction with 7 year paint protection and the result is mind blowing tbh. The black paint is restored and when you touch the paint it's so smooth. The paint rejects the water just like water with oil. Highly recommended!!!!",
      rating: 5,
      url: "https://maps.app.goo.gl/vBqDTWExouE8VYis8",
    },
    {
      name: "Shahriar Mahmud",
      text: "Initially, it seemed somewhat suspicious that they had only five-star reviews. Over the years, my car's paint had deteriorated, and there were swirl marks and scratches all over. I decided to take a chance and entrust my Porsche to them for paint correction. Upon picking up my car, I was astonished! It felt as though I was receiving a brand-new Cayenne! The paint had an incredibly smooth....",
      rating: 5,
      url: "https://maps.app.goo.gl/kmBkL4QMCAhgHJCBA",
    },
    {
      name: "Su Sohan",
      text: "I recently got my Tesla detailed by Down2Detail and I couldn't be more impressed! From start to finish, the experience was smooth and professional. The team did an absolutely amazing job — the paint looks flawless, the shine is perfect, and every inch of the car is spotless. Which makes my money worth it. Highly recommend Down2Detail to anyone who wants top-quality work with great customer service.....",
      rating: 5,
      url: "https://maps.app.goo.gl/xgcgPu9rsHA5C5nL6",
    },
    {
      name: "Abdel Saidi",
      text: "Very satisfied with the car wash. They did an amazing job. The car looks brand new now. I totally recommend this car wash 100%.",
      rating: 5,
      url: "https://maps.app.goo.gl/oAMphBPWHYq3kdph9",
    },
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextTestimonials = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev + itemsToShow) % testimonials.length,
    );
  };

  const prevTestimonials = () => {
    setCurrentTestimonialIndex(
      (prev) =>
        (prev - itemsToShow + testimonials.length) % testimonials.length,
    );
  };

  const visibleTestimonials = [];
  for (let i = 0; i < itemsToShow; i++) {
    visibleTestimonials.push(
      testimonials[(currentTestimonialIndex + i) % testimonials.length],
    );
  }

  return (
    <>
      {/* ===== JSON-LD SCHEMA MARKUP ===== */}
      <LocalBusinessSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <ReviewSchema />
      <FAQSchema />

      <Helmet>
        <title>Professional Auto Detailing Montreal | Down2Detail</title>
        <meta
          name="description"
          content="Premium auto detailing in Montreal & Saint-Hubert, QC. Paint correction, ceramic coating & interior detailing packages. Book your appointment today!"
        />
        <link rel="canonical" href="https://down2detail.ca/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://down2detail.ca/" />
        <meta
          property="og:title"
          content="Professional Auto Detailing Montreal | Down2Detail"
        />
        <meta
          property="og:description"
          content="Paint correction, ceramic coating & full detailing in Montreal & Saint-Hubert. Book your appointment today."
        />
        <meta
          property="og:image"
          content="https://down2detail.ca/og-image.jpg"
        />
        <meta property="og:site_name" content="Down2Detail" />
        <meta property="og:locale" content="en_CA" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Professional Auto Detailing Montreal | Down2Detail"
        />
        <meta
          name="twitter:description"
          content="Paint correction, ceramic coating & full detailing in Montreal & Saint-Hubert. Book your appointment today."
        />
        <meta
          name="twitter:image"
          content="https://down2detail.ca/og-image.jpg"
        />
      </Helmet>

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.45)" }}
        ></div>

        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroPoster}
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-32 lg:py-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[800px] w-full mx-auto flex flex-col items-center"
          >
            {/* ── Item 1: Hero tag ─────────────────────────────────────────── */}
            <span
              className="mb-4 block uppercase section-tag font-medium text-xs md:text-sm tracking-widest"
              style={{
                color: "#e95514",
                fontWeight: "bold",
                textShadow: "0px 2px 12px rgba(10, 9, 9, 0.99)",
              }}
            >
              {lang === "en" ? "PREMIUM CAR DETAILING IN MONTREAL" : th.tag}
            </span>

            <HeroTypewriter />

            <p
              className="mb-8 text-sm md:text-base"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              {th.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                to="/booking"
                className="btn-filled_2"
                onClick={() =>
                  pushToDataLayer({
                    event: "cta_click",
                    buttonText: th.bookUs,
                    component: "HomeHero",
                    pageLocation: location.pathname,
                  })
                }
              >
                {th.bookUs}
              </Link>
              <Link
                to="/contact"
                className="btn-filled"
                onClick={() =>
                  pushToDataLayer({
                    event: "cta_click",
                    buttonText: th.contactUs,
                    component: "HomeHero",
                    pageLocation: location.pathname,
                  })
                }
              >
                {th.contactUs}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="pb-15 lg:pb-28 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.whyDown2Detail}
            title={t.theD2Ddifference}
            description={t.dontCutCorners}
            maxWidth="max-w-7xl"
          />

          <div className="-mt-5 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* LEFT — image with lead-in text above it */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-1 -mb-10">
                <div className="relative rounded-xl overflow-hidden img-zoom mt-4">
                  <img
                    src={beforeAfterImg}
                    alt="Down2Detail"
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT — heading → body copy → emotional closer → buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-5"
            >
              {/* ── Item 2 — section heading ── */}
              <h2 className="serif-heading text-xl md:text-2xl lg:text-3xl mb-5">
                {lang === "en"
                  ? "That's why our goal is simple"
                  : "C'est pourquoi notre objectif est simple"}{" "}
                <span className="serif-heading-italic">
                  {lang === "en"
                    ? "to bring back that first-day feeling"
                    : "Retrouver cette sensation du premier jour"}
                </span>
              </h2>

              {/* ── Item 4 — body paragraph ── */}
              <p className="text-text-secondary text-sm leading-relaxed mb-5">
                {lang === "en"
                  ? "Whether it's pet hair removal, paint correction, or premium protection, every service is carried out with meticulous attention to detail. Because your car is more than transportation — it's part of your memories and lifestyle."
                  : "Qu'il s'agisse d'un retrait de poils d'animaux, d'une correction de peinture ou d'une protection premium, chaque service est réalisé avec une attention méticuleuse aux détails. Parce que votre voiture est plus qu'un moyen de transport — elle fait partie de vos souvenirs et de votre mode de vie."}
              </p>

              {/* Buttons sit AFTER the copy so the value prop lands first */}
              <div className="flex gap-3">
                <Link
                  to="/booking"
                  className="btn-filled"
                  onClick={() =>
                    pushToDataLayer({
                      event: "cta_click",
                      buttonText: "Book Now",
                      component: "HomeDifference",
                      pageLocation: location.pathname,
                    })
                  }
                >
                  Book Now
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline"
                  onClick={() =>
                    pushToDataLayer({
                      event: "cta_click",
                      buttonText: "Contact Us",
                      component: "HomeDifference",
                      pageLocation: location.pathname,
                    })
                  }
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className=" border-white/4 overflow-hidden">
        <div className="max-w-full mx-auto">
          <p className="text-center section-tag mb-8 px-4">{t.trustedBy}</p>
          <div className="relative md:w-1/2 mx-auto overflow-hidden group">
            <div className="animate-marquee flex items-center gap-12 md:gap-20 px-6 md:px-10">
              {[...brandLogos, ...brandLogos].map((brand, idx) => (
                <img
                  key={idx}
                  src={brand.src}
                  alt={brand.alt}
                  className="h-14 md:h-20 w-auto object-contain shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 lg:py-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.whatWeOffer}
            title={t.simpleToComprehensive}
          />

          {/* City service-area chips */}
          <div className="flex flex-wrap justify-center gap-2 mt-2 mb-10">
            {servicedCities.map((city) => (
              <span
                key={city}
                className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/8 text-white/30"
              >
                {city}
              </span>
            ))}
            <span className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20 text-primary/40">
              {lang === "en" ? "+ Greater Montreal Area" : "+ Grand Montréal"}
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                {/* Service label */}
                <div className="flex items-center justify-between mb-3">
                  <span className="section-tag">
                    {service.title.toUpperCase()}
                  </span>
                </div>

                <div className="dark-card overflow-hidden">
                  {/* Card header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="price-mono text-white text-sm md:text-base mt-2">
                          {service.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden mx-4 rounded-xl mb-4">
                    <Link to={serviceAnchors[service.title]}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                      />
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="px-5 pb-5">
                    <Link to={serviceAnchors[service.title]}>
                      <h3 className="serif-heading text-xl text-white mb-2 group-hover:text-primary/90 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                        {service.description}
                      </p>
                    </Link>

                    <Link
                      to="/booking"
                      className="btn-outline text-xs py-2 px-4"
                    >
                      {tn.bookNow}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="btn-outline"
              onClick={() =>
                pushToDataLayer({
                  event: "cta_click",
                  buttonText: t.viewAllServices,
                  component: "HomeServices",
                  pageLocation: location.pathname,
                })
              }
            >
              {t.viewAllServices}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CARDS + STATS ===== */}
      <section className="pb-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 — Professional Grade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="dark-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="section-tag">DOWN2DETAIl</span>
                  <div className="expand-btn">
                    <Leaf size={14} className="text-white/40" />
                  </div>
                </div>
                <h3 className="serif-heading text-xl md:text-2xl text-white mb-3">
                  {t.professionalGrade}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {t.professionalGradeDesc}
                </p>
              </div>
            </motion.div>

            {/* Card 2 — Paint-Safe Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="dark-card p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="section-tag">DOWN2DETAIl</span>
                <div className="expand-btn">
                  <Sparkles size={14} className="text-white/40" />
                </div>
              </div>
              <h3 className="serif-heading text-xl text-white mb-2">
                {t.safePaintFriendly}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t.safePaintFriendlyDesc}
              </p>
            </motion.div>

            {/* Card 3 — Mobile & In-Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="dark-card p-5"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="section-tag">DOWN2DETAIl</span>
                <div className="expand-btn">
                  <Truck size={14} className="text-white/40" />
                </div>
              </div>
              <h3 className="serif-heading text-xl text-white mb-2">
                {t.mobileInShop}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {t.mobileInShopDesc}
              </p>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-5">
            {[
              { num: "800+", label: t.carsDetailed },
              { num: "5★", label: t.averageRating },
              { num: "400+", label: t.happyClients },
              { num: "100%", label: t.satisfactionRate },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="dark-card p-5 flex flex-col items-center justify-center text-center"
              >
                <p className="text-primary text-2xl md:text-3xl font-bold mb-1">
                  {stat.num}
                </p>
                <p className="text-white/30 text-xs md:text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="pb-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-tag inline-block mb-4">
                  {t.testimonials}
                </span>
                <h2 className="serif-heading text-xl md:text-2xl lg:text-3xl text-white">
                  {t.whatOurClientsSay}
                </h2>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={prevTestimonials}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-white/5 backdrop-blur-md"
                title="Previous Testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonials}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-white/5 backdrop-blur-md"
                title="Next Testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {visibleTestimonials.map((t, i) => (
                <motion.div
                  key={`${t.name}-${currentTestimonialIndex}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="dark-card p-6 card-hover cursor-pointer hover:border-primary/50! flex flex-col h-full"
                  onClick={() => window.open(t.url, "_blank")}
                  title="Click to view full review on Google Maps"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-primary"
                        fill="#e95514"
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 bg-white/6 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-white/60 font-medium text-sm">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{t.name}</p>
                      <p className="text-text-muted text-xs">
                        {t.verifiedCustomer}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <FaGoogle size={22} className="text-white/20" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      {/* ── Item 6: tagline added as descriptor below the heading ── */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="serif-heading text-xl md:text-2xl lg:text-3xl mb-3">
                {t.bookYourPremiumToday}
              </h2>

              {/* ── Item 6 — evocative tagline below the CTA heading ── */}
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                {lang === "en"
                  ? "Book your service today and rediscover the look that made your dream car unforgettable."
                  : "Réservez votre service aujourd'hui et redécouvrez l'apparence qui a rendu votre voiture de rêve inoubliable."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/booking"
                  className="btn-filled"
                  onClick={() =>
                    pushToDataLayer({
                      event: "cta_click",
                      buttonText: tn.bookNow,
                      component: "HomeCTA",
                      pageLocation: location.pathname,
                    })
                  }
                >
                  {tn.bookNow}
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline"
                  onClick={() =>
                    pushToDataLayer({
                      event: "cta_click",
                      buttonText: th.contactUs,
                      component: "HomeCTA",
                      pageLocation: location.pathname,
                    })
                  }
                >
                  {th.contactUs}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={exteriorImg}
                  alt={t.premiumCarDetailing}
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
              {/* Floating detail card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -left-4 glass rounded-xl overflow-hidden w-36 h-36"
              >
                <img
                  src={interiorImg}
                  alt={t.interiorDetail}
                  className="w-full h-full object-cover"
                  style={{ border: "2px solid rgba(233, 85, 20, 0.3)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
