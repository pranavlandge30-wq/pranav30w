import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Send, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setSuccess(true);
      setEmail("");
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const navLinksMap = {
    Collection: [
      { name: "Running Energy Soles", href: "#shop" },
      { name: "Stealth Tactical High-Tops", href: "#shop" },
      { name: "Vanguard Casual Weaves", href: "#shop" },
      { name: "Neo-Chrome Iridescence", href: "#shop" }
    ],
    Company: [
      { name: "Story Manifesto", href: "#story" },
      { name: "Ecological Materials Plan", href: "#story" },
      { name: "Retail Storefront Hubs", href: "#contact" },
      { name: "Campus Security Labs", href: "#contact" }
    ],
    Support: [
      { name: "Inquire Custom Allocation", href: "#contact" },
      { name: "Track Active Shipments", href: "#contact" },
      { name: "Returns & Refund Guarantee", href: "#contact" },
      { name: "Customer Hotline Access", href: "#contact" }
    ]
  };

  return (
    <footer className="bg-neutral-950 text-white pt-24 pb-12 transition-colors duration-500 relative overflow-hidden border-t border-neutral-900">
      
      {/* Background soft geometric detail */}
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Main Grid: Content maps and newsletters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-900">
          
          {/* Column 1-4: Brand Pitch */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="flex items-center space-x-2.5 group">
              <span className="w-9 h-9 flex items-center justify-center bg-white text-black rounded-lg font-display font-extrabold tracking-tighter text-lg">
                C
              </span>
              <span className="font-display font-black text-2xl tracking-widest text-white">
                CAMPUS<span className="text-cyan-500 font-extrabold">.</span>
              </span>
            </a>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans max-w-sm">
              We engineer specialized high-cushion responsive streetwear sneakers that represent elite design structures. Experience Tokyo design aesthetics combined with aerospace engineering.
            </p>

            {/* Social Grid icons */}
            <div className="flex items-center space-x-4 text-xs font-mono">
              <a href="#" className="text-neutral-500 hover:text-cyan-400 uppercase tracking-widest transition duration-200">INSTAGRAM</a>
              <a href="#" className="text-neutral-500 hover:text-cyan-400 uppercase tracking-widest transition duration-200">DISCORD</a>
              <a href="#" className="text-neutral-500 hover:text-cyan-400 uppercase tracking-widest transition duration-200">TIKTOK</a>
            </div>
          </div>

          {/* Column 5-9: Links Map grids */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            {Object.entries(navLinksMap).map(([title, links]) => (
              <div key={title} className="flex flex-col space-y-3">
                <h4 className="font-display font-black text-[10px] uppercase tracking-widest text-neutral-400">
                  {title}
                </h4>
                <ul className="space-y-2 text-[11px] list-none">
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-neutral-500 hover:text-white transition duration-205"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Column 10-12: Interactive Newsletters */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-fuchsia-500 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center space-x-1">
              <Sparkles size={11} className="animate-pulse" />
              <span>LAUNCH INTEL RELEASES</span>
            </span>
            <h4 className="font-display font-extrabold text-sm uppercase tracking-wider text-white">
              STREETWEAR DROPS LETTER
            </h4>
            <p className="text-neutral-400 text-xs font-sans">
              Enroll under our dispatch records to access confidential limited pricing releases and early shoe drops.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex items-center border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900 focus-within:border-cyan-500 transition-colors">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter.terminal@email.com"
                  className="flex-1 px-3 py-2 bg-transparent text-xs font-mono text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black hover:bg-cyan-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={12} />
                </button>
              </div>

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-emerald-400 text-[10px] font-mono flex items-center space-x-1"
                  >
                    <Check size={11} />
                    <span>COORDINATES ENROLLED SUCCESS!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Flagship Showroom & Help Coordinates segment */}
        <div className="mt-12 pt-8 pb-4 border-t border-neutral-900 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-400 font-sans">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-500 block">Flagship Retailer</span>
            <p className="text-neutral-300 leading-relaxed">
              Survey No.207, Phoenix Mall pune,<br />
              Store No, GP-06A, Viman Nagar Rd,<br />
              Pune, Maharashtra 411014
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-500 block">Immediate Hotline</span>
            <p className="text-neutral-300 font-mono">
              <a href="tel:08071178267" className="hover:text-cyan-400 transition-colors">
                08071 178 267
              </a>
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
              Mon - Sun: 10:00 AM - 10:00 PM IST
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-500 block">Electronic Mailing Unit</span>
            <p className="text-neutral-300">
              <a href="mailto:customercare@campusshoes.com" className="hover:text-cyan-400 font-mono transition-colors">
                customercare@campusshoes.com
              </a>
            </p>
            <p className="text-[11px] text-neutral-500 leading-relaxed font-sans">
              Expected operational response: Under 6 business hours
            </p>
          </div>
        </div>

        {/* Small Footer bar */}
        <div className="pt-8 mt-4 border-t border-neutral-900/60 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 space-y-4 md:space-y-0">
          <div>
            <span>© {new Date().getFullYear()} CAMPUS FOOTWEAR TECHNOLOGIES GROUP INC. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors duration-150">TERMS OF HANDSHAKE</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors duration-150">CRYPTO POLICY SECUREMENT</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
