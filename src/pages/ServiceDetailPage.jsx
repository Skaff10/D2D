import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { categories, services } from "../data/servicesData";
import FAQAccordion from "../components/services/FAQAccordion";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import { CheckCircle2 } from "lucide-react";
import { ArrowRight, ArrowLeft, AlertTriangle } from "lucide-react";
import { Shield } from "lucide-react";
import { useServicePrices } from "../hooks/useServicePrices";

// Curated related services map: serviceId -> [relatedId, relatedId, relatedId]
const relatedServicesMap = {
  "exterior-detailing": [
    "paint-decontamination",
    "engine-bay-detailing",
    "ceramic-coating",
  ],
  "paint-decontamination": ["ceramic-coating", "paint-sealant", "car-wax"],
  "engine-bay-detailing": [
    "exterior-detailing",
    "interior-detailing",
    "headlight-restoration",
  ],
  "headlight-restoration": [
    "headlight-taillight-tint",
    "exterior-detailing",
    "engine-bay-detailing",
  ],
  "headlight-taillight-tint": [
    "headlight-restoration",
    "exterior-detailing",
    "paint-decontamination",
  ],
  "interior-detailing": [
    "floor-carpet-shampoo",
    "fabric-seat-shampoo",
    "leather-seat-treatment",
  ],
  "floor-carpet-shampoo": [
    "interior-detailing",
    "fabric-seat-shampoo",
    "pet-hair-removal",
  ],
  "pet-hair-removal": [
    "interior-detailing",
    "floor-carpet-shampoo",
    "fabric-seat-shampoo",
  ],
  "fabric-seat-shampoo": [
    "interior-detailing",
    "pet-hair-removal",
    "leather-seat-treatment",
  ],
  "leather-seat-treatment": [
    "fabric-seat-shampoo",
    "floor-carpet-shampoo",
    "interior-detailing",
  ],
  "gloss-enhancer": ["one-step-polish", "two-step-polish", "three-step-polish"],
  "one-step-polish": [
    "two-step-polish",
    "three-step-polish",
    "ceramic-coating",
  ],
  "two-step-polish": [
    "one-step-polish",
    "three-step-polish",
    "ceramic-coating",
  ],
  "three-step-polish": [
    "one-step-polish",
    "two-step-polish",
    "ceramic-coating",
  ],
  "ceramic-coating": [
    "one-step-polish",
    "two-step-polish",
    "three-step-polish",
  ],
  "paint-sealant": ["paint-decontamination", "ceramic-coating", "car-wax"],
  "car-wax": ["paint-decontamination", "paint-sealant", "ceramic-coating"],
};

