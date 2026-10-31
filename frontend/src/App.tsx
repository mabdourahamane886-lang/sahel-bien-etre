import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, Leaf, Menu, Search, ShoppingBag, ShieldCheck, Truck, X, HeartHandshake, Sparkles, Plus, Minus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const products=[{"id":"815","name":"Forever Aloe Vera Gel","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 815. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"836","name":"Forever Aloe Mango","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 836. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"834","name":"Forever Aloe Berry Nectar","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 834. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"877","name":"Forever Aloe Peaches","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 877. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"896","name":"Forever Freedom","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 896. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"821","name":"FAB Forever Active Boost","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 821. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"822","name":"FAB X Forever Active Boost","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 822. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"200","name":"Aloe Blossom Herbal Tea","category":"Boissons & Aloe Vera","description":"Référence Forever Living Products — code catalogue 200. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"566","name":"Forever Immune Gummy","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 566. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"613","name":"Forever Marine Collagen","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 613. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"439","name":"Forever Daily","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 439. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"355","name":"Forever ImmuBlend","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 355. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"065","name":"Forever Garlic-Thyme","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 065. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"048","name":"Forever Absorbent-C","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 048. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"672","name":"Forever Absorbent-D","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 672. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"626","name":"Forever AloeTurm","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 626. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"037","name":"Forever Nature-Min","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 037. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"072","name":"Forever Lycium Plus","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 072. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"471","name":"Forever Lite Ultra Chocolate","category":"Gestion du poids","description":"Référence Forever Living Products — code catalogue 471. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"520","name":"Forever FastBreak","category":"Gestion du poids","description":"Référence Forever Living Products — code catalogue 520. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"207","name":"Forever Bee Honey","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 207. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"026","name":"Forever Bee Pollen","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 026. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"027","name":"Forever Bee Propolis","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 027. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"036","name":"Forever Royal Jelly","category":"Produits de la ruche","description":"Référence Forever Living Products — code catalogue 036. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"633","name":"Aloe Liquid Soap","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 633. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"284","name":"Aloe Avocado Face & Body Soap","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 284. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"646","name":"Aloe Body Wash","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 646. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"067","name":"Aloe Ever-Shield","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 067. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"640","name":"Aloe-Jojoba Shampoo","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 640. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"641","name":"Aloe-Jojoba Conditioner","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 641. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"642","name":"Nourishing Hair Oil","category":"Cheveux","description":"Référence Forever Living Products — code catalogue 642. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"028","name":"Forever Bright Toothgel","category":"Hygiène","description":"Référence Forever Living Products — code catalogue 028. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"022","name":"Aloe Lips","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 022. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"647","name":"Forever Body Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 647. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"040","name":"Aloe First","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 040. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"686","name":"Forever Vitamin C","category":"Nutrition","description":"Référence Forever Living Products — code catalogue 686. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"687","name":"Forever Bakuchiol","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 687. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"061","name":"Aloe Vera Gelly","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 061. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"063","name":"Aloe Moisturizing Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 063. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"051","name":"Aloe Propolis Creme","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 051. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"564","name":"Aloe Cooling Lotion","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 564. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"205","name":"Aloe MSM Gel","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 205. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"617","name":"Aloe Sunscreen","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 617. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"238","name":"Forever Aloe Scrub","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 238. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"667","name":"LOGIC Aloe Gel Cleanser","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 667. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"668","name":"LOGIC Balancing Aloe Essence","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 668. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"669","name":"LOGIC Soothing Gel Moisturizer","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 669. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"653","name":"Replenishing Skin Oil","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 653. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"651","name":"Deep Moisturizing Cream","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 651. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"652","name":"Tightening Mask Powder","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 652. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"645","name":"Protecting Day Lotion SPF 20","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 645. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"650","name":"Renewing Skin Crème","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 650. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"677","name":"Refining Gel Mask","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 677. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"559","name":"Smoothing Exfoliator","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 559. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"561","name":"Awakening Eye Cream","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 561. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"618","name":"Hydrating Serum","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 618. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"664","name":"Aloe Bio-Cellulose Mask","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 664. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"612","name":"Aloe Activator","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 612. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"070","name":"Gentleman's Pride","category":"Soins du corps","description":"Référence Forever Living Products — code catalogue 070. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"554","name":"Infinite Hydrating Cleanser","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 554. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"555","name":"Infinite Firming Serum","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 555. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"558","name":"Infinite Restoring Crème","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 558. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"556","name":"Infinite Firming Complex","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 556. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"553","name":"Infinite by Forever","category":"Soins du visage","description":"Référence Forever Living Products — code catalogue 553. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"643","name":"Forever Alofa Fine Fragrance","category":"Parfums","description":"Référence Forever Living Products — code catalogue 643. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null},{"id":"644","name":"Forever Malosi Fine Fragrance","category":"Parfums","description":"Référence Forever Living Products — code catalogue 644. Vérifier le conditionnement et l’étiquetage officiel.","price_xof":null,"image_url":null}];


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
// Photos officielles individuelles hébergées dans Smooth Bundle.
// Chaque fichier est associé uniquement à la référence du produit correspondant.
const officialProductImages: Record<string, string> = {
  "815": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-aloe-vera-gel.jpg",
  "048": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-absorbent-c.jpg",
  "284": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-avocado-face-body-soap.jpg",
  "067": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-ever-shield.jpg",
  "028": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-bright-toothgel.jpg",
  "022": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-lips.jpg",
  "061": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/aloe-vera-gelly.jpg",
  "633": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-aloe-liquid-soap.jpg",
  "613": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-marine-collagen.jpg",
  "355": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-immublend.jpg",
  "651": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-deep-moisturizing-cream.jpg",
  "668": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-balancing-toner.jpg",
  "834": "https://cdn.smoothbundle.com/abdourahamane-mohamed/sahel-bien-etre-produits/products/forever-aloe-berry-nectar.jpg",
  "200": "https://www.foreverliving.fr/storage/productsImages/200.png",
  "205": "https://www.foreverliving.fr/storage/products/images/205.png",
  "207": "https://www.foreverliving.fr/storage/products/images/207.webp",
  "238": "https://www.foreverliving.fr/storage/products/images/238.webp",
  "439": "https://www.foreverliving.fr/storage/products/images/439.webp",
  "471": "https://www.foreverliving.fr/storage/products/images/471.webp",
  "520": "https://www.foreverliving.fr/storage/products/images/520.webp",
  "553": "https://www.foreverliving.fr/storage/products/images/553.webp",
  "554": "https://www.foreverliving.fr/storage/products/images/554.webp",
  "555": "https://www.foreverliving.fr/storage/products/images/555.webp",
  "556": "https://www.foreverliving.fr/storage/products/images/556.webp",
  "558": "https://www.foreverliving.fr/storage/products/images/558.webp",
  "559": "https://www.foreverliving.fr/storage/products/images/559.webp",
  "561": "https://www.foreverliving.fr/storage/products/images/561.webp",
  "564": "https://www.foreverliving.fr/storage/products/images/564.webp",
  "566": "https://www.foreverliving.fr/storage/products/images/566.webp",
  "612": "https://www.foreverliving.fr/storage/products/images/612.webp",
  "617": "https://www.foreverliving.fr/storage/products/images/617.webp",
  "618": "https://www.foreverliving.fr/storage/productsImages/618.png",
  "640": "https://www.foreverliving.fr/storage/products/images/640.webp",
  "641": "https://www.foreverliving.fr/storage/products/images/641.webp",
  "643": "https://www.foreverliving.fr/storage/products/images/643.webp",
  "644": "https://www.foreverliving.fr/storage/products/images/644.webp",
  "645": "https://www.foreverliving.fr/storage/products/images/645.webp",
  "646": "https://www.foreverliving.fr/storage/products/images/646.webp",
  "647": "https://www.foreverliving.fr/storage/products/images/647.webp",
  "821": "https://www.foreverliving.fr/storage/products/images/721.webp",
  "822": "https://www.foreverliving.fr/storage/products/images/721.webp",
  "896": "https://www.foreverliving.fr/storage/productsImages/196.png",
  "065": "https://www.foreverliving.fr/storage/products/images/65.webp",
  "072": "https://www.foreverliving.fr/storage/products/images/72.webp",
  "026": "https://www.foreverliving.fr/storage/products/images/26.webp",
  "036": "https://www.foreverliving.fr/storage/products/images/36.webp",
  "040": "https://www.foreverliving.fr/storage/products/images/40.webp",
  "063": "https://www.foreverliving.fr/storage/products/images/63.webp",
  "051": "https://www.foreverliving.fr/storage/products/images/51.webp",
  "070": "https://www.foreverliving.fr/storage/products/images/70.webp"
,
  "626": "https://cdn.foreverliving.com/content/products/images/Forever_AloeTurm__pd_main_512_X_512_1718193036990.png"
,
  "642": "https://www.flpshop.hu/public/cache/a51e4e7244bc4e7daec0b97a20c4932a.jpeg"
,
  "650": "https://cdn.foreverliving.com/content/products/images/renewing_skin_cr_me_pd_main_512_X_512_1752075353238.jpg"
,
  "652": "https://static.wixstatic.com/media/ad0cb5_1fec4a2299c24d0fb62bb5b063d12647~mv2.png/v1/fill/w_1280%2Ch_1280%2Cal_c%2Cq_90%2Cenc_avif%2Cquality_auto/ad0cb5_1fec4a2299c24d0fb62bb5b063d12647~mv2.png"
,
  "653": "https://cdn.foreverliving.com/content/products/images/REPLENISHING_SKIN_OIL_pd_main_512_X_512_1721304850005.jpg"
,
  "664": "https://www.foreverliving.fr/storage/products/albums/masque-bio-cellulose/masque-bio-cellulose-2023-05-17-6464e018327b7.webp"
,
  "667": "https://flpshop.me/storage/product/images/1086/01JV9H6XKFRYNJPAH9YKDMR4PF.jpeg"
,
  "669": "https://cdn.foreverliving.com/content/products/images/logic_soothing_gel_moisturizer___pd_main_512_X_512_1745915176525.png"
,
  "672": "https://www.flpshop.hu/public/cache/ceac458bccd7d22a6ab8a5b3a3f5044d.png"
,
  "677": "https://cdn.foreverliving.com/content/products/images/refining_gel_mask_pd_main_512_X_512_1745920846077.jpg"
,
  "686": "https://www.foreverliving.fr/storage/products/images/686.webp"
,
  "687": "https://static.wixstatic.com/media/07d5bb_5a08a7145e8b4603893398b07084c0c3~mv2.jpg/v1/fill/w_1000%2Ch_1000%2Cal_c%2Cq_85%2Cenc_avif%2Cquality_auto/07d5bb_5a08a7145e8b4603893398b07084c0c3~mv2.jpg"
,
  "836": "https://aloe-shop.de/cdn/shop/files/Forever_Aloe_Vera_Gel_Mango.jpg?v=1752392194"
,
  "877": "https://media.cdnws.com/_i/409606/95/824/95/forever-aloe-peche.png"
,
  "037": "https://static1.biotus.ua/media/optimization/catalog/product/700/p/h/photo_2023-02-23_13-06-50_jpg.webp"
,
  "027": "https://cdn.foreverliving.com/content/products/images/forever_bee_propolis__pd_main_512_X_512_1624009526772.jpg"
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
const whatsappNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '22789241713').replace(/\D/g, '');
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
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const catalog: Product[] = pdfOnlyProducts;
  const filtered = useMemo(() => catalog.filter(product =>
    (activeCategory === 'Tous' || product.category === activeCategory) &&
    (product.name + ' ' + product.category + ' ' + product.description).toLowerCase().includes(query.toLowerCase())
  ), [catalog, activeCategory, query]);
  const count = cart.reduce((total, line) => total + line.quantity, 0);
  const featuredProducts = useMemo(() => catalog.filter(product => imageFor(product)), [catalog]);
  const currentFeatured = featuredProducts.length ? featuredProducts[featuredIndex % featuredProducts.length] : null;

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const timer = window.setInterval(() => setFeaturedIndex(current => (current + 1) % featuredProducts.length), 5000);
    return () => window.clearInterval(timer);
  }, [featuredProducts.length]);

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

      <section className="featured-products section-block" aria-label="Présentation des produits Forever Niger 2026">
        <div className="featured-single" key={currentFeatured?.id || 'empty'}>
          {currentFeatured && <img src={imageFor(currentFeatured)!} alt={currentFeatured.name} loading="eager"/>}
        </div>
        <div className="featured-caption"><span>FOREVER NIGER 2026</span><small>{currentFeatured?.name || 'Nos produits'}</small><div className="featured-progress"><span key={currentFeatured?.id || 'empty'} /></div></div>
      </section>

      <section className="trust-strip" aria-label="Nos engagements">
        <div><ShieldCheck/><span><b>Une sélection claire</b><small>Informations transparentes</small></span></div>
        <div><Truck/><span><b>Livraison locale</b><small>Niamey et régions, sur demande</small></span></div>
        <div><HeartHandshake/><span><b>À votre écoute</b><small>Un accompagnement humain</small></span></div>
      </section>

      <section className="section-block universe" id="univers">
        <div className="section-heading"><div><span className="kicker">TROUVEZ VOTRE ESSENTIEL</span><h2>Explorez nos univers</h2></div><p>Des catégories pensées pour vous aider à retrouver facilement les produits qui vous intéressent.</p></div>
        <div className="category-grid universe-grid">
          {categories.slice(1).map((category, index) => {
            const universeImages = [
              'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85',
              'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85'
            ];
            const universeDescriptions = [
              'Des boissons à base d’aloe vera et des instants de fraîcheur.',
              'Des références nutritionnelles pour accompagner votre quotidien.',
              'Une sélection dédiée à vos objectifs de gestion du poids.',
              'Découvrez les produits issus de la ruche.',
              'Les essentiels pour vos gestes d’hygiène au quotidien.',
              'Prenez soin de vos cheveux avec une routine adaptée.',
              'Des soins pour le confort et l’hydratation du corps.',
              'Explorez les soins dédiés à votre visage.',
              'Une touche parfumée pour exprimer votre personnalité.'
            ];
            return <button className="category-tile universe-card" key={category} onClick={() => { setActiveCategory(category); document.getElementById('boutique')?.scrollIntoView({ behavior: 'smooth' }); }} aria-label={'Explorer ' + category}>
              <img className="universe-image" src={universeImages[index]} alt="" loading="lazy"/>
              <span className="universe-shade"/>
              <span className="universe-topline"><span className="category-number">0{index + 1}</span><span className="universe-label">UNIVERS SAHEL</span></span>
              <span className="universe-content"><span className="category-name">{category}</span><span className="universe-description">{universeDescriptions[index]}</span><span className="universe-link">Explorer <ArrowRight size={16}/></span></span>
            </button>;
          })}
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

    <a className="whatsapp-float" href={'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent('Bonjour SAHEL BIEN-ÊTRE, je souhaite obtenir des informations sur vos produits.') } target="_blank" rel="noopener noreferrer" aria-label="Contacter SAHEL BIEN-ÊTRE sur WhatsApp">
      <span className="whatsapp-float-icon" aria-hidden="true"><svg viewBox="0 0 32 32" role="img"><path fill="currentColor" d="M16.02 3.2a12.55 12.55 0 0 0-10.7 19.1L3.7 28.8l6.67-1.75A12.55 12.55 0 1 0 16.02 3.2Zm0 22.85c-1.93 0-3.82-.52-5.48-1.51l-.39-.23-3.96 1.04 1.06-3.86-.25-.4a10.2 10.2 0 1 1 9.02 4.96Zm5.6-7.64c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg></span>
    </a>

    <footer className="site-footer"><a className="footer-brand" href="#accueil"><Leaf size={22}/> SAHEL <b>BIEN-ÊTRE</b></a><p>Le naturel au quotidien.</p><div className="footer-links"><a href="#boutique">Boutique</a><a href="#histoire">À propos</a><a href="#contact">Contact</a></div><small>© {new Date().getFullYear()} Sahel Bien-Être. Tous droits réservés.</small><small className="legal">Boutique indépendante. Aucune affiliation officielle à Forever Living Products n’est revendiquée.</small></footer>

    {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={event => event.stopPropagation()}><div className="drawer-head"><div><span className="kicker">VOTRE SÉLECTION</span><h2>Mon panier ({count})</h2></div><button onClick={() => setCartOpen(false)} aria-label="Fermer le panier"><X/></button></div>{cart.length ? <><div className="cart-lines">{cart.map(line => <div className="cart-line" key={line.product.id}>{imageFor(line.product) ? <img src={imageFor(line.product)!} alt={line.product.name}/> : <div className="cart-product-placeholder"><Leaf size={18}/></div>}<div className="cart-line-copy"><b>{line.product.name}</b><small>{money(line.product.price_xof)}</small><div className="quantity"><button onClick={() => changeQuantity(line.product.id, -1)} aria-label="Diminuer"><Minus size={13}/></button><span>{line.quantity}</span><button onClick={() => changeQuantity(line.product.id, 1)} aria-label="Augmenter"><Plus size={13}/></button></div></div></div>)}</div><p className="cart-hint">Le prix final et la disponibilité seront confirmés avant validation.</p><a className="button button-dark checkout" href={whatsappLink} target={whatsappNumber ? '_blank' : undefined} rel="noreferrer">Demander ma commande <ArrowRight size={17}/></a></> : <div className="cart-empty"><ShoppingBag size={35}/><h3>Votre panier est vide</h3><p>Ajoutez des produits pour préparer votre demande.</p><button onClick={() => setCartOpen(false)}>Continuer mes achats</button></div>}</aside></div>}
    {notice && <div className="toast"><Check size={16}/>{notice}<button onClick={() => setNotice('')} aria-label="Fermer"><X size={15}/></button></div>}
  </div>;
}
