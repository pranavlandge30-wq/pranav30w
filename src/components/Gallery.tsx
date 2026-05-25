import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Eye, Sparkles } from "lucide-react";
import { GALLERY_ITEMS } from "../data";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [fullscreenItem, setFullscreenItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filters = ["All", "Editorial", "Streetwear", "Lifestyle", "Action"];

  const filteredItems = activeFilter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section 
      id="gallery" 
      className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-cyan-500 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
              EDITORIAL EXCLUSIVES
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight">
              Aesthetic Lookbook
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filters.map((fil) => (
              <button
                key={fil}
                onClick={() => setActiveFilter(fil)}
                className={`px-4 py-2 text-[11px] font-bold tracking-widest uppercase rounded cursor-pointer transition-colors ${
                  activeFilter === fil
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "bg-neutral-200/50 dark:bg-neutral-900 text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {fil}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Display layout with zoom effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout animate-once">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                key={item.id}
                onClick={() => setFullscreenItem(item)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl h-80 shadow-sm border border-neutral-200/20 dark:border-neutral-850/20"
              >
                {/* Background image */}
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlying gradient masks */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-85" />

                {/* Tags on top right */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono tracking-widest text-white uppercase font-bold">
                  {item.tag}
                </div>

                {/* Text specs on bottom left */}
                <div className="absolute bottom-5 left-5 text-left">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-white font-display font-extrabold text-lg mt-0.5 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  
                  <span className="inline-flex items-center space-x-1.5 text-neutral-400 text-[10px] font-mono uppercase mt-2 group-hover:text-cyan-400 transition-colors duration-200">
                    <ZoomIn size={11} />
                    <span>Expand Frame</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* LIGHTBOX FULLSCREEN OVERLAY PORTAL */}
      <AnimatePresence>
        {fullscreenItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Close trigger */}
            <button
              onClick={() => setFullscreenItem(null)}
              className="absolute top-6 right-6 p-2 bg-neutral-900 border border-neutral-800 text-white hover:bg-rose-600 transition-colors rounded-full z-50 cursor-pointer"
              aria-label="Close lookbook zoom"
            >
              <X size={20} />
            </button>

            {/* Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={fullscreenItem.image}
                alt={fullscreenItem.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
              />

              {/* Informational footer overlay */}
              <div className="text-left w-full mt-5 max-w-xl text-white">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
                  <Sparkles size={11} />
                  <span>CAMPUS DIGITAL LAB // {fullscreenItem.category}</span>
                </span>
                <h3 className="text-xl font-display font-black uppercase mt-1 tracking-tight">
                  {fullscreenItem.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 font-mono">
                  SHOT UNDER SPECIAL DIGITAL LIGHTING. NO RECOLORING APPLIED. ALL LOGOS COPYRIGHT CAMPUS GROUP INT.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
