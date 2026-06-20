import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FaCheckCircle } from "react-icons/fa";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import RimBackground from "../components/RimBackground";
import Footer from "../components/Footer";
import d1 from "../assets/bv/d1.png";
import d3 from "../assets/bv/d2.png";
import d4 from "../assets/bv/d3.png";
import d6 from "../assets/bv/d4.png";
import d5 from "../assets/bv/d5.png";
import d2 from "../assets/bv/d6.png";
import beforeImg from "../assets/bv/before.png";
import afterImg from "../assets/bv/after.png";

// You can swap this with a real image path from your assets later.
import paintCorrectionImage from "../assets/images/services/Paint Polish Services.webp";

// Testimonials data (copied from Home.jsx for standalone use)
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
];

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove],
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove],
  );

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleTouchEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, onMouseMove, onTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-2xl select-none group touch-none"
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After"
        className="w-full h-auto block pointer-events-none"
      />
      <div className="absolute top-4 right-4 z-10 bg-orange-500 text-white font-bold text-sm px-3 py-1 rounded shadow-md">
        {afterLabel}
      </div>

      {/* Before Image (Foreground/Clipped) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden z-20"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="absolute top-0 left-0 h-full max-w-none pointer-events-none"
          style={{ width: containerWidth > 0 ? `${containerWidth}px` : "100%" }}
        />
        <div className="absolute top-4 left-4 z-10 bg-orange-500 text-white font-bold text-sm px-3 py-1 rounded shadow-md">
          {beforeLabel}
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white z-30 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
          <ChevronLeft size={20} className="text-black -mr-1" />
          <ChevronRight size={20} className="text-black -ml-1" />
        </div>
      </div>
    </div>
  );
};

export default function PaintCorrectionLanding() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [showStickyButtons, setShowStickyButtons] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 300px
      if (window.scrollY > 300) {
        setShowStickyButtons(true);
      } else {
        setShowStickyButtons(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const levels = [
    "Gloss Enhancement",
    "One Step Polish",
    "Two Step Paint Correction",
    "Three Step Paint Correction",
    "Ceramic Coating (1 Year)",
  ];

  const benefits = [
    "Restore gloss & remove swirl marks",
    "Remove light to heavy scratches",
    "Multi-stage paint correction options",
    "Professional ceramic coating protection",
    "Hydrophobic water-repellent finish",
    "Long-term paint protection",
    "Boost resale value & showroom shine",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white ">
      <Helmet>
        <title>Paint Correction & Protection | Down2Detail</title>
        <meta
          name="description"
          content="Restore your vehicle and protect it for years with our Paint Correction & Ceramic Coating packages."
        />
      </Helmet>

      <RimBackground />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group mt-4">
          <img
            src="/d2d2.svg"
            alt="Down2Detail Logo"
            className="h-12 lg:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </nav>

      <div className="relative z-10">
        {/* 
          SECTION 1 & 2 CONTAINER
        */}
        <div className="pt-8 pb-12 lg:pt-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
          {/* SECTION 1 - Hero */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-6 "
            >
              <motion.h1
                variants={fadeInUp}
                className="serif-heading text-4xl sm:text-5xl lg:text-5xl text-center"
              >
                Paint Correction &amp; <br className="hidden lg:block" />
                <span className="text-primary serif-heading-italic">
                  Ceramic Coating
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="hidden lg:block text-text-secondary text-lg leading-relaxed max-w-xl text-center"
              >
                This summer, give your ride a fresh start. Whether you're
                looking for extra gloss or full paint correction, our Paint
                Correction & Ceramic Coating package is designed to restore your
                vehicle and protect it for years.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full max-w-md mx-auto lg:ml-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="dark-card p-8 relative overflow-hidden group glow-orange"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r " />

                <div className="flex flex-col items-center text-center gap-6 relative z-10">
                  <div className="bg-primary text-black font-bold text-xs sm:text-sm tracking-widest uppercase py-1.5 px-4 rounded-full">
                    Limited Time Offer!
                  </div>

                  <div>
                    <p className="text-text-secondary text-sm uppercase tracking-widest mb-1">
                      Starting From
                    </p>
                    <p className="text-5xl font-bold tracking-tight text-white drop-shadow-md">
                      Only At{" "}
                      <span className="text-primary price-mono">$349</span>
                    </p>
                  </div>

                  <Link
                    to="/booking?package=Paint+Correction+%26+Protection"
                    className="w-full block"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-filled w-full text-center py-4"
                    >
                      BOOK NOW TO GET A FREE INSPECTION
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile view only paragraph, displayed under CTA */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="block lg:hidden text-text-secondary text-lg leading-relaxed max-w-xl text-center mx-auto"
            >
              This summer, give your ride a fresh start. Whether you're
              looking for extra gloss or full paint correction, our Paint
              Correction & Ceramic Coating package is designed to restore your
              vehicle and protect it for years.
            </motion.p>
          </div>

          {/* SECTION 2 - Image / Levels */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full h-[360px] lg:h-[550px] relative rounded-2xl overflow-hidden group img-zoom"
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 rounded-2xl transition-opacity group-hover:opacity-0" />
              <img
                src={paintCorrectionImage}
                alt="Paint Correction Before & After"
                className="w-full h-full object-r rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.1)] border border-white/5"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <div>
                {/* <span className="section-tag mb-2 block text-primary">
                  CORRECTION LEVELS
                </span> */}
                <h2 className="serif-heading text-3xl sm:text-4xl text-center">
                  Service Features
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                {levels.map((level, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInLeft}
                    className="flex items-center gap-4 py-4 px-6 dark-card hover:border-l-primary border-l-[3px] border-l-transparent"
                    style={{ marginLeft: `8px` }}
                  >
                    <div className="text-text-muted font-mono text-sm w-6">
                      0{i + 1}
                    </div>
                    <div className="text-white/90 font-medium sm:text-lg">
                      {level}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 3 - Overview + Reviews */}
        <div className="py-10 lg:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-7xl mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="serif-heading text-3xl sm:text-4xl mb-6 text-center"
              >
                Overview
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-text-secondary text-lg leading-relaxed text-center"
              >
                Our superior level of paint correction and finishing, designed
                specifically for the most discerning owners, this 3-stage
                process is for vehicles with heavy scratches, deep swirl marks,
                and severe oxidation. We push the limits of your clear coat to
                achieve the absolute maximum level of restoration possible A
                liquid polymer made from nanotechnology-based SiO₂ (silicon
                dioxide). Once cured, it chemically bonds to the factory paint,
                creating a hydrophobic, slick, and ultra-durable shield. Unlike
                traditional waxes or sealants, it provides long-lasting
                protection that repels dirt, water, road grime, bird droppings,
                bug splatter, and more.
              </motion.p>
            </motion.div>
            <div className="py-10 lg:py-5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.h2
                    variants={fadeInUp}
                    className="serif-heading text-3xl sm:text-4xl mb-12 text-center"
                  >
                    The Benefits
                  </motion.h2>

                  <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="dark-card p-5 flex items-start gap-4"
                      >
                        <FaCheckCircle
                          className="text-primary shrink-0 mt-1"
                          size={20}
                        />
                        <span className="text-white/80 leading-relaxed">
                          {benefit}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION - Before/After Slider */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="section-tag mb-4 block text-primary text-center">
                TRANSFORMATIONS
              </span>
              <h2 className="serif-heading text-3xl md:text-4xl text-white text-center mb-4">
                See The Difference We Make
              </h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Every detail matters. Swipe to see the real transformation our
                team delivers on every vehicle we touch.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BeforeAfterSlider
                beforeImage={beforeImg}
                afterImage={afterImg}
              />
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              A Few Photos of The Cars We've Worked On
            </h2>
            <div className="w-10 h-0.5 bg-white/30 mx-auto mt-3" />
          </div>

          {/* Desktop: 3-column masonry-style */}
          <div
            className="hidden sm:block"
            style={{
              columns: 3,
              columnGap: "10px",
              maxWidth: "1100px",
              margin: "0 auto",
            }}
          >
            {[d1, d5, d3, d2, d4, d6].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Car ${i + 1}`}
                className="w-full mb-2 object-cover"
              />
            ))}
          </div>

          {/* Mobile: 2-column masonry-style */}
          <div
            className="sm:hidden"
            style={{ columns: 2, columnGap: "8px", maxWidth: "100%" }}
          >
            {[d1, d5, d3, d2, d4, d6].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Car ${i + 1}`}
                className="w-full mb-2 object-cover"
              />
            ))}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-tag mb-4 block text-primary text-center">
                  TESTIMONIALS
                </span>
                <h3 className="serif-heading text-3xl md:text-4xl text-white text-center">
                  What Our Clients Say
                </h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 justify-center md:justify-end mt-6"
              >
                <button
                  onClick={prevTestimonials}
                  className="w-12 cursor-pointer  h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-white/5 backdrop-blur-md"
                  title="Previous Testimonials"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonials}
                  className="w-12  cursor-pointer h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors bg-white/5 backdrop-blur-md"
                  title="Next Testimonials"
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            </div>{" "}
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {visibleTestimonials.map((t, i) => (
                  <motion.div
                    key={`${t.name}-${currentTestimonialIndex}-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="dark-card card-hover p-8 cursor-pointer flex flex-col h-full"
                    onClick={() => window.open(t.url, "_blank")}
                    title="Click to view full review on Google Maps"
                  >
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          size={16}
                          className="text-primary"
                          fill="#f97316"
                        />
                      ))}
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-8 italic flex-grow">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-10 h-10 bg-white/6 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-white/60 font-medium text-sm">
                          {t.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white/90 font-medium text-sm">
                          {t.name}
                        </p>
                        <p className="text-text-muted text-xs">
                          Verified Customer
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
        </div>
        <section className="pb-20 sm:pb-5 pt-10 mt-10">
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
                  Ready to book?
                </h2>
                <p className="text-neutral-400 mb-8 relative z-10">
                  Contact us to schedule your paint correction
                </p>
                <Link
                  to="/booking?package=Paint+Correction+%26+Protection"
                  className="btn-filled relative z-10"
                >
                  Book This Package
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Sticky Bottom Buttons */}
        <AnimatePresence>
          {showStickyButtons && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex gap-4 items-center justify-center w-full h-18 glass-navbar px-4"
            >
              <a
                href="tel:+14384838175"
                className="py-3 px-6 w-1/2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white font-medium text-center hover:border-primary hover:text-primary transition-colors shadow-lg"
              >
                Call Now
              </a>
              <Link
                to="/booking?package=Paint+Correction+%26+Protection"
                className="py-3 px-6 w-1/2 rounded-xl border border-white/10 bg-white backdrop-blur-md text-black font-medium text-center hover:border-primary hover:text-primary transition-colors shadow-lg"
              >
                Book Now
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
