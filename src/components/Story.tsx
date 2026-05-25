import { motion } from "motion/react";
import { Sparkles, Globe, Recycle, Compass, ArrowUpRight } from "lucide-react";

export default function Story() {
  const stats = [
    { value: "100%", label: "Sustainable Soles", icon: <Recycle size={18} className="text-lime-400" /> },
    { value: "48+", label: "Global Street Hubs", icon: <Globe size={18} className="text-cyan-400" /> },
    { value: "18M", label: "Lab R&D Testing", icon: <Sparkles size={18} className="text-fuchsia-400" /> }
  ];

  return (
    <section 
      id="story" 
      className="py-24 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column Left (1-5): Editorial Brand Philosophy Narrative */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center space-y-6">
            <span className="text-cyan-500 text-xs font-mono font-bold uppercase tracking-widest block">
              THE CAMPUS MANIFESTO
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight">
              Reimagining Streetwear Culture
            </h2>
            
            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-sans">
              Born from structural architecture labs andTokyo skate centers, CAMPUS merges absolute athletic integrity with premium streetwear design. We reject disposable fashion.
            </p>

            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed font-sans">
              Our outsoles are engineered from 100% bio-recycled carbon polymers that compress, adapt, and rebound seamlessly dynamically under your foot. Every sneaker is a modular proof of concept — designed for longevity, styled for the cyberpunk future.
            </p>

            {/* Premium Stat Boxes */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200/55 dark:border-neutral-800/40">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div className="mb-2 p-1.5 bg-neutral-100 dark:bg-neutral-900 rounded">{stat.icon}</div>
                  <span className="text-lg sm:text-xl font-display font-black text-neutral-900 dark:text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-mono tracking-tighter mt-1 block h-8">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Aesthetic signature label */}
            <div className="pt-2 flex items-center space-x-3">
              <span className="w-10 h-[1.5px] bg-[#111] dark:bg-white" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-neutral-800 dark:text-white">
                CAMPUS FUTURES GROUP INC.
              </span>
            </div>
          </div>

          {/* Column Right (6-12) - High Contrast Editorial Photo Grid */}
          <div className="lg:col-span-7 relative">
            {/* Ambient vector details */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[80px] bg-indigo-500/10 pointer-events-none" />

            <div className="grid grid-cols-12 gap-4 items-end">
              {/* Image 1: Main vertical model shoe focus */}
              <div className="col-span-8 overflow-hidden rounded-2xl relative shadow-xl transform rotate-[-1deg] group">
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80"
                  alt="Campus Street culture focus"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[360px] transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-left">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">STREET EXCEL</span>
                  <h4 className="text-white text-xs font-bold font-display uppercase tracking-wider">HARNESS THE GRAVITY</h4>
                </div>
              </div>

              {/* Image 2: Secondary offset upper square */}
              <div className="col-span-4 flex flex-col space-y-4">
                <div className="overflow-hidden rounded-2xl relative shadow-lg transform rotate-[2deg] group">
                  <img
                    src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=80"
                    alt="Campus leather design detail"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover max-h-[160px] transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-900/10 dark:bg-neutral-900/35" />
                </div>

                {/* Micro tech card decoration (minimal layout) */}
                <div className="rounded-2xl p-4 bg-black dark:bg-neutral-900 text-left border border-neutral-800 select-none flex flex-col justify-between h-40">
                  <ArrowUpRight size={20} className="text-cyan-500 hover:rotate-45 transition-transform" />
                  <div>
                    <h5 className="font-display font-bold text-xs text-white uppercase tracking-wider">TOKYO RELEASES</h5>
                    <p className="text-[10px] text-neutral-400 font-mono mt-1">Sourcing premium fabrics organically manufactured.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
