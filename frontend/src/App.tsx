import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Leaf, Menu, Search, ShoppingBag, ShieldCheck, Truck, X, HeartHandshake, Sparkles, Plus, Minus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const products=[{"id":"815","name":"Forever Aloe Vera Gel","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 815. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"836","name":"Forever Aloe Mango","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 836. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"834","name":"Forever Aloe Berry Nectar","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 834. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"877","name":"Forever Aloe Peaches","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 877. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"896","name":"Forever Freedom","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 896. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"821","name":"FAB Forever Active Boost","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 821. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"822","name":"FAB X Forever Active Boost","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 822. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"200","name":"Aloe Blossom Herbal Tea","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 200. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"566","name":"Forever Immune Gummy","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 566. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"613","name":"Forever Marine Collagen","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 613. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"439","name":"Forever Daily","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 439. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"355","name":"Forever ImmuBlend","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 355. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"065","name":"Forever Garlic-Thyme","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 065. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"048","name":"Forever Absorbent-C","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 048. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"672","name":"Forever Absorbent-D","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 672. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"626","name":"Forever AloeTurm","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 626. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"037","name":"Forever Nature-Min","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 037. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"072","name":"Forever Lycium Plus","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 072. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"471","name":"Forever Lite Ultra Chocolate","category":"Gestion du poids","description":"Référence Forever Living Products — code catalogue 471. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"520","name":"Forever FastBreak","category":"Gestion du poids","description":"Référence Forever Living Products — code catalogue 520. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"207","name":"Forever Bee Honey","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 207. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"026","name":"Forever Bee Pollen","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 026. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"027","name":"Forever Bee Propolis","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 027. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"036","name":"Forever Royal Jelly","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 036. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"633","name":"Aloe Liquid Soap","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 633. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"284","name":"Aloe Avocado Face & Body Soap","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 284. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"646","name":"Aloe Body Wash","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 646. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"067","name":"Aloe Ever-Shield","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 067. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"640","name":"Aloe-Jojoba Shampoo","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 640. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"641","name":"Aloe-Jojoba Conditioner","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 641. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"642","name":"Nourishing Hair Oil","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 642. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"028","name":"Forever Bright Toothgel","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 028. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"022","name":"Aloe Lips","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 022. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"647","name":"Forever Body Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 647. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"040","name":"Aloe First","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 040. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"686","name":"Forever Vitamin C","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 686. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"687","name":"Forever Bakuchiol","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 687. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"061","name":"Aloe Vera Gelly","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 061. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"063","name":"Aloe Moisturizing Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 063. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"051","name":"Aloe Propolis Creme","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 051. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"564","name":"Aloe Cooling Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 564. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"205","name":"Aloe MSM Gel","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 205. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"617","name":"Aloe Sunscreen","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 617. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"238","name":"Forever Aloe Scrub","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 238. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"667","name":"LOGIC Aloe Gel Cleanser","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 667. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"668","name":"LOGIC Balancing Aloe Essence","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 668. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"669","name":"LOGIC Soothing Gel Moisturizer","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 669. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"653","name":"Replenishing Skin Oil","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 653. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"651","name":"Deep Moisturizing Cream","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 651. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"652","name":"Tightening Mask Powder","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 652. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"645","name":"Protecting Day Lotion SPF 20","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 645. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"650","name":"Renewing Skin Crème","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 650. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"677","name":"Refining Gel Mask","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 677. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"559","name":"Smoothing Exfoliator","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 559. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"561","name":"Awakening Eye Cream","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 561. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"618","name":"Hydrating Serum","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 618. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"664","name":"Aloe Bio-Cellulose Mask","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 664. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"612","name":"Aloe Activator","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 612. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"070","name":"Gentleman's Pride","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 070. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"554","name":"Infinite Hydrating Cleanser","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 554. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"555","name":"Infinite Firming Serum","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 555. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"558","name":"Infinite Restoring Crème","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 558. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"556","name":"Infinite Firming Complex","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 556. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"553","name":"Infinite by Forever","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 553. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"643","name":"Forever Alofa Fine Fragrance","category":"Parfums","description":"Référence Forever Living Products — code catalogue 643. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"},{"id":"644","name":"Forever Malosi Fine Fragrance","category":"Parfums","description":"Référence Forever Living Products — code catalogue 644. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":"photo-1608248543803-ba4f8c70ae0b"}];


