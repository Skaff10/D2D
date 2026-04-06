import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";
import SectionHeading from "../components/ui/SectionHeading";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const { lang } = useLang();
  const t = translations[lang].contact;
  const f = translations[lang].footer;

  const contactInfo = [
    {
      icon: Phone,
      title: t.phone,
      value: "+1 438 483 8175",
      href: "tel:+14384838175",
      desc: f.callUsAnytime,
    },
    {
      icon: Mail,
      title: t.email,
      value: "down2detail.ca@gmail.com",
      href: "mailto:down2detail.ca@gmail.com",
      desc: f.weRespondWithin24h,
    },
    {
      icon: MapPin,
      title: t.location,
      value: "4500 Bd Kimber, Saint-Hubert, QC J3Y 8K5",
      href: "https://maps.google.com/?q=4500+Bd+Kimber+Saint-Hubert+QC+J3Y+8K5",
      desc: f.servingGreaterMontreal,
    },
    {
      icon: Clock,
      title: t.hours,
      value: "Mon – Sun: 8AM – 6PM",
      href: null,
      desc: f.open7Days,
    },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message sent! We'll get back to you shortly.");
      reset();
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Failed to send. Please call us at 438-483-8175.");
    }
  };

  const inputClasses =
    "w-full bg-[#161616] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white placeholder-white/20 text-sm transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/15";

  return (
    <>
      <Helmet>
        <title>
          Contact Down2Detail | Auto Detailing in Montreal & Saint-Hubert
        </title>
        <meta
          name="description"
          content="Contact Down2Detail for professional auto detailing in Montreal & Saint-Hubert. Call +1 438 483 8175 or email us. Open 7 days a week."
        />
      </Helmet>

      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle={t.getInTouch}
            title={t.contactUs}
            description={t.contactDescription}
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="dark-card p-5 text-center card-hover"
              >
                <div className="shield-badge mx-auto mb-3 w-11 h-11 rounded-xl">
                  <info.icon size={18} className="text-primary/60" />
                </div>
                <h3 className="serif-heading text-base text-white mb-1">
                  {info.title}
                </h3>
                {info.href ? (
                  <a
                    href={info.href}
                    target={info.title === "Location" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-primary/80 text-sm font-medium hover:text-primary transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-primary/80 text-sm font-medium">
                    {info.value}
                  </p>
                )}
                <p className="text-text-muted text-xs mt-1">{info.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form + Map Grid */}
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="shield-badge w-9 h-9 rounded-lg">
                  <MessageSquare size={15} className="text-primary/60" />
                </div>
                <h2 className="serif-heading text-2xl text-white">
                  {t.sendMessage}
                </h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-2 block">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      className={inputClasses}
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary mb-2 block">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      className={inputClasses}
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">
                    {t.email} *
                  </label>
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    className={inputClasses}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">
                    {t.message} *
                  </label>
                  <textarea
                    rows={5}
                    placeholder={t.messagePlaceholder}
                    className={`${inputClasses} resize-none`}
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-filled py-3.5 justify-center"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={14} />
                      {lang === 'fr' ? 'Envoyer' : 'Send Message'}
                    </>
                  )}
                </button>
              </form>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/[0.06]">
                <span className="section-tag block mb-3">{t.socialMedia} →</span>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/down2detail.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaInstagram size={16} />
                  </a>
                  <a
                    href="https://www.facebook.com/people/Down2Detail/61577327687487/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <FaFacebookF size={14} />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="h-full min-h-[400px]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="shield-badge w-9 h-9 rounded-lg">
                  <MapPin size={15} className="text-primary/60" />
                </div>
                <h2 className="serif-heading text-2xl text-white">{t.findUs}</h2>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-[calc(100%-3.5rem)]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.6157556086496!2d-73.444142!3d45.497681899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2756a366baaf79b5%3A0xfd7844584126e21a!2sDown2Detail%20Premium%20Auto%20Detailing!5e0!3m2!1sen!2sbd!4v1775407393365!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "invert(0.9) hue-rotate(180deg)",
                  }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Down2Detail location on Google Maps"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
