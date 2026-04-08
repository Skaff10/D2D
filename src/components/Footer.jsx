import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../assets/logo/logo.png";
import { translations } from "../translations";

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.04]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left Column — Email & Social */}
          <div className="space-y-10">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <img src={logo} alt="Down2Detail Logo" className="h-10 w-auto" />
            </Link>

            {/* Email */}
            <div>
              <span className="section-tag block mb-3">{t.email} →</span>
              <a href="mailto:down2detail.ca@gmail.com" className="social-icon">
                <MdOutlineEmail size={18} />
              </a>
            </div>

            {/* Social Media */}
            <div>
              <span className="section-tag block mb-4">{t.socialMedia} →</span>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/down2detail.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://wa.me/14384838175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={18} />
                </a>
                <a
                  href="https://www.facebook.com/people/Down2Detail/61577327687487/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links Cards — like reference */}
            <div>
              <span className="section-tag block mb-4">{t.quickLink} →</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="footer-link-card">
                  <h4>{t.service}</h4>
                  <Link to="/services#section-exterior">
                    {t.exteriorServices}
                  </Link>
                  <Link to="/services#section-interior">
                    {t.interiorServices}
                  </Link>
                  <Link to="/services#section-paint-polish">
                    {t.paintServices}
                  </Link>
                  <Link to="/services#section-protection">
                    {t.protectionServices}
                  </Link>
                </div>
                <div className="footer-link-card">
                  <h4>{t.official}</h4>
                  <p>Saint-Hubert, QC</p>
                  <a href="tel:+14384838175">438-483-8175</a>
                  <p>08:00 - 18:00</p>
                </div>
                <div className="footer-link-card">
                  <h4>{t.booking}</h4>
                  <Link to="/booking">{t.seeSchedule}</Link>
                  <Link to="/about">{t.aboutUs}</Link>
                  <Link to="/contact">{t.contact}</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="section-tag block mb-4">
                {t.contact.toUpperCase()} →
              </span>
              <div className="space-y-5">
                <a
                  href="tel:+14384838175"
                  className="flex items-start gap-3 text-text-secondary hover:text-white transition-colors group"
                >
                  <div className="shield-badge mt-0.5">
                    <Phone
                      size={13}
                      className="text-white/40 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      +1 438 483 8175
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {t.callUsAnytime}
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:down2detail.ca@gmail.com"
                  className="flex items-start gap-3 text-text-secondary hover:text-white transition-colors group"
                >
                  <div className="shield-badge mt-0.5">
                    <Mail
                      size={13}
                      className="text-white/40 group-hover:text-primary transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      down2detail.ca@gmail.com
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {t.weRespondWithin24h}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-text-secondary">
                  <div className="shield-badge mt-0.5">
                    <MapPin size={13} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      4500 Bd Kimber, Saint-Hubert, QC J3Y 8K5
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {t.servingGreaterMontreal}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-text-secondary">
                  <div className="shield-badge mt-0.5">
                    <Clock size={13} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      Mon – Sun: 9AM – 9PM
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      {t.open7Days}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-white/5 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/20 backdrop-blur-md p-6 mt-6 rounded-2xl">
              <h3 className="serif-heading text-xl text-white mb-3 ">
                {t.readyToGetStarted}
              </h3>
              <p className="text-text-secondary text-sm mb-5">
                {t.bookYourPremium}
              </p>
              <div className="flex justify-end">
                <div className="flex gap-3">
                  <Link to="/booking" className="btn-filled text-sm">
                    {t.bookNow}
                  </Link>
                  <a href="tel:+14384838175" className="btn-outline text-sm">
                    {t.callUs}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono">
            © {new Date().getFullYear()} Down2Detail. {t.developedBy}{" "}
            <a href="https://www.instagram.com/skafff_10/">Skaf</a>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-white text-xs transition-colors font-mono"
          >
            {t.backToTop}
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
