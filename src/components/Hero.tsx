import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles, Flame, ShieldCheck, Zap } from "lucide-react";
import { Product } from "../types";

interface HeroProps {
  heroProducts: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Hero({ heroProducts, onAddToCart }: HeroProps) {
  // Let the user select between 3 premium showcase sneakers in the hero
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = heroProducts[activeIndex % heroProducts.length];
  
  // Floating particle coordinates
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 35,
        y: (e.clientY / window.innerHeight - 0.5) * 35,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Theme accents depending on selected shoe
  const themes = [
    {
      glow: "from-lime-400/25 to-transparent",
      accent: "text-lime-400",
      bgBadge: "bg-lime-400/10 text-lime-400 border-lime-400/20",
      accentGlow: "shadow-lime-400/40"
    },
    {
      glow: "from-neutral-500/20 to-transparent",
      accent: "text-neutral-400",
      bgBadge: "bg-neutral-500/10 text-neutral-300 border-neutral-500/20",
      accentGlow: "shadow-neutral-500/40"
    },
    {
      glow: "from-magenta-400/25 to-transparent",
      accent: "text-fuchsia-400",
      bgBadge: "bg-fuchsia-400/10 text-fuchsia-400 border-fuchsia-400/20",
      accentGlow: "shadow-fuchsia-400/40"
    }
  ];

  const currentTheme = themes[activeIndex % themes.length] || themes[0];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 cyber-grid"
    >
      {/* Background Radial Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-40 dark:opacity-20 bg-cyan-400 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-35 dark:opacity-15 bg-purple-500 transition-all duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`
          }}
        />
      </div>

      {/* Floating Interactive Coordinates & Grid Markers for Cyber-vibe (No telemetry clutters, standard elegant typography) */}
      <div className="absolute bottom-8 left-8 hidden xl:flex flex-col space-y-1 text-[10px] font-mono uppercase tracking-widest text-neutral-400 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
          <span>FUTURISTIC STREETWEAR LAB</span>
        </div>
        <span>COORD: 35.6762° N, 139.6503° E</span>
      </div>

      <div className="absolute bottom-8 right-8 hidden xl:flex flex-col items-end space-y-1 text-[10px] font-mono tracking-widest text-neutral-400 pointer-events-none">
        <span>MODEL NO: C-7001</span>
        <span>ENERGY RETURN: 98.4%</span>
      </div>

      {/* Layout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Copy (Grid 1-6) */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <span className={`inline-flex items-center space-x-1 px-3.5 py-1 text-[11px] font-mono uppercase tracking-widest border rounded-full ${currentTheme.bgBadge}`}>
                <Zap size={11} className="animate-pulse" />
                <span>LIMITLESS TECH RELEASES</span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              {/* Backside giant hollow word */}
              <h2 className="absolute -top-[50px] -left-4 text-[70px] sm:text-[110px] uppercase font-display font-black text-neutral-200/40 dark:text-neutral-900/40 select-none tracking-tighter leading-none -z-10">
                LIMITLESS
              </h2>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl uppercase font-display font-black tracking-tight text-neutral-900 dark:text-white leading-[1.05]">
                Step Into <br />
                <span className="bg-gradient-to-r from-cyan-500 via-indigo-400 to-fuchsia-500 bg-clip-text text-transparent">
                  The Future
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg font-sans"
            >
              Welcome to the vanguard of footwear. We merge high-lux streetwear style with hyper-responsive aerospace cushion soles. Experience {activeProduct.name} built for the gravity defiant.
            </motion.p>

            {/* Micro specs of the active shoe in Hero */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeProduct.id}
              className="grid grid-cols-3 gap-4 py-3 border-y border-neutral-200/40 dark:border-neutral-800/40 max-w-md font-mono"
            >
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">TRACTION</span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">CARBON HUB</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">WEIGHT</span>
                <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">245G / HELIX</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">RATING</span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-500 flex items-center">⭐ {activeProduct.rating}</span>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              <a
                href="#shop"
                className="group relative inline-flex items-center space-x-2.5 px-7 py-4 bg-black dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white transition-all duration-300 shadow-xl shadow-neutral-950/10"
              >
                <span>Shop Collection</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center px-6 py-4 glass-panel hover:bg-neutral-100 dark:hover:bg-neutral-900/60 text-neutral-800 dark:text-white rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                Philosophy
              </a>
            </motion.div>
          </div>

          {/* Cinematic Interactive Center Sneaker Showcase (Grid 7-12) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] sm:min-h-[500px]">
            {/* Soft backdrop circular neon glow */}
            <div className={`absolute w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full blur-[80px] sm:blur-[120px] opacity-30 bg-gradient-to-tr ${currentTheme.glow} transition-all duration-700`} />

            {/* Background branding typography wrapper */}
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none -z-10 overflow-hidden leading-none font-display">
              <span className="text-[100px] sm:text-[180px] font-black text-neutral-100/45 dark:text-neutral-900/25 tracking-tighter uppercase leading-none transform rotate-12">
                CAMPUS
              </span>
            </div>

            {/* Bouncing Parallax Active Shoe Image Container */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: -12,
                  y: [0, -12, 0] // floating bounce loop
                }}
                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                transition={{
                  duration: 0.65,
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
                className="relative w-full max-w-[280px] sm:max-w-md pointer-events-none z-10 filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.30)] dark:drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500"
                style={{
                  transform: `rotate(-12deg) translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transform -scale-x-100 select-none mask-fade-bottom"
                />

                {/* Cyber accent marker indicators */}
                <span className="absolute top-1/4 right-[10%] w-3 h-3 bg-cyan-400 rounded-full animate-ping pointer-events-auto cursor-help" title="Responsive Outsole" />
                <span className="absolute bottom-1/3 left-[20%] w-3 h-3 bg-fuchsia-400 rounded-full animate-ping pointer-events-auto cursor-help" title="Carbon Stability Core" />
              </motion.div>
            </AnimatePresence>

            {/* Interactive Selector Sidebar (Float selector tabs bottom/side) */}
            <div className="absolute right-0 bottom-4 sm:bottom-12 flex flex-col space-y-4 z-20">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 text-right mr-3 hidden sm:block">
                SWAP RELEASE
              </span>
              <div className="flex flex-row sm:flex-col space-x-2 sm:space-x-0 sm:space-y-3 bg-white/40 dark:bg-black/30 p-2 sm:p-2.5 rounded-full border border-neutral-200/50 dark:border-neutral-850/30 backdrop-blur-md">
                {heroProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                      activeIndex === idx
                        ? "border-cyan-500 scale-110 shadow-lg shadow-cyan-500/20"
                        : "border-transparent hover:border-neutral-400 scale-100 hover:scale-105"
                    }`}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Circular active item price badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="absolute top-6 left-0 sm:left-4 w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-full flex flex-col items-center justify-center shadow-2xl skew-x-3 text-center border border-neutral-800 dark:border-neutral-200"
              >
                <span className="text-[10px] font-mono uppercase tracking-tighter">ONLY</span>
                <span className="text-md font-display font-extrabold tracking-tighter">${activeProduct.price}</span>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
