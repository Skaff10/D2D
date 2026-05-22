import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";

/**
 * ServiceDetailSchema — injected on ServiceDetailPage (individual service routes)
 * Renders a focused Service + Offer schema for a single service.
 *
 * Usage:
 *   <ServiceDetailSchema service={serviceObject} />
 *
 * The `service` prop is the full service object from servicesData.js.
 * https://schema.org/Service
 */
const ServiceDetailSchema = ({ service }) => {
  if (!service) return null;

  const serviceNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/services/${service.id}`,
    name: service.name,
    description: service.fullDescription || service.shortDescription,
    provider: {
      "@type": siteConfig.schemaType,
      "@id": `${siteConfig.url}/#business`,
      name: siteConfig.name,
      telephone: siteConfig.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
    },
    serviceType: service.category,
    areaServed: {
      "@type": "State",
      name: "Greater Montreal Area",
    },
    url: `${siteConfig.url}/services/${service.id}`,
  };

  // Attach pricing
  if (service.price?.type === "flat") {
    serviceNode.offers = {
      "@type": "Offer",
      price: parseFloat(service.price.amount.replace(/[^0-9.]/g, "")),
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/booking`,
    };
  } else if (service.price?.type === "tiered" && service.price.tiers?.length) {
    serviceNode.offers = {
      "@type": "AggregateOffer",
      lowPrice: parseFloat(service.price.tiers[0].price.replace(/[^0-9.]/g, "")),
      highPrice: parseFloat(
        service.price.tiers[service.price.tiers.length - 1].price.replace(/[^0-9.]/g, "")
      ),
      priceCurrency: "CAD",
      offerCount: service.price.tiers.length,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/booking`,
    };
  } else if (service.pricingTiers?.length) {
    serviceNode.offers = {
      "@type": "AggregateOffer",
      lowPrice: parseFloat(service.pricingTiers[0].price.replace(/[^0-9.]/g, "")),
      highPrice: parseFloat(
        service.pricingTiers[service.pricingTiers.length - 1].price.replace(/[^0-9.]/g, "")
      ),
      priceCurrency: "CAD",
      offerCount: service.pricingTiers.length,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/booking`,
    };
  }

  // Attach FAQ if present (ceramic coating has faq array)
  if (service.faq?.length) {
    serviceNode.mainEntityOfPage = {
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(serviceNode)}</script>
    </Helmet>
  );
};

export default ServiceDetailSchema;
