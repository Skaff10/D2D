import fs from 'fs';
import { services } from './src/data/servicesData.js';

// Read translations file as text
const fileContent = fs.readFileSync('./src/translations.js', 'utf8');

// Since translations.js exports an object, we can evaluate it or parse it, but evaluating is easiest
const translationsMod = await import('file:///' + process.cwd().replace(/\\/g, '/') + '/src/translations.js?update=' + Date.now());
const translations = translationsMod.translations;

// First loop: add EN missing strings directly from servicesData
Object.values(services).flat().forEach(s => {
    if (!translations.en.servicesList[s.id]) return;
    const enSvc = translations.en.servicesList[s.id];
    
    if (s.features) enSvc.features = s.features;
    if (s.included) enSvc.included = s.included;
    
    if (s.id === 'ceramic-coating') {
        enSvc.worthIt = s.worthIt;
        enSvc.surfaces = s.surfaces;
        enSvc.pricingTiers = s.pricingTiers;
        enSvc.additionalSurfaces = s.additionalSurfaces;
        enSvc.faq = s.faq;
    }
});

// Second loop: add FR translated strings
const frUpdates = {
  "exterior-detailing": {
    features: ["Nettoyage en profondeur des roues et pneus avec nettoyant au pH équilibré", "Pré-rinçage et application de mousse à neige", "Nettoyage détaillé à la brosse (calandre, emblèmes, garnitures, trappe à essence)", "Nettoyage des cadres de porte", "Lavage de contact (méthode des deux seaux) avec shampoing au pH neutre", "Décontamination de la peinture (éliminateur de fer + barre d'argile/gant)", "Séchage à l'air et à la serviette en microfibre", "Lustrant pour pneus", "Nettoyage des vitres", "Vérification finale de la qualité"],
    included: ["Améliore l'apparence extérieure", "Prévient les marques de tourbillon et les micro-rayures", "Sécuritaire pour les véhicules avec revêtement céramique, cirés et scellés", "Nettoie les zones que les lavages de base oublient", "Prépare le véhicule pour la protection ou le polissage", "Maintient la santé de la peinture et sa brillance à long terme", "100% au pH neutre et sans danger pour les revêtements", "Augmente la valeur de revente"]
  },
  "paint-decontamination": {
    features: ["Éliminateur de fer (décontamination chimique)", "Éliminateur de goudron (nettoyage ciblé)", "Traitement à la barre d'argile/gant (décontamination mécanique)", "Vérification finale de la qualité"],
    included: ["Améliore l'apparence extérieure", "Restaure la douceur de la peinture", "Améliore la brillance et la clarté", "Prépare la surface pour un revêtement céramique ou une cire", "Prolonge la durée de vie de la protection de la peinture", "Aide à prévenir les dommages à long terme", "Augmente la valeur de revente"]
  },
  "engine-bay-detailing": {
    features: ["Inspection complète et préparation", "Couverture des composants sensibles (boîte à fusibles, alternateur, câblage, capteurs)", "Dégraissage et élimination de la saleté à la main", "Brosses douces pour les endroits étroits", "Nettoyage à faible risque (pas de nettoyeur haute pression)", "Lustrant non gras pour la brillance", "Application de produit de protection UV", "Vérification finale de la qualité"],
    included: ["Améliore l'apparence du compartiment moteur", "Élimine l'accumulation de graisse, d'huile et de débris", "Prévient la corrosion et l'usure", "Maintient des températures de fonctionnement plus sûres", "Ajoute une présentation professionnelle", "Augmente la valeur de revente"]
  },
  "headlight-restoration": {
    features: ["Préparation complète de la surface et masquage", "Ponçage à l'eau (multi-étapes, selon les besoins)", "Polissage à la machine pour restaurer la clarté optique", "Application d'une barrière UV", "Inspection du rendement lumineux", "Vérification finale de la qualité", "Temps de durcissement de 12 à 24 heures", "Garantie de 2 à 4 ans"],
    included: ["Améliore l'apparence", "Restaure la visibilité nocturne et la sécurité", "Économise de l'argent par rapport au remplacement des phares", "Prévient d'autres dommages dus aux UV et à l'oxydation", "Protection durable", "Augmente la valeur de revente"]
  },
  "headlight-taillight-tint": {
    features: ["Préparation complète et nettoyage de la surface", "Film teinté découpé avec précision dans la couleur de votre choix", "Installation professionnelle avec thermorétractation pour un ajustement parfait", "Garantie de 1 an contre les bulles, le décollement ou la décoloration", "Vérification de l'alignement", "Vérification finale de la qualité"],
    included: ["Obtient un look noirci et sportif", "Protège les lumières contre les UV, la décoloration et les rayures", "Garantie de 1 an sans décoloration ni bulles", "Améliore à la fois les phares et les feux arrière", "Entièrement amovible sans dommage pour les lentilles d'usine", "Augmente la valeur de revente"]
  },
  "interior-detailing": {
    features: ["Aspiration de l'intérieur (plancher, tapis, coffre/chargement)", "Tableau de bord, panneaux de porte et console centrale essuyés et détaillés", "Buses d'aération, boutons, molettes et garnitures nettoyés avec des brosses douces", "Volant nettoyé en profondeur pour un fini mat d'usine", "Porte-gobelets et compartiments nettoyés", "Vitres et miroirs nettoyés de l'intérieur", "Nettoyage à la vapeur des surfaces très touchées", "Détachage de la garniture de toit (le cas échéant)"],
    included: ["Améliore l'apparence et la propreté", "Élimine la saleté, la poussière et la crasse incrustées", "Désinfecte les zones très touchées", "Restaure le look frais d'usine", "Protège les surfaces contre l'usure prématurée", "Élimine les odeurs et les allergènes", "Augmente la valeur de revente", "Crée un environnement de conduite plus sain"]
  },
  "floor-carpet-shampoo": {
    features: ["Pré-traitement des taches et des zones très sales", "Extraction à l'eau chaude avec équipement professionnel", "Nettoyage à la vapeur pour une désinfection profonde", "Application d'un shampoing spécialisé pour tapis", "Aspiration minutieuse", "Traitement des taches tenaces", "Traitement désodorisant", "Inspection finale"],
    included: ["Élimine la saleté incrustée, les taches et les odeurs", "Désinfecte les tapis pour une meilleure hygiène", "Restaure la couleur et la texture d'origine", "Élimine les allergènes et les bactéries", "Prolonge la durée de vie des tapis", "Crée un intérieur plus frais", "Résultats de qualité professionnelle", "Sécuritaire pour tous types de tapis"]
  },
  "pet-hair-removal": {
    features: ["Outils et brosses spécialisés pour l'élimination des poils", "Aspiration en profondeur avec équipement haute puissance", "Traitement à la brosse en tissu pour les poils incrustés", "Traitement au rouleau anti-peluches pour les zones tenaces", "Nettoyage à la vapeur pour relâcher les poils incrustés", "Nettoyage détaillé de toutes les surfaces en tissu", "Nettoyage de l'espace de chargement et du coffre", "Inspection finale"],
    included: ["Élimine complètement tous les poils d'animaux", "Élimine les allergènes et les squames d'animaux", "Restaure une apparence propre et professionnelle", "Empêche la propagation", "Sécuritaire pour tous types de tissus", "Résultats de qualité professionnelle", "Crée un environnement plus sain", "Gain de temps et de frustration"]
  },
  "fabric-seat-shampoo": {
    features: ["Pré-traitement des taches et des zones sales", "Extraction à l'eau chaude", "Solutions spécialisées de nettoyage de tissus", "Nettoyage à la vapeur pour une désinfection profonde", "Traitement des taches pour les marques tenaces", "Traitement désodorisant", "Application d'une protection pour tissu", "Inspection finale"],
    included: ["Élimine la saleté incrustée, les taches et les odeurs", "Désinfecte le tissu", "Restaure la couleur et la texture d'origine", "Élimine les allergènes et les bactéries", "Prolonge la durée de vie du tissu", "Crée un intérieur plus frais", "Résultats de qualité professionnelle", "Sécuritaire pour tous types de tissus"]
  },
  "leather-seat-treatment": {
    features: ["Nettoyage doux du cuir avec des produits au pH équilibré", "Nettoyage en profondeur des surfaces et des crevasses", "Conditionnement du cuir pour restaurer la souplesse", "Protection UV pour prévenir la décoloration et les fissures", "Traitement des taches", "Application d'une protection pour le cuir", "Polissage final pour un fini luxueux", "Inspection de qualité"],
    included: ["Restaure la souplesse naturelle", "Prévient les fissures et le vieillissement prématuré", "Protège contre les dommages UV et la décoloration", "Élimine les taches et les odeurs spécifiques au cuir", "Maintient une apparence luxueuse", "Prolonge considérablement la durée de vie du cuir", "Sécuritaire pour tous les types de cuir"]
  },
  "gloss-enhancer": {
    features: ["Lavage extérieur détaillé", "Décontamination de la peinture", "Polissage fin à la machine pour rehausser la brillance", "Polissage manuel à la microfibre pour la finition", "Inspection pour la brillance et l'uniformité", "Scellant polymère de 3 mois (facultatif si le revêtement céramique est sélectionné)", "Vérification finale de la qualité"],
    included: ["Les contaminants peuvent ternir la peinture même sans rayures", "Ravive la brillance sans polissage agressif", "Garde la voiture fraîche entre les corrections complètes", "Maintient une finition lisse et réfléchissante", "Augmente la valeur de revente"]
  },
  "one-step-polish": {
    features: ["Préparation et nettoyage de la surface de la peinture", "Polissage en une étape avec un composé à double action", "Élimination des marques de tourbillon légères et des rayures", "Rehaussement de la brillance", "Affinement de la surface de la peinture", "Polissage final et inspection", "Application optionnelle d'une protection de peinture", "Contrôle de qualité"],
    included: ["Plus rapide qu'une correction multi-étapes", "Élimine les marques de tourbillon légères et les rayures mineures", "Améliore considérablement la brillance et l'éclat", "Parfait pour les véhicules bien entretenus", "Amélioration de la peinture rentable", "Prépare la peinture pour les produits de protection"]
  },
  "two-step-polish": {
    features: ["Préparation et nettoyage de la surface de la peinture", "Décontamination de la peinture", "Étape 1 — Composé de coupe pour éliminer les tourbillons modérés et les rayures", "Étape 2 — Polissage de finition fin pour la brillance et la clarté", "Polissage à la machine à double action tout au long", "Inspection de l'épaisseur de peinture entre les étapes", "Polissage manuel final et inspection", "Application optionnelle d'une protection de peinture", "Contrôle de qualité"],
    included: ["Élimine les marques de tourbillon et les rayures modérées", "Deux étapes dédiées pour des résultats supérieurs par rapport à une étape", "Améliore considérablement la brillance et la profondeur de la peinture", "Prépare la peinture pour un revêtement céramique ou un scellant", "Correction intermédiaire rentable", "Sécuritaire pour tous types de peinture", "Augmente la valeur de revente"]
  },
  "three-step-polish": {
    features: ["Évaluation détaillée de l'état de la peinture", "Préparation, lavage et décontamination de la surface de la peinture", "Étape 1 — Composé de coupe lourd pour les rayures profondes et l'oxydation", "Étape 2 — Composé de polissage moyen pour l'affinement des défauts", "Étape 3 — Polissage de finition fin pour une brillance et une clarté maximales", "Polissage à la machine (double action et rotative) si nécessaire", "Mesure de l'épaisseur de la peinture tout au long du processus", "Inspection panneau par panneau entre les étapes", "Polissage manuel final et inspection", "Application optionnelle d'une protection de peinture", "Contrôle de qualité"],
    included: ["Élimine les marques de tourbillon sévères, les rayures profondes et l'oxydation", "Trois étapes progressives pour le plus haut niveau de correction", "Restaure la peinture à la condition d'origine ou mieux", "Révèle la profondeur et la clarté maximales de la peinture", "Idéal avant l'application d'un revêtement céramique", "Atteint une finition d'exposition professionnelle", "Maximise la valeur de revente"]
  },
  "paint-sealant": {
    features: ["Préparation et nettoyage de la surface de la peinture", "Application d'un scellant synthétique de qualité professionnelle", "Couverture uniforme et durcissement approprié", "Rehaussement de la brillance", "Protection UV et environnementale", "Inspection de la qualité", "Instructions d'entretien", "Recommandations de suivi"],
    included: ["6 à 12 mois de protection durable", "Amélioration de la brillance et de l'éclat", "Prévention des dommages UV et de l'oxydation", "Nettoyage et entretien plus faciles", "Résistance chimique", "Protection rentable", "Amélioration de l'état de la peinture"]
  },
  "car-wax": {
    features: ["Préparation et nettoyage de la surface de la peinture", "Application de cire hybride ou carnauba premium", "Application à la main pour une couverture optimale", "Durcissement et polissage appropriés", "Rehaussement de la brillance et amélioration de la profondeur", "Protection UV et environnementale", "Inspection de qualité et polissage final", "Instructions d'entretien"],
    included: ["Apporte une profondeur chaleureuse et naturelle à la peinture", "2 à 4 mois de protection", "Cache les défauts mineurs", "Excellent rapport qualité-prix", "Surface sûre et lisse qui repousse l'eau", "Crée un éclat de voiture de salle d'exposition"]
  },
  "ceramic-coating": {
    features: [
      "Hydrophobe — l'eau perle et glisse",
      "Résistant aux UV — empêche la décoloration, le farinage, l'oxydation",
      "Résistant aux rayures — protège contre les abrasions légères",
      "Résistant aux produits chimiques — protège contre les acides et la poussière de frein",
      "Rehaussement de la brillance — finition profonde effet miroir",
      "Protection contre les pluies acides",
      "Barrière contre les fientes d'oiseaux",
      "Défense contre les retombées industrielles",
      "Résistance à la sève des arbres",
      "Garde contre l'érosion climatique"
    ],
    worthIt: [
      "Protection à long terme",
      "Apparence améliorée",
      "Facilité de nettoyage",
      "Augmente la valeur de revente",
      "Économies de coûts sur les futures corrections"
    ],
    surfaces: [
      "Peinture / vernis",
      "Roues et étriers de frein",
      "Surfaces vitrées",
      "Plastique extérieur et garnitures",
      "Cuir intérieur et synthétiques"
    ],
    pricingTiers: [
      { level: "Niveau 1", durability: "Jusqu'à 1 an ou 20 000 km", price: "$249.99" },
      { level: "Niveau 2", durability: "Jusqu'à 4 ans ou 60 000 km", price: "$499.99" },
      { level: "Niveau 3", durability: "Jusqu'à 5 ans ou 80 000 km", price: "$599.99" }
    ],
    additionalSurfaces: [
      { surface: "Roues et Étriers", durability: "Jusqu'à 2 ans / 40 000 km", price: "$199.99" },
      { surface: "Pare-brise et Vitres", durability: "Jusqu'à 12 mois", price: "$229.99" },
      { surface: "Plastiques", durability: "Jusqu'à 2 ans", price: "$149.99" },
      { surface: "Cuir et Synthétiques", durability: "Jusqu'à 2 ans", price: "$199.99" }
    ],
    faq: [
      { q: "Le revêtement céramique nécessite-t-il de l'entretien ?", a: "Oui — nous recommandons un lavage d'esthétique professionnel, une décontamination de la peinture et une application de booster céramique tous les 4 à 6 mois pour maintenir une protection optimale." },
      { q: "Le revêtement céramique est-il meilleur qu'un cirage traditionnel ?", a: "Absolument. Il est nettement plus durable, offrant une protection supérieure contre les contaminants environnementaux, les rayons UV et les dommages chimiques." },
      { q: "Puis-je laver ma voiture normalement avec un revêtement céramique ?", a: "Oui, mais évitez les lave-autos automatisés. Le lavage à la main ou un nettoyage professionnel est préférable pour préserver l'intégrité du revêtement." },
      { q: "Le revêtement céramique empêche-t-il toutes les rayures ?", a: "Il offre une excellente résistance contre les rayures mineures et les marques de tourbillon, mais n'est pas complètement anti-rayures. Les rayures profondes peuvent nécessiter une correction professionnelle." }
    ]
  }
};

Object.keys(frUpdates).forEach(id => {
    if(!translations.fr.servicesList[id]) return;
    Object.assign(translations.fr.servicesList[id], frUpdates[id]);
});

// Since the whole structure is now memory, we stringify it.
// We write it properly exported.
const outputJS = `export const translations = ${JSON.stringify(translations, null, 2)};\n`;

fs.writeFileSync('./src/translations.js', outputJS);
console.log("SUCCESS!");
