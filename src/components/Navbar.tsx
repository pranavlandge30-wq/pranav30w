import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Sparkles, 
  Compass, 
  Tag, 
  User, 
  ArrowRight
} from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  cartItemsCount: number;
  onCartOpen: () => void;
  onSearchOpen: () => void;
  onCheckoutOpen: () => void;
}

export default function Navbar({
  isDarkMode,
  onToggleDarkMode,
  cartItemsCount,
  onCartOpen,
  onSearchOpen,
  onCheckoutOpen
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Shop", href: "#shop" },
    { name: "Limited Drop", href: "#limited-drop" },
    { name: "Showcase", href: "#showcase" },
    { name: "Gallery", href: "#gallery" },
    { name: "Story", href: "#story" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* UPPER SLICK BRAND & SHOWROOM CONTACT RIBBON */}
        <div className="bg-neutral-950 text-neutral-400 dark:bg-neutral-900 dark:text-neutral-300 text-[10px] font-mono tracking-wider py-2 px-4 md:px-8 border-b border-neutral-900/60 dark:border-neutral-800/20 flex flex-col sm:flex-row justify-between items-center gap-1.5 transition-all text-center">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping inline-block" />
            <span className="font-sans font-medium uppercase text-neutral-100">Flagship Showroom Pune: GP-06A, Phoenix Mall</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:08071178267" className="hover:text-cyan-400 dark:hover:text-cyan-455 transition-colors flex items-center space-x-1">
              <span>📞 08071 178 267</span>
            </a>
            <span className="opacity-30">|</span>
            <a href="mailto:customercare@campusshoes.com" className="hover:text-cyan-400 dark:hover:text-cyan-455 transition-colors flex items-center space-x-1">
              <span>✉ customercare@campusshoes.com</span>
            </a>
          </div>
        </div>

        <nav
          id="navbar"
          className={`transition-all duration-500 ${
            isScrolled 
              ? "py-3 shadow-xl border-b border-neutral-200/40 dark:border-neutral-800/20 glass-nav" 
              : "py-6 bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a href="#home" className="flex items-center space-x-2 group">
                <span className="w-9 h-9 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-lg font-display font-extrabold tracking-tighter text-lg transform hover:scale-110 transition duration-300">
                  C
                </span>
                <span className="font-display font-black text-xl sm:text-2xl tracking-widest text-[#111] dark:text-white group-hover:text-cyan-500 transition-colors duration-300">
                  CAMPUS<span className="text-cyan-500 font-extrabold">.</span>
                </span>
              </a>

              {/* Desktop Navigation Linkages */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-sans font-medium text-xs uppercase tracking-widest text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white transition duration-200 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-[-6px] left-0 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>

              {/* Icons Bar */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                {/* Dark mode switcher */}
                <button
                  onClick={onToggleDarkMode}
                  className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white focus:outline-none transition-colors duration-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
                  aria-label="Toggle Theme Mode"
                >
                  {isDarkMode ? <Sun size={19} /> : <Moon size={19} />}
                </button>

                {/* Dynamic Search Toggle */}
                <button
                  onClick={onSearchOpen}
                  className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white focus:outline-none transition-colors duration-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
                  aria-label="Search Catalog"
                >
                  <Search size={19} />
                </button>

                {/* Shopping Bag Dynamic Button */}
                <button
                  onClick={onCartOpen}
                  className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white focus:outline-none transition-colors duration-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900/60 relative"
                  aria-label="Shopping Cart"
                >
                  <ShoppingBag size={19} />
                  <AnimatePresence>
                    {cartItemsCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-[10px] text-white font-mono font-bold flex items-center justify-center rounded-full leading-none shadow-glow shadow-cyan-500/50"
                      >
                        {cartItemsCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Desktop Direct Quick Checkout/Account Indicator */}
                <button
                  onClick={onCheckoutOpen}
                  className="hidden lg:flex items-center space-x-1.5 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white transition-all duration-300 text-xs font-semibold rounded-full tracking-wider cursor-pointer"
                >
                  <User size={13} />
                  <span>MEMBERS COUPE</span>
                </button>

                {/* Mobile Burger menu activator */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-white focus:outline-none transition-colors duration-200 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900/60"
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Slide-in Portal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] z-45 md:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            
            {/* Mobile links card */}
            <div className="absolute top-0 left-0 w-full bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-900 shadow-2xl px-6 py-8 flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-neutral-700 hover:text-cyan-500 dark:text-neutral-300 dark:hover:text-cyan-400 font-sans font-medium text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={12} className="opacity-40" />
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex justify-between items-center text-xs text-neutral-500 font-mono">
                <span>CAMPUS FUTURES COLLECTION</span>
                <span>UTC {new Date().toISOString().substring(11, 16)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
