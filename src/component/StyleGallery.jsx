import React from 'react';
import { motion } from 'framer-motion';
import { Camera, ShoppingBag, Heart } from 'lucide-react';
import Title from './Title';
import { assets } from '../assets/frontend_assets/assets';

const galleryItems = [
  { img: assets.p_img4, tag: '@alex_urban', item: 'Classic Fit Cotton Shirt' },
  { img: assets.p_img5, tag: '@chloe_style', item: 'Women Round Neck Sweater' },
  { img: assets.p_img6, tag: '@street_vibe', item: 'Relaxed Cargo Trousers' },
  { img: assets.p_img7, tag: '@luxe_look', item: 'Monochrome Oversized Tee' },
  { img: assets.p_img9, tag: '@dapper_men', item: 'Pure Wool Blazer Jacket' }
];

const StyleGallery = () => {
  return (
    <section className="my-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <Title text1="SHOP THE" text2="LOOKBOOK" />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
          Get inspired by real customer styling. Tag <span className="font-semibold text-orange-500">#ForeverLuxe</span> on Instagram to be featured.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-800"
          >
            <img
              src={item.img}
              alt={item.tag}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white" />

            {/* Top Instagram Handle Icon */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Camera className="w-4 h-4" />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-white">
              <span className="text-xs font-semibold text-orange-400 block mb-1">
                {item.tag}
              </span>
              <p className="text-xs font-light line-clamp-1 text-gray-200">
                {item.item}
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/20 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  1.2k
                </span>
                <span className="flex items-center gap-1 font-medium hover:text-orange-400">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Shop Item
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StyleGallery;
