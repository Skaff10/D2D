# 🚗 Down2Detail (D2D) — Premium Auto Detailing Platform

[![Website](https://img.shields.io/badge/Live_Site-down2detail.ca-e95514?style=for-the-badge&logo=google-chrome&logoColor=white)](https://down2detail.ca)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)](https://resend.com/)

> **Live Website:** [https://down2detail.ca](https://down2detail.ca)  
> **Location:** 4500 Bd Kimber Local 30, Saint-Hubert, QC J3Y 8K5 (Greater Montreal Area)  
> **Contact:** [+1 (438) 483-8175](tel:+14384838175) | [down2detail.ca@gmail.com](mailto:down2detail.ca@gmail.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo & Quick Links](#-live-demo--quick-links)
- [Key Features](#-key-features)
  - [Client-Facing Experience](#1-client-facing-experience)
  - [Administrative Suite](#2-administrative-suite)
  - [Cloud Automation & Instant Alerts](#3-cloud-automation--instant-alerts)
  - [SEO & Marketing Attribution](#4-seo--marketing-attribution)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Directory Structure](#-project-directory-structure)
- [Data Models & Collections](#-data-models--collections)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Cloud Functions Setup](#-cloud-functions-setup)
- [Build & Deployment](#-build--deployment)
- [Available Scripts](#-available-scripts)
- [Business & Location Details](#-business--location-details)
- [License](#-license)

---

## 🌟 Overview

**Down2Detail (D2D)** is a production-grade, bilingual web application and operations platform built for a premier automotive detailing studio based in **Saint-Hubert & Greater Montreal, Quebec**. 

The platform offers a luxury digital customer journey—featuring high-end visuals, interactive multi-step appointment bookings, live Firestore pricing synchronizations, and dynamic English/French localization. Behind the scenes, it powers studio operations through an authenticated admin portal, real-time marketing attribution tracking, automated Telegram alerts, and transactional email dispatches via Firebase Cloud Functions and Resend.

---

## 🔗 Live Demo & Quick Links

| Resource | URL |
| :--- | :--- |
| 🌐 **Production Website** | [https://down2detail.ca](https://down2detail.ca) |
| 📅 **Online Booking Engine** | [https://down2detail.ca/booking](https://down2detail.ca/booking) |
| 🛡️ **Paint Correction Landing** | [https://down2detail.ca/paint-correction](https://down2detail.ca/paint-correction) |
| 📍 **Google Maps Location** | [Google Maps — 4500 Bd Kimber Local 30](https://www.google.com/maps?cid=18264423434641924634) |
| 📸 **Instagram** | [@down2detail.ca](https://www.instagram.com/down2detail.ca/) |
| 📘 **Facebook** | [Down2Detail Studio](https://www.facebook.com/people/Down2Detail/61577327687487/) |

---

## ⚡ Key Features

### 1. Client-Facing Experience
* **Bilingual Localization (EN / FR):** Instant toggle between English and French with zero page reloads via `LanguageContext`, covering all site copy, service descriptions, packages, and booking forms.
* **Interactive Multi-Step Booking Wizard (`/booking`):**
  * Vehicle type and model selector (Sedan, Coupe, SUV, Truck, Van).
  * Service category selection: Detailing Packages, Paint Correction, Ceramic Coating, Maintenance, or Individual Add-ons.
  * Real-time pricing calculations pulled dynamically from Firestore (with hardcoded local fallbacks).
  * Date and time slot picker with customer contact information fields and special vehicle notes.
* **Rich Luxury Aesthetics:**
  * Custom dark-mode UI with signature brand orange accents (`#e95514`).
  * Parallax interactive wheel/rim background with mouse tracking (`RimBackground.jsx`).
  * Smooth entry and stagger animations powered by **Framer Motion**.
  * Hero typewriter highlighting studio specialties (`HeroTypewriter.jsx`).
* **Service Showcase & Dedicated Landers:**
  * Detailed service pages (`/services`, `/services/:serviceSlug`).
  * Tiered package comparisons (`/packages/detail`, `/packages/paint`, `/packages/monthly`).
  * High-converting standalone landing page for Paint Correction (`/paint-correction`).
* **Live Portfolio Gallery (`/gallery`):** Dynamic gallery pulling before/after transformations directly from Firebase Storage.

### 2. Administrative Suite (`/admin`)
* **Secure Firebase Authentication:** Protected routes (`ProtectedRoute.jsx`) safeguarding all administrative pages from unauthorized visitors.
* **Operations Dashboard (`/admin/dashboard`):** Real-time booking metrics, lead counters, and activity summaries.
* **Booking Management (`/admin/bookings`):** Interactive data grid to review appointments, inspect customer contact information, and update booking status (Pending, Confirmed, Completed, Cancelled).
* **Dynamic Pricing Engine (`/admin/pricing` & `/admin/services`):** Change base package prices or individual add-on service rates directly in Firestore without redeploying frontend code.
* **Gallery Asset Manager (`/admin/gallery`):** Upload new high-resolution transformation photos to Firebase Storage and toggle portfolio visibility in real time.
* **Lead Acquisition Analytics (`/admin/analytics`):** Visualize incoming lead sources, UTM referral campaigns, and conversion rates.

### 3. Cloud Automation & Instant Alerts
* **Serverless Event-Driven Pipeline:** Powered by **Firebase Cloud Functions (v2)** listening to the Firestore `bookings_v2` collection.
* **Transactional Emails via Resend:** Generates a structured HTML booking confirmation sent to the studio inbox (`down2detail.ca@gmail.com`) upon booking submission.
* **Instant Telegram Bot Dispatch:** Sends real-time push notifications to the detailer's mobile device via Telegram API with customer contact, date, vehicle, and package details.

### 4. SEO & Marketing Attribution
* **Comprehensive JSON-LD Schemas:** Google-compliant structured data schemas injected dynamically via `react-helmet-async`:
  * `LocalBusinessSchema` (AutomotiveBusiness, opening hours, coordinates, aggregate ratings).
  * `ServiceSchema` & `ServiceDetailSchema`.
  * `BreadcrumbSchema`, `FAQSchema`, and `ReviewSchema`.
* **UTM Attribution Capture:** `useUTMCapture` hook preserves campaign UTM query parameters (`utm_source`, `utm_medium`, `utm_campaign`) across user sessions in `sessionStorage` and attaches them to booking submissions.
* **Google Analytics 4 & GTM dataLayer:** Client-side route change tracking, virtual page views, and custom booking events pushed to `window.dataLayer`.

---

## 🛠️ Tech Stack & Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    Client Browser (React 19)                  │
│       Vite • Tailwind CSS v4 • Framer Motion • Router v7     │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
       Direct Reads / Writes           Session / SEO / Events
                │                               │
                ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────┐
│      Firebase Client SDK      │   │  GA4 / GTM / Helmet Async │
│   Firestore • Auth • Storage  │   │  JSON-LD Structured Data  │
└───────────────┬───────────────┘   └───────────────────────────┘
                │
         Document Created
        (bookings_v2 trigger)
                │
                ▼
┌───────────────────────────────────────────────────────────────┐
│              Firebase Cloud Functions v2 (Node.js)            │
│               Event-Driven Serverless Notification           │
└───────────────┬───────────────────────────────┬───────────────┘
                │                               │
                ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────┐
│          Resend API           │   │     Telegram Bot API      │
│  Transactional HTML Emails    │   │  Instant Mobile Alerts    │
└───────────────────────────────┘   └───────────────────────────┘
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/) |
| **Styling & Icons** | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/) |
| **Animation & Motion** | [Framer Motion](https://www.framer.com/motion/) |
| **Routing & Forms** | [React Router v7](https://reactrouter.com/), [React Hook Form](https://react-hook-form.com/) |
| **Notifications & UI** | [React Hot Toast](https://react-hot-toast.com/) |
| **Database & Auth** | [Google Firebase](https://firebase.google.com/) (Cloud Firestore, Authentication, Storage) |
| **Backend & Serverless** | [Firebase Cloud Functions v2](https://firebase.google.com/docs/functions) (Node.js) |
| **Messaging & Email** | [Resend API](https://resend.com/), [Telegram Bot API](https://core.telegram.org/bots/api) |
| **SEO & Analytics** | [React Helmet Async](https://github.com/staylor/react-helmet-async), [React GA4](https://github.com/PriceRunner/react-ga4), `dataLayer` |

---

## 📁 Project Directory Structure

```text
D2D/
├── .env                            # Client Firebase credentials & config
├── .firebaserc                     # Firebase active project aliases
├── firebase.json                   # Firebase Hosting rewrites & Functions configuration
├── index.html                      # HTML entry with Google Fonts & metadata
├── package.json                    # Workspace dependencies & build scripts
├── vite.config.js                  # Vite configuration with React & Tailwind v4 plugins
│
├── functions/                      # Firebase Cloud Functions (v2 backend)
│   ├── index.js                    # Firestore trigger: Resend email & Telegram alert
│   ├── package.json                # Functions runtime dependencies (axios, resend, firebase-admin)
│   └── .env                        # Local secrets configuration for cloud functions
│
├── public/                         # Public static assets
│   ├── newImages/                  # WebP optimized vehicle & detailing imagery
│   ├── d2d.svg                     # Brand vector logos & icons
│   ├── robots.txt                  # Search engine crawler permissions
│   └── sitemap.xml                 # XML Sitemap for search engines
│
├── scripts/
│   └── update_translations.mjs     # Synchronization script for i18n dictionaries
│
└── src/
    ├── main.jsx                    # React root entry, GA4 bootstrap
    ├── App.jsx                     # Router, layout wrappers, toaster & page trackers
    ├── index.css                   # Tailwind v4 import, custom animations & styles
    ├── translations.js             # Comprehensive English & French localization strings
    │
    ├── admin/                      # Protected Studio Administration Portal
    │   ├── AdminLayout.jsx         # Sidebar navigation layout for authenticated staff
    │   ├── AdminLogin.jsx          # Firebase Auth sign-in interface
    │   ├── AdminDashboard.jsx      # KPI summary cards and booking counts
    │   ├── AdminBookings.jsx       # Interactive appointment management table
    │   ├── AdminServices.jsx       # Custom add-on service pricing editor
    │   ├── AdminPricing.jsx        # Master package pricing overrides in Firestore
    │   ├── AdminGallery.jsx        # Live portfolio uploader & Firebase Storage sync
    │   └── AdminAnalytics.jsx      # Campaign acquisition & UTM lead dashboards
    │
    ├── components/                 # Reusable UI & Layout Components
    │   ├── Navbar.jsx              # Responsive header, language switch & pill nav
    │   ├── Footer.jsx              # Studio address, business hours & social links
    │   ├── RimBackground.jsx       # Mouse-reactive canvas parallax background
    │   ├── GA4Tracker.jsx          # Automatic route change analytics tracker
    │   ├── services/               # Reusable service display cards & pricing tables
    │   └── ui/                     # Primitives (ProtectedRoute, ScrollToTop, etc.)
    │
    ├── context/                    # React Context Providers
    │   ├── AuthContext.jsx         # Firebase user session & auth state provider
    │   └── LanguageContext.jsx     # Global i18n toggle provider ('en' | 'fr')
    │
    ├── data/                       # Fallback & Catalog Data Models
    │   ├── defaultPrices.js        # Hardcoded fallback prices (safeguard against network drops)
    │   └── servicesData.js         # Master services metadata, tiers & descriptions
    │
    ├── firebase/
    │   └── config.js               # Firebase Client initialization (Auth, Firestore, Storage)
    │
    ├── hooks/                      # Custom React Hooks
    │   ├── useServicePrices.js     # Fetches individual service rates from Firestore
    │   ├── usePackagePrices.js     # Fetches package pricing overrides from Firestore
    │   └── useUTMCapture.js        # Extracts & stores URL UTM parameters in sessionStorage
    │
    ├── pages/                      # Application Route Views
    │   ├── Home.jsx                # Landing page with video/hero, reviews & services
    │   ├── Services.jsx            # All detailing services catalog
    │   ├── ServiceDetailPage.jsx   # Dedicated service overview with FAQ & specs
    │   ├── Booking.jsx             # Multi-step customer booking wizard
    │   ├── PackagesOverview.jsx    # Overview of all available detailing packages
    │   ├── PackagesDetail.jsx      # Interior & exterior packages
    │   ├── PackagesPaint.jsx       # Paint correction & ceramic coating tiers
    │   ├── PackagesMonthly.jsx     # Recurring maintenance care memberships
    │   ├── PaintCorrectionLanding.jsx # High-converting campaign landing page
    │   ├── Gallery.jsx             # Transformation showcase
    │   ├── About.jsx               # Studio mission, equipment & story
    │   ├── Contact.jsx             # Direct inquiry form & Google Map integration
    │   └── NotFound.jsx            # Custom 404 error page
    │
    ├── seo/                        # Search Engine Optimization & JSON-LD
    │   ├── siteConfig.js           # Centralized business entity data & hours
    │   └── schemas/                # Google Structured Data Schema generators
    │
    └── utils/
        └── dataLayer.js            # Safe push helper for Google Tag Manager events
```

---

## 🗄️ Data Models & Collections

The application leverages **Cloud Firestore** for real-time document storage:

### `bookings_v2` (Lead & Appointment Submissions)
```typescript
interface BookingDocument {
  id?: string;
  customerName: string;
  phone: string;
  email: string;
  vehicleType: "sedan" | "coupe" | "suv" | "truck" | "van";
  vehicleModel: string;
  bookingType: "package" | "service";
  serviceName?: string;
  selectedPackage?: string;
  date: string;
  time: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Timestamp;
  // Marketing Attribution
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}
```

### `packages` & `service_prices` (Live Dynamic Pricing)
* Documents stored under `packages` override static pricing objects defined in `defaultPrices.js`.
* Individual service prices stored under `service_prices` allow instantaneous studio price changes without redeploying code.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.x or v20.x recommended)
* [npm](https://www.npmjs.com/) (v9+)
* [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skaff10/D2D.git
   cd D2D
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install cloud functions dependencies:**
   ```bash
   cd functions
   npm install
   cd ..
   ```

### Environment Variables

Create a `.env` file in the project root with your Firebase project credentials:

```ini
# Client Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=down-2-detail.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=down-2-detail
VITE_FIREBASE_STORAGE_BUCKET=down-2-detail.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_ga4_measurement_id
```

### Running Locally

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Cloud Functions Setup

The backend trigger in `functions/index.js` sends notifications using **Resend** and **Telegram**. Configure cloud secrets using the Firebase CLI:

```bash
# Login to Firebase
firebase login

# Set production secrets for Cloud Functions (v2)
firebase functions:secrets:set RESEND_API_KEY
firebase functions:secrets:set TELEGRAM_TOKEN
firebase functions:secrets:set TELEGRAM_CHAT_ID
```

To run functions locally using the Firebase emulator:

```bash
cd functions
npm run serve
```

---

## 📦 Build & Deployment

### 1. Build the Frontend
Compile and optimize client assets for production:

```bash
npm run build
```

This generates a minified, tree-shaken distribution in the `/dist` directory.

### 2. Preview the Production Build
Test the production bundle locally:

```bash
npm run preview
```

### 3. Deploy to Firebase
Deploy both Firebase Hosting and Cloud Functions:

```bash
# Deploy entire project (Hosting + Functions)
firebase deploy

# Or deploy Hosting only
firebase deploy --only hosting

# Or deploy Functions only
firebase deploy --only functions
```

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server on `localhost:5173` |
| `npm run build` | Compiles and bundles production-ready frontend code into `dist/` |
| `npm run preview` | Spins up a local web server to preview the production build |
| `npm run lint` | Runs ESLint 9 across the project to check for linting errors |
| `node scripts/update_translations.mjs` | Syncs and normalizes translation keys across language sets |

---

## 📍 Business & Location Details

* **Studio Name:** Down2Detail Premium Auto Detailing
* **Official URL:** [https://down2detail.ca](https://down2detail.ca)
* **Address:** 4500 Bd Kimber Local 30, Saint-Hubert, QC J3Y 8K5, Canada
* **Phone:** [+1 (438) 483-8175](tel:+14384838175)
* **Email:** [down2detail.ca@gmail.com](mailto:down2detail.ca@gmail.com)
* **Service Area:** Saint-Hubert, Longueuil, Brossard, Boucherville, Montreal & the Greater South Shore

---

## 📄 License

This repository and its codebase are private and proprietary to **Down2Detail**. All rights reserved. Unauthorized copying, modification, or redistribution is strictly prohibited.
