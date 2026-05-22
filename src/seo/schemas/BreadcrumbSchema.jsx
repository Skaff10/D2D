import { Helmet } from "react-helmet-async";
import { siteConfig } from "../siteConfig";

/**
 * BreadcrumbSchema — injected on every page EXCEPT HomePage
 *
 * Usage:
 *   <BreadcrumbSchema
 *     crumbs={[
 *       { name: "Services", url: "/services" },
 *       { name: "Ceramic Coating", url: "/services/ceramic-coating" },
 *     ]}
 *   />
 *
 * If only one crumb is passed the list becomes: Home > PageName.
 * https://schema.org/BreadcrumbList
 */
const BreadcrumbSchema = ({ crumbs = [] }) => {
  // Always start with Home
  const fullCrumbs = [{ name: "Home", url: "" }, ...crumbs];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullCrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
