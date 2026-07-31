import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/frontend_assets/assets';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import Title from './Title';

const categories = [
  {
    id: 'Men',
    name: "Men's Collection",
    tagline: 'Tailored Suits & Urban Streetwear',
    image: assets.p_img1,
    count: '24+ Items',
    badge: 'Trending'
  },
  {
    id: 'Women',
    name: "Women's Fashion",
    tagline: 'Elegant Dresses & Chic Apparel',
    image: assets.p_img2,
    count: '32+ Items',
    badge: 'Popular'
  },
  {
    id: 'Kids',
    name: "Kids & Youth",
    tagline: 'Vibrant & Playful Outfits',
    image: assets.p_img3,
    count: '18+ Items',
    badge: 'New Season'
  },
  {
    id: 'Accessories',
    name: 'Luxury Accessories',
    tagline: 'Watches, Bags & Signature Accents',
    image: assets.p_img8,
    count: '15+ Items',
    badge: 'Exclusive'
  }
];

const CategoryShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="my-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <Title text1="EXPLORE" text2="CATEGORIES" />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
          Browse through our curated departments designed for modern lifestyles, effortless comfort, and luxury standards.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/collection')}
            className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-800"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-95" />

            {/* Top Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{cat.badge}</span>
            </div>

            {/* Top Right Action Icon */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
              <span className="text-xs uppercase tracking-wider text-orange-400 font-semibold mb-1 block">
                {cat.count}
              </span>
              <h3 className="text-xl font-bold font-serif tracking-tight mb-1 group-hover:text-orange-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-300 font-light line-clamp-1">
                {cat.tagline}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
