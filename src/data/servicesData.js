// All service data for Down2Detail services page
// Categories: Exterior, Interior, Paint Polish, Protection
import ceramic_cover from "../assets/dk/imgi_2_ceramiccoating.webp";
import ceramic1 from "../assets/dk/imgi_2_ceramiccoating.webp";
import ceramic2 from "../assets/dk/imgi_3_beforeaftercoating.webp";

import exterior_cover from "../assets/images/services/Exterior Detailing.avif";
import exterior1 from "../assets/dk/imgi_2_exterior2.jpg";
import exterior2 from "../assets/images/services/Exterior Detailing.avif";

import paintdec_cover from "../assets/images/services/Paint Decontamination.webp";
import paintdec1 from "../assets/dk/img32.jpg";
import paintdec2 from "../assets/images/services/Paint Decontamination.webp";

import enginebay_cover from "../assets/images/services/engine bay detail.jpg";
import enginebay1 from "../assets/dk/engine2.jpg";
import enginebay2 from "../assets/images/services/engine bay detail.jpg";

import head_cover from "../assets/images/services/headlight-restoration.webp";
import head1 from "../assets/dk/imgi_2_headlight-Restoration.png";
import head2 from "../assets/images/services/headlight-restoration.webp";

import tail_cover from "../assets/dk/imgi_2_headlight-Restoration.png";
import tail1 from "../assets/images/services/headlight tint.jpg";
import tail2 from "../assets/dk/imgi_2_headlight-Restoration.png";

import interior_cover from "../assets/images/services/Interior.avif";
import interior1 from "../assets/dk/imgi_4_Interior.png";
import interior2 from "../assets/images/services/Interior.avif";

import leather_cover from "../assets/images/services/leather seat treatment.webp";
import leather1 from "../assets/images/services/leather seat treatment.webp";
import leather2 from "../assets/images/services/seat shampoo.png";

import fabric_cover from "../assets/images/services/seat shampoo.png";
import fabric1 from "../assets/images/services/leather seat treatment.webp";
import fabric2 from "../assets/images/services/seat shampoo.png";

import pet_cover from "../assets/dk/pet1.jpg";
import pet1 from "../assets/images/services/pet1.jpg";
import pet2 from "../assets/images/services/pet2.jpg";

import floor_cover from "../assets/images/services/floor shampoo.jpg";
import floor1 from "../assets/dk/floor1.jpg";
import floor2 from "../assets/images/services/floor shampoo.jpg";

import glass_cover from "../assets/images/services/gloss enhancer.jpg";
import glass1 from "../assets/dk/gloss2.jpg";
import glass2 from "../assets/images/services/gloss enhancer.jpg";

import onestep_cover from "../assets/images/services/Single Stage Paint Correction.jpg";
import onestep1 from "../assets/dk/onestep1.jpg";
import onestep2 from "../assets/images/services/Single Stage Paint Correction.jpg";

import twostep_cover from "../assets/dk/twostepcover.jpg";
import twostep1 from "../assets/dk/twostep1.avif";
import twostep2 from "../assets/dk/twostepcover.jpg";

import threestep_cover from "../assets/dk/threestepcover.jpg";
import threestep1 from "../assets/dk/threestep1.webp";
import threestep2 from "../assets/dk/threestep2.jpg";

import sealant_cover from "../assets/dk/sealant.jpg";
import sealant1 from "../assets/dk/sealant1.jpg";
import sealant2 from "../assets/dk/sealant.jpg";

import wax_cover from "../assets/dk/carwax.webp";
import wax1 from "../assets/dk/carwax1.jpg";
import wax2 from "../assets/dk/carwax2.webp";

export const categories = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "paint-polish", label: "Paint Polish" },
  { id: "protection", label: "Protection" },
];

