import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
import SectionHeading from "../components/ui/SectionHeading";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";

import heroImg from "../assets/dk/imgi_3_shutHero.jpg";
import ceramicImg from "../assets/dk/imgi_2_ceramiccoating.webp";
import interiorImg from "../assets/dk/imgi_4_Interior.png";
import exteriorImg from "../assets/dk/imgi_2_exterior2.jpg";
import paintImg from "../assets/dk/imgi_5_paint-correction.webp";
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

export default function Home() {
  const { lang } = useLang();
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
      price: lang === "en" ? "Package Pricing" : "Prix par forfait",
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

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize(); // Initial check
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
      <Helmet>
        <title>
          Premium Auto Detailing in Montreal & Saint-Hubert | Down2Detail
        </title>
        <meta
          name="description"
          content="Down2Detail offers professional auto detailing in Montreal & Saint-Hubert, QC. Paint correction, ceramic coating, interior & exterior detailing. Serving the Greater Montreal Area. Book today!"
        />
        <link rel="canonical" href="https://down2detail.ca/" />
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
            <span
              className="mb-4 block uppercase section-tag font-medium"
              style={{
                color: "#e46904ff",
                fontWeight: "bold",
                fontSize: "clamp(0.7rem, 2.5vw, 1rem)",
                textShadow: "0px 2px 12px rgba(10, 9, 9, 0.99)",
              }}
            >
              {th.tag}
            </span>

            <HeroTypewriter />

            <p
              className="mb-8"
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              {th.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link to="/booking" className="btn-filled_2">
                {th.bookUs}
              </Link>
              <Link to="/contact" className="btn-filled">
                {th.contactUs}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BRAND LOGOS ===== */}
      <section className="py-12  border-white/[0.04] overflow-hidden">
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

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.whatWeOffer}
            title={t.simpleToComprehensive}
            description={t.offerDescription}
          />

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
                  {/* Card header with gradient */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        
                        <p className="price-mono text-white text-lg mt-2">
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
            <Link to="/services" className="btn-outline">
              {t.viewAllServices}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 lg:py-15">
        <SectionHeading
          subtitle={t.whyDown2Detail}
          title={t.theD2Ddifference}
          description={t.dontCutCorners}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Bento-style layout */}
              <div className="space-y-4">
                <p className="text-text-secondary text-sm leading-relaxed">
                  To ensure your car looks stunning —{" "}
                  <span className="text-white font-medium">Down2Detail</span>
                </p>

                <div className="relative rounded-xl overflow-hidden img-zoom mt-4">
                  <img
                    src={beforeAfterImg}
                    alt="Down2Detail"
                    className="w-full h-[300px] object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                {lang === "en"
                  ? "Your Car Deserves More than an"
                  : "Votre voiture mérite plus qu'un lavage"}{" "}
                <span className="serif-heading-italic">
                  {lang === "en" ? "Ordinary Wash" : "Ordinaire"}
                </span>
              </h2>
              <div className="flex gap-3 mb-8">
                <Link to="/booking" className="btn-filled">
                  Book Now
                </Link>
                <Link to="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">
                {lang === "en"
                  ? "At Down2Detail, we believe auto detailing is an art, not just a service. Based in Saint-Hubert and serving the Greater Montreal Area, we combine premium products with meticulous hand techniques to deliver results that basic car washes simply can't match."
                  : "Chez Down2Detail, nous croyons que l'esthétique automobile est un art, pas seulement un service. Basés à Saint-Hubert et au service de la région du Grand Montréal, nous combinons des produits premium avec des techniques manuelles méticuleuses pour livrer des résultats que les lavages de voiture de base ne peuvent tout simplement pas égaler."}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 — Large left, row-span-2 */}
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
                <h3 className="serif-heading text-2xl text-white mb-3">
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

            {/* Card 3 — Mobile & In-Shop (replaces image) */}
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

            {/* Card 4 — On-Time + Satisfaction */}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-5">
            {[
              { num: "1000+", label: t.carsDetailed },
              { num: "4.9★", label: t.averageRating },
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
                <p className="text-primary text-3xl font-bold mb-1">
                  {stat.num}
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 lg:py-28">
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
                <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl text-white">
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
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-[#161616]"
                title="Previous Testimonials"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonials}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-[#161616]"
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
                  className="dark-card p-6 card-hover cursor-pointer hover:!border-primary/50 flex flex-col h-full"
                  onClick={() => window.open(t.url, "_blank")}
                  title="Click to view full review on Google Maps"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-primary"
                        fill="#f97316"
                      />
                    ))}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-9 h-9 bg-white/[0.06] rounded-full flex items-center justify-center shrink-0">
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
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="serif-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                {t.bookYourPremiumToday}
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/booking" className="btn-filled">
                  {tn.bookNow}
                </Link>
                <Link to="/contact" className="btn-outline">
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
                  style={{ border: "2px solid rgba(249, 115, 22, 0.3)" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}