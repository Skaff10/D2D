import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import ServiceCategoryTabs from "../components/services/ServiceCategoryTabs";
import ServiceCard from "../components/services/ServiceCard";
import { categories, services } from "../data/servicesData";







export default function Services() {
  const [activeCategory, setActiveCategory] = useState("exterior");
  const sectionsRef = useRef({});
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offset = 120;
          const top = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    const el = sectionsRef.current[categoryId];
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Track which index we're at globally across all categories for numbering
  let globalIndex = 0;
  const getCategoryOffset = (catId) => {
    let offset = 0;
    for (const cat of categories) {
      if (cat.id === catId) break;
      offset += services[cat.id].length;
    }
    return offset;
  };

  return (
    <>
      <Helmet>
        <title>
          Professional Detailing Services | Down2Detail — Montreal &
          Saint-Hubert
        </title>
        <meta
          name="description"
          content="Explore Down2Detail's full range of professional detailing services — exterior, interior, paint correction, ceramic coating, and more. Serving Montreal & Saint-Hubert. Book today!"
        />
      </Helmet>

      {/* ===== PAGE HERO ===== */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Our Services"
            title="Professional Detailing Services Tailored for Your Vehicle"
            description="From exterior washes to ceramic coatings — every service is performed with precision, premium products, and a genuine passion for perfection."
          />
        </div>
      </section>

      {/* ===== CATEGORY TABS ===== */}
      <section className="pt-8 pb-4  top-[72px] z-30 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServiceCategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </section>

      {/* ===== SERVICE SECTIONS ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = services[category.id];
            const offset = getCategoryOffset(category.id);

            return (
              <div
                key={category.id}
                ref={(el) => (sectionsRef.current[category.id] = el)}
                className="mb-20 last:mb-0 scroll-mt-48"
                id={`section-${category.id}`}
              >
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-[1px] bg-primary/40" />
                    <span className="section-tag text-primary/80">
                      {category.label}
                    </span>
                    <div className="flex-1 h-[1px] bg-white/[0.04]" />
                  </div>
                  <h2 className="serif-heading text-2xl sm:text-3xl text-white">
                    {category.label} Services
                  </h2>
                </motion.div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {categoryServices.map((service, i) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      index={offset + i}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag inline-block mb-4">
              Ready to Book?
            </span>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Contact us for a free consultation and we'll recommend the perfect
              service for your vehicle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/booking" className="btn-filled">
                Book a Service
                <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get a Free Quote
              </Link>
              <a href="tel:+14384838175" className="btn-outline">
                <Phone size={14} />
                438-483-8175
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
