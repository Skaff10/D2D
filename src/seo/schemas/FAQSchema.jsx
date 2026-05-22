import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";
import { services } from "../../data/servicesData";

/**
 * FAQSchema — injected on ServicesPage (ceramic coating FAQ) + any page with FAQ content
 *
 * FAQ data is pulled directly from servicesData.js (ceramic-coating faq array).
 * Additional page-level FAQs can be passed via the `faqs` prop:
 *
 *   <FAQSchema faqs={[{ q: "...", a: "..." }]} />
 *
 * https://schema.org/FAQPage
 */

// Ceramic coating FAQ sourced from servicesData.js
const ceramicFaqs = services.protection.find((s) => s.id === "ceramic-coating")?.faq || [];

// General detailing FAQs (derived from service descriptions / site content)
const generalFaqs = [
  {
    q: "Where is Down2Detail located?",
    a: `We are located at ${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion} ${siteConfig.address.postalCode}. We also offer mobile detailing services throughout the Greater Montreal Area.`,
  },
  {
    q: "What are your hours of operation?",
    a: "We are open Monday through Sunday, 8:00 AM to 9:00 PM.",
  },
  {
    q: "How do I book an appointment?",
    a: `You can book online at ${siteConfig.url}/booking, call us at ${siteConfig.telephone}, or send us an email at ${siteConfig.email}.`,
  },
  {
    q: "What types of vehicles do you detail?",
    a: "We detail all vehicle types including sedans, coupes, crossovers, compact and mid-size SUVs, full-size SUVs, and pickup trucks. We have serviced luxury brands including Ferrari, Lamborghini, Porsche, Rolls Royce, Mercedes, BMW, and more.",
  },
  {
    q: "What is the difference between paint correction and a regular car wash?",
    a: "A regular car wash only cleans the surface. Paint correction is a multi-stage machine polishing process that removes up to 95% of paint defects such as swirl marks, scratches, and oxidation, restoring the paint to a showroom or better condition.",
  },
  {
    q: "How long does ceramic coating last?",
    a: "Our ceramic coating packages offer durability ranging from up to 1 year (Level 1 — $249.99) to up to 4–5 years or 75,000 km (Level 3 — $599.99).",
  },
];

const FAQSchema = ({ faqs = [] }) => {
  // Merge built-in FAQs with any page-specific ones passed as props
  const allFaqs = [...ceramicFaqs, ...generalFaqs, ...faqs];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default FAQSchema;
