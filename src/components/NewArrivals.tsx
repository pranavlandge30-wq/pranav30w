import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Flame, Sparkles, TrendingUp } from "lucide-react";
import { Product } from "../types";

interface NewArrivalsProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function NewArrivals({ products, onProductClick }: NewArrivalsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter only what counts as a hot new drop or limited edition
  const newArrivals = products.filter(p => p.isNew || p.isLimited);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="new-arrivals" 
      className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Background decoration elements */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] rounded-full blur-[100px] bg-cyan-400/5 dark:bg-cyan-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Slider Arrows */}
        <div className="flex items-end justify-between mb-10">
          <div className="text-left">
            <span className="text-fuchsia-500 text-xs font-mono font-bold uppercase tracking-widest flex items-center space-x-1 mb-2">
              <Flame size={12} className="animate-pulse" />
              <span>STREET SENSATION drops</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight">
              New Drops &amp; Limited
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md mt-2">
              High demand limited-run sneakers. Zero restocks of these exact configurations once sold out. Tap to explore details.
            </p>
          </div>

          {/* Mechanical arrows tracker */}
          <div className="flex space-x-3">
            <button
              onClick={scrollLeft}
              className="p-3 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white rounded-full border border-neutral-200/50 dark:border-neutral-800 transition shadow-sm"
              aria-label="Scroll left catalog"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-white rounded-full border border-neutral-200/50 dark:border-neutral-800 transition shadow-sm"
              aria-label="Scroll right catalog"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Layout */}
        <div 
          ref={sliderRef}
          className="flex space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x snap-mandatory"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {newArrivals.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onProductClick(prod)}
              className="flex-shrink-0 w-[290px] sm:w-[330px] snap-start cursor-pointer group"
            >
              {/* Outer shell representation */}
              <div className="relative rounded-2xl glass-panel p-5 overflow-hidden transition-all duration-300 group-hover:border-fuchsia-500/40 group-hover:shadow-lg dark:group-hover:shadow-black/40">
                
                {/* Visual Glow background on active selection hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge tags */}
                <div className="absolute top-4 left-4 z-10 flex space-x-1.5">
                  {prod.isLimited && (
                    <span className="bg-gradient-to-r from-red-600 to-amber-500 text-white text-[9.5px] font-mono leading-none font-bold px-2 py-1 rounded flex items-center space-x-0.5 shadow-md">
                      <Flame size={10} />
                      <span>LIMITED RUN</span>
                    </span>
                  )}
                  {prod.isNew && (
                    <span className="bg-cyan-500 text-white text-[9.5px] font-mono leading-none font-bold px-2 py-1 rounded flex items-center space-x-0.5 shadow-md">
                      <Sparkles size={10} />
                      <span>NEW DROP</span>
                    </span>
                  )}
                </div>

                {/* Main floating sneaker image */}
                <div className="relative h-44 sm:h-48 flex items-center justify-center mt-3 mb-6">
                  {/* Glowing halo behind shoe */}
                  <div className={`absolute w-36 h-36 rounded-full blur-[45px] opacity-10 transition-colors duration-500 ${prod.isLimited ? 'bg-orange-500' : 'bg-cyan-400'}`} />
                  
                  {/* Shadow drop */}
                  <div className="absolute bottom-1 w-32 h-3.5 bg-black/10 dark:bg-black/35 blur-md rounded-full transform scale-x-110 group-hover:scale-x-95 transition-transform duration-300" />
                  
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transform -scale-x-100 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300"
                  />
                </div>

                {/* Detail elements */}
                <div className="text-left relative z-10">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block font-medium">
                      {prod.category}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-500 font-bold flex items-center space-x-0.5">
                      <TrendingUp size={11} />
                      <span>HIGH DEMAND</span>
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-neutral-900 dark:text-white line-clamp-1 group-hover:text-cyan-500 transition-colors duration-200">
                    {prod.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-baseline space-x-2 font-mono">
                      <span className="text-lg font-black text-neutral-900 dark:text-white">
                        ${prod.price}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                          ${prod.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-500 font-semibold flex items-center group-hover:translate-x-1.5 transition-transform duration-200">
                      <span>QUICK CONFIG</span>
                      <ArrowRight size={10} className="ml-1" />
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