// Flat lookup: serviceId -> service object
function buildServiceLookup() {
  const lookup = {};
  for (const cat of categories) {
    for (const svc of services[cat.id] || []) {
      lookup[svc.id] = svc;
    }
  }
  return lookup;
}
const serviceLookup = buildServiceLookup();

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

  const { prices } = useServicePrices();
  const customPricing = service ? prices[service.id] : null;

  const isCeramicCoating = service.id === "ceramic-coating";

  const serviceTrans = tGlobal.servicesList[service.id] || {};
  const displayName = serviceTrans.name || service.name;
  const displayShortDesc =
    serviceTrans.shortDescription || service.shortDescription;
  const displayFullDesc =
    serviceTrans.fullDescription || service.fullDescription;
  const displayFeatures = serviceTrans.features || service.features;
  const displayIncluded = serviceTrans.included || service.included;

  // Ceramic Coating specific overrides
  const displayWorthIt = serviceTrans.worthIt || service.worthIt;
  const displaySurfaces = serviceTrans.surfaces || service.surfaces;
  const displayFaq = serviceTrans.faq || service.faq;
  const displayPricingTiers = serviceTrans.pricingTiers || service.pricingTiers;
  const displayAdditionalSurfaces =
    serviceTrans.additionalSurfaces || service.additionalSurfaces;

  const packageIncludedServices = [
    "paint-decontamination",
    "floor-carpet-shampoo",
    "pet-hair-removal",
    "fabric-seat-shampoo",
    "paint-sealant",
    "car-wax",
  ];
  const isPackageIncluded = packageIncludedServices.includes(service.id);

  let displayPrice =
    service.priceString === "Contact for Quote" ||
    service.priceString === "Contact for Pricing"
      ? tGlobal.contactForPricing
      : service.priceString;

  if (isPackageIncluded) {
    displayPrice =
      lang === "fr" ? "Inclus dans les forfaits" : "Included in Packages";
  } else if (customPricing) {
    if (typeof customPricing === "string") {
      displayPrice = customPricing;
    } else if (typeof customPricing === "object" && !isCeramicCoating) {
      const vals = Object.values(customPricing).filter(
        (v) => typeof v === "string" && v.match(/\d/),
      );
      if (vals.length > 0) {
        displayPrice = vals[0].toLowerCase().includes("starting")
          ? vals[0]
          : `Starting at ${vals[0]}`;
      }
    }
  }

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
                  {displayFullDesc}
                </p>

                {!isCeramicCoating && (
                  <>
                    <h3 className="serif-heading text-xl text-white mb-6">
                      {t.serviceFeatures}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                      {displayFeatures?.map((item, i) => (
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
                      {displayIncluded?.map((item, i) => (
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
                    {displayWorthIt?.map((item, i) => (
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
                    {displaySurfaces?.map((surface, i) => (
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
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/30 block mb-2">
                      {t.faq}
                    </span>
                    <h4 className="serif-heading text-xl text-white">
                      {t.frequentlyAskedQuestions}
                    </h4>
                  </div>
                  <FAQAccordion items={displayFaq || []} />

                  {/* Paint Decontamination Notice — Task 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mt-10 flex items-start gap-4 p-5 rounded-xl border border-amber-500/40 bg-amber-500/[0.07] backdrop-blur-sm"
                  >
                    <AlertTriangle
                      size={20}
                      className="text-amber-400 shrink-0 mt-0.5"
                    />
                    <p className="text-amber-200/90 text-sm leading-relaxed font-medium">
                      {t.ceramicCoatingNote}
                    </p>
                  </motion.div>
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
                      {service.price &&
                      service.price.type === "tiered" &&
                      !isPackageIncluded ? (
                        <div className="space-y-3">
                          {service.price.tiers.map((tier, idx) => {
                            const overriddenPrice =
                              customPricing && typeof customPricing === "object"
                                ? customPricing[tier.label]
                                : undefined;
                            return (
                              <div
                                key={idx}
                                className="flex justify-between items-center pb-3 border-b border-white/[0.05] last:border-0 last:pb-0"
                              >
                                <span className="text-white/70 text-sm">
                                  {tier.label}
                                </span>
                                <span className="price-mono text-primary font-medium">
                                  {overriddenPrice !== undefined
                                    ? overriddenPrice
                                    : tier.price}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="text-3xl text-white serif-heading">
                          {isPackageIncluded
                            ? displayPrice
                            : typeof customPricing === "string"
                              ? customPricing
                              : service.price?.amount || displayPrice}
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
                      {displayPricingTiers?.map((tier, i) => {
                        const key = `tier_${tier.level.replace(/\s+/g, "")}`;
                        const overriddenPrice =
                          customPricing && typeof customPricing === "object"
                            ? customPricing[key]
                            : undefined;
                        return (
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
                                {overriddenPrice !== undefined
                                  ? overriddenPrice
                                  : tier.price}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                      {t.addOn}
                    </span>
                    <h4 className="serif-heading text-xl text-white mb-6">
                      {t.additionalSurfaces}
                    </h4>
                    <div className="space-y-3 mb-8">
                      {displayAdditionalSurfaces?.map((item, i) => {
                        const key = `surface_${item.surface.replace(/\s+/g, "")}`;
                        const overriddenPrice =
                          customPricing && typeof customPricing === "object"
                            ? customPricing[key]
                            : undefined;
                        return (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                          >
                            <div className="flex items-center justify-between gap-4 mb-1">
                              <p className="text-white font-medium text-sm">
                                {item.surface}
                              </p>
                              <span className="price-mono text-primary text-sm font-semibold">
                                {overriddenPrice !== undefined
                                  ? overriddenPrice
                                  : item.price}
                              </span>
                            </div>
                            <p className="text-white/35 text-xs">
                              {item.durability}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-3">
                  <Link
                    to={
                      isPackageIncluded
                        ? "/packages"
                        : `/booking?service=${encodeURIComponent(service.name)}`
                    }
                    className="btn-filled w-full justify-center"
                  >
                    {isPackageIncluded
                      ? lang === "fr"
                        ? "Voir les forfaits"
                        : "View Packages"
                      : t.bookThisService}
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

      {/* ===== RELATED SERVICES SECTION — Task 1 ===== */}
      <section className="py-16 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-primary/40" />
              <span className="section-tag text-primary/80">Explore</span>
              <div className="w-8 h-[1px] bg-primary/40" />
            </div>
            <h2 className="serif-heading text-2xl sm:text-3xl text-white">
              {t.relatedServices}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(relatedServicesMap[service.id] || []).map((relId, idx) => {
              const relSvc = serviceLookup[relId];
              if (!relSvc) return null;
              const relTrans = tGlobal.servicesList[relId] || {};
              const relName = relTrans.name || relSvc.name;
              const relDesc =
                relTrans.shortDescription || relSvc.shortDescription;
              return (
                <motion.div
                  key={relId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Link
                    to={`/services/${relId}`}
                    className="block group dark-card overflow-hidden card-hover h-full"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={relSvc.cover_pic}
                        alt={relName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-primary/70 block mb-2">
                        {relSvc.category}
                      </span>
                      <h3 className="serif-heading text-lg text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {relName}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-4">
                        {relDesc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-primary text-[13px] font-medium">
                        {t.learnMore} <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
