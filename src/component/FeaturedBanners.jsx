import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { assets } from '../assets/frontend_assets/assets';

const FeaturedBanners = () => {
  return (
    <section className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Banner 1 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-3xl overflow-hidden group shadow-xl border border-gray-200/50 dark:border-gray-800"
        >
          <img
            src={assets.p_img12}
            alt="Minimalist Essentials"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3 w-fit border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Autumn Lookbook 2026</span>
            </span>

            <h3 className="text-3xl font-serif font-bold tracking-tight mb-2">
              Minimalist Staples & Warm Layering
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 font-light mb-6 line-clamp-2">
              Crafted from 100% sustainable organic cotton and cashmere blends for refined everyday luxury.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-medium text-xs sm:text-sm shadow-md hover:bg-orange-500 hover:text-white transition-all duration-300 w-fit group/btn"
            >
              <span>EXPLORE LOOKBOOK</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Banner 2 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative h-96 rounded-3xl overflow-hidden group shadow-xl border border-gray-200/50 dark:border-gray-800"
        >
          <img
            src={assets.p_img15}
            alt="Urban Streetwear"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end text-white max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/30 backdrop-blur-md text-orange-300 text-xs font-semibold uppercase tracking-wider mb-3 w-fit border border-orange-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Streetwear Culture</span>
            </span>

            <h3 className="text-3xl font-serif font-bold tracking-tight mb-2">
              Urban Edge & Signature Silhouettes
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 font-light mb-6 line-clamp-2">
              Bold graphic aesthetics combined with oversized drop-shoulder fits engineered for modern icons.
            </p>

            <Link
              to="/collection"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium text-xs sm:text-sm shadow-md hover:bg-orange-600 transition-all duration-300 w-fit group/btn"
            >
              <span>SHOP STREETWEAR</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBanners;
