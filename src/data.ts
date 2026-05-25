import { Product, Testimonial } from "./types";

export const PRODUCTS: Product[] = [
  // ==========================================
  // MEN'S COLLECTIONS (10 premium items)
  // ==========================================
  {
    id: "campus-cyber-pulse-v1",
    name: "Campus Cyber-Pulse V1",
    category: "Running",
    gender: "Men",
    price: 180,
    originalPrice: 220,
    rating: 4.9,
    reviewsCount: 142,
    description: "Designed for high-speed urban sprints. Features a cyber-neon responsive midsole, bio-mesh hyper-breathable shell, and kinetic energy return pods that redefine city running.",
    features: [
      "Aero-weave micro-tension upper for seamless support",
      "E-TPU cyber-neon kinetic energy pods",
      "3M reflective safety detailing for low-light streetwear runs",
      "Carbon fiber supportive midfoot shank"
    ],
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Volt Green", hex: "#a3e635", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80" },
      { name: "Ember Red", hex: "#ef4444", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
      { name: "Solar Orange", hex: "#f97316", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    tags: ["New Drop", "Bestseller"],
    isNew: true
  },
  {
    id: "campus-stealth-carbon",
    name: "Campus Stealth Carbon",
    category: "High Tops",
    gender: "Men",
    price: 245,
    rating: 4.8,
    reviewsCount: 98,
    description: "An absolute cyberpunk masterpiece. Fully water-resistant tactical high top with a stealth matte-black weave and structured ankle defense plating.",
    features: [
      "Hydro-shield water-resistant Nanotech coating",
      "Carbon-fiber composite ankle stabilization armor",
      "Magnetic lock quick-tension lace system",
      "Shock-absorbing heavy duty tread underlay"
    ],
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Carbon Grey", hex: "#4b5563", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" },
      { name: "Slate Black", hex: "#111827", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" },
      { name: "Sienna Tan", hex: "#a16207", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [8, 9, 10, 11, 12, 13],
    tags: ["Limited", "Tactical"],
    isLimited: true
  },
  {
    id: "campus-orbit-max",
    name: "Campus Orbit Max",
    category: "Limited",
    gender: "Men",
    price: 295,
    rating: 4.9,
    reviewsCount: 76,
    description: "The zenith of modern footwear engineering. Features an experimental magnetic quick-wrap strap, glowing cyber highlights, and a structured carbon core plate.",
    features: [
      "Self-tensioning mechanical strap mechanism",
      "Integrated side-LED luminescence styling (rechargeable)",
      "High-impact carbon fiber dynamic propulsion plate",
      "Breathable techknit inner-bootie structure"
    ],
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Oceanic Cyan", hex: "#06b6d4", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80" },
      { name: "Volt Glow", hex: "#84cc16", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80" },
      { name: "Stealth Slate", hex: "#374151", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [8, 9, 10, 11, 12],
    tags: ["Limited Drop 🔥", "Hyper Tech"],
    isLimited: true,
    isNew: true
  },
  {
    id: "campus-gravity-core-x",
    name: "Campus Gravity Core X",
    category: "Sports",
    gender: "Men",
    price: 210,
    originalPrice: 250,
    rating: 4.8,
    reviewsCount: 119,
    description: "Defy physics. Imbued with active air compression technology that stabilizes heel impact and transforms negative energy into instant micro-pivots.",
    features: [
      "Compressed Air-Tech dual chambers",
      "High-grip cyber-traction hex grooves",
      "Adaptive-knit custom contouring fit",
      "Structural TPU heel lock and stabilizer"
    ],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Tangerine Glow", hex: "#f97316", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" },
      { name: "Solar Crimson", hex: "#dc2626", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
      { name: "Stealth Black", hex: "#111827", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    tags: ["20% OFF", "Athletic"],
    isLimited: false
  },
  {
    id: "campus-apex-court",
    name: "Campus Apex Court",
    category: "Basketball",
    gender: "Men",
    price: 220,
    rating: 4.95,
    reviewsCount: 164,
    description: "Engineered for lethal court navigation. Loaded with an elevated traction mesh base and anti-spin safety heel plates that secure explosive horizontal pivots.",
    features: [
      "Hi-density ankle cage for impact shielding",
      "Premium traction composite micro-grooves",
      "Ultra-responsive responsive court rebound gel",
      "Durable lightweight structural weave casing"
    ],
    image: "https://images.unsplash.com/photo-1518002171953-a080ee81be41?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1518002171953-a080ee81be41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Summit Matte", hex: "#1e293b", image: "https://images.unsplash.com/photo-1518002171953-a080ee81be41?auto=format&fit=crop&w=800&q=80" },
      { name: "Aero Blue", hex: "#0284c7", image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [8, 9, 10, 11, 12],
    tags: ["Pro Edition", "Impact Control"],
    isNew: true
  },
  {
    id: "campus-quantum-runner",
    name: "Campus Quantum Runner",
    category: "Running",
    gender: "Men",
    price: 190,
    originalPrice: 210,
    rating: 4.75,
    reviewsCount: 88,
    description: "Your ultimate city racing weapon. Structured with ultra-low drag knit, aerodynamic heel shapes, and our proprietary hyper-reactive responsive cushioning.",
    features: [
      "Aerodynamic tail fin for stability",
      "Seamless warp knit construction for glove-like fitting",
      "Reinforced carbon rubber sole pads",
      "Reflective smart tech weave threads"
    ],
    image: "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Cream Volt", hex: "#fef08a", image: "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80" },
      { name: "Pulse Red", hex: "#dc2626", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    tags: ["Max Velocity", "Ultra Light"],
    isNew: false
  },
  {
    id: "campus-sovereign-luxury",
    name: "Campus Sovereign Luxury",
    category: "Sneakers",
    gender: "Men",
    price: 320,
    rating: 5.0,
    reviewsCount: 34,
    description: "Sovereign quality for the ultimate fashion purist. Features a hand-wrapped Italian full-grain leather framework, 18K gold-plated lace tips, and luxury micro-suede interiors.",
    features: [
      "Handmade Italian full-grain leather upholstery",
      "Plated custom gold aglets and hardware",
      "Debossed premium laser serial coordinates",
      "Eco-harvest custom vulcanized rubber soles"
    ],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Tuscan Ochre", hex: "#854d0e", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" },
      { name: "Minimalist Ivory", hex: "#fafaf9", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [8, 9, 10, 11, 12],
    tags: ["Elite Series", "Pure Luxury"],
    isLimited: true,
    isNew: true
  },
  {
    id: "campus-streetwear-apex",
    name: "Campus Streetwear Apex",
    category: "Sneakers",
    gender: "Men",
    price: 185,
    rating: 4.82,
    reviewsCount: 153,
    description: "A signature cultural catalyst. Clean, heavy-soled skater design that bridges high-end runway silhouettes with durable modern flat-deck rubber outsoles.",
    features: [
      "Super-padded low configuration tongue for posture",
      "Durable premium leather side overlays",
      "Breathe-well toe vents for high-wear reliability",
      "Industrial script heel tag graphics"
    ],
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Glacier Grey/White", hex: "#e2e8f0", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80" },
      { name: "Acoustic Natural", hex: "#d6d3d1", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    tags: ["Streetwear Icon", "Must Have"],
    isNew: false
  },
  {
    id: "campus-gym-warp",
    name: "Campus Trainer Gym Warp",
    category: "Gym & Training",
    gender: "Men",
    price: 175,
    rating: 4.79,
    reviewsCount: 61,
    description: "Pure stability. Designed for intense deadlift routines and dynamic lateral box jumps. Features an ultra-flat wide heel base and custom high-tension mesh locking.",
    features: [
      "High-density solid rubber flat-mount base",
      "Custom mesh lateral locking strap integration",
      "Anti-bacterial sports mesh lining",
      "Sweat-wicking breathability weave"
    ],
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Stealth Slate Black", hex: "#1f2937", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [8, 9, 10, 11, 12],
    tags: ["Athletic Elite", "Iron Grip"],
    isNew: false
  },
  {
    id: "campus-casual-meridian",
    name: "Campus Casual Meridian",
    category: "Casual",
    gender: "Men",
    price: 165,
    rating: 4.87,
    reviewsCount: 139,
    description: "The ideal smart-casual streetwear champion. Combining minimal clean lines with premium vulcanized low profile cupsoles and high fidelity memory inserts.",
    features: [
      "Subtle low footprint cupsoles",
      "Supple brushed suede and split canvas",
      "Instant step-in memory comfortable mapping",
      "Staged custom flat weave woven design laces"
    ],
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Classic Pure White", hex: "#ffffff", image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    tags: ["Minimalist Elite"],
    isNew: false
  },

  // ==========================================
  // WOMEN'S COLLECTIONS (8 premium items)
  // ==========================================
  {
    id: "campus-neo-chrome",
    name: "Campus Neo-Chrome",
    category: "Sneakers",
    gender: "Women",
    price: 195,
    originalPrice: 215,
    rating: 5.0,
    reviewsCount: 211,
    description: "Unravel an iridescent future. The Neo-Chrome reacts beautifully to light, displaying futuristic pink, violet, and silver hues across premium split-leather layers.",
    features: [
      "Light-receptive chromatic upper layers",
      "Luxury full-grain split leather craftsmanship",
      "OrthoLite dual-density comfort memory foam sockliner",
      "Zero-gravity translucent rubber outsole"
    ],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Pastel Chromatic", hex: "#d946ef", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80" },
      { name: "Gilded White", hex: "#fef08a", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80" },
      { name: "Abyss Cobalt", hex: "#1d4ed8", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    tags: ["Hot 🔥", "Chromatic"],
    isNew: true
  },
  {
    id: "campus-vanguard-retro",
    name: "Campus Vanguard Retro",
    category: "Casual",
    gender: "Women",
    price: 155,
    rating: 4.7,
    reviewsCount: 184,
    description: "The street culture staple reimagined. Melding historical 90s skater silhouettes with state-of-the-art bio-recycled rubber soles and clean micro-suede panels.",
    features: [
      "100% organic bio-recycled construction",
      "High-comfort padded premium tongue & collar",
      "Reinforced double-stitched leather panels for high skate action",
      "Non-marking high traction gum outsoles"
    ],
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Cream Minimalist", hex: "#f5f5f4", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80" },
      { name: "Suede Amber", hex: "#b45309", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80" },
      { name: "Vintage White", hex: "#fafaf9", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9, 10],
    tags: ["Classic"],
    isNew: false
  },
  {
    id: "campus-luna-platform",
    name: "Campus Luna Platform",
    category: "Platform",
    gender: "Women",
    price: 210,
    originalPrice: 235,
    rating: 4.91,
    reviewsCount: 145,
    description: "Elevated high-fashion height. Merges active sportswear tech with a stunning 2.2-inch chunky platform sole, structural light frame, and soft custom pastel detailing.",
    features: [
      "Premium 2.2-inch lightweight platform cushion system",
      "Plush padded memory collars for walking long-range",
      "Fine brushed suede outer detailing with organic linen panels",
      "Engineered pastel overlay configuration"
    ],
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Sienna Peach Cream", hex: "#ffedd5", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" },
      { name: "Luminous Lilac", hex: "#f5f3ff", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9],
    tags: ["Fashion Choice", "High Rise"],
    isNew: true
  },
  {
    id: "campus-velocity-elite-w",
    name: "Campus Velocity Elite",
    category: "Running",
    gender: "Women",
    price: 195,
    rating: 4.85,
    reviewsCount: 92,
    description: "Engineered specifically for custom skeletal alignment. Imbued with soft energy return pods, adaptive-flex panels, and high fidelity grip rubber.",
    features: [
      "Adaptive-flex knit contours precisely to female gaits",
      "Impact absorbing lightweight running midsoles",
      "Hyper-durable mesh shell structure",
      "Luminous neon 3M stripe details"
    ],
    image: "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Aria Pink Gold", hex: "#fdb2b2", image: "https://images.unsplash.com/photo-1512374382149-43371b1f9306?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9],
    tags: ["Sprint weapon", "Elite Fit"],
    isNew: true
  },
  {
    id: "campus-aura-lifestyle",
    name: "Campus Aura Lifestyle",
    category: "Lifestyle",
    gender: "Women",
    price: 170,
    rating: 4.88,
    reviewsCount: 167,
    description: "Premium leisure sneakers designed for multi-tier urban activities. Built with soft cloud memory foams and a premium eco-fiber breathing outer.",
    features: [
      "High performance daily cloud comfort cushion",
      "Stretched structural knit that never breaks profile",
      "Staged fast-tension bungee strings",
      "Recycled active plastic compound yarn"
    ],
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Gold Alabaster", hex: "#fbcfe8", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9, 10],
    tags: ["Best Seller", "Everyday Cozy"],
    isNew: false
  },
  {
    id: "campus-nova-gym-w",
    name: "Campus Nova Cross-Trainer",
    category: "Gym & Training",
    gender: "Women",
    price: 160,
    rating: 4.76,
    reviewsCount: 52,
    description: "Ready for pure conditioning. Optimized lateral support lines lock in your position during aggressive workouts, dynamic HIIT, or cardio sessions.",
    features: [
      "Side TPU stabilization frame locks posture",
      "Multi-directional high-density grip",
      "Lightweight dynamic energy midsoles",
      "Hygienic active cooling inner panels"
    ],
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Active Lavender", hex: "#c084fc", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9],
    tags: ["Gym Pro", "Lateral Lock"],
    isNew: false
  },
  {
    id: "campus-prism-streetwear",
    name: "Campus Prism",
    category: "Sneakers",
    gender: "Women",
    price: 180,
    rating: 4.82,
    reviewsCount: 112,
    description: "Bold editorial presentation. Clean geometric micro-panels styled with contrasting pastels and structured on a heavy 90s heritage cupsole framework.",
    features: [
      "Structured micro-fiber panel matrix layers",
      "Heavy duty vintage skater profile soles",
      "Padded supportive dual tongues",
      "Contrasting geometric neon lining"
    ],
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Prism Cotton Candy", hex: "#fbcfe8", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [6, 7, 8, 9, 10],
    tags: ["Editor Choice", "Retro Wave"],
    isNew: true
  },
  {
    id: "campus-stella-limited-w",
    name: "Campus Stella Limited",
    category: "Limited",
    gender: "Women",
    price: 275,
    rating: 4.98,
    reviewsCount: 41,
    description: "High-voltage editorial aesthetics. Features a stunning reflective composite shell, signature neon dynamic locks, and a premium serial tracking badge.",
    features: [
      "Multi-dimensional holographic glow paint",
      "Dynamic wire-tension side locks",
      "Carbon composite premium spring plate",
      "Exquisite limited numbering badge"
    ],
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Aurora Starlight", hex: "#f472b6", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80" },
      { name: "Dune Rose-Cream", hex: "#fca5a5", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [5, 6, 7, 8, 9],
    tags: ["Hype Drop 🔥", "Collector Grail"],
    isLimited: true,
    isNew: true
  },

  // ==========================================
  // KIDS' COLLECTIONS (5 vibrant, premium items)
  // ==========================================
  {
    id: "campus-tiny-bounce",
    name: "Campus Tiny Bounce",
    category: "Sneakers",
    gender: "Kids",
    price: 95,
    rating: 4.88,
    reviewsCount: 140,
    description: "Made for unstoppable energy fields. Extremely lightweight, bouncy shock absorbers and a clean elastic loop system that prevents tripping hazards.",
    features: [
      "Super-safe elastic elastic speed ropes (no tie)",
      "Vapor-soft hypoallergenic foam interiors",
      "Super heavy duty mudguards for playground high-wear",
      "Luminous neon traction rubber pads"
    ],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Playground Multi-Volt", hex: "#eab308", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [1, 2, 3, 4, 5],
    tags: ["Vibrant Kids", "Easy Wear"],
    isNew: true
  },
  {
    id: "campus-sprint-cadet",
    name: "Campus Sprint Cadet Jr",
    category: "Running",
    gender: "Kids",
    price: 110,
    rating: 4.81,
    reviewsCount: 75,
    description: "Run free in maximum comfort. Loaded with active shock dampers, adaptive mesh breathability, and non-marking protective rubber outsoles.",
    features: [
      "High bounce safety heel cushioning",
      "Aero-mesh lightweight breathing outer skin",
      "Non-marking rubber that won't ruin indoor gym courts",
      "High comfort padded tongue with pull straps"
    ],
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a51?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519241047957-be31d7379a51?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Turbo Blue Glow", hex: "#2563eb", image: "https://images.unsplash.com/photo-1519241047957-be31d7379a51?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [1, 2, 3, 4, 5, 6],
    tags: ["Athletic Cadet", "Play-Ready"],
    isNew: false
  },
  {
    id: "campus-scholar-pro",
    name: "Campus Scholar Pro",
    category: "School",
    gender: "Kids",
    price: 85,
    rating: 4.74,
    reviewsCount: 94,
    description: "Clean, ultra-supportive orthopedic school shoes. Hand-styled black leather chassis combined with structural inner orthotics that ensure healthy arch development.",
    features: [
      "Orthopedic high-comfort arch correction footbed",
      "High fidelity black wipe-clean leather body",
      "Sturdy hook-and-loop quick-strap anchors",
      "Super-grip oil-resistant anti-skid rubber blocks"
    ],
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Polished School Onyx", hex: "#111827", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [2, 3, 4, 5, 6],
    tags: ["Orthopedic Safe", "Tough Leather"],
    isNew: false
  },
  {
    id: "campus-go-jr",
    name: "Campus Go Jr",
    category: "Casual",
    gender: "Kids",
    price: 90,
    rating: 4.85,
    reviewsCount: 43,
    description: "Everyday sneakers for stylish kids who enjoy high-speed actions. Incorporates high tension rubber caps and a breathable soft fiber shell for premium all-day play.",
    features: [
      "Reinforced heavy-duty protective toe-shields",
      "Soft padded sweat-wicking materials",
      "Double stitched seams to prevent tear",
      "Interactive multi-color options"
    ],
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Silly Candy Pink/Mint", hex: "#f472b6", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [1, 2, 3, 4, 5],
    tags: ["Playground Icon", "Best Value"],
    isNew: true
  },
  {
    id: "campus-play-sports",
    name: "Campus Kids Multi-Play",
    category: "Sports",
    gender: "Kids",
    price: 100,
    rating: 4.69,
    reviewsCount: 38,
    description: "Built for sports day, practice runs, and everything in between. Loaded with micro-flex lines on the outsoles to enable clean bio-natural joint flexes.",
    features: [
      "Micro-flex groove channels for joint flexes",
      "High shock absorbing mid-gels",
      "Easy grip tongue locks for fast dress up",
      "Safety reflective highlights"
    ],
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Active Orange Volt", hex: "#f97316", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80" }
    ],
    sizes: [1, 2, 3, 4, 5, 6],
    tags: ["Gym Grade", "Max Flexibility"],
    isNew: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Aiden Cross",
    role: "Collector & Culture Critic",
    review: "The Campus Stealth Carbon feels exactly like sliding into a custom cockpit. The design language is pure cyber-gothic streetwear, and the magnetic strap makes it feel lightyears ahead of typical releases.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    date: "14 hours ago"
  },
  {
    id: "review-2",
    name: "Elena Rostova",
    role: "Sprint Athlete & Industrial Designer",
    review: "I am meticulous about weight-to-feedback ratios since I study design, and the Cyber-Pulse V1 blew my mind. The kinetic pods compress on landing and rebound seamlessly. Plus, the volt luminescence looks magical in low light.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    date: "2 days ago"
  },
  {
    id: "review-3",
    name: "Marcus Vance",
    role: "Streetwear Content Creator",
    review: "I took the Neo-Chrome to a launch event in Tokyo. The light-repressive shifting layers got more questions than my entire outfit combined. Easily my shoe of the year. Absolutely flawless detail work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    date: "1 week ago"
  },
  {
    id: "review-4",
    name: "Chloe Chen",
    role: "Sneaker Blogger",
    review: "Super fast shipping, and the packaging was unbelievable! It felt like unboxing a piece of high-tech space gear rather than just standard kicks. Super comfy and extremely lightweight.",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    date: "2 weeks ago"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gallery-1",
    title: "Cinematic Neo-Chrome Glow",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    tag: "Studio"
  },
  {
    id: "gallery-2",
    title: "Cyber-Pulse Wet Sprints",
    category: "Action",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=80",
    tag: "Performance"
  },
  {
    id: "gallery-3",
    title: "Stealth Carbon Ankle Plating",
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80",
    tag: "Tactical"
  },
  {
    id: "gallery-4",
    title: "Retro Minimalist Skate Urban",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=80",
    tag: "Retro"
  },
  {
    id: "gallery-5",
    title: "Ocean Drift Translucence",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1200&q=80",
    tag: "Concept"
  },
  {
    id: "gallery-6",
    title: "Full Grain Skater Stitching",
    category: "Detail",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80",
    tag: "Craft"
  }
];
