import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  X, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  ThumbsUp,
  Search,
  RotateCcw,
  Truck,
  ShieldCheck,
  Flame,
  ChevronRight,
  Info
} from "lucide-react";
import { Product, ProductColor } from "../types";

interface FeaturedProps {
  products: Product[];
  onAddToCart: (product: Product, size: number, color: ProductColor, quantity: number) => void;
}

export default function Featured({ products, onAddToCart }: FeaturedProps) {
  // UI states
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [colorFilter, setColorFilter] = useState<string>("All");
  const [sizeFilter, setSizeFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("best-sellers");
  
  // Sidebar & Layout toggle
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);
  
  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Quick View states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState<number | null>(null);
  const [modalColor, setModalColor] = useState<ProductColor | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);
  const [modalActiveImage, setModalActiveImage] = useState<string>("");
  const [showCartSuccessBadge, setShowCartSuccessBadge] = useState<boolean>(false);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });

  // Reset Filters Functionality
  const handleResetFilters = () => {
    setSelectedGender("All");
    setSelectedCategory("All");
    setMaxPrice(350);
    setColorFilter("All");
    setSizeFilter(null);
    setSearchQuery("");
    setSortBy("best-sellers");
  };

  // Dimensions & Options
  const categoriesList = [
    "All", "Sneakers", "Running", "Basketball", "Casual", "High Tops", "Platform", "Sports", "Gym & Training", "School", "Limited", "Lifestyle"
  ];

  const colorBeads = [
    { name: "All", hex: "linear-gradient(135deg, #cbd5e1 0%, #475569 100%)", label: "Multi" },
    { name: "White", hex: "#ffffff", label: "White / Ivory" },
    { name: "Black", hex: "#111827", label: "Black / Dark Grey" },
    { name: "Green", hex: "#84cc16", label: "Volt / Neon Green" },
    { name: "Red", hex: "#ef4444", label: "Volt / Red" },
    { name: "Blue", hex: "#3b82f6", label: "Aero Blue / Cyan" },
    { name: "Pink", hex: "#ec4899", label: "Pastels / Hologram" },
    { name: "Orange", hex: "#f97316", label: "Solar Orange" },
    { name: "Brown", hex: "#78350f", label: "Amber / Ochre" },
    { name: "Purple", hex: "#a855f7", label: "Lavender / Violet" }
  ];

  const sizeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedGender !== "All") count++;
    if (selectedCategory !== "All") count++;
    if (maxPrice !== 350) count++;
    if (colorFilter !== "All") count++;
    if (sizeFilter !== null) count++;
    if (searchQuery.trim() !== "") count++;
    return count;
  }, [selectedGender, selectedCategory, maxPrice, colorFilter, sizeFilter, searchQuery]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Gender check
      if (selectedGender !== "All" && p.gender !== selectedGender) return false;

      // 2. Category check (either categoric match, or tag matches search category)
      if (selectedCategory !== "All" && p.category !== selectedCategory && !p.tags.includes(selectedCategory)) return false;

      // 3. Max Price check
      if (p.price > maxPrice) return false;

      // 4. Color checklist
      if (colorFilter !== "All") {
        const matchesColor = p.colors.some((col) => {
          const colName = col.name.toLowerCase();
          if (colorFilter === "White" && (colName.includes("white") || colName.includes("ivory") || colName.includes("cream") || colName.includes("alabaster") || colName.includes("natural"))) return true;
          if (colorFilter === "Black" && (colName.includes("black") || colName.includes("onyx") || colName.includes("carbon") || colName.includes("grey") || colName.includes("gray") || colName.includes("slate") || colName.includes("matte") || colName.includes("dark"))) return true;
          if (colorFilter === "Green" && (colName.includes("green") || colName.includes("glow") || colName.includes("volt") || colName.includes("lime"))) return true;
          if (colorFilter === "Red" && (colName.includes("red") || colName.includes("crimson") || colName.includes("ember"))) return true;
          if (colorFilter === "Blue" && (colName.includes("blue") || colName.includes("cyan") || colName.includes("cobalt") || colName.includes("oceanic") || colName.includes("aero"))) return true;
          if (colorFilter === "Pink" && (colName.includes("pink") || colName.includes("rose") || colName.includes("cotton") || colName.includes("candy") || colName.includes("magenta") || colName.includes("pastel") || colName.includes("chromatic") || colName.includes("starlight") || colName.includes("holographic") || colName.includes("aurora"))) return true;
          if (colorFilter === "Orange" && (colName.includes("orange") || colName.includes("solar") || colName.includes("tangerine") || colName.includes("peach"))) return true;
          if (colorFilter === "Brown" && (colName.includes("tan") || colName.includes("brown") || colName.includes("ochre") || colName.includes("amber") || colName.includes("suede"))) return true;
          if (colorFilter === "Purple" && (colName.includes("purple") || colName.includes("lilac") || colName.includes("lavender") || colName.includes("violet"))) return true;
          return false;
        });
        if (!matchesColor) return false;
      }

      // 5. Size check
      if (sizeFilter !== null && !p.sizes.includes(sizeFilter)) return false;

      // 6. Text query search
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          p.features.some(f => f.toLowerCase().includes(query)) ||
          p.gender.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [products, selectedGender, selectedCategory, maxPrice, colorFilter, sizeFilter, searchQuery]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") {
        const aVal = a.isNew ? 1 : 0;
        const bVal = b.isNew ? 1 : 0;
        return bVal - aVal;
      }
      if (sortBy === "best-sellers") {
        return b.reviewsCount - a.reviewsCount;
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  // Wishlist Toggler with local alert triggers
  const toggleWishlist = (id: string) => {
    setWishlist((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Quick view model initializers
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setModalSize(product.sizes[2] || product.sizes[0] || 9);
    setModalColor(product.colors[0] || null);
    setModalQuantity(1);
    setModalActiveImage(product.image);
    setShowCartSuccessBadge(false);
  };

  // Magnifying Zoom Effect handlers
  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.6)"
    });
  };

  const handleImageZoomLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)"
    });
  };

  const handleModalAddToCart = () => {
    if (!quickViewProduct || !modalColor || !modalSize) return;
    onAddToCart(quickViewProduct, modalSize, modalColor, modalQuantity);
    
    setShowCartSuccessBadge(true);
    setTimeout(() => {
      setShowCartSuccessBadge(false);
      setQuickViewProduct(null);
    }, 1500);
  };

  // Related products under modal
  const relatedProducts = useMemo(() => {
    if (!quickViewProduct) return [];
    return products
      .filter(p => p.id !== quickViewProduct.id && (p.category === quickViewProduct.category || p.gender === quickViewProduct.gender))
      .slice(0, 3);
  }, [quickViewProduct, products]);

  // Render specifications filters block
  const FilterElements = () => (
    <div className="space-y-8">
      {/* 1. Demographics Toggle Segment */}
      <div>
        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3.5">
          Demographic
        </h4>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-neutral-200/50 dark:bg-neutral-900 rounded-xl">
          {["All", "Men", "Women", "Kids"].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all duration-200 ${
                selectedGender === g
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Textual Search Query */}
      <div>
        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
          Search Sequence
        </h4>
        <div className="relative flex items-center border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 bg-white dark:bg-neutral-950 focus-within:border-cyan-500/80 transition-colors">
          <Search size={14} className="text-neutral-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search matching drops..."
            className="w-full bg-transparent py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="p-1 text-neutral-400 hover:text-rose-500 rounded-full">
              <X size={12} />
            </button>
          )}
        </div>
      </div>

      {/* 3. Footwear Category Badges */}
      <div>
        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
          Product Type
        </h4>
        <div className="flex flex-wrap gap-1.5 max-h-[190px] overflow-y-auto pr-1">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-[10.5px] font-bold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-white"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Sliding price range */}
      <div>
        <div className="flex justify-between items-center mb-2 font-mono">
          <h4 className="text-xs font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500">
            Max Budget
          </h4>
          <span className="text-xs font-black text-cyan-500 dark:text-cyan-400">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="50"
          max="350"
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
        />
        <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
          <span>Min: $50</span>
          <span>Max: $350</span>
        </div>
      </div>

      {/* 5. Interactive Hex Colorways */}
      <div>
        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-3">
          Major Colorway
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {colorBeads.map((bead) => (
            <button
              key={bead.name}
              onClick={() => setColorFilter(bead.name)}
              className={`w-7-bead tracking-widest text-[9px] font-mono relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                colorFilter === bead.name
                  ? "scale-110 shadow-lg ring-[2.5px] ring-cyan-500 ring-offset-2 dark:ring-offset-neutral-900"
                  : "hover:scale-105"
              }`}
              style={{ background: bead.hex }}
              title={bead.label}
            >
              {colorFilter === bead.name && (
                <Check 
                  size={12} 
                  className={bead.name === "White" || bead.name === "All" ? "text-neutral-900" : "text-white"} 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Active Sizing beads */}
      <div>
        <h4 className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-2">
          US Sizing Scale
        </h4>
        <span className="text-[9px] font-mono font-semibold text-neutral-400 block mb-2 px-1 uppercase">
          {selectedGender === "Kids" ? "Kids Scale: Low values 1-6" : "Mens & Womens: standard scale 5-13"}
        </span>
        <div className="grid grid-cols-5 gap-1.5">
          {sizeOptions.map((sz) => (
            <button
              key={sz}
              onClick={() => setSizeFilter(sizeFilter === sz ? null : sz)}
              className={`py-1.5 rounded-lg text-2xs font-mono font-bold font-semibold transition-all duration-200 ${
                sizeFilter === sz
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md font-black"
                  : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-850"
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Quick Reset */}
      {activeFiltersCount > 0 && (
        <button
          onClick={handleResetFilters}
          className="w-full py-3 bg-neutral-900 dark:bg-neutral-800 hover:bg-rose-600 dark:hover:bg-rose-600 text-white rounded-xl text-[11px] font-bold font-mono tracking-widest uppercase flex items-center justify-center space-x-1.5 transition-colors shadow-lg shadow-neutral-900/10 cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>RESET {activeFiltersCount} FILTERS</span>
        </button>
      )}
    </div>
  );

  return (
    <section 
      id="shop" 
      className="py-24 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200/50 dark:border-neutral-900 pb-10 gap-6">
          <div className="text-left">
            <span className="text-cyan-500 text-xs font-mono font-bold uppercase tracking-widest block mb-2">
              CAMPUS SNEAKERS &amp; FOOTWEAR MATRIX
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight">
              FOOTWEAR CATALOGUE
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-lg mt-2 font-sans font-medium">
              A comprehensive multi-tier ecosystem representing elite Men's, Women's, and Kids' footwear releases. Filter, browse, and access coordinates from daily drops.
            </p>
          </div>

          {/* Quick Active Controls/sorting tools */}
          <div className="flex items-center space-x-3 self-start md:self-end">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center space-x-2 px-5 py-3 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-sm border border-neutral-200/40 dark:border-neutral-800/40 transition-transform hover:scale-103"
            >
              <SlidersHorizontal size={13} />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
            </button>

            {/* Sorting Widget */}
            <div className="flex items-center space-x-2.5">
              <span className="hidden sm:inline text-2xs font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Sort Release:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white rounded-xl text-xs font-bold uppercase tracking-widest border border-neutral-200/40 dark:border-neutral-800/40 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="best-sellers">Best Sellers</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Catalog Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-10 mt-12">
          
          {/* DESKTOP SIDEBAR FILTERS PANEL (Column 1) */}
          <div className="hidden lg:block lg:col-span-1 text-left bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200/40 dark:border-neutral-900 shadow-sm sticky top-28 self-start max-h-[82vh] overflow-y-auto no-scrollbar">
            <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-500 uppercase font-black block mb-1">
              SYSTEM CONFIGURATORS
            </span>
            <h3 className="font-display font-black text-lg text-neutral-900 dark:text-white uppercase mb-6">
              Narrow Search
            </h3>
            <FilterElements />
          </div>

          {/* SNEAKER GRID WORKSPACE (Column 2-4) */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Realtime status indicators */}
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono dark:text-neutral-400">
              <span className="font-semibold text-[11px] uppercase tracking-wider">
                Showing {sortedProducts.length} shoe alignments in database
              </span>
              {activeFiltersCount > 0 && (
                <button 
                  onClick={handleResetFilters}
                  className="text-cyan-500 hover:text-rose-500 uppercase tracking-widest font-bold flex items-center space-x-1"
                >
                  <RotateCcw size={10} />
                  <span>Clear All ({activeFiltersCount})</span>
                </button>
              )}
            </div>

            {/* Main responsive Sneaker cards layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      key={product.id}
                      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-neutral-950 p-4 border border-neutral-200/40 dark:border-neutral-900/50 shadow-sm hover:shadow-xl hover:border-cyan-500/40 dark:hover:shadow-neutral-950/50 transition-all duration-300"
                    >
                      {/* Top floating metadata items */}
                      <div className="flex items-center justify-between z-10 w-full">
                        <div className="flex flex-col space-y-1 text-left">
                          <span className="bg-black/85 dark:bg-neutral-900 text-white dark:text-neutral-300 text-[8.5px] font-mono font-bold uppercase px-2 py-0.5 rounded leading-none">
                            {product.gender}
                          </span>
                          {product.tags.slice(0, 1).map((tag, i) => (
                            <span 
                              key={i} 
                              className="bg-cyan-500 text-white text-[8.5px] font-mono leading-none font-bold uppercase px-2 py-0.5 rounded leading-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Heart wishlist element with kinetic tap feedback */}
                        <motion.button
                          whileTap={{ scale: 0.8 }}
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full shadow-sm cursor-pointer transition-colors ${
                            isWishlisted 
                              ? "bg-rose-50 dark:bg-rose-950/20 text-rose-500" 
                              : "bg-neutral-50 dark:bg-neutral-900 text-neutral-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          }`}
                          aria-label="Wishlist toggle"
                        >
                          <Heart size={14} fill={isWishlisted ? "#f43f5e" : "transparent"} className={isWishlisted ? "text-rose-500" : ""} />
                        </motion.button>
                      </div>

                      {/* Large Product interactive image layout with Hover Image swaps */}
                      <div 
                        onClick={() => openQuickView(product)}
                        className="relative w-full h-44 sm:h-52 mt-3 mb-4 flex items-center justify-center cursor-pointer overflow-hidden rounded-xl bg-neutral-50/50 dark:bg-neutral-900/10"
                      >
                        {/* Shadow casting */}
                        <div className="absolute bottom-3 w-36 h-3 bg-black/10 dark:bg-black/35 blur-md rounded-full transform scale-x-110 group-hover:scale-x-95 transition-transform duration-300 pointer-events-none" />
                        
                        {/* Core Image 1: Main View */}
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transform -scale-x-100 group-hover:opacity-0 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 select-none"
                        />

                        {/* Core Image 2: Alternate View (Hover back-image swap!) */}
                        {product.images[1] && (
                          <img
                            src={product.images[1]}
                            alt={`${product.name} alternate`}
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-contain transform -scale-x-100 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-500 select-none"
                          />
                        )}

                        {/* Ambient neon backglow ring on card hover */}
                        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Interactive HUD text display */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                          <span className="flex items-center space-x-1 px-4 py-2 bg-black/90 dark:bg-white text-white dark:text-black rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Eye size={12} />
                            <span>LAUNCH PREVIEW</span>
                          </span>
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="pt-3 border-t border-neutral-200/40 dark:border-neutral-900 text-left">
                        <div className="flex justify-between items-start mb-1 font-mono">
                          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                            {product.category}
                          </span>
                          <div className="flex items-center space-x-0.5 text-[10px] text-amber-500">
                            <Star size={10} fill="#f59e0b" />
                            <span className="font-extrabold">{product.rating}</span>
                          </div>
                        </div>

                        <h3 
                          onClick={() => openQuickView(product)}
                          className="text-sm font-display font-black text-neutral-900 dark:text-white cursor-pointer hover:text-cyan-500 transition-colors duration-200 line-clamp-1 truncate"
                        >
                          {product.name}
                        </h3>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-baseline space-x-1.5 font-mono">
                            <span className="text-sm font-black text-neutral-900 dark:text-white">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Trigger selector buttons */}
                          <button
                            onClick={() => openQuickView(product)}
                            className="px-3.5 py-2 bg-neutral-900 hover:bg-cyan-500 dark:bg-neutral-800 dark:hover:bg-cyan-500 text-white flex items-center space-x-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-colors duration-200 shadow-md cursor-pointer"
                          >
                            <ShoppingBag size={11} />
                            <span>BUY</span>
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {sortedProducts.length === 0 && (
                <div className="col-span-full py-16 text-center text-neutral-500 dark:text-neutral-400 font-mono italic text-xs bg-white dark:bg-neutral-900/10 border border-dashed border-neutral-200 dark:border-neutral-900/60 rounded-3xl p-6">
                  <Info size={28} className="mx-auto mb-2 text-neutral-400 animate-pulse" />
                  <p>No footwear models align with your config coordinates.</p>
                  <button 
                    onClick={handleResetFilters}
                    className="mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg text-xs font-bold font-mono tracking-widest uppercase hover:bg-cyan-500"
                  >
                    Clear Search Channels
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* MOBILE POPUP FILTER WORKSPACE (Drawer modal slides from left side) */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden flex bg-black/70 backdrop-blur-sm"
          >
            {/* Backdrop Dismiss */}
            <div className="absolute inset-0" onClick={() => setIsMobileFiltersOpen(false)} />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-[325px] bg-white dark:bg-neutral-950 p-6 shadow-2xl h-full flex flex-col justify-between text-left z-10"
            >
              <div>
                <div className="flex items-center justify-between border-b border-neutral-200/50 dark:border-neutral-900 pb-4 mb-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-cyan-500 block uppercase font-bold">
                      COGNITIVE CHANNELS
                    </span>
                    <h3 className="font-display font-black text-base text-neutral-900 dark:text-white uppercase">
                      Select Filters
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 rounded-full"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="max-h-[75vh] overflow-y-auto pr-1 pb-10 space-y-8 no-scrollbar">
                  <FilterElements />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 bg-white dark:bg-neutral-950 border-t border-neutral-200/55 dark:border-neutral-900 flex space-x-2">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="flex-1 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-2xs font-bold uppercase tracking-widest text-center"
                >
                  Apply Filters ({sortedProducts.length} items)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED CINEMATIC SNEAKER VIEW DIALOG OVERLAY (The advanced product page replacement) */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/85 backdrop-blur-md overflow-hidden"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="relative w-full max-w-5xl bg-white dark:bg-neutral-950 rounded-2xl overflow-y-auto max-h-[92vh] shadow-2xl border border-neutral-200/50 dark:border-neutral-900 grid grid-cols-1 md:grid-cols-12 no-scrollbar"
            >
              
              {/* Dismiss button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 transition-colors rounded-full"
                aria-label="Close dialogue"
              >
                <X size={16} />
              </button>

              {/* SECTION A: Product Galleries with Zoom effects (Grid 1-6) */}
              <div className="md:col-span-6 bg-neutral-50 dark:bg-neutral-900/30 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200/40 dark:border-neutral-900/70">
                
                {/* Visual tags & badges */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-500 dark:text-fuchsia-400 bg-fuchsia-400/10 px-2 py-0.5 rounded flex items-center space-x-1 font-bold">
                    <Flame size={11} className="animate-pulse" />
                    <span>PREMIUM COUPE</span>
                  </span>
                  
                  {/* Fake dynamic stock indicator */}
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                    🔥 HYPE STATUS: ONLY {quickViewProduct.reviewsCount % 7 + 2} PAIRS REMAINING!
                  </span>
                </div>

                {/* Main image view with 1.6x zoom hover pan */}
                <div 
                  onMouseMove={handleImageZoom}
                  onMouseLeave={handleImageZoomLeave}
                  className="flex-1 flex items-center justify-center min-h-[220px] sm:min-h-[340px] cursor-zoom-in overflow-hidden rounded-2xl bg-neutral-100/55 dark:bg-neutral-900/10 relative"
                >
                  {/* Decorative Back circle */}
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-neutral-300 dark:border-neutral-800 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-28 h-28 rounded-full border border-neutral-200 dark:border-neutral-800" />
                  </div>

                  <motion.img
                    key={modalActiveImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={modalActiveImage}
                    alt={quickViewProduct.name}
                    referrerPolicy="no-referrer"
                    style={zoomStyle}
                    className="max-h-[190px] sm:max-h-[290px] w-auto object-contain transform -scale-x-100 transition-transform duration-100 select-none z-10"
                  />

                  {/* Micro Hint tag on corner */}
                  <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono bg-black/80 text-white px-2 py-1 rounded tracking-wider uppercase font-medium">
                    Hover to Zoom
                  </span>
                </div>

                {/* Multi view alternate thumb dots selection */}
                <div className="mt-4">
                  <span className="text-[9px] font-mono text-neutral-400 tracking-wider block mb-2 uppercase text-center">
                    Select Display Perspective
                  </span>
                  <div className="flex items-center justify-center space-x-3">
                    {quickViewProduct.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setModalActiveImage(img)}
                        className={`w-14 h-14 rounded-xl bg-white dark:bg-neutral-950 p-1 overflow-hidden border-2 transition-all duration-200 ${
                          modalActiveImage === img
                            ? "border-cyan-500 scale-105 shadow-md"
                            : "border-transparent hover:border-neutral-300/40 dark:hover:border-neutral-800"
                        }`}
                      >
                        <img
                          src={img}
                          alt="Thumbnail perspective"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain transform -scale-x-100"
                        />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* SECTION B: Color variants, custom size grids, checkout actions (Grid 7-12) */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between text-left space-y-6">
                <div>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-[10px] font-black uppercase text-cyan-500 bg-cyan-100/10 dark:bg-cyan-500/10 px-2 py-1 rounded">
                      Collection: {quickViewProduct.gender}'s {quickViewProduct.category}
                    </span>
                    <div className="flex items-center space-x-0.5 text-xs text-amber-500">
                      <Star size={11} fill="#f59e0b" />
                      <span className="font-extrabold">{quickViewProduct.rating}</span>
                      <span className="text-neutral-400 font-normal">({quickViewProduct.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-black text-neutral-900 dark:text-white leading-tight uppercase mt-2">
                    {quickViewProduct.name}
                  </h3>

                  <div className="flex items-baseline space-x-2.5 mt-2.5 font-mono">
                    <span className="text-xl font-extrabold text-neutral-900 dark:text-white">
                      ${quickViewProduct.price} USD
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through">
                        ${quickViewProduct.originalPrice}
                      </span>
                    )}
                    <span className="text-[10px] font-extrabold text-[#15803d] dark:text-[#a3e635] uppercase px-1 py-0.5 leading-none">
                      Includes Pune Flat Delivery
                    </span>
                  </div>

                  {/* Design Story line */}
                  <p className="text-neutral-500 dark:text-neutral-400 text-xs leading-relaxed mt-4 font-sans font-medium">
                    {quickViewProduct.description}
                  </p>

                  {/* Bullet Spec Highlights */}
                  <div className="border-t border-b border-neutral-100 dark:border-neutral-900 py-4 my-4">
                    <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase block mb-2">
                      Interactive Feature Blueprints
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-neutral-700 dark:text-neutral-300 font-sans font-medium">
                      {quickViewProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 1. Color Selectors */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase block mb-2">
                      Active Colorway: <strong className="text-neutral-900 dark:text-white font-black uppercase font-mono">{modalColor?.name || ""}</strong>
                    </span>
                    <div className="flex space-x-3">
                      {quickViewProduct.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => {
                            setModalColor(color);
                            setModalActiveImage(color.image);
                          }}
                          className={`w-8 h-8 rounded-full relative flex items-center justify-center transition-all ${
                            modalColor?.name === color.name 
                              ? "scale-110 ring-2 ring-cyan-500 ring-offset-2 dark:ring-offset-neutral-950" 
                              : "hover:scale-105 border border-white"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        >
                          {modalColor?.name === color.name && (
                            <Check 
                              size={12} 
                              className={color.hex === "#fafaf9" || color.hex === "#f5f5f4" || color.hex === "#fef08a" ? "text-neutral-900" : "text-white"} 
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Sizing selects */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
                        Select Sizing (US SCALE)
                      </span>
                      <span className="text-[10px] font-mono font-bold text-cyan-500 uppercase hover:underline cursor-pointer">
                        View Sizing Chart
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-2 max-w-sm">
                      {quickViewProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setModalSize(sz)}
                          className={`py-2 text-xs font-bold rounded-lg font-mono transition-shadow ${
                            modalSize === sz
                              ? "bg-black dark:bg-white text-white dark:text-black shadow-md border border-black dark:border-white"
                              : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Shipping & Verification indicators badge */}
                  <div className="grid grid-cols-2 gap-3 p-3 bg-neutral-100/50 dark:bg-neutral-900 rounded-xl mb-4 font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                    <div className="flex items-center space-x-1.5">
                      <Truck size={14} className="text-cyan-500" />
                      <div>
                        <strong className="block text-neutral-800 dark:text-white uppercase text-[9px]">Express Courier</strong>
                        <span>Dispatched within 24 Hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <ShieldCheck size={14} className="text-fuchsia-500" />
                      <div>
                        <strong className="block text-neutral-800 dark:text-white uppercase text-[9px]">100% Genuine</strong>
                        <span>Certified authenticity card</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quantitative selectors and CTA cart buttons */}
                <div>
                  <div className="flex items-center space-x-4 mb-4 font-mono">
                    <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase">QTY Order:</span>
                    <div className="flex items-center border border-neutral-200 dark:border-neutral-850 rounded-lg overflow-hidden font-mono text-xs bg-neutral-50 dark:bg-neutral-900">
                      <button
                        onClick={() => setModalQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      >
                        -
                      </button>
                      <span className="px-5 font-black text-neutral-900 dark:text-white">{modalQuantity}</span>
                      <button
                        onClick={() => setModalQuantity(q => q + 1)}
                        className="px-3 py-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3.5">
                    <button
                      onClick={handleModalAddToCart}
                      disabled={showCartSuccessBadge}
                      className={`flex-1 py-4 px-6 rounded-xl text-xs font-bold font-mono tracking-widest uppercase flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl ${
                        showCartSuccessBadge
                          ? "bg-emerald-500 text-white shadow-emerald-500/20"
                          : "bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white shadow-neutral-950/20 cursor-pointer"
                      }`}
                    >
                      {showCartSuccessBadge ? (
                        <>
                          <ThumbsUp size={14} className="animate-bounce animate-pulse" />
                          <span>COORDINATE SECURED IN BAG</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>DEPLOY TO SHOPPING BAG - ${(quickViewProduct.price * modalQuantity).toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
