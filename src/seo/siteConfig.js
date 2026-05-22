/**
 * Down2Detail — Central Site Configuration
 * All business data is sourced here and consumed by JSON-LD schema components.
 * Update this file whenever business details change.
 */

export const siteConfig = {
  // ── Business Identity ────────────────────────────────────────────────────
  name: "Down2Detail Premium Auto Detailing",
  legalName: "Down2Detail",
  description:
    "Professional auto detailing in Montreal & Saint-Hubert, QC. Paint correction, ceramic coating, interior & exterior packages. Serving Greater Montreal.",
  url: "https://down2detail.ca",
  logo: "https://down2detail.ca/logo.png",
  image: "https://down2detail.ca/og-image.jpg",
  foundingYear: "2019",

  // ── Contact ──────────────────────────────────────────────────────────────
  telephone: "+14384838175",
  email: "down2detail.ca@gmail.com",

  // ── Address ──────────────────────────────────────────────────────────────
  address: {
    streetAddress: "4500 Bd Kimber Local 30",
    addressLocality: "Saint-Hubert",
    addressRegion: "QC",
    postalCode: "J3Y 8K5",
    addressCountry: "CA",
  },

  // ── Geo Coordinates ──────────────────────────────────────────────────────
  geo: {
    latitude: 45.4977,
    longitude: -73.4441,
  },

  // ── Opening Hours ────────────────────────────────────────────────────────
  // Schema.org openingHoursSpecification format
  openingHours: "Mo-Su 08:00-21:00",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "21:00",
    },
  ],

  // ── Social Media ─────────────────────────────────────────────────────────
  sameAs: [
    "https://www.instagram.com/down2detail.ca/",
    "https://www.facebook.com/people/Down2Detail/61577327687487/",
  ],

  // ── Aggregate Rating (sourced from Home.jsx testimonials + About.jsx stats) ──
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "400",   // "400+ happy clients" from About.jsx stats
    bestRating: "5",
    worstRating: "1",
  },

  // ── Google Maps Place ID ─────────────────────────────────────────────────
  mapsUrl:
    "https://www.google.com/maps?cid=18264423434641924634",

  // ── Business Type ────────────────────────────────────────────────────────
  // https://schema.org/AutomotiveBusiness
  schemaType: "AutomotiveBusiness",

  // ── Price Range ──────────────────────────────────────────────────────────
  priceRange: "$$",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card",
};