/**
 * Catalogue de référence : seules les références présentes dans le PDF
 * Forever Côte d'Ivoire 2024-2025 sont affichées. Les références absentes
 * et les anciens produits saisis manuellement sont exclus.
 */
const pdfReferenceCorrections: Record<string, { id: string; name: string; category: string }> = {
  "815": { id: "716 / 015", name: "Forever Aloe Vera Gel®", category: "Boissons & Aloe Vera" },
  "834": { id: "034", name: "Forever Aloe Berry Nectar®", category: "Boissons & Aloe Vera" },
  "877": { id: "077", name: "Forever Aloe Bits n’Peaches®", category: "Boissons & Aloe Vera" },
  "896": { id: "196", name: "Forever Freedom®", category: "Boissons & Aloe Vera" },
  "821": { id: "721", name: "FAB Forever Active Boost®", category: "Boissons & Aloe Vera" },
  "822": { id: "721", name: "FAB Forever Active Boost®", category: "Boissons & Aloe Vera" },
  "566": { id: "566", name: "Forever Bee Propolis®", category: "Produits de la ruche" },
  "200": { id: "200", name: "Aloe Blossom Herbal Tea®", category: "Boissons & Aloe Vera" },
  "439": { id: "439", name: "Forever Daily®", category: "Nutrition" },
  "065": { id: "065", name: "Forever Garlic-Thyme®", category: "Nutrition" },
  "048": { id: "048", name: "Forever Absorbent-C®", category: "Nutrition" },
  "037": { id: "037", name: "Forever Nature-Min®", category: "Nutrition" },
  "072": { id: "072", name: "Forever Lycium Plus®", category: "Nutrition" },
  "471": { id: "471", name: "Forever Lite Ultra® Chocolat", category: "Gestion du poids" },
  "520": { id: "520", name: "Forever Fast Break®", category: "Gestion du poids" },
  "207": { id: "207", name: "Forever Bee Honey®", category: "Produits de la ruche" },
  "026": { id: "026", name: "Forever Bee Pollen®", category: "Produits de la ruche" },
  "036": { id: "036", name: "Forever Royal Jelly®", category: "Produits de la ruche" },
  "633": { id: "633", name: "Aloe Liquid Soap", category: "Hygiène" },
  "284": { id: "284", name: "Aloe Avocado Face & Body Soap", category: "Hygiène" },
  "646": { id: "646", name: "Aloe Body Wash", category: "Hygiène" },
  "067": { id: "067", name: "Aloe Ever-Shield®", category: "Hygiène" },
  "640": { id: "640", name: "Aloe-Jojoba Shampoo", category: "Cheveux" },
  "641": { id: "641", name: "Aloe-Jojoba Conditioner", category: "Cheveux" },
  "028": { id: "028", name: "Forever Bright® Toothgel", category: "Hygiène" },
  "022": { id: "022", name: "Aloe Lips®", category: "Soins du corps" },
  "647": { id: "647", name: "Aloe Body Lotion", category: "Soins du corps" },
  "040": { id: "040", name: "Aloe First®", category: "Hygiène" },
  "061": { id: "061", name: "Aloe Vera Gelly", category: "Soins du corps" },
  "063": { id: "063", name: "Aloe Moisturizing Lotion", category: "Soins du corps" },
  "051": { id: "051", name: "Aloe Propolis Crème", category: "Soins du corps" },
  "564": { id: "564", name: "Aloe Cooling Lotion", category: "Soins du corps" },
  "205": { id: "205", name: "Aloe MSM Gel", category: "Soins du corps" },
  "617": { id: "617", name: "Aloe Sunscreen", category: "Soins du visage" },
  "238": { id: "238", name: "Forever Aloe Scrub®", category: "Soins du visage" },
  "653": { id: "653", name: "Replenishing Skin Oil", category: "Soins du visage" },
  "651": { id: "651", name: "Deep Moisturizing Cream", category: "Soins du visage" },
  "652": { id: "652", name: "Tightening Mask Powder", category: "Soins du visage" },
  "645": { id: "645", name: "Protecting Day Lotion SPF 20", category: "Soins du visage" },
  "650": { id: "650", name: "Renewing Skin Crème", category: "Soins du visage" },
  "559": { id: "559", name: "Smoothing Exfoliator", category: "Soins du visage" },
  "561": { id: "561", name: "Awakening Eye Cream", category: "Soins du visage" },
  "618": { id: "618", name: "Hydrating Serum", category: "Soins du visage" },
  "664": { id: "664", name: "Aloe Bio-Cellulose Mask", category: "Soins du visage" },
  "612": { id: "612", name: "Aloe Activator", category: "Soins du visage" },
  "070": { id: "070", name: "Gentleman’s Pride®", category: "Hygiène" },
  "554": { id: "554", name: "Infinite Hydrating Cleanser", category: "Soins du visage" },
  "555": { id: "555", name: "Infinite Firming Serum", category: "Soins du visage" },
  "558": { id: "558", name: "Infinite Restoring Crème", category: "Soins du visage" },
  "556": { id: "556", name: "Infinite Firming Complex", category: "Soins du visage" },
  "553": { id: "553", name: "Infinite by Forever", category: "Soins du visage" },
  "643": { id: "643", name: "Forever Alofa™ Fine Fragrance", category: "Parfums" },
  "644": { id: "644", name: "Forever Malosi™ Fine Fragrance", category: "Parfums" }
};
const officialProductImages: Record<string, string> = {
  "815": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-aloe-vera-gel.jpg",
  "048": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-absorbent-c.jpg",
  "284": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-avocado-face-body-soap.jpg",
  "067": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-ever-shield.jpg",
  "028": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-bright-toothgel.jpg",
  "022": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-lips.jpg",
  "061": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-vera-gelly.jpg"
};
const pdfReferenceIds = new Set(Object.keys(pdfReferenceCorrections));
const pdfOnlyProducts: Product[] = products
  .filter(product => pdfReferenceIds.has(product.id))
  .map(product => {
    const official = pdfReferenceCorrections[product.id];
    return {
      ...product,
      id: official.id,
      name: official.name,
      category: official.category,
      description: "Référence issue du catalogue Forever Côte d’Ivoire 2024-2025. Conditionnement et disponibilité à confirmer.",
      price_xof: null,
      image_url: officialProductImages[product.id] ?? null
    };
  })
  .filter((product, index, all) => all.findIndex(item => item.id === product.id) === index);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const categories = ['Tous', 'Boissons & Aloe Vera', 'Nutrition', 'Gestion du poids', 'Produits de la ruche', 'Hygiène', 'Cheveux', 'Soins du corps', 'Soins du visage', 'Parfums'];
