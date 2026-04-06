import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../assets/logo/logo.png";

export default function Footer() {
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
              <span className="section-tag block mb-3">EMAIL →</span>
              <a href="mailto:down2detail.ca@gmail.com" className="social-icon">
                <MdOutlineEmail size={18} />
              </a>
            </div>

            {/* Social Media */}
            <div>
              <span className="section-tag block mb-4">SOCIAL MEDIA →</span>
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
              <span className="section-tag block mb-4">QUICK LINK →</span>
              <div className="grid grid-cols-3 gap-3">
                <div className="footer-link-card">
                  <h4>Service</h4>
                  <Link to="/services#section-exterior">Exterior Services</Link>
                  <Link to="/services#section-interior">Interior Services</Link>
                  <Link to="/services#section-paint-polish">
                    Paint Services
                  </Link>
                  <Link to="/services#section-protection">
                    Protection Services
                  </Link>
                </div>
                <div className="footer-link-card">
                  <h4>Official</h4>
                  <p>Saint-Hubert, QC</p>
                  <a href="tel:+14384838175">438-483-8175</a>
                  <p>08:00 - 18:00</p>
                </div>
                <div className="footer-link-card">
                  <h4>Booking</h4>
                  <Link to="/booking">See Schedule</Link>
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Info */}
          <div className="space-y-8">
            <div>
              <span className="section-tag block mb-4">CONTACT →</span>
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
                      Call us anytime during business hours
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
                      We respond within 24 hours
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
                      Serving Greater Montreal Area
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-text-secondary">
                  <div className="shield-badge mt-0.5">
                    <Clock size={13} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      Mon – Sun: 8AM – 6PM
                    </p>
                    <p className="text-text-muted text-xs mt-0.5">
                      Open 7 days a week
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="dark-card p-6 mt-6">
              <h3 className="serif-heading text-xl text-white mb-3">
                Ready to get started?
              </h3>
              <p className="text-text-secondary text-sm mb-5">
                Book your premium car detailing appointment today.
              </p>
              <div className="flex gap-3">
                <Link to="/booking" className="btn-filled text-sm">
                  Book Now
                </Link>
                <a href="tel:+14384838175" className="btn-outline text-sm">
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs font-mono">
            © {new Date().getFullYear()} Down2Detail. Developed by{" "}
            <a href="https://www.instagram.com/skafff_10/">Skaf</a>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-white text-xs transition-colors font-mono"
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
