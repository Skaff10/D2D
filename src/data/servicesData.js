// All service data for Down2Detail services page
// Categories: Exterior, Interior, Paint Polish, Protection

export const categories = [
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'paint-polish', label: 'Paint Polish' },
  { id: 'protection', label: 'Protection' },
]

export const services = {
  exterior: [
    {
      id: 'exterior-detailing',
      name: 'Exterior Detailing',
      price: null, // Call for price
      whyUs:
        "Basic car washes use dirty sponges, harsh chemicals, or automated brushes that leave swirl marks and scratches. Our service safely cleans every part of your car's exterior using pH-neutral products and precise hand techniques.",
      included: [
        'Wheels & tires deep cleaned with pH-balanced wheel cleaner',
        'Pre-rinse & snow foam application',
        'Detailed brush cleaning (grille, emblems, trim, fuel cap)',
        'Door jamb cleaning',
        'Contact Wash (two-bucket method) with pH-neutral shampoo',
        'Paint decontamination (iron remover + clay bar/mitt)',
        'Air blow & microfiber towel drying',
        'Tire dressing',
        'Glass cleaning',
        'Final quality check',
      ],
      importance: [
        'Improves exterior appearance',
        'Prevents swirl marks & micro-scratches',
        'Safe for ceramic-coated, waxed & sealed vehicles',
        'Cleans areas basic washes miss',
        'Prepares vehicle for protection or polishing',
        'Maintains paint health & long-term shine',
        '100% pH-neutral & coating-safe',
        'Boosts resale value',
      ],
    },
    {
      id: 'paint-decontamination',
      name: 'Paint Decontamination',
      price: null,
      whyUs:
        'Even after a proper wash, paint can feel rough due to microscopic contaminants like brake dust, industrial fallout, road tar, and tree sap that embed into paint over time.',
      included: [
        'Iron Remover (chemical decontamination)',
        'Tar Remover (spot cleaning)',
        'Clay Bar/Mitt Treatment (mechanical decontamination)',
        'Final quality check',
      ],
      importance: [
        'Improves exterior appearance',
        'Restores paint smoothness',
        'Enhances gloss & clarity',
        'Prepares surface for ceramic coating or wax',
        'Extends life of paint protection',
        'Helps prevent long-term damage',
        'Boosts resale value',
      ],
    },
    {
      id: 'engine-bay-detailing',
      name: 'Engine Bay Detailing',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$100.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$100.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$100.99 CAD' },
        ],
      },
      whyUs:
        'One of the most overlooked areas in detailing. We take a safe, meticulous approach without high-pressure water, protecting critical components, removing grime, and finishing with a non-greasy dressing for a clean factory look.',
      included: [
        'Full inspection & prep',
        'Covering of sensitive components (fuse box, alternator, wiring, sensors)',
        'Degreasing & dirt removal by hand',
        'Soft brushes for tight spots',
        'Low-risk cleaning (no pressure washer)',
        'Non-greasy dressing for shine',
        'UV protection product application',
        'Final quality check',
      ],
      importance: [
        'Improves engine bay appearance',
        'Removes built-up grease, oil, & debris',
        'Prevents corrosion & wear',
        'Maintains safer operating temperatures',
        'Adds professional presentation',
        'Boosts resale value',
      ],
    },
    {
      id: 'headlight-restoration',
      name: 'Headlight Restoration',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$259.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$259.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$259.99 CAD' },
        ],
      },
      whyUs:
        'Faded or hazy headlights reduce night visibility and compromise safety. Our multi-stage sanding and polishing process restores clarity, shine, and light output.',
      included: [
        'Full surface prep & masking',
        'Wet sanding (multi-stage, as needed)',
        'Machine polishing to restore optical clarity',
        'UV barrier application',
        'Light output inspection',
        'Final quality check',
        '12–24hr cure time',
        '2–4 year guarantee',
      ],
      importance: [
        'Improves appearance',
        'Restores nighttime visibility & safety',
        'Saves money vs headlight replacement',
        'Prevents further UV & oxidation damage',
        'Long-lasting protection',
        'Boosts resale value',
      ],
    },
    {
      id: 'headlight-taillight-tint',
      name: 'Headlight & Taillight Tint',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$179.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$179.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$179.99 CAD' },
        ],
      },
      whyUs:
        'Adds a sleek, custom appearance to headlights and taillights while offering UV, scratch, and oxidation protection. Two bold shades available with a 1-year warranty.',
      included: [
        'Full surface prep & cleaning',
        'Precision-cut tint film in your choice of color',
        'Professional installation with heat-shrinking for seamless fit',
        '1-year warranty against bubbling, peeling, or fading',
        'Alignment check',
        'Final quality check',
      ],
      importance: [
        'Achieves blacked-out, sporty look',
        'Shields lights from UV, fading, & scratching',
        '1-year no-fade, no-bubble warranty',
        'Enhances both headlights & taillights',
        'Fully removable with no damage to factory lenses',
        'Boosts resale value',
      ],
    },
  ],

  interior: [
    {
      id: 'interior-detailing',
      name: 'Interior Detailing',
      price: null,
      whyUs:
        "Quick washes offer rushed wipe-downs that miss vents and tight spaces. We deep clean every accessible area using safe, professional-grade tools and products — it's an art, not a surface-level clean.",
      included: [
        'Interior vacuuming (floor, mats, trunk/cargo)',
        'Dashboard, door panels, & center console wiped and detailed',
        'Vents, buttons, knobs, & trim cleaned with soft brushes',
        'Steering wheel deep cleaned to factory matte finish',
        'Cup holders & compartments cleaned',
        'Windows & mirrors cleaned from inside',
        'Steam cleaning of high-touch surfaces',
        'Headliner spot-cleaning (where applicable)',
      ],
      importance: [
        'Improves appearance and cleanliness',
        'Removes embedded dirt, dust, and grime',
        'Sanitizes high-touch areas',
        'Restores factory-fresh look',
        'Protects surfaces from premature wear',
        'Eliminates odors and allergens',
        'Boosts resale value',
        'Creates a healthier driving environment',
      ],
    },
    {
      id: 'floor-carpet-shampoo',
      name: 'Floor & Carpet Shampoo',
      price: null,
      whyUs:
        'Carpets endure daily wear from shoes, spills, and debris. We use professional-grade extraction equipment and specialized solutions to deep clean and sanitize, restoring like-new condition.',
      included: [
        'Pre-treatment of stains and heavily soiled areas',
        'Hot water extraction with professional equipment',
        'Steam cleaning for deep sanitization',
        'Specialized carpet shampoo application',
        'Thorough vacuuming',
        'Spot treatment for stubborn stains',
        'Deodorizing treatment',
        'Final inspection',
      ],
      importance: [
        'Removes embedded dirt, stains, and odors',
        'Sanitizes carpets for better hygiene',
        'Restores original color and texture',
        'Eliminates allergens and bacteria',
        'Extends carpet life',
        'Creates a fresher interior',
        'Professional-grade results',
        'Safe for all carpet types',
      ],
    },
    {
      id: 'pet-hair-removal',
      name: 'Pet Hair Removal',
      price: { type: 'flat', amount: '$129.99 CAD' },
      whyUs:
        'Pet hair embeds deep into fabric fibers and is nearly impossible to remove with regular vacuuming. We use professional-grade tools and techniques to completely eliminate it.',
      included: [
        'Specialized pet hair removal tools and brushes',
        'Deep vacuuming with high-powered equipment',
        'Fabric brush treatment for embedded hair',
        'Lint roller treatment for stubborn areas',
        'Steam cleaning to loosen embedded hair',
        'Detailed cleaning of all fabric surfaces',
        'Cargo area and trunk cleaning',
        'Final inspection',
      ],
      importance: [
        'Completely removes all pet hair',
        'Eliminates allergens and pet dander',
        'Restores clean, professional appearance',
        'Prevents spreading',
        'Safe for all fabric types',
        'Professional-grade results',
        'Creates a healthier environment',
        'Saves time and frustration',
      ],
    },
    {
      id: 'fabric-seat-shampoo',
      name: 'Fabric Seat Shampoo',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$69.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$89.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$109.99 CAD' },
        ],
      },
      whyUs:
        'Fabric seats absorb spills, stains, and odors over time. We use hot water extraction and specialized solutions to deep clean, sanitize, and restore seats to like-new condition.',
      included: [
        'Pre-treatment of stains and soiled areas',
        'Hot water extraction',
        'Specialized fabric cleaning solutions',
        'Steam cleaning for deep sanitization',
        'Stain treatment for stubborn marks',
        'Deodorizing treatment',
        'Fabric protection application',
        'Final inspection',
      ],
      importance: [
        'Removes embedded dirt, stains, and odors',
        'Sanitizes fabric',
        'Restores original color and texture',
        'Eliminates allergens and bacteria',
        'Extends fabric life',
        'Creates a fresher interior',
        'Professional-grade results',
        'Safe for all fabric types',
      ],
    },
    {
      id: 'leather-seat-treatment',
      name: 'Leather Seat Treatment',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$49.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$59.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$69.99 CAD' },
        ],
      },
      whyUs:
        'Leather requires special care to maintain its luxurious appearance and prevent cracking or fading. We use premium pH-balanced products to gently clean, nourish, and protect.',
      included: [
        'Gentle leather cleaning with pH-balanced products',
        'Deep cleaning of surfaces and crevices',
        'Leather conditioning to restore suppleness',
        'UV protection to prevent fading and cracking',
        'Stain treatment',
        'Leather protection application',
        'Final buffing for luxurious finish',
        'Quality inspection',
      ],
      importance: [
        'Restores natural suppleness',
        'Prevents cracking and premature aging',
        'Protects against UV damage and fading',
        'Eliminates leather-specific stains and odors',
        'Maintains luxurious appearance',
        'Extends leather life significantly',
        'Safe for all leather types',
      ],
    },
  ],

  'paint-polish': [
    {
      id: 'gloss-enhancer',
      name: 'Gloss Enhancer',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$369.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$399.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$439.99 CAD' },
        ],
      },
      whyUs:
        'A great option for newer or well-maintained vehicles. Deeply cleans paint and boosts shine by removing embedded contaminants. Finished with a fine polish to bring out clarity and gloss.',
      included: [
        'Exterior detail wash',
        'Paint decontamination',
        'Fine machine polish to boost gloss',
        'Microfiber hand-buffing for finish',
        'Inspection for shine & uniformity',
        '3-month polymer sealant (optional if ceramic coating selected)',
        'Final quality check',
      ],
      importance: [
        'Contaminants can dull paint even without scratches',
        'Revives shine without harsh polishing',
        'Keeps car looking fresh between full corrections',
        'Maintains smooth, reflective finish',
        'Boosts resale value',
      ],
    },
    {
      id: 'one-step-polish',
      name: 'One-Step Polish',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$599.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$649.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$699.99 CAD' },
        ],
      },
      whyUs:
        'Perfect for vehicles that need a quick refresh without extensive correction. Combines light paint correction with gloss enhancement in a single step. Ideal for well-maintained vehicles or minor imperfections.',
      included: [
        'Paint surface prep and cleaning',
        'Single-stage polishing with dual-action compound',
        'Light swirl mark and scratch removal',
        'Gloss enhancement',
        'Paint surface refinement',
        'Final buffing and inspection',
        'Optional paint protection application',
        'Quality check',
      ],
      importance: [
        'Faster than multi-stage correction',
        'Removes light swirl marks and minor scratches',
        'Significantly enhances gloss and shine',
        'Perfect for well-maintained vehicles',
        'Cost-effective paint enhancement',
        'Prepares paint for protection products',
      ],
    },
    {
      id: 'paint-correction',
      name: 'Paint Correction',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$749.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$839.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$999.99 CAD' },
        ],
      },
      whyUs:
        'Our most comprehensive paint restoration service. Eliminates severe swirl marks, scratches, and defects through a multi-stage process using various polishing compounds to achieve a showroom-quality finish.',
      included: [
        'Detailed paint condition assessment',
        'Multi-stage compounding and polishing',
        'Heavy swirl mark and scratch removal',
        'Oxidation and defect elimination',
        'Paint depth restoration and enhancement',
        'Gloss perfection and clarity improvement',
        'Paint surface refinement and smoothing',
        'Final inspection and protection preparation',
      ],
      importance: [
        'Eliminates severe swirl marks and scratches',
        'Restores paint to showroom condition',
        'Reveals true paint depth and clarity',
        'Removes oxidation',
        'Achieves professional-grade finish',
        'Prepares paint for optimal protection',
        'Maximizes resale value',
      ],
    },
  ],

  protection: [
    {
      id: 'ceramic-coating',
      name: 'Ceramic Coating',
      isFeatured: true,
      intro:
        'Ceramic coating is a liquid polymer made from nanotechnology-based SiO₂ (silicon dioxide). Once cured, it chemically bonds to the factory paint, creating a hydrophobic, slick, and ultra-durable shield. Unlike traditional waxes or sealants, it provides long-lasting protection that repels dirt, water, road grime, bird droppings, bug splatter, and more.',
      keyBenefits: [
        'Hydrophobic — water beads & slides off',
        'UV-Resistant — prevents fading, chalking, oxidation',
        'Scratch Resistant — protects from light abrasions',
        'Chemical Resistant — defends against acids & brake dust',
        'Gloss Enhancing — deep mirror-like finish',
        'Acid Rain Protection',
        'Bird Droppings Barrier',
        'Industrial Fallout Defense',
        'Tree Sap Resistance',
        'Weather Erosion Guard',
      ],
      worthIt: [
        'Long-Term Protection',
        'Enhanced Appearance',
        'Ease of Cleaning',
        'Boosts Resale Value',
        'Cost-Savings on future corrections',
      ],
      surfaces: [
        'Paint / clear coat',
        'Wheels & brake calipers',
        'Glass surfaces',
        'Exterior plastic & trim',
        'Interior leather & synthetics',
      ],
      pricingTiers: [
        {
          level: 'Level 1',
          durability: 'Up to 1 year or 20,000 km',
          price: '$249.99',
        },
        {
          level: 'Level 2',
          durability: 'Up to 4 years or 60,000 km',
          price: '$499.99',
        },
        {
          level: 'Level 3',
          durability: 'Up to 5 years or 80,000 km',
          price: '$599.99',
        },
      ],
      additionalSurfaces: [
        {
          surface: 'Wheels & Calipers',
          durability: 'Up to 2 years / 40,000 km',
          price: '$199.99',
        },
        {
          surface: 'Windshield & Glass',
          durability: 'Up to 12 months',
          price: '$229.99',
        },
        {
          surface: 'Plastics',
          durability: 'Up to 2 years',
          price: '$149.99',
        },
        {
          surface: 'Leather & Synthetics',
          durability: 'Up to 2 years',
          price: '$199.99',
        },
      ],
      faq: [
        {
          q: 'Does ceramic coating require maintenance?',
          a: 'Yes — we recommend a professional detail wash, paint decontamination, and ceramic booster application every 4–6 months to maintain peak protection.',
        },
        {
          q: 'Is ceramic coating better than traditional waxing?',
          a: "Absolutely. It's significantly more durable and longer-lasting, offering superior protection against environmental contaminants, UV rays, and chemical damage.",
        },
        {
          q: 'Can I wash my car normally with ceramic coating?',
          a: "Yes, but avoid automated car washes. Hand washing or professional detailing is best to preserve the coating's integrity.",
        },
        {
          q: 'Does ceramic coating prevent all scratches?',
          a: 'It provides excellent resistance against minor scratches and swirl marks, but is not completely scratch-proof. Deep scratches may still require professional correction.',
        },
      ],
    },
    {
      id: 'paint-sealant',
      name: 'Paint Sealant',
      price: { type: 'flat', amount: '$99.99 CAD' },
      whyUs:
        'A synthetic polymer formula that bonds to the surface, creating a durable barrier against environmental contaminants. Offers 6–12 months of protection while enhancing gloss.',
      included: [
        'Paint surface preparation and cleaning',
        'Professional-grade synthetic sealant application',
        'Even coverage and proper curing',
        'Gloss enhancement',
        'UV and environmental protection',
        'Quality inspection',
        'Maintenance instructions',
        'Follow-up recommendations',
      ],
      importance: [
        '6–12 months of durable protection',
        'Enhanced gloss and shine',
        'UV damage and oxidation prevention',
        'Easier cleaning and maintenance',
        'Chemical resistance',
        'Cost-effective protection',
        'Improved paint condition',
      ],
    },
    {
      id: 'car-wax',
      name: 'Car Wax',
      price: {
        type: 'tiered',
        tiers: [
          { label: 'Sedan / Coupe / Crossover', price: '$49.99 CAD' },
          { label: 'Compact / Mid-Size SUV', price: '$69.99 CAD' },
          { label: 'Full-Size SUV / Pickup', price: '$89.99 CAD' },
        ],
      },
      whyUs:
        'The traditional approach to paint protection using premium carnauba or hybrid wax formulas for a beautiful, deep gloss. Provides 2–4 months of protection with a warm, rich appearance that only wax can achieve.',
      included: [
        'Paint surface preparation and cleaning',
        'Premium carnauba or hybrid wax application',
        'Hand application for optimal coverage',
        'Proper curing and buffing',
        'Gloss enhancement and depth improvement',
        'UV and environmental protection',
        'Quality inspection and final buffing',
        'Maintenance instructions',
      ],
      importance: [
        'Classic warm, rich gloss appearance',
        '2–4 months of reliable protection',
        'Enhanced paint depth and clarity',
        'UV damage prevention',
        'Affordable protection',
        'Easy maintenance and reapplication',
      ],
    },
  ],
}
