import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";

/**
 * WebSiteSchema — injected on HomePage only
 * Includes SearchAction so Google may show a sitelinks search box.
 * https://schema.org/WebSite
 */
const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#business`,
    },
    inLanguage: ["en-CA", "fr-CA"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default WebSiteSchema;