const money = (value: number | null) => value == null ? 'Prix sur demande' : new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';

type Product = { id: string; name: string; category: string; description: string; price_xof: number | null; image_url?: string | null };
type CartLine = { product: Product; quantity: number };
const imageFor = (product: Product): string | null => product.image_url?.startsWith('http') ? product.image_url : null;

export default function App() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const catalog: Product[] = pdfOnlyProducts;
  const filtered = useMemo(() => catalog.filter(product =>
    (activeCategory === 'Tous' || product.category === activeCategory) &&
    (product.name + ' ' + product.category + ' ' + product.description).toLowerCase().includes(query.toLowerCase())
  ), [catalog, activeCategory, query]);
  const count = cart.reduce((total, line) => total + line.quantity, 0);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('products').select('id,name,category,description,price_xof,image_url').eq('is_active', true)
      .then(({ data, error }) => { if (!error && data?.length) setDbProducts(data as Product[]); });
  }, []);

  const addToCart = (product: Product) => {
    setCart(current => {
      const found = current.find(line => line.product.id === product.id);
      return found
        ? current.map(line => line.product.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
        : [...current, { product, quantity: 1 }];
    });
    setNotice(product.name + ' ajouté à votre panier.');
    window.setTimeout(() => setNotice(''), 2600);
  };
  const changeQuantity = (id: string, delta: number) => setCart(current =>
    current.map(line => line.product.id === id ? { ...line, quantity: line.quantity + delta } : line).filter(line => line.quantity > 0)
  );
  const orderText = cart.map(line => line.product.name + ' x' + line.quantity).join(', ');
  const whatsappLink = whatsappNumber
    ? 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent('Bonjour, je souhaite commander : ' + orderText + '. Merci de me confirmer les prix et disponibilités.')
    : '#contact';

  return <div className="site-shell">
    <div className="announcement"><Sparkles size={13}/> Votre espace bien-être à Niamey <span>•</span> Commandes et renseignements sur demande</div>
    <header className="site-header">
      <a className="brand" href="#accueil" aria-label="Sahel Bien-Être, accueil">
        <span className="brand-symbol"><Leaf size={24}/></span>
        <span className="brand-word">SAHEL <strong>BIEN-ÊTRE</strong><small>LA NATURE AU CŒUR DU QUOTIDIEN</small></span>
      </a>
      <nav className={mobileOpen ? 'main-nav is-open' : 'main-nav'}>
        <a href="#accueil" onClick={() => setMobileOpen(false)}>Accueil</a>
        <a href="#univers" onClick={() => setMobileOpen(false)}>Nos univers</a>
        <a href="#boutique" onClick={() => setMobileOpen(false)}>La boutique</a>
        <a href="#histoire" onClick={() => setMobileOpen(false)}>Notre histoire</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <button className="cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={17}/> <span>Panier</span><b>{count}</b></button>
        <button className="mobile-toggle" aria-label="Ouvrir le menu" onClick={() => setMobileOpen(value => !value)}>{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="accueil">
        <div className="hero-copy">
          <div className="eyebrow"><span/> BEAUTÉ · NATURE · ÉQUILIBRE</div>
          <h1>Le bien-être<br/><em>commence ici.</em></h1>
          <p>Un univers dédié aux gestes qui font du bien. Découvrez une sélection de références Forever Living : aloe vera, nutrition, soins et beauté.</p>
          <div className="hero-actions"><a className="button button-dark" href="#boutique">Explorer la boutique <ArrowRight size={17}/></a><a className="text-link" href="#histoire">Découvrir notre univers</a></div>
          <div className="hero-note"><span className="note-icon"><Check size={14}/></span> Une boutique indépendante basée à Niamey, Niger.</div>
        </div>
        <div className="hero-visual">
          <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1400&q=90" alt="Ambiance naturelle de soins et de beauté"/>
          <div className="image-caption"><span>SAHEL BIEN-ÊTRE</span><small>Prendre soin de soi, naturellement.</small></div>
          <div className="floating-seal"><Leaf size={22}/><span>Inspiré<br/>par la nature</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Nos engagements">
        <div><ShieldCheck/><span><b>Une sélection claire</b><small>Informations transparentes</small></span></div>
        <div><Truck/><span><b>Livraison locale</b><small>Niamey et régions, sur demande</small></span></div>
        <div><HeartHandshake/><span><b>À votre écoute</b><small>Un accompagnement humain</small></span></div>
      </section>

      <section className="section-block universe" id="univers">
        <div className="section-heading"><div><span className="kicker">TROUVEZ VOTRE ESSENTIEL</span><h2>Explorez nos univers</h2></div><p>Des catégories pensées pour vous aider à retrouver facilement les produits qui vous intéressent.</p></div>
        <div className="category-grid">
          {categories.slice(1).map((category, index) => <button className={'category-tile category-' + index} key={category} onClick={() => { setActiveCategory(category); document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <span className="category-number">0{index + 1}</span><span className="category-name">{category}</span><ArrowRight size={18}/>
          </button>)}
        </div>
      </section>

      <section className="shop-section" id="boutique">
        <div className="section-block shop-inner">
          <div className="section-heading shop-heading"><div><span className="kicker">LE CATALOGUE</span><h2>Nos produits</h2><p>Parcourez les références et demandez le prix ou la disponibilité au Niger.</p></div><div className="catalog-count">{filtered.length}<small>références affichées</small></div></div>
          <div className="catalog-toolbar">
            <div className="category-pills">{categories.map(category => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
            <label className="search-box"><Search size={18}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Rechercher un produit..."/>{query && <button onClick={() => setQuery('')} aria-label="Effacer la recherche"><X size={15}/></button>}</label>
          </div>
          {filtered.length ? <div className="product-grid">{filtered.map(product => <article className="product-card" key={product.id}>
            <div className="product-photo">{imageFor(product) ? <img src={imageFor(product)!} alt={product.name} loading="lazy"/> : <div className="product-photo-pending" role="img" aria-label={'Photo officielle indisponible pour ' + product.name} style={{height:'100%',minHeight:220,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:10,color:'#71836e',background:'linear-gradient(145deg,#f4f6ef,#e8eee2)'}}><Leaf size={38}/><span style={{fontWeight:600}}>Photo officielle</span><small>En cours de vérification</small></div>}<span className="product-category">{product.category}</span><button className="quick-add" onClick={() => addToCart(product)} aria-label={'Ajouter ' + product.name}><Plus size={18}/></button></div>
            <div className="product-info"><small>RÉF. {product.id}</small><h3>{product.name}</h3><p>{product.description}</p><div className="product-footer"><strong>{money(product.price_xof)}</strong><button onClick={() => addToCart(product)}>Ajouter <ArrowRight size={14}/></button></div></div>
          </article>)}</div> : <div className="empty-state"><Search size={28}/><h3>Aucun produit trouvé</h3><p>Essayez un autre mot-clé ou choisissez une autre catégorie.</p><button onClick={() => { setQuery(''); setActiveCategory('Tous'); }}>Réinitialiser les filtres</button></div>}
          <p className="catalog-disclaimer">Catalogue filtré selon les références présentes dans le PDF Forever Côte d’Ivoire 2024-2025. Les visuels affichés sont les fichiers originaux fournis et associés uniquement aux références correspondantes. Les autres photos seront ajoutées lorsqu’une carte correspondante sera confirmée. Les prix, conditionnements et disponibilités sont à confirmer avant commande.</p>
        </div>
      </section>

      <section className="story-section section-block" id="histoire">
        <div className="story-photo"><img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85" alt="Espace de détente aux matières naturelles"/><span className="story-stamp"><Leaf size={22}/> L’essentiel<br/>est naturel</span></div>
        <div className="story-copy"><span className="kicker">BIENVENUE CHEZ SAHEL BIEN-ÊTRE</span><h2>Prendre soin de soi,<br/><em>à son rythme.</em></h2><p>Sahel Bien-Être est une boutique indépendante basée à Niamey. Notre objectif : vous présenter un catalogue clair, faciliter vos demandes et vous accompagner dans vos recherches de produits de beauté et de bien-être.</p><p>Nous vous invitons à vérifier les étiquettes, les ingrédients et les recommandations du fabricant. Les produits présentés ne sont pas des médicaments et ne remplacent pas un avis médical.</p><a className="text-link" href="#contact">Nous contacter <ArrowRight size={16}/></a></div>
      </section>

      <section className="contact-band" id="contact"><div><span className="kicker">NOUS SOMMES À VOTRE ÉCOUTE</span><h2>Un produit vous intéresse ?</h2><p>Écrivez-nous pour connaître son prix, sa disponibilité et les modalités de livraison.</p></div><a className="button button-light" href={whatsappNumber ? 'https://wa.me/' + whatsappNumber : '#boutique'} target={whatsappNumber ? '_blank' : undefined} rel="noreferrer">{whatsappNumber ? 'Parlons de votre besoin' : 'Voir les produits'} <ArrowRight size={17}/></a></section>
    </main>

    <footer className="site-footer"><a className="footer-brand" href="#accueil"><Leaf size={22}/> SAHEL <b>BIEN-ÊTRE</b></a><p>Le naturel au quotidien.</p><div className="footer-links"><a href="#boutique">Boutique</a><a href="#histoire">À propos</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Sahel Bien-Être. Tous droits réservés.</small><small className="legal">Boutique indépendante. Aucune affiliation officielle à Forever Living Products n’est revendiquée.</small></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={event => event.stopPropagation()}><div className="drawer-head"><div><span className="kicker">VOTRE SÉLECTION</span><h2>Mon panier ({count})</h2></div><button onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X/></button></div>{cart.length ? <><div className="cart-lines">{cart.map(line => <div className="cart-line" key={line.product.id}>{imageFor(line.product) ? <img src={imageFor(line.product)!} alt={line.product.name}/> : <div className="cart-product-placeholder"><Leaf size={18}/></div>}<div className="cart-line-copy"><b>{line.product.name}</b><small>{money(line.product.price_xof)}</small><div className="quantity"><button onClick={() => changeQuantity(line.product.id, -1)} aria-label="Diminuer"><Minus size={13}/></button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.product.id, 1)} aria-label="Augmenter"><Plus size={13}/></button></div></div></div>)}</div><p className="cart-hint">Le prix final et la disponibilité seront confirmés avant validation.</p><a className="button button-dark checkout" href={whatsappLink} target={whatsappNumber ? '_blank' : undefined} rel="noreferrer">Demander ma commande <ArrowRight size={17}/></a></> : <div className="cart-empty"><ShoppingBag size={35}/><h3>Votre panier est vide</h3><p>Ajoutez des produits pour préparer votre demande.</p><button onClick={() => setCartOpen(false)}>Continuer mes achats</button></div>}</aside></div>}
    {notice && <div className="toast"><Check size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Fermer"><X size={15}/></button></div>}
  </div>;
}
