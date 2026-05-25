import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Clock, ShieldAlert, Sparkles, Send, CheckCircle } from "lucide-react";

export default function HypeDrop() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 14,
    minutes: 42,
    seconds: 18
  });

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<"spec" | "story">("spec");

  // Countdown clock dynamic update
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Restart cycle to keep preview looking active
          return { days: 0, hours: 24, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <section 
      id="limited-drop" 
      className="py-28 bg-neutral-950 text-white relative overflow-hidden border-t border-b border-neutral-900"
    >
      {/* Immersive Dark ambient highlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] bg-indigo-600/10 pointer-events-none" />
      <div className="absolute -top-10 right-10 w-[400px] h-[400px] rounded-full blur-[150px] bg-fuchsia-600/10 pointer-events-none" />
      
      {/* Decorative vertical background grids */}
      <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent opacity-50" />
      <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT PANEL (Grid 1-7): Shoe Visual Spotlight & Countdown details */}
          <div className="lg:col-span-7 relative flex flex-col justify-center items-center text-center lg:text-left">
            
            {/* Massive backdrop label */}
            <span className="absolute top-0 opacity-10 select-none text-[120px] sm:text-[180px] font-display font-black leading-none uppercase tracking-tighter text-neutral-800 pointer-events-none z-0">
              GRAIL
            </span>

            <div className="relative w-full max-w-lg mt-8 z-10 flex flex-col items-center">
              {/* Floating state badge */}
              <div className="flex items-center space-x-2 bg-red-500/10 border border-red-500/35 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest text-red-500 mb-6 shadow-lg shadow-red-500/10">
                <Flame size={12} className="animate-pulse" />
                <span>EXQUISITE HYPE DEPLOYMENT INSTANT</span>
              </div>

              {/* Central Shoe image with glowing shadow base */}
              <div className="relative w-full h-[280px] sm:h-[360px] flex items-center justify-center group">
                <div className="absolute w-52 h-52 rounded-full bg-red-600/15 blur-[65px] animate-pulse pointer-events-none" />
                <div className="absolute bottom-6 w-44 h-5 bg-black/80 blur-lg rounded-full transform scale-x-110 opacity-80" />
                
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                  alt="Campus Limited Edition Phoenix V2"
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transform -scale-x-100 rotate-[-15deg] group-hover:rotate-[-8deg] group-hover:scale-105 transition-all duration-500 filter drop-shadow-[0_15px_30px_rgba(239,68,68,0.25)]"
                />
              </div>

              {/* Time ticking HUD meters */}
              <div className="grid grid-cols-4 gap-3.5 sm:gap-4 mt-8 w-full max-w-sm font-mono text-center">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.minutes, label: "MINS" },
                  { value: timeLeft.seconds, label: "SECONDS" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-neutral-900/80 border border-neutral-800/60 p-3 sm:p-4 rounded-xl relative shadow-md">
                    {/* Glowing highlight point */}
                    <span className="absolute top-1 right-1 w-1 h-1 bg-red-500 rounded-full animate-ping" />
                    
                    <span className="text-xl sm:text-2xl font-black text-white block leading-none">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-bold block mt-1 tracking-widest leading-none">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL (Grid 8-12): Launch subscription queue term */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center space-y-6">
            <div>
              <span className="text-red-500 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                LIMITED DROP REVEAL
              </span>
              <h3 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-widest leading-tight">
                APEX PHOENIX V2
              </h3>
              <div className="flex items-center space-x-3.5 mt-2.5">
                <span className="text-lg font-mono font-bold text-neutral-300">Target MSRP: $310</span>
                <span className="bg-neutral-800 text-neutral-400 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">
                  SERIAL COUPE No. 001 - 150
                </span>
              </div>
            </div>

            {/* Spec / Description Tab controls */}
            <div className="border-b border-neutral-900 flex space-x-6 text-[11px] font-mono uppercase tracking-widest">
              <button
                onClick={() => setActiveTab("spec")}
                className={`pb-2.5 relative transition-colors ${activeTab === "spec" ? "text-red-500 font-black" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                1. Hype Blueprints
                {activeTab === "spec" && <motion.div layoutId="dropTabLine" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-500" />}
              </button>
              <button
                onClick={() => setActiveTab("story")}
                className={`pb-2.5 relative transition-colors ${activeTab === "story" ? "text-red-500 font-black" : "text-neutral-500 hover:text-neutral-300"}`}
              >
                2. Sensation Concept
                {activeTab === "story" && <motion.div layoutId="dropTabLine" className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-500" />}
              </button>
            </div>

            <div className="min-h-[110px]">
              {activeTab === "spec" ? (
                <ul className="space-y-2 text-xs font-sans text-neutral-300 font-medium list-none">
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>Dynamic fire-dyed hyper-woven outer frame</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>Propandial carbon propulsion plate delivers 11.2% speed flex</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>Anodized heavy metal serial badge on heel counters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <span>Super-rare light shifting paint transitions beautifully in motion</span>
                  </li>
                </ul>
              ) : (
                <p className="text-neutral-400 text-xs leading-relaxed font-sans font-medium">
                  The Apex Phoenix V2 represents elite architectural limits. Crafted for absolute collection lists, only 150 individually serialized coupes will be produced at our custom workspace. This drop relies on standard allocation keys; queue entry ensures live launch alerts.
                </p>
              )}
            </div>

            {/* FOMO Notification Indicator */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-start space-x-3 text-neutral-400 font-sans text-xs">
              <ShieldAlert className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
              <div>
                <strong className="block text-white mb-0.5 uppercase tracking-wide font-bold">Crucial Allocation Notice:</strong>
                <span>Allocation follows strict reservation order. Once the counter reaches zero, registered queue keys get priority checkouts.</span>
              </div>
            </div>

            {/* Drop Queue Booking Terminal Form */}
            <div className="bg-neutral-950 p-1.5 border border-neutral-800/80 rounded-2xl">
              <span className="text-[9px] font-mono tracking-widest text-neutral-500 block mb-2 px-2.5 uppercase font-semibold">
                Allocation Reservation Node
              </span>
              
              <AnimatePresence mode="wait">
                {isSubscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center space-x-2.5 text-emerald-400 font-mono text-2xs uppercase tracking-wider"
                  >
                    <CheckCircle size={16} />
                    <span>Allocation Key Issued! Check Your Inbox.</span>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-2.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email to Secure Key..."
                      className="flex-1 bg-neutral-900/60 border border-neutral-800 px-4 py-3 text-2xs text-white rounded-xl placeholder-neutral-500 font-mono focus:outline-none focus:border-red-500/80 transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-3xs font-mono font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-colors shadow-lg shadow-red-600/10 cursor-pointer"
                    >
                      <span>Join Queue</span>
                      <Send size={10} />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
