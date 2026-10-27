# Project Codebase Sitemap & Developer Guide — Down2Detail (D2D)
Welcome to the Down2Detail (D2D) premium auto detailing web application codebase! This document serves as a comprehensive sitemap and architectural guide designed to help any incoming developer immediately understand, navigate, and modify the application.

---
## 🛠️ Technology Stack & Tech Choices
*   **Core Frontend:** React 19 + Vite + JavaScript (JSX).
*   **Styling:** Tailwind CSS v4 (configured via `@tailwindcss/vite`).
*   **Database & Auth:** Firebase (Firestore Database + Firebase Authentication + Firebase Storage).
*   **Backend Notifications:** Firebase Cloud Functions (v2) utilizing Resend API and Telegram Bot API.
*   **Routing:** React Router v7 (`react-router-dom`).
*   **SEO & Metadata:** React Helmet Async (`react-helmet-async`) and structured JSON-LD schemas.
*   **Analytics:** Google Analytics 4 (GA4) with custom client-side UTM capture and dataLayer tracking.

---
## 📁 Directory Structure & File Map
Here is the structural sitemap of the directory tree:
```
D2D/
├── .firebase/                  # Firebase CLI cache & local emulator config
├── functions/                  # Backend Firebase Cloud Functions
│   ├── index.js                # Send emails (Resend) and Telegram notices on bookings
│   ├── package.json            # Node dependencies for functions runtime
│   └── .env                    # Cloud functions secret environment variables
├── public/                     # Static files directly served
│   ├── newImages/              # High-quality optimized compressed service images
│   ├── d2d.svg                 # Business main logo variations
│   ├── robots.txt              # Search engine crawler policies
│   └── sitemap.xml             # Search engine XML sitemap
├── scripts/                    # Build and maintenance scripts
│   └── update_translations.mjs # Script to automatically synchronize translation keys
├── src/                        # React Frontend Source Code
│   ├── main.jsx                # App bootstrap entry point (GA4 initialization)
│   ├── App.jsx                 # Routing configuration & global layout wrapper
│   ├── index.css               # Styling entry point (Tailwind v4 imports + custom variables)
│   ├── translations.js         # Multi-language dictionary (EN / FR)
│   ├── admin/                  # Protected Admin Portal Pages
│   │   ├── AdminLayout.jsx     # Side-navigation layout for authenticated administrators
│   │   ├── AdminLogin.jsx      # Authentication form connected to Firebase Auth
│   │   ├── AdminDashboard.jsx  # Overview statistics and booking counters
│   │   ├── AdminBookings.jsx   # Interactive table showing bookings with status modifications
│   │   ├── AdminServices.jsx   # Interface to update individual service pricing in Firestore
│   │   ├── AdminPricing.jsx    # Override base package prices in Firestore
│   │   ├── AdminGallery.jsx    # Upload / delete photos directly in Firebase Storage
│   │   └── AdminAnalytics.jsx  # Analytics dashboards visualizing UTM campaigns and lead performance
│   ├── components/             # Reusable UI Components
│   │   ├── Navbar.jsx          # Header with desktop pill selector, language switcher, and mobile menu
│   │   ├── Footer.jsx          # Information block, Google Map link, and quick navigation cards
│   │   ├── RimBackground.jsx   # Immersive SVG interactive background with parallax mouse tracking
│   │   ├── GA4Tracker.jsx      # Listens to navigation to track analytics pageviews
│   │   ├── ui/                 # Basic UI component primitives
│   │   │   ├── ProtectedRoute.jsx  # Guards admin pages from unauthorized access
│   │   │   ├── ScrollToTop.jsx     # Instantly scrolls pages to top on route change
│   │   │   ├── SectionHeading.jsx  # Standardised section header layout
│   │   │   ├── HeroTypewriter.jsx  # Landing typewriter effect for services list
│   │   │   └── WhatsAppButton.jsx  # Direct customer support float button
│   │   └── services/           # Service page specialized presentation components
│   │       ├── ServiceCard.jsx     # Card rendering title, starting price, and CTA logic
│   │       ├── FAQAccordion.jsx    # Collapsible details questions/answers
│   │       ├── PricingDisplay.jsx  # Renders starting prices, tiered items or "Call for Quote"
│   │       └── ServiceCategoryTabs.jsx # Category selector tabs (Exterior, Interior, etc.)
│   ├── context/                # React Context State Providers
│   │   ├── AuthContext.jsx     # Handles Firebase user session, login, and logout state
│   │   └── LanguageContext.jsx # Handles application language state (Toggle between 'en' and 'fr')
│   ├── data/                   # Static Data Files
│   │   ├── defaultPrices.js    # Hardcoded fallback prices to prevent UI breakages
│   │   └── servicesData.js     # Master metadata object containing descriptions, highlights, and categories
│   ├── firebase/               # Firebase Client Configurations
│   │   └── config.js           # Initializes client connection to Firestore, Auth, and Storage
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useServicePrices.js # Fetches custom individual service prices from Firestore
│   │   ├── usePackagePrices.js # Fetches custom packages prices from Firestore with static fallbacks
│   │   └── useUTMCapture.js    # Captures search query UTM parameters to sessionStorage for booking leads
│   ├── lib/                    # Library Helper Integrations
│   │   └── galleryService.js   # Firestore & Firebase Storage helper actions for image administration
│   ├── seo/                    # Schema.org JSON-LD structured data generators
│   │   ├── siteConfig.js       # Central configuration variables of business locations, hours, and geo coordinates
│   │   └── schemas/            # Dynamic structured metadata components (Helmet injection)
│   │       ├── LocalBusinessSchema.jsx
│   │       ├── ServiceSchema.jsx
│   │       ├── ServiceDetailSchema.jsx
│   │       ├── BreadcrumbSchema.jsx
│   │       ├── FAQSchema.jsx
│   │       └── ReviewSchema.jsx
│   └── utils/                  # Miscellaneous utility files
│       └── dataLayer.js        # Formats and pushes interaction details into window.dataLayer for GTM
```

