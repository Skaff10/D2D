import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";
import { services } from "../../data/servicesData";

/**
 * ServiceSchema — injected on ServicesPage + HomePage
 * Dynamically built from src/data/servicesData.js.
 * Each service with a known price gets an Offer node.
 * https://schema.org/Service
 */
const ServiceSchema = () => {
  // Flatten all categories into a single array
  const allServices = Object.values(services).flat();

  const schemaItems = allServices.map((service) => {
    const serviceNode = {
      "@type": "Service",
      "@id": `${siteConfig.url}/services/${service.id}`,
      name: service.name,
      description: service.fullDescription || service.shortDescription,
      provider: {
        "@id": `${siteConfig.url}/#business`,
      },
      serviceType: service.category,
      areaServed: {
        "@type": "State",
        name: "Greater Montreal Area",
      },
      url: `${siteConfig.url}/services/${service.id}`,
    };

    // Attach Offer nodes only when price data exists
    if (service.price) {
      if (service.price.type === "flat") {
        serviceNode.offers = {
          "@type": "Offer",
          price: parseFloat(service.price.amount.replace(/[^0-9.]/g, "")),
          priceCurrency: "CAD",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/booking`,
        };
      } else if (service.price.type === "tiered" && service.price.tiers?.length) {
        // Use the lowest tier as the base price
        const lowestTier = service.price.tiers[0];
        serviceNode.offers = {
          "@type": "AggregateOffer",
          lowPrice: parseFloat(lowestTier.price.replace(/[^0-9.]/g, "")),
          highPrice: parseFloat(
            service.price.tiers[service.price.tiers.length - 1].price.replace(
              /[^0-9.]/g,
              ""
            )
          ),
          priceCurrency: "CAD",
          offerCount: service.price.tiers.length,
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/booking`,
        };
      }
    }

    // Ceramic coating has its own pricingTiers structure
    if (service.pricingTiers) {
      serviceNode.offers = {
        "@type": "AggregateOffer",
        lowPrice: parseFloat(service.pricingTiers[0].price.replace(/[^0-9.]/g, "")),
        highPrice: parseFloat(
          service.pricingTiers[service.pricingTiers.length - 1].price.replace(
            /[^0-9.]/g,
            ""
          )
        ),
        priceCurrency: "CAD",
        offerCount: service.pricingTiers.length,
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}/booking`,
      };
    }

    return serviceNode;
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": schemaItems,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