export const services = {
  exterior: [
    {
      id: "exterior-detailing",
      category: "Exterior",
      name: "Exterior Detailing",
      shortDescription:
        "Basic car washes use dirty sponges, harsh chemicals, or automated brushes that leave swirl marks and scratches.",
      fullDescription:
        "Basic car washes use dirty sponges, harsh chemicals, or automated brushes that leave swirl marks and scratches. Our service safely cleans every part of your car's exterior using pH-neutral products and precise hand techniques.",
      features: [
        "Wheels & tires deep cleaned with pH-balanced wheel cleaner",
        "Pre-rinse & snow foam application",
        "Detailed brush cleaning (grille, emblems, trim, fuel cap)",
        "Door jamb cleaning",
        "Contact Wash (two-bucket method) with pH-neutral shampoo",
        "Paint decontamination (iron remover + clay bar/mitt)",
        "Air blow & microfiber towel drying",
        "Tire dressing",
        "Glass cleaning",
        "Final quality check",
      ],
      priceString: "Contact for Quote",
      price: null, // Call for price
      whyUs:
        "Basic car washes use dirty sponges, harsh chemicals, or automated brushes that leave swirl marks and scratches. Our service safely cleans every part of your car's exterior using pH-neutral products and precise hand techniques.",

      cover_pic: exterior_cover,
      pic1: exterior1,
      pic2: exterior2,
      included: [
        "Improves exterior appearance",
        "Prevents swirl marks & micro-scratches",
        "Safe for ceramic-coated, waxed & sealed vehicles",
        "Cleans areas basic washes miss",
        "Prepares vehicle for protection or polishing",
        "Maintains paint health & long-term shine",
        "100% pH-neutral & coating-safe",
        "Boosts resale value",
      ],
    },
    {
      id: "paint-decontamination",
      category: "Exterior",
      name: "Paint Decontamination",
      shortDescription:
        "Even after a proper wash, paint can feel rough due to microscopic contaminants.",
      fullDescription:
        "Even after a proper wash, paint can feel rough due to microscopic contaminants like brake dust, industrial fallout, road tar, and tree sap that embed into paint over time.",
      features: [
        "Iron Remover (chemical decontamination)",
        "Tar Remover (spot cleaning)",
        "Clay Bar/Mitt Treatment (mechanical decontamination)",
        "Final quality check",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Even after a proper wash, paint can feel rough due to microscopic contaminants like brake dust, industrial fallout, road tar, and tree sap that embed into paint over time.",

      cover_pic: paintdec_cover,
      pic1: paintdec1,
      pic2: paintdec2,
      included: [
        "Improves exterior appearance",
        "Restores paint smoothness",
        "Enhances gloss & clarity",
        "Prepares surface for ceramic coating or wax",
        "Extends life of paint protection",
        "Helps prevent long-term damage",
        "Boosts resale value",
      ],
    },
    {
      id: "engine-bay-detailing",
      category: "Exterior",
      name: "Engine Bay Detailing",
      shortDescription: "One of the most overlooked areas in detailing.",
      fullDescription:
        "One of the most overlooked areas in detailing. We take a safe, meticulous approach without high-pressure water, protecting critical components, removing grime, and finishing with a non-greasy dressing for a clean factory look.",
      features: [
        "Full inspection & prep",
        "Covering of sensitive components (fuse box, alternator, wiring, sensors)",
        "Degreasing & dirt removal by hand",
        "Soft brushes for tight spots",
        "Low-risk cleaning (no pressure washer)",
        "Non-greasy dressing for shine",
        "UV protection product application",
        "Final quality check",
      ],
      priceString: "Starting at $100.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$100.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$100.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$100.99 CAD" },
        ],
      },
      whyUs:
        "One of the most overlooked areas in detailing. We take a safe, meticulous approach without high-pressure water, protecting critical components, removing grime, and finishing with a non-greasy dressing for a clean factory look.",

      cover_pic: enginebay_cover,
      pic1: enginebay1,
      pic2: enginebay2,
      included: [
        "Improves engine bay appearance",
        "Removes built-up grease, oil, & debris",
        "Prevents corrosion & wear",
        "Maintains safer operating temperatures",
        "Adds professional presentation",
        "Boosts resale value",
      ],
    },
    {
      id: "headlight-restoration",
      category: "Exterior",
      name: "Headlight Restoration",
      shortDescription:
        "Faded or hazy headlights reduce night visibility and compromise safety.",
      fullDescription:
        "Faded or hazy headlights reduce night visibility and compromise safety. Our multi-stage sanding and polishing process restores clarity, shine, and light output.",
      features: [
        "Full surface prep & masking",
        "Wet sanding (multi-stage, as needed)",
        "Machine polishing to restore optical clarity",
        "UV barrier application",
        "Light output inspection",
        "Final quality check",
        "12–24hr cure time",
        "2–4 year guarantee",
      ],
      priceString: "Starting at $259.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$259.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$259.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$259.99 CAD" },
        ],
      },
      whyUs:
        "Faded or hazy headlights reduce night visibility and compromise safety. Our multi-stage sanding and polishing process restores clarity, shine, and light output.",

      cover_pic: head_cover,
      pic1: head1,
      pic2: head2,
      included: [
        "Improves appearance",
        "Restores nighttime visibility & safety",
        "Saves money vs headlight replacement",
        "Prevents further UV & oxidation damage",
        "Long-lasting protection",
        "Boosts resale value",
      ],
    },
    {
      id: "headlight-taillight-tint",
      category: "Exterior",
      name: "Headlight & Taillight Tint",
      shortDescription:
        "Adds a sleek, custom appearance to headlights and taillights while offering UV, scratch, and oxidation protection.",
      fullDescription:
        "Adds a sleek, custom appearance to headlights and taillights while offering UV, scratch, and oxidation protection. Two bold shades available with a 1-year warranty.",
      features: [
        "Full surface prep & cleaning",
        "Precision-cut tint film in your choice of color",
        "Professional installation with heat-shrinking for seamless fit",
        "1-year warranty against bubbling, peeling, or fading",
        "Alignment check",
        "Final quality check",
      ],
      priceString: "Starting at $179.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$179.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$179.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$179.99 CAD" },
        ],
      },
      whyUs:
        "Adds a sleek, custom appearance to headlights and taillights while offering UV, scratch, and oxidation protection. Two bold shades available with a 1-year warranty.",

      cover_pic: tail_cover,
      pic1: tail1,
      pic2: tail2,
      included: [
        "Achieves blacked-out, sporty look",
        "Shields lights from UV, fading, & scratching",
        "1-year no-fade, no-bubble warranty",
        "Enhances both headlights & taillights",
        "Fully removable with no damage to factory lenses",
        "Boosts resale value",
      ],
    },
  ],

  interior: [
    {
      id: "interior-detailing",
      category: "Interior",
      name: "Interior Detailing",
      shortDescription:
        "Quick washes offer rushed wipe-downs that miss vents and tight spaces.",
      fullDescription:
        "Quick washes offer rushed wipe-downs that miss vents and tight spaces. We deep clean every accessible area using safe, professional-grade tools and products — it's an art, not a surface-level clean.",
      features: [
        "Interior vacuuming (floor, mats, trunk/cargo)",
        "Dashboard, door panels, & center console wiped and detailed",
        "Vents, buttons, knobs, & trim cleaned with soft brushes",
        "Steering wheel deep cleaned to factory matte finish",
        "Cup holders & compartments cleaned",
        "Windows & mirrors cleaned from inside",
        "Steam cleaning of high-touch surfaces",
        "Headliner spot-cleaning (where applicable)",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Quick washes offer rushed wipe-downs that miss vents and tight spaces. We deep clean every accessible area using safe, professional-grade tools and products — it's an art, not a surface-level clean.",

      cover_pic: interior_cover,
      pic1: interior1,
      pic2: interior2,
      included: [
        "Improves appearance and cleanliness",
        "Removes embedded dirt, dust, and grime",
        "Sanitizes high-touch areas",
        "Restores factory-fresh look",
        "Protects surfaces from premature wear",
        "Eliminates odors and allergens",
        "Boosts resale value",
        "Creates a healthier driving environment",
      ],
    },
    {
      id: "floor-carpet-shampoo",
      category: "Interior",
      name: "Floor & Carpet Shampoo",
      shortDescription:
        "Carpets endure daily wear from shoes, spills, and debris.",
      fullDescription:
        "Carpets endure daily wear from shoes, spills, and debris. We use professional-grade extraction equipment and specialized solutions to deep clean and sanitize, restoring like-new condition.",
      features: [
        "Pre-treatment of stains and heavily soiled areas",
        "Hot water extraction with professional equipment",
        "Steam cleaning for deep sanitization",
        "Specialized carpet shampoo application",
        "Thorough vacuuming",
        "Spot treatment for stubborn stains",
        "Deodorizing treatment",
        "Final inspection",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Carpets endure daily wear from shoes, spills, and debris. We use professional-grade extraction equipment and specialized solutions to deep clean and sanitize, restoring like-new condition.",

      cover_pic: floor_cover,
      pic1: floor1,
      pic2: floor2,
      included: [
        "Removes embedded dirt, stains, and odors",
        "Sanitizes carpets for better hygiene",
        "Restores original color and texture",
        "Eliminates allergens and bacteria",
        "Extends carpet life",
        "Creates a fresher interior",
        "Professional-grade results",
        "Safe for all carpet types",
      ],
    },
    {
      id: "pet-hair-removal",
      category: "Interior",
      name: "Pet Hair Removal",
      shortDescription:
        "Pet hair embeds deep into fabric fibers and is nearly impossible to remove with regular vacuuming.",
      fullDescription:
        "Pet hair embeds deep into fabric fibers and is nearly impossible to remove with regular vacuuming. We use professional-grade tools and techniques to completely eliminate it.",
      features: [
        "Specialized pet hair removal tools and brushes",
        "Deep vacuuming with high-powered equipment",
        "Fabric brush treatment for embedded hair",
        "Lint roller treatment for stubborn areas",
        "Steam cleaning to loosen embedded hair",
        "Detailed cleaning of all fabric surfaces",
        "Cargo area and trunk cleaning",
        "Final inspection",
      ],
      priceString: "Starting at $59",
      price: { type: "flat", amount: "Starting at $59" },
      whyUs:
        "Pet hair embeds deep into fabric fibers and is nearly impossible to remove with regular vacuuming. We use professional-grade tools and techniques to completely eliminate it.",
      cover_pic: pet_cover,
      pic1: pet1,
      pic2: pet2,
      included: [
        "Completely removes all pet hair",
        "Eliminates allergens and pet dander",
        "Restores clean, professional appearance",
        "Prevents spreading",
        "Safe for all fabric types",
        "Professional-grade results",
        "Creates a healthier environment",
        "Saves time and frustration",
      ],
    },
    {
      id: "fabric-seat-shampoo",
      category: "Interior",
      name: "Fabric Seat Shampoo",
      shortDescription:
        "Fabric seats absorb spills, stains, and odors over time.",
      fullDescription:
        "Fabric seats absorb spills, stains, and odors over time. We use hot water extraction and specialized solutions to deep clean, sanitize, and restore seats to like-new condition.",
      features: [
        "Pre-treatment of stains and soiled areas",
        "Hot water extraction",
        "Specialized fabric cleaning solutions",
        "Steam cleaning for deep sanitization",
        "Stain treatment for stubborn marks",
        "Deodorizing treatment",
        "Fabric protection application",
        "Final inspection",
      ],
      priceString: "Starting at $69.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$69.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$89.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$109.99 CAD" },
        ],
      },
      whyUs:
        "Fabric seats absorb spills, stains, and odors over time. We use hot water extraction and specialized solutions to deep clean, sanitize, and restore seats to like-new condition.",

      cover_pic: fabric_cover,
      pic1: fabric1,
      pic2: fabric2,
      included: [
        "Removes embedded dirt, stains, and odors",
        "Sanitizes fabric",
        "Restores original color and texture",
        "Eliminates allergens and bacteria",
        "Extends fabric life",
        "Creates a fresher interior",
        "Professional-grade results",
        "Safe for all fabric types",
      ],
    },
    {
      id: "leather-seat-treatment",
      category: "Interior",
      name: "Leather Seat Treatment",
      shortDescription:
        "Leather requires special care to maintain its luxurious appearance and prevent cracking or fading.",
      fullDescription:
        "Leather requires special care to maintain its luxurious appearance and prevent cracking or fading. We use premium pH-balanced products to gently clean, nourish, and protect.",
      features: [
        "Gentle leather cleaning with pH-balanced products",
        "Deep cleaning of surfaces and crevices",
        "Leather conditioning to restore suppleness",
        "UV protection to prevent fading and cracking",
        "Stain treatment",
        "Leather protection application",
        "Final buffing for luxurious finish",
        "Quality inspection",
      ],
      priceString: "Starting at $49.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$49.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$59.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$69.99 CAD" },
        ],
      },
      whyUs:
        "Leather requires special care to maintain its luxurious appearance and prevent cracking or fading. We use premium pH-balanced products to gently clean, nourish, and protect.",

      cover_pic: leather_cover,
      pic1: leather1,
      pic2: leather2,
      included: [
        "Restores natural suppleness",
        "Prevents cracking and premature aging",
        "Protects against UV damage and fading",
        "Eliminates leather-specific stains and odors",
        "Maintains luxurious appearance",
        "Extends leather life significantly",
        "Safe for all leather types",
      ],
    },
  ],

  "paint-polish": [
    {
      id: "gloss-enhancer",
      category: "Paint Polish",
      name: "Gloss Enhancer",
      shortDescription: "A great option for newer or well-maintained vehicles.",
      fullDescription:
        "A great option for newer or well-maintained vehicles. Deeply cleans paint and boosts shine by removing embedded contaminants. Finished with a fine polish to bring out clarity and gloss.",
      features: [
        "Exterior detail wash",
        "Paint decontamination",
        "Fine machine polish to boost gloss",
        "Microfiber hand-buffing for finish",
        "Inspection for shine & uniformity",
        "3-month polymer sealant (optional if ceramic coating selected)",
        "Final quality check",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "A great option for newer or well-maintained vehicles. Deeply cleans paint and boosts shine by removing embedded contaminants. Finished with a fine polish to bring out clarity and gloss.",

      cover_pic: glass_cover,
      pic1: glass1,
      pic2: glass2,
      included: [
        "Contaminants can dull paint even without scratches",
        "Revives shine without harsh polishing",
        "Keeps car looking fresh between full corrections",
        "Maintains smooth, reflective finish",
        "Boosts resale value",
      ],
    },
    {
      id: "one-step-polish",
      category: "Paint Polish",
      name: "One-Step Polish",
      shortDescription:
        "Perfect for vehicles that need a quick refresh without extensive correction.",
      fullDescription:
        "Perfect for vehicles that need a quick refresh without extensive correction. Removing up to 50% of paint defects in a single step. Ideal for well-maintained vehicles or minor imperfections.",
      features: [
        "Removes up to 50% of paint defects.",
        "Paint surface prep and cleaning",
        "Single-stage polishing with dual-action compound",
        "Light swirls removal",
        "Gloss enhancement",
        "Paint surface refinement",
        "Final buffing and inspection",
        "Quality check",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Perfect for vehicles that need a quick refresh without extensive correction. Combines light paint correction with gloss enhancement in a single step. Ideal for well-maintained vehicles or minor imperfections.",

      cover_pic: onestep_cover,
      pic1: onestep1,
      pic2: onestep2,
      included: [
        "Faster than 2 Step Paint Correction",
        "Eliminates light swirls",
        "Significantly enhances gloss and shine",
        "Perfect for well-maintained vehicles",
        "Cost-effective paint enhancement",
        "Prepares paint for protection products",
      ],
    },
    {
      id: "two-step-polish",
      category: "Paint Polish",
      name: "Two-Step Polish",
      shortDescription:
        "Ideal for vehicles with moderate swirl marks, light scratches, and dull paint that need more than a single-stage refresh.",
      fullDescription:
        "This level represents the true entry point into professional paint correction, where we move beyond simple polishing to fundamentally restore the surface of your vehicle.This service bridges the gap between a basic polish and a full restoration, delivering a dramatic transformation for paint that has lost its 'pop'.",
      features: [
        "Paint surface prep and cleaning",
        "Paint decontamination",
        "Stage 1 — Cutting compound to remove moderate swirls & scratches",
        "Stage 2 — Fine finishing polish for gloss & clarity",
        "80%–90% Defect Removal",
        "Dual-action machine polishing throughout",
        "Paint depth inspection between stages",
        "Final hand-buff and inspection",
        "Quality check",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Ideal for vehicles with moderate swirl marks, light scratches, and dull paint that need more than a single-stage refresh. A dedicated cutting stage removes defects, followed by a finishing polish that maximizes gloss and paint clarity.",
      cover_pic: twostep_cover,
      pic1: twostep1,
      pic2: twostep2,
      included: [
        "Showroom Results",
        "Removes moderate swirl marks and scratches",
        "Two dedicated stages for superior results vs one-step",
        "Significantly enhances gloss and paint depth",
        "Prepares paint for ceramic coating or sealant",
        "Cost-effective mid-tier correction",
        "Safe for all paint types",
        "Boosts resale value",
      ],
    },
    {
      id: "three-step-polish",
      category: "Paint Polish",
      name: "Three-Step Polish",
      shortDescription:
        "Our most comprehensive paint restoration service for severely neglected or heavily scratched paint.",
      fullDescription:
        "This is our superior level of paint correction and finishing. Designed specifically for the most discerning owners and 'picky' enthusiasts, this 3-stage process is for vehicles with heavy scratches, deep swirl marks, and severe oxidation. We push the limits of your clear coat to achieve the absolute maximum level of restoration possible",
      features: [
        "Detailed paint condition assessment",
        "Paint surface prep, wash & decontamination",
        "Stage 1 — Heavy cutting compound for deep scratches & oxidation",
        "Stage 2 — Medium polishing compound for defect refinement",
        "Stage 3 — Fine finishing polish for maximum gloss & clarity",
        "90%–95% Defect Removal",
        "Dual-action and rotary machine polishing as needed",
        "Paint thickness measurement throughout",
        "Panel-by-panel inspection between stages",
        "Final hand-buff and showroom inspection",
        "Quality check",
      ],
      priceString: "Contact for Quote",
      price: null,
      whyUs:
        "Our most comprehensive paint restoration service for severely neglected or heavily scratched paint. Three dedicated stages — heavy cutting, medium correction, and fine finishing — work progressively to eliminate deep defects and deliver a flawless, showroom-quality result.",
      cover_pic: threestep_cover,
      pic1: threestep1,
      pic2: threestep2,
      included: [
        "Eliminates severe swirl marks, deep scratches & oxidation",
        "Three progressive stages for the highest correction level",
        "Restores paint to showroom or better condition",
        "Reveals maximum paint depth and clarity",
        "Ideal before ceramic coating application",
        "Achieves professional show-car finish",
        "Maximizes resale value",
      ],
    },
  ],

  protection: [
    {
      id: "ceramic-coating",
      category: "Protection",
      name: "Ceramic Coating",
      shortDescription:
        "Ceramic coating is a liquid polymer made from nanotechnology-based SiO₂ (silicon dioxide).",
      fullDescription:
        "Ceramic coating is a liquid polymer made from nanotechnology-based SiO₂ (silicon dioxide). Once cured, it chemically bonds to the factory paint, creating a hydrophobic, slick, and ultra-durable shield. Unlike traditional waxes or sealants, it provides long-lasting protection that repels dirt, water, road grime, bird droppings, bug splatter, and more.",
      features: [
        "Hydrophobic — water beads & slides off",
        "UV-Resistant — prevents fading, chalking, oxidation",
        "Scratch Resistant — protects from light abrasions",
        "Chemical Resistant — defends against acids & brake dust",
        "Gloss Enhancing — deep mirror-like finish",
        "Acid Rain Protection",
        "Bird Droppings Barrier",
        "Industrial Fallout Defense",
        "Tree Sap Resistance",
        "Weather Erosion Guard",
      ],
      priceString: "Starting at $249.99",
      isFeatured: true, // Keep it true, the UI can ignore it if needed
      intro:
        "Ceramic coating is a liquid polymer made from nanotechnology-based SiO₂ (silicon dioxide). Once cured, it chemically bonds to the factory paint, creating a hydrophobic, slick, and ultra-durable shield. Unlike traditional waxes or sealants, it provides long-lasting protection that repels dirt, water, road grime, bird droppings, bug splatter, and more.",
      keyBenefits: [
        "Hydrophobic — water beads & slides off",
        "UV-Resistant — prevents fading, chalking, oxidation",
        "Scratch Resistant — protects from light abrasions",
        "Chemical Resistant — defends against acids & brake dust",
        "Gloss Enhancing — deep mirror-like finish",
        "Acid Rain Protection",
        "Bird Droppings Barrier",
        "Industrial Fallout Defense",
        "Tree Sap Resistance",
        "Weather Erosion Guard",
      ],
      worthIt: [
        "Long-Term Protection",
        "Enhanced Appearance",
        "Ease of Cleaning",
        "Boosts Resale Value",
        "Cost-Savings on future corrections",
      ],
      surfaces: [
        "Paint / clear coat",
        "Wheels & brake calipers",
        "Glass surfaces",
        "Exterior plastic & trim",
        "Interior leather & synthetics",
      ],
      pricingTiers: [
        {
          level: "Level 1",
          durability: "Up to 1 year",
          price: "$249.99",
        },
        {
          level: "Level 2",
          durability: "Up to 3-4 years or 50,000 km",
          price: "$499.99",
        },
        {
          level: "Level 3",
          durability: "Up to 4-5 years or 75,000 km",
          price: "$599.99",
        },
      ],
      additionalSurfaces: [
        {
          surface: "Wheels & Calipers",
          durability: "Up to 2 years / 40,000 km",
          price: "$199.99",
        },
        {
          surface: "Windshield & Glass",
          durability: "Up to 12 months",
          price: "$229.99",
        },
        {
          surface: "Plastics",
          durability: "Up to 12 months",
          price: "$149.99",
        },
        {
          surface: "Leather & Synthetics",
          durability: "Up to 2 years",
          price: "$199.99",
        },
      ],
      cover_pic: ceramic_cover,
      pic1: ceramic1,
      pic2: ceramic2,
      faq: [
        {
          q: "Does ceramic coating require maintenance?",
          a: "Yes — we recommend a professional detail wash, paint decontamination, and ceramic booster application every 4–6 months to maintain peak protection.",
        },
        {
          q: "Is ceramic coating better than traditional waxing?",
          a: "Absolutely. It's significantly more durable and longer-lasting, offering superior protection against environmental contaminants, UV rays, and chemical damage.",
        },
        {
          q: "Can I wash my car normally with ceramic coating?",
          a: "Yes, but avoid automated car washes. Hand washing or professional detailing is best to preserve the coating's integrity.",
        },
        {
          q: "Does ceramic coating prevent all scratches?",
          a: "It provides excellent resistance against minor scratches and swirl marks, but is not completely scratch-proof. Deep scratches may still require professional correction.",
        },
      ],
    },
    {
      id: "paint-sealant",
      category: "Protection",
      name: "Paint Sealant",
      shortDescription:
        "A synthetic polymer formula that bonds to the surface, creating a durable barrier against environmental contaminants.",
      fullDescription:
        "A synthetic polymer formula that bonds to the surface, creating a durable barrier against environmental contaminants. Offers up to 3 months of protection while enhancing gloss.",
      features: [
        "Paint surface preparation and cleaning",
        "Professional-grade synthetic sealant application",
        "Even coverage and proper curing",
        "Gloss enhancement",
        "UV and environmental protection",
        "Quality inspection",
        "Maintenance instructions",
        "Follow-up recommendations",
      ],
      priceString: "$99.99 CAD",
      price: { type: "flat", amount: "$99.99 CAD" },
      whyUs:
        "A synthetic polymer formula that bonds to the surface, creating a durable barrier against environmental contaminants. Offers 6–12 months of protection while enhancing gloss.",

      cover_pic: sealant_cover,
      pic1: sealant1,
      pic2: sealant2,
      included: [
        "Up to 3 months of reliable protection",
        "Enhanced gloss and shine",
        "UV damage and oxidation prevention",
        "Easier cleaning and maintenance",
        "Chemical resistance",
        "Cost-effective protection",
        "Improved paint condition",
      ],
    },
    {
      id: "car-wax",
      category: "Protection",
      name: "Car Wax",
      shortDescription:
        "The traditional approach to paint protection using premium carnauba or hybrid wax formulas for a beautiful, deep gloss.",
      fullDescription:
        "The traditional approach to paint protection using premium carnauba or hybrid wax formulas for a beautiful, deep gloss. Provides up to 7 days of protection with a warm, rich appearance that only wax can achieve.",
      features: [
        "Paint surface preparation and cleaning",
        "Premium carnauba or hybrid wax application",
        "Hand application for optimal coverage",
        "Proper curing and buffing",
        "Gloss enhancement and depth improvement",
        "UV and environmental protection",
        "Quality inspection and final buffing",
        "Maintenance instructions",
      ],
      priceString: "Starting at $49.99 CAD",
      price: {
        type: "tiered",
        tiers: [
          { label: "Sedan / Coupe / Crossover", price: "$49.99 CAD" },
          { label: "Compact / Mid-Size SUV", price: "$69.99 CAD" },
          { label: "Full-Size SUV / Pickup", price: "$89.99 CAD" },
        ],
      },
      whyUs:
        "The traditional approach to paint protection using premium carnauba or hybrid wax formulas for a beautiful, deep gloss. Provides 2–4 months of protection with a warm, rich appearance that only wax can achieve.",

      cover_pic: wax_cover,
      pic1: wax1,
      pic2: wax2,
      included: [
        "Classic warm, rich gloss appearance",
        "Up to 7 days of reliable protection",
        "Enhanced paint depth and clarity",
        "UV damage prevention",
        "Affordable protection",
        "Easy maintenance and reapplication",
      ],
    },
  ],
};
