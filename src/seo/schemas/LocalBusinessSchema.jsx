import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";

/**
 * LocalBusinessSchema — injected on HomePage + ContactPage
 * Schema type: AutomotiveBusiness (subtype of LocalBusiness)
 * https://schema.org/AutomotiveBusiness
 */
const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": siteConfig.schemaType,
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.image,
    telephone: siteConfig.telephone,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingYear,
    priceRange: siteConfig.priceRange,
    currenciesAccepted: siteConfig.currenciesAccepted,
    paymentAccepted: siteConfig.paymentAccepted,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHours: siteConfig.openingHours,
    openingHoursSpecification: siteConfig.openingHoursSpecification,
    sameAs: siteConfig.sameAs,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.aggregateRating.ratingValue,
      reviewCount: siteConfig.aggregateRating.reviewCount,
      bestRating: siteConfig.aggregateRating.bestRating,
      worstRating: siteConfig.aggregateRating.worstRating,
    },
    hasMap: siteConfig.mapsUrl,
    areaServed: [
      {
        "@type": "City",
        name: "Saint-Hubert",
      },
      {
        "@type": "City",
        name: "Montreal",
      },
      {
        "@type": "State",
        name: "Greater Montreal Area",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
