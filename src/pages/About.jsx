import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Shield,
  Sparkles,
  Heart,
  Award,
  Users,
  Car,
  Star,
  ArrowRight,
} from "lucide-react";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import SectionHeading from "../components/ui/SectionHeading";
import ceramicImg from "../assets/dk/down2detail.png";

export default function About() {
  const { lang } = useLang();
  const t = translations[lang].about;

  const values = [
    {
      icon: Shield,
      title: t.premiumProducts,
      desc: t.premiumProductsDesc,
    },
    {
      icon: Sparkles,
      title: t.attentionToDetail,
      desc: t.attentionToDetailDesc,
    },
    {
      icon: Heart,
      title: t.passionDriven,
      desc: t.passionDrivenDesc,
    },
    {
      icon: Award,
      title: t.satisfactionGuaranteed,
      desc: t.satisfactionGuaranteedDesc,
    },
  ];

  const stats = [
    { icon: Car, value: "3yrs", label: t.inBusiness },
    { icon: Star, value: "4.9", label: t.starRating },
    { icon: Users, value: "400+", label: t.happyClients },
    { icon: Award, value: "100%", label: t.satisfactionRate },
  ];

  return (
    <>
      <Helmet>
        <title>
          About Down2Detail | Auto Detailing in Montreal & Saint-Hubert
        </title>
        <meta
          name="description"
          content="Learn about Down2Detail — professional auto detailing experts in Montreal & Saint-Hubert, QC. Our story, values, and commitment to quality auto care."
        />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.aboutUs}
            title={t.ourStory}
            description={t.storyDescription}
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Decorative amber glow behind left column */}
              <div className="pointer-events-none absolute -inset-10 rounded-full bg-amber-700/10 blur-[80px] z-0" />
              <div className="relative z-10">
              <div className="rounded-2xl overflow-hidden ">
                  <img
                    src={ceramicImg}
                    alt="Down2Detail team at work"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 glass rounded-xl p-4 hidden md:block">
                  <p className="price-mono text-primary text-xl">1000+</p>
                  <p className="text-text-secondary text-xs mt-1">
                    {t.happyClients}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag block mb-4">{t.ourJourney}</span>
              <h2 className="serif-heading text-3xl md:text-4xl mb-6">
                {t.simpleToComprehensive.split("to")[0]} to{" "}
                <span className="serif-heading-italic">
                  {t.simpleToComprehensive.split("to")[1] ||
                    t.simpleToComprehensive}
                </span>
              </h2>
              <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>{t.journeyP1}</p>
                <p>{t.journeyP2}</p>
                <p>{t.journeyP3}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="shield-badge mx-auto mb-3 w-12 h-12 rounded-xl">
                  <stat.icon size={20} className="text-primary/60" />
                </div>
                <p className="price-mono text-2xl md:text-3xl text-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-text-secondary text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle={t.whyChooseUs} title={t.whatSetsUsApart} />

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="dark-card p-6 card-hover"
              >
                <div className="shield-badge mb-4 w-11 h-11 rounded-xl">
                  <val.icon size={18} className="text-primary/60" />
                </div>
                <h3 className="serif-heading text-xl text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="serif-heading text-3xl md:text-4xl mb-4">
              {t.readyToExperience}
            </h2>
            <p className="text-text-secondary text-base mb-8">{t.bookToday}</p>
            <div className="flex gap-3 justify-center">
              <Link to="/booking" className="btn-filled">
                {lang === "fr" ? "Réserver" : "Book Now"}
                <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline">
                {lang === "fr" ? "Contactez-nous" : "Contact Us"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