---

## 🔄 Core Architectural Flows

### 1. Multi-Language System (Localization)
All translation dictionaries reside inside [translations.js](D2D/src/translations.js). State is kept globally inside [LanguageContext.jsx](D2D/src/context/LanguageContext.jsx), allowing components to change language instantly using the `toggle()` call. Standard elements match paths (e.g. `translations[lang].navbar`), whereas services load localized strings from `translations[lang].servicesList[service.id]`.

### 2. Price Syncing: Firestore Overrides & Fallbacks
1. Package pricing relies on `usePackagePrices` which checks the Firestore `packages` collection. If offline or no Firestore override exists, it defaults gracefully to [defaultPrices.js](D2D/src/data/defaultPrices.js) to avoid rendering broken values or empty cards.
2. Individual services fetch from Firestore `service_prices` via `useServicePrices` hook.
3. Database overrides can be controlled directly inside the Admin portal under `AdminPricing` and `AdminServices`.

### 3. Booking & Lead Acquisition Pipeline
When a visitor arrives on the site:
1. **UTM Capture:** [useUTMCapture.js](D2D/src/hooks/useUTMCapture.js) runs. If UTM parameters exist in the URL (e.g. `?utm_source=instagram`), it extracts and stores them securely inside the visitor's `sessionStorage`.
2. **Booking Submission:** When filling out the multi-step booking wizard in [Booking.jsx](D2D/src/pages/Booking.jsx), the form maps values together with stored UTM attributes and posts a document to the `bookings_v2` collection in Firestore.
3. **Cloud Notifications:** A v2 Firestore Trigger Cloud Function (`sendBookingEmail` in `functions/index.js`) listens for new bookings, immediately formats the fields, sends a professional notification email to Down2Detail's main inbox via Resend, and hits a Telegram API bot endpoint to notify staff instantly on their mobile devices.

### 4. SEO & Schema Architecture
Search engine discovery is highly optimized. Every page implements schemas inside [src/seo/schemas/](D2D/src/seo/schemas/). Business identity constants are declared once in [siteConfig.js](D2D/src/seo/siteConfig.js) and dynamically injected into page layouts as Google-readable JSON-LD blocks using `<Helmet>`.
---
## 💡 Developer Guidelines for Modifying Code

*   **Purity & Order of React Hooks:** Ensure all hooks (`useState`, `useEffect`, `useMemo`) are called unconditionally at the very top of functional components. Never place hook declarations below an early `return` check.
*   **Asset management:** High-resolution pictures must be converted to modern `.webp` formats, compressed, and stored under `/public/newImages/` to maintain fast page speed and performance.
*   **Database Schema integrity:** Any changes to standard pricing or services must be validated against both Firestore configuration objects and default local data models so that rendering remains stable.
