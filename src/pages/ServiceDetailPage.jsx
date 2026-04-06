import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { categories, services } from "../data/servicesData";
import FAQAccordion from "../components/services/FAQAccordion";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import { CheckCircle2 } from "lucide-react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Shield } from "lucide-react";
export default function ServiceDetailPage() {
  const { lang } = useLang();
  const tGlobal = translations[lang];
  const t = tGlobal.serviceDetails;
  const { serviceSlug } = useParams();

  // Find the requested service
  const service = useMemo(() => {
    for (const cat of categories) {
      const found = services[cat.id]?.find((s) => s.id === serviceSlug);
      if (found) return found;
    }
    return null;
  }, [serviceSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceSlug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const isCeramicCoating = service.id === "ceramic-coating";

  const serviceTrans = tGlobal.servicesList[service.id] || {};
  const displayName = serviceTrans.name || service.name;
  const displayShortDesc =
    serviceTrans.shortDescription || service.shortDescription;
  const displayPrice =
    service.priceString === "Contact for Quote" ||
    service.priceString === "Contact for Pricing"
      ? tGlobal.contactForPricing
      : service.priceString;

  return (
    <>
      <Helmet>
        <title>{displayName} | Down2Detail Detailing</title>
        <meta name="description" content={displayShortDesc} />
      </Helmet>

      {/* ===== HERO SECTION ===== */}
      <section
        className={`pt-32 pb-16 relative ${isCeramicCoating ? "" : "page-gradient"}`}
      >
        {isCeramicCoating && (
          <>
            <div className="absolute inset-0 -z-20" />
            {/* Animated shimmer/glow for premium feel */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            {/* Second glow — bottom-right */}
            <div className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[450px] bg-amber-700/8 rounded-full blur-[120px] -z-10" />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`max-w-3xl ${isCeramicCoating ? "mx-auto text-center" : ""}`}
          >
            {isCeramicCoating ? (
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/25">
                  <Shield size={13} className="text-primary" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                    {t.premiumProtection}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-primary/40" />
                <span className="section-tag text-primary/80">
                  {service.category}
                </span>
                <div className="w-8 h-[1px] bg-primary/40" />
              </div>
            )}

            <h1
              className={`serif-heading ${isCeramicCoating ? "text-4xl sm:text-5xl lg:text-6xl text-white mb-6" : "text-3xl sm:text-4xl text-white mb-4"}`}
            >
              {displayName}
            </h1>

            <p
              className={`text-text-secondary ${isCeramicCoating ? "text-lg max-w-2xl mx-auto" : "text-base mb-6"} leading-relaxed`}
            >
              {displayShortDesc}
            </p>

            {!isCeramicCoating && (
              <div className="mt-4">
                <p className="price-mono text-primary text-xl font-medium">
                  {displayPrice}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== TWO-COLUMN IMAGE SECTION ===== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/3] bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center relative group"
            >
              <img
                src={service.pic1}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="aspect-[4/3] bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center relative group"
            >
              <img
                src={service.pic2}
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Col: Description & Features */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="serif-heading text-2xl text-white mb-6">
                  {t.overview}
                </h2>
                <p className="text-text-secondary text-base leading-relaxed mb-10 whitespace-pre-line">
                  {service.fullDescription}
                </p>

                {!isCeramicCoating && (
                  <>
                    <h3 className="serif-heading text-xl text-white mb-6">
                      {t.serviceFeatures}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                      {service.features?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            size={16}
                            className="text-primary/70 shrink-0 mt-0.5"
                          />
                          <span className="text-text-secondary text-sm leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    <h3 className="serif-heading text-xl text-white mb-6">
                      {t.theBenefits}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.included?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            size={16}
                            className="text-primary/70 shrink-0 mt-0.5"
                          />
                          <span className="text-text-secondary text-sm leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>

              {/* Ceramic Coating Specific Content */}
              {isCeramicCoating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-16"
                >
                  <h3 className="serif-heading text-xl text-white mb-6">
                    {t.isItWorthIt}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {service.worthIt.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/15 text-sm text-primary/90 font-medium"
                      >
                        <CheckCircle2 size={13} />
                        {item}
                      </span>
                    ))}
                  </div>

                  <h3 className="serif-heading text-xl text-white mb-6">
                    {t.canBeAppliedTo}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {service.surfaces.map((surface, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/70"
                      >
                        {surface}
                      </span>
                    ))}
                  </div>

                  {/* FAQ Section */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">
                      {t.faq}
                    </span>
                    <h4 className="serif-heading text-xl text-white">
                      {t.frequentlyAskedQuestions}
                    </h4>
                  </div>
                  <FAQAccordion items={service.faq} />
                </motion.div>
              )}
            </div>

            {/* Right Col: Pricing & CTA */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="dark-card p-6 sm:p-8 sticky top-24"
              >
                {!isCeramicCoating ? (
                  <>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-2">
                      {t.pricing}
                    </span>
                    <div className="mb-8">
                      {service.price && service.price.type === "tiered" ? (
                        <div className="space-y-3">
                          {service.price.tiers.map((tier, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center pb-3 border-b border-white/[0.05] last:border-0 last:pb-0"
                            >
                              <span className="text-white/70 text-sm">
                                {tier.label}
                              </span>
                              <span className="price-mono text-primary font-medium">
                                {tier.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-3xl text-white serif-heading">
                          {service.price?.amount || displayPrice}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                      {t.paintCoating}
                    </span>
                    <h4 className="serif-heading text-xl text-white mb-6">
                      {t.protectionLevels}
                    </h4>
                    <div className="space-y-3 mb-8">
                      {service.pricingTiers.map((tier, i) => (
                        <div
                          key={i}
                          className={`relative p-4 rounded-xl border transition-all duration-300 ${
                            i === 2
                              ? "bg-primary/[0.06] border-primary/20"
                              : "bg-white/[0.02] border-white/[0.06]"
                          }`}
                        >
                          {i === 2 && (
                            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-md bg-primary text-black text-[9px] font-mono font-bold uppercase tracking-wider">
                              {t.bestValue}
                            </span>
                          )}
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-white font-medium text-sm mb-0.5">
                                {tier.level}
                              </p>
                              <p className="text-white/40 text-xs">
                                {tier.durability}
                              </p>
                            </div>
                            <span className="price-mono text-primary text-base font-bold">
                              {tier.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                      {t.addOn}
                    </span>
                    <h4 className="serif-heading text-xl text-white mb-6">
                      {t.additionalSurfaces}
                    </h4>
                    <div className="space-y-3 mb-8">
                      {service.additionalSurfaces.map((item, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                        >
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <p className="text-white font-medium text-sm">
                              {item.surface}
                            </p>
                            <span className="price-mono text-primary text-sm font-semibold">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-white/35 text-xs">
                            {item.durability}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-3">
                  <Link
                    to={`/booking?service=${encodeURIComponent(service.name)}`}
                    className="btn-filled w-full justify-center"
                  >
                    {t.bookThisService}
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    to="/services"
                    className="flex justify-center items-center gap-2 text-white/50 hover:text-white/90 text-sm py-3 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    {t.backToServices}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
