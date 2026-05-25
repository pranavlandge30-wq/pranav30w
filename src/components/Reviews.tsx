import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { Testimonial } from "../types";

interface ReviewsProps {
  testimonials: Testimonial[];
}

export default function Reviews({ testimonials }: ReviewsProps) {
  const [index, setIndex] = useState(0);

  const prevReview = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeReview = testimonials[index];

  return (
    <section 
      id="reviews" 
      className="py-24 bg-neutral-100 dark:bg-neutral-900 transition-colors duration-500 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <span className="text-cyan-500 text-xs font-mono font-bold uppercase tracking-widest block mb-2">
            STREET VOICE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-neutral-900 dark:text-white tracking-tight">
            Loved By Collectors Worldwide
          </h2>
          <div className="w-12 h-1 bg-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Carousel layout container */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.35 }}
              className="rounded-3xl glass-panel p-6 sm:p-12 relative shadow-lg text-left"
            >
              <Quote size={40} className="absolute top-6 right-8 text-neutral-200 dark:text-neutral-800 opacity-70 pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                
                {/* Avatar */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-cyan-500/30 flex-shrink-0 shadow-md">
                  <img
                    src={activeReview.avatar}
                    alt={activeReview.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4 sm:mt-0">
                  <h3 className="font-display font-bold text-lg text-neutral-900 dark:text-white">
                    {activeReview.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest block mt-0.5">
                    {activeReview.role}
                  </span>
                </div>
              </div>

              {/* Verified rating stars */}
              <div className="flex items-center space-x-1.5 mt-6 mb-4 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={15} 
                    fill={i < Math.floor(activeReview.rating) ? "#f59e0b" : "transparent"} 
                    className={i < Math.floor(activeReview.rating) ? "" : "text-neutral-300 dark:text-neutral-700"}
                  />
                ))}
                <span className="text-xs font-mono font-bold text-neutral-400 ml-2">VERIFIED PURCHASE</span>
              </div>

              {/* Review Quote text */}
              <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed italic font-sans font-medium">
                &ldquo;{activeReview.review}&rdquo;
              </p>

              <span className="text-[10px] uppercase font-mono text-neutral-400 mt-6 block">
                Posted {activeReview.date}
              </span>

            </motion.div>
          </AnimatePresence>

          {/* Navigation Slider Arrows */}
          <div className="flex justify-center sm:justify-between items-center mt-8 sm:mt-0 sm:absolute sm:inset-y-0 sm:-inset-x-4 pointer-events-none">
            <button
              onClick={prevReview}
              className="p-3 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white rounded-full border border-neutral-200 dark:border-neutral-850 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 hover:scale-105 shadow-md hover:shadow-cyan-500/20 pointer-events-auto transition duration-200 mx-2 sm:mx-0"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextReview}
              className="p-3 bg-white dark:bg-neutral-950 text-neutral-800 dark:text-white rounded-full border border-neutral-200 dark:border-neutral-850 hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 hover:scale-105 shadow-md hover:shadow-cyan-500/20 pointer-events-auto transition duration-200 mx-2 sm:mx-0"
              aria-label="Next Testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
