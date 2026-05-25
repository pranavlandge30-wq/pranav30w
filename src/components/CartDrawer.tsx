import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, ArrowRight, Truck, Tag, ShieldCheck } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutOpen: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutOpen
}: CartDrawerProps) {
  // Free Shipping Threshold logic
  const FREE_SHIPPING_LIMIT = 250;
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);

  const handleCheckoutClick = () => {
    onClose();
    onCheckoutOpen();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-55 flex justify-end bg-neutral-950/60 backdrop-blur-sm"
        >
          {/* Backdrop Click Dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          {/* Drawer content core */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-950 h-full shadow-2xl flex flex-col justify-between border-l border-neutral-100 dark:border-neutral-900 z-10"
          >
            
            {/* Header section */}
            <div className="p-6 border-b border-neutral-150 dark:border-neutral-900 flex items-center justify-between text-left">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag size={20} className="text-cyan-500" />
                <h2 className="font-display font-extrabold text-xl text-neutral-950 dark:text-white uppercase tracking-tight">
                  Shopping Bag ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-400 hover:text-rose-500 rounded-full transition-colors"
                aria-label="Close bag"
              >
                <X size={18} />
              </button>
            </div>

            {/* Middle: Items List context */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Free Shipping Milestone Slider */}
              {cartItems.length > 0 && (
                <div className="p-4 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl mb-2 text-left">
                  <div className="flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 font-sans font-semibold mb-2">
                    <Truck size={14} className="text-cyan-500 animate-bounce" />
                    {missingForFreeShipping > 0 ? (
                      <span>
                        Add <strong className="text-cyan-500">${missingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE SHIPPING</strong>.
                      </span>
                    ) : (
                      <span className="text-emerald-500 font-bold">🎉 Congratulations! You have unlocked FREE Shipping!</span>
                    )}
                  </div>
                  {/* Progress Line */}
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-900/80 rounded-full flex items-center justify-center text-neutral-400">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-neutral-800 dark:text-white uppercase tracking-wider">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-xs mt-1 font-sans">
                      Start exploring the futuristic Campus collections, select your colorway specs, and load your custom sneakers in here.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-cyan-500 dark:bg-white text-white dark:text-black hover:text-white dark:hover:bg-cyan-500 font-mono text-[10px] uppercase font-bold tracking-widest rounded transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex space-x-4 p-3 bg-neutral-50 dark:bg-neutral-900/30 rounded-xl border border-neutral-100 dark:border-neutral-900 text-left"
                  >
                    
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 rounded-lg p-1.5 flex items-center justify-center flex-shrink-0 relative">
                      <img
                        src={item.selectedColor.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain transform -scale-x-100"
                      />
                    </div>

                    {/* Spec Texts */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-display font-bold text-xs text-neutral-900 dark:text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        
                        <div className="flex flex-wrap gap-1.5 mt-1 text-[10px] font-mono text-neutral-400">
                          <span className="uppercase tracking-tighter bg-neutral-200/50 dark:bg-neutral-900/60 px-1.5 py-0.5 rounded">
                            US {item.selectedSize}
                          </span>
                          <span className="uppercase tracking-tighter bg-neutral-200/50 dark:bg-neutral-900/60 px-1.5 py-0.5 rounded flex items-center space-x-1">
                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.selectedColor.hex }} />
                            <span>{item.selectedColor.name}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Adjust qty list */}
                        <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded overflow-hidden bg-white dark:bg-neutral-950 font-mono text-[11px]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-extrabold"
                          >
                            -
                          </button>
                          <span className="px-3 font-extrabold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 font-extrabold"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center space-x-3">
                          <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-neutral-300 hover:text-rose-500 hover:bg-rose-500/5 p-1.5 rounded transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom section (Math aggregators & triggers) */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-150 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950/80 text-left space-y-4">
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs text-neutral-400 font-mono uppercase">
                    <span>Est. Delivery</span>
                    {missingForFreeShipping === 0 ? (
                      <span className="text-emerald-500 font-bold">FREE</span>
                    ) : (
                      <span>$15.00</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-display font-bold text-sm text-neutral-900 dark:text-white uppercase tracking-wider">
                      Cart Total
                    </span>
                    <span className="font-mono text-xl font-black text-neutral-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Secure checkout info */}
                <div className="flex items-center space-x-2 p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-[11px] text-neutral-500 dark:text-neutral-400 font-sans">
                  <ShieldCheck size={14} className="text-cyan-500 flex-shrink-0" />
                  <span>3D Secure SSL checkout platform implemented to safeguard your personal details.</span>
                </div>

                {/* Primary Button Trigger */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 bg-black dark:bg-white text-white dark:text-black hover:bg-cyan-500 dark:hover:bg-cyan-500 hover:text-white dark:hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl"
                >
                  <span>GO TO SECURE CHECKOUT</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
