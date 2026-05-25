import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  ShoppingBag, 
  Zap, 
  Sparkles, 
  Gauge, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";
import { Product, ProductColor } from "../types";

interface ShowcaseProps {
  showcaseProduct: Product;
  onAddToCart: (product: Product, size: number, color: ProductColor, quantity: number) => void;
  onInstantBuy: (product: Product, size: number, color: ProductColor, quantity: number) => void;
}

export default function Showcase({ 
  showcaseProduct, 
  onAddToCart, 
  onInstantBuy 
}: ShowcaseProps) {
  // Configured states for custom interactive showcase
  const [selectedColor, setSelectedColor] = useState<ProductColor>(showcaseProduct.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(showcaseProduct.sizes[1] || 9);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"specs" | "details">("specs");
  
  // Showcase mouse hover 3D tilt coordinates
  const [tiltStyle, setTiltStyle] = useState({ transform: "rotate(-12deg) scale(1)" });
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    // Calculate tilt angles
    const tiltX = (y / (box.height / 2)) * -12;
    const tiltY = (x / (box.width / 2)) * 12;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05) rotate(-10deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ transform: "rotate(-12deg) scale(1)" });
  };

  const handleAddToCart = () => {
    onAddToCart(showcaseProduct, selectedSize, selectedColor, selectedQuantity);
    setShowSuccessBadge(true);
    setTimeout(() => {
      setShowSuccessBadge(false);
    }, 2000);
  };

  const handleInstantBuy = () => {
    onInstantBuy(showcaseProduct, selectedSize, selectedColor, selectedQuantity);
  };

  return (
    <section 
      id="showcase" 
      className="py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Dynamic backdrop glow reflecting the hex code of active color option */}
        <div 
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[160px] opacity-25 dark:opacity-15 transition-all duration-700"
          style={{ backgroundColor: selectedColor.hex }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column List (1-6): Fully Interactive Hover-Rotate Visual Canvas */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center relative">
            <span className="absolute -top-12 left-4 text-[100px] sm:text-[145px] font-display font-black text-neutral-200/40 dark:text-neutral-800/15 uppercase tracking-tighter leading-none select-none pointer-events-none">
              ORBIT
            </span>
            
            {/* Interactive Tilt visual wrapper */}
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[280px] sm:max-w-md h-[340px] sm:h-[425px] flex items-center justify-center cursor-crosshair rounded-3xl"
            >
              {/* Backglow technical vector circles */}
              <div 
                className="absolute w-56 sm:w-80 h-56 sm:h-80 rounded-full border border-dashed border-neutral-300 dark:border-neutral-750/50 flex items-center justify-center animate-spin"
                style={{ animationDuration: "25s" }}
              >
                <div className="w-40 sm:w-60 h-40 sm:h-60 rounded-full border border-neutral-200 dark:border-neutral-800" />
              </div>

              {/* Central Dynamic Sneaker */}
              <div 
                className="relative z-10 transition-transform duration-200 ease-out filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
                style={tiltStyle}
              >
                {/* Image updates dynamically as selectedColor updates */}
                <img
                  src={selectedColor.image}
                  alt={showcaseProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain transform -scale-x-100 select-none mask-fade-bottom"
                />
              </div>

              {/* Real-time instruction tag floating on bottom */}
              <div className="absolute bottom-4 bg-black/85 text-white dark:bg-white dark:text-black rounded-full px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase shadow-lg flex items-center space-x-1.5">
                <RefreshCw size={10} className="animate-spin" />
                <span>Hover / Tilt to rotate</span>
              </div>
            </div>

            {/* Micro details panel highlighting technical achievements of Campus Orbit Max */}
            <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-md">
              <div className="p-3.5 rounded-xl glass-panel text-left">
                <Gauge size={16} className="text-cyan-500 mb-1" />
                <h4 className="text-xs font-bold text-neutral-800 dark:text-white uppercase font-display">Tension Wrap</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-sans mt-0.5">Quick mechanical strap locks standard lacing instantly.</p>
              </div>
              <div className="p-3.5 rounded-xl glass-panel text-left">
                <ShieldCheck size={16} className="text-fuchsia-500 mb-1" />
                <h4 className="text-xs font-bold text-neutral-800 dark:text-white uppercase font-display">Aerodynamic core</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-sans mt-0.5">Dual-density foam returns 98.4% of stride compression energy.</p>
              </div>
            </div>
          </div>

          {/* Column List (7-12): Custom Attribute Pickers & Action Buttons */}
          <div className="lg:col-span-6 text-left">
            <span className="text-cyan-500 text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              SIGNATURE RELEASE COUPE
            </span>
            <span className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-[10px] font-mono leading-none font-bold px-2.5 py-1 rounded-full uppercase tracking-wider mb-3 inline-flex items-center space-x-1">
              <Sparkles size={10} className="animate-pulse" />
              <span>MOST ADVANCED MODEL</span>
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight mt-1.5">
              {showcaseProduct.name}
            </h2>

            <div className="flex items-baseline space-x-3 mt-3 mb-6 font-mono">
              <span className="text-3xl font-black text-neutral-900 dark:text-white">
                ${showcaseProduct.price}
              </span>
              <span className="text-xs text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800 dark:text-neutral-400 px-2.5 py-1 rounded-full">
                Guaranteed Restock Free
              </span>
            </div>

            {/* Custom Tabbed description / tech specs switcher */}
            <div className="border-b border-neutral-200/40 dark:border-neutral-800/40 mb-5 flex space-x-6 text-xs font-mono uppercase tracking-widest">
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-3 transition duration-200 relative ${activeTab === "specs" ? "text-cyan-500 font-extrabold" : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"}`}
              >
                1. System Specs
                {activeTab === "specs" && <motion.div layoutId="showcaseTabLine" className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500" />}
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`pb-3 transition duration-200 relative ${activeTab === "details" ? "text-cyan-500 font-extrabold" : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"}`}
              >
                2. Design Story
                {activeTab === "details" && <motion.div layoutId="showcaseTabLine" className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500" />}
              </button>
            </div>

            <div className="min-h-[100px] mb-6">
              {activeTab === "specs" ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-sans text-neutral-700 dark:text-neutral-300 font-medium list-none">
                  {showcaseProduct.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-500 dark:text-neutral-300 text-sm leading-relaxed font-sans">
                  The {showcaseProduct.name} took 18 months of intensive lab testing to construct. Combining sustainable recycled high-density fibers with our signature air-compression midsole design, it delivers an lightweight retro-punk aesthetic designed to last for a millennium.
                </p>
              )}
            </div>

            {/* Interactivity: Color Picker */}
            <div className="mb-6 border-t border-neutral-200/30 dark:border-neutral-800/20 pt-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">
                  Select Colorway
                </span>
                <span className="text-xs font-mono text-neutral-900 dark:text-white font-bold uppercase">
                  {selectedColor.name}
                </span>
              </div>
              <div className="flex space-x-3.5">
                {showcaseProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full relative flex items-center justify-center transition-transform duration-200 ${
                      selectedColor.name === color.name 
                        ? "scale-110 shadow-lg border-2 border-cyan-500" 
                        : "hover:scale-105 border border-white"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Color ${color.name}`}
                  >
                    {selectedColor.name === color.name && (
                      <Check 
                        size={14} 
                        className={color.hex === "#fafaf9" || color.hex === "#f5f5f4" || color.hex === "#fef08a" ? "text-neutral-900" : "text-white"} 
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactivity: Sizing selection scale */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">
                  Select US Mens Sizing
                </span>
                <span className="text-xs font-mono text-neutral-400 hover:underline cursor-pointer">
                  Sizing Guide
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2.5 max-w-sm">
                {showcaseProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-lg text-xs font-mono font-bold transition-all duration-200 ${
                      selectedSize === sz
                        ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                        : "bg-white dark:bg-neutral-950 border border-neutral-200/40 dark:border-neutral-800/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Selection Quantity Controls */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">Quantity</span>
              <div className="flex items-center border border-neutral-200 dark:border-neutral-850 rounded-lg overflow-hidden font-mono text-sm bg-white dark:bg-neutral-950">
                <button
                  onClick={() => setSelectedQuantity(q => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 focus:outline-none hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
                >
                  -
                </button>
                <span className="px-5 font-bold text-neutral-900 dark:text-white">{selectedQuantity}</span>
                <button
                  onClick={() => setSelectedQuantity(q => q + 1)}
                  className="px-3.5 py-1.5 focus:outline-none hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Core Action Button Group: Buy Now (Direct user checkouts) & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={showSuccessBadge}
                className={`flex-1 py-4 px-6 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl ${
                  showSuccessBadge
                    ? "bg-emerald-500 text-white"
                    : "bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white"
                }`}
              >
                <ShoppingBag size={14} />
                <span>{showSuccessBadge ? "PRODUCT ADDED BAG" : "ADD TO SHOPPING BAG"}</span>
              </button>

              <button
                onClick={handleInstantBuy}
                className="py-4 px-8 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 hover:scale-103 transition-transform"
              >
                <Zap size={14} className="animate-pulse" />
                <span>BUY NOW INSTANT</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
