import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowUp } from 'lucide-react'
import { FaInstagram, FaFacebookF } from 'react-icons/fa'
import logo from '../assets/imgi_1_d2dlogo.png'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Book Now', path: '/booking' },
]

const services = [
  { name: 'Exterior Detailing', path: '/services' },
  { name: 'Interior Detailing', path: '/services' },
  { name: 'Paint Correction', path: '/services' },
  { name: 'Ceramic Coating', path: '/services' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-surface border-t border-border-warm">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Logo & About */}
          <div className="space-y-5">
            <Link to="/" className="inline-block">
              <img src={logo} alt="Down2Detail Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Professional auto detailing services in Montreal & Saint-Hubert. We bring your car's shine back to life with premium products and expert care.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/down2detail.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-card-hover transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/people/Down2Detail/61577327687487/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-card rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-card-hover transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-text-secondary text-sm hover:text-primary transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-white mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+14384838175" className="flex items-start gap-3 text-text-secondary hover:text-primary transition-colors group">
                  <Phone size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm">+1 438 483 8175</span>
                </a>
              </li>
              <li>
                <a href="mailto:down2detail.ca@gmail.com" className="flex items-start gap-3 text-text-secondary hover:text-primary transition-colors group">
                  <Mail size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm">down2detail.ca@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-text-secondary">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                  <span className="text-sm">4500 Bd Kimber, Saint-Hubert, QC J3Y 8K5</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-text-secondary">
                  <Clock size={16} className="mt-0.5 shrink-0 text-primary" />
                  <div className="text-sm">
                    <p>Mon – Sun</p>
                    <p>8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Down2Detail. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-text-muted hover:text-primary text-xs transition-colors"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
