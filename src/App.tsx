import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShoppingBag, 
  TrendingUp, 
  Percent 
} from "lucide-react";

// Import custom sub-modules
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import NewArrivals from "./components/NewArrivals";
import Showcase from "./components/Showcase";
import HypeDrop from "./components/HypeDrop";
import Story from "./components/Story";
import Reviews from "./components/Reviews";
import Gallery from "./components/Gallery";
import CartDrawer from "./components/CartDrawer";
import Checkout from "./components/Checkout";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Static Data lists & classes
import { PRODUCTS, TESTIMONIALS } from "./data";
import { CartItem, Product, ProductColor } from "./types";

export default function App() {
  // Cinematic initial brand loader screen
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Theme management: default to dark-mode for futuristic luxury glow
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return true; // Epic Dark Theme first!
  });

  // Cart elements tracker
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  
  // Search Overlay dialog state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Quick temporary discount banner model
  const [showPromoBanner, setShowPromoBanner] = useState<boolean>(true);

  // Sync index.css dark/light theme state with document structure
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle high-end brand preloader expiry
  useEffect(() => {
    const preloaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1850);
    return () => clearTimeout(preloaderTimer);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedSize: number,
    selectedColor: ProductColor,
    quantity: number
  ) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            product,
            quantity,
            selectedColor,
            selectedSize
          }
        ];
      }
    });

    // Provide micro tactile feed and open the cart drawer!
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleInstantBuy = (
    product: Product,
    selectedSize: number,
    selectedColor: ProductColor,
    quantity: number
  ) => {
    // Wipe items and place signature shoe directly inside
    const itemId = `${product.id}-${selectedSize}-${selectedColor.name}`;
    setCartItems([
      {
        id: itemId,
        product,
        quantity,
        selectedColor,
        selectedSize
      }
    ]);
    setIsCheckoutOpen(true);
  };

  const handleNewArrivalsClick = (product: Product) => {
    // Scroll smoothly toFeatured section & blink details
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter Catalog items for search overlay
  const searchedProducts = searchTerm.trim() === ""
    ? PRODUCTS.slice(0, 3) // default recommendations
    : PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className={`min-h-screen transition-colors duration-500 selection:bg-cyan-500 selection:text-white ${
      isDarkMode ? "dark bg-neutral-950 text-neutral-100" : "bg-neutral-50 text-neutral-900"
    }`}>
      
      {/* 0. CINEMATIC PREMIUM BRAND PRELOADER */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
            className="fixed inset-0 z-100 bg-neutral-950 flex flex-col items-center justify-center text-white p-6"
          >
            {/* Visual background details */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent animate-pulse" />
            <div className="absolute top-[30%] left-[10%] w-[350px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-fuchsia-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="text-center space-y-6 max-w-lg z-10 relative">
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="flex items-center justify-center space-x-3"
              >
                <span className="w-11 h-11 flex items-center justify-center bg-white text-black rounded-xl font-display font-black tracking-tight text-xl">
                  C
                </span>
                <span className="font-display font-black text-3xl tracking-[0.25em] text-white">
                  CAMPUS<span className="text-cyan-500 font-extrabold">.</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400"
              >
                SNEAKER TECHNOLOGIES GROUP INC
              </motion.p>

              {/* Progress animation line */}
              <div className="w-[180px] h-[2px] bg-neutral-900 mx-auto rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                />
              </div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="text-[9px] font-mono tracking-widest text-neutral-500 block uppercase"
              >
                ESTABLISHING SECURE PROTOCOLS...
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP FLASH LUXURY NOTIFICATIONS BAR */}
      <AnimatePresence>
        {showPromoBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-black text-white dark:bg-white dark:text-black py-2.5 px-4 text-center text-xs font-mono font-semibold relative z-55 flex items-center justify-between overflow-hidden border-b border-white/10 dark:border-black/5"
          >
            <div className="mx-auto flex items-center justify-center space-x-1.5 uppercase tracking-widest text-[10px] sm:text-xs">
              <Percent size={13} className="animate-pulse text-cyan-400 dark:text-fuchsia-600" />
              <span>BLACKOUT SEASON: USE CODE <strong className="text-cyan-400 dark:text-fuchsia-600 font-extrabold">FUTURE26</strong> TO DEDUCT 15% OFF ALL ORDERS OVER $150</span>
            </div>
            <button
              onClick={() => setShowPromoBanner(false)}
              className="p-1 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-full transition-colors focus:outline-none"
              aria-label="Close banner notification"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NAVIGATION BAR CONTAINER */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        cartItemsCount={cartItems.reduce((acc, current) => acc + current.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
        onSearchOpen={() => setIsSearchOpen(true)}
        onCheckoutOpen={() => setIsCheckoutOpen(true)}
      />

      {/* 3. CINEMATIC HERO SLIDERS */}
      <Hero
        heroProducts={PRODUCTS.slice(0, 3)}
        onAddToCart={(product) => handleAddToCart(product, 9, product.colors[0], 1)}
      />

      {/* 4. NEW ARRIVALS HORIZONTAL CAROUSELS */}
      <NewArrivals
        products={PRODUCTS}
        onProductClick={handleNewArrivalsClick}
      />

      {/* 5. INTERACTIVE PRODUCT FOCUS SHOWCASE */}
      <Showcase
        showcaseProduct={PRODUCTS[4] || PRODUCTS[0]} // Orbit Max
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      {/* NEW ARRIVALS COUNTDOWN HYPE SECTION */}
      <HypeDrop />

      {/* 6. MAIN CATALOUGE LISTINGS */}
      <Featured
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
      />

      {/* 7. INTUITIVE STORY MANIFESTO */}
      <Story />

      {/* 8. SNEAKER AMBIENT LOOKBOOK GALLERY */}
      <Gallery />

      {/* 9. STREET VOICE REVIEWS SLATE */}
      <Reviews testimonials={TESTIMONIALS} />

      {/* 10. TACTILE CONNECTION FORM */}
      <Contact />

      {/* 11. SITEMAP FOOTER SECTION */}
      <Footer />

      {/* SHOPPING BAG DRAWER OVERLAYS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutOpen={() => setIsCheckoutOpen(true)}
      />

      {/* THE INTEGRATED MULTI-STEP CHECKOUT SYSTEM */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* CATALOUGE SEAMLESS SEARCH COMPANION MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-neutral-950/85 backdrop-blur-md"
          >
            {/* Backdrop Dismiss */}
            <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />

            {/* Dialog panel */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 text-left p-6 sm:p-8 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-900 z-10"
            >
              {/* Close handler */}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-4 right-4 p-2 bg-neutral-50 dark:bg-neutral-900 hover:bg-rose-500 hover:text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close search overlay"
              >
                <X size={16} />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-cyan-500 uppercase font-black block mb-1">
                    CAMPUS TELEMETRY INDEX
                  </span>
                  <h3 className="font-display font-black text-xl uppercase text-neutral-900 dark:text-white tracking-tight">
                    Search Streetwear Releases
                  </h3>
                </div>

                {/* Input frame */}
                <div className="flex items-center border-b-2 border-neutral-200 dark:border-neutral-800 focus-within:border-cyan-500 transition-colors pb-2">
                  <Search size={20} className="text-neutral-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search e.g. Carbon, Cyber, Pulse, Sneakers..."
                    className="w-full bg-transparent font-sans text-base text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
                    autoFocus
                  />
                </div>

                {/* Results block */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    {searchTerm.trim() === "" ? "RECOMMENDED DROP SEQUENCES" : `ACCESSED ${searchedProducts.length} SEQUENCES`}
                  </h4>

                  <div className="divide-y divide-neutral-100 dark:divide-neutral-900 max-h-[220px] overflow-y-auto pr-1">
                    {searchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          // Trigger smooth navigation to shop category and highlighted block
                          const shopBlock = document.getElementById("shop");
                          if (shopBlock) {
                            shopBlock.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="flex items-center justify-between py-3 cursor-pointer group hover:bg-neutral-50 dark:hover:bg-neutral-900/30 px-2 rounded-xl transition-colors"
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className="w-11 h-11 bg-neutral-100 dark:bg-neutral-900 p-1 flex items-center justify-center rounded-lg">
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="max-h-full max-w-full object-contain transform -scale-x-100"
                            />
                          </div>
                          <div>
                            <span className="font-display font-bold text-xs text-neutral-900 dark:text-white block group-hover:text-cyan-500 transition-colors">
                              {p.name}
                            </span>
                            <span className="text-[9px] font-mono text-neutral-400 block uppercase">
                              {p.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 text-xs">
                          <span className="font-mono text-neutral-900 dark:text-white font-extrabold">${p.price}</span>
                          <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest font-bold flex items-center group-hover:opacity-100 opacity-0 transition-opacity">
                            <span>EXPLORE</span>
                            <ArrowRight size={10} className="ml-0.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                    {searchedProducts.length === 0 && (
                      <div className="text-center py-6 text-xs text-neutral-400 font-mono italic">
                        No product alignments matched your search term coordinates.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
