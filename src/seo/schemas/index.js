/**
 * src/seo/schemas/index.js
 * Central export barrel for all JSON-LD schema components.
 * Import from here instead of individual files for cleaner imports.
 *
 * Example:
 *   import { LocalBusinessSchema, WebSiteSchema } from '../seo/schemas';
 */

export { default as LocalBusinessSchema } from "./LocalBusinessSchema";
export { default as WebSiteSchema } from "./WebSiteSchema";
export { default as ServiceSchema } from "./ServiceSchema";
export { default as ServiceDetailSchema } from "./ServiceDetailSchema";
export { default as FAQSchema } from "./FAQSchema";
export { default as BreadcrumbSchema } from "./BreadcrumbSchema";
export { default as ReviewSchema } from "./ReviewSchema";
