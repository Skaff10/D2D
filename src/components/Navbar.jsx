import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Globe } from "lucide-react";
import logo from "../assets/logo/logo.png";
import { useLang } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { lang, toggle } = useLang();
  const t = translations[lang].navbar;

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.services, path: "/services", end: true },
    { name: t.ceramicCoating, path: "/services/ceramic-coating" },
    { name: t.gallery, path: "/gallery" },
    { name: t.about, path: "/about" },
    { name: t.contact, path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-[1000] transition-all duration-500 ${
        scrolled ? "glass-navbar py-5" : "transparent py-5"
      }`}
    >
      <nav className=" mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src={logo}
            alt="Down2Detail Logo"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav — Centered pill style like reference */}
        <div className="hidden lg:flex items-center">
          <div
            className={`flex items-center gap-1 px-1.5 py-1 rounded-xl transition-all duration-300 ${
              scrolled
                ? "bg-white/[0.04] border border-white/[0.06]"
                : "bg-white/[0.03] border border-white/[0.05]"
            }`}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.end}
                className={({ isActive }) =>
                  `nav-pill ${isActive ? "active" : ""}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Desktop CTA — Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <Globe size={14} />
            <span>{lang === "en" ? "FR" : "EN"}</span>
          </button>
          <a
            href="tel:+14384838175"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <Phone size={14} />
            <span className="font-mono text-xs"></span>
          </a>
          <Link to="/booking" className="btn-outline text-sm">
            {t.bookNow}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggle}
            className="text-white/70 p-2 hover:text-white transition-colors border border-white/10 rounded-lg text-xs font-medium"
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white/70 p-2 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden glass-navbar"
          >
            <div className="px-4 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-3 px-4 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-white/50 hover:bg-white/[0.03] hover:text-white/80"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <div className="border-t border-white/[0.06] mt-2 pt-4 flex flex-col gap-3">
                <a
                  href="tel:+14384838175"
                  className="flex items-center gap-3 py-3 px-4 text-white/50 hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  <span className="font-mono text-sm">438-483-8175</span>
                </a>
                <Link to="/booking" className="btn-outline text-center py-3">
                  {t.bookNow}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
