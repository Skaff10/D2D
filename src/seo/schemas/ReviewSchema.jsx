import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";

/**
 * ReviewSchema — injected on HomePage
 * Reviews are sourced from the testimonials array in Home.jsx.
 * AggregateRating is sourced from siteConfig (4.9 / 400+ reviews).
 * https://schema.org/Review
 */

// Real customer reviews sourced from Home.jsx testimonials array
const reviews = [
  {
    name: "Sholmi Konfino",
    text: "I own a 2021 Ford F-150, and I decided to go ALL IN on a full detailing package at Down2Detail — paint correction, 5–7 year ceramic coating, full engine bay detailing, complete interior detailing with a 2-year ceramic protection on all plastics, fabric sealant on the seats, and a ceramic coating on the front windshield. Let me tell you… I was absolutely blown away.",
    rating: 5,
    url: "https://maps.app.goo.gl/bkxbKsKHSZyQBxr88",
  },
  {
    name: "Manouchka Guirand",
    text: "I had an incredible experience with DownToDetail! The service was not only fast but also extremely thorough. The ceramic coating on my car looks amazing, and I couldn't be more satisfied with the results. The customer service was outstanding; they truly went above and beyond.",
    rating: 5,
    url: "https://maps.app.goo.gl/VBdXNusJQgfbjkkD7",
  },
  {
    name: "Nathaniel Great",
    text: "My car looks brand new. Both inside and outside. Professional, thorough, and worth every penny. Best detailing service in Montreal.",
    rating: 5,
    url: "https://maps.app.goo.gl/Zk5RQmpWSHfyvh9x9",
  },
  {
    name: "Daksh Garg",
    text: "Got my 2025 F-150 ceramic coated and I couldn't be happier. The quality of work is top-notch, the attention to detail is insane, and the truck looks better than brand new. Super professional, no shortcuts, no nonsense.",
    rating: 5,
    url: "https://maps.app.goo.gl/VdA5XnKdNoCXVNY89",
  },
  {
    name: "Shaz Ali",
    text: "I had a first stage paint correction and a 4 year ceramic coating applied on my 2012 E92 335i xDrive, and the results were outstanding. The finish is incredibly glossy, smooth, and well-protected.",
    rating: 5,
    url: "https://maps.app.goo.gl/6oAsh95oLJdHh3jJ9",
  },
  {
    name: "Shahriar Mahmud",
    text: "Upon picking up my car, I was astonished! It felt as though I was receiving a brand-new Cayenne! The paint had an incredibly smooth finish.",
    rating: 5,
    url: "https://maps.app.goo.gl/kmBkL4QMCAhgHJCBA",
  },
];

const ReviewSchema = () => {
  const reviewNodes = reviews.map((r) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: r.name,
    },
    reviewBody: r.text,
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: "5",
      worstRating: "1",
    },
    url: r.url,
    publisher: {
      "@type": "Organization",
      name: "Google Maps",
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": siteConfig.schemaType,
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    review: reviewNodes,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ReviewSchema;
