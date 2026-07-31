import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Quote } from 'lucide-react';
import Title from './Title';
import { assets } from '../assets/frontend_assets/assets';

const reviews = [
  {
    name: 'Sophia Reynolds',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    product: 'Pure Cotton Signature Trench',
    review: 'The quality surpassed all my expectations! The tailoring is crisp, fabric feels insanely luxurious, and shipping arrived in just 2 days. Truly a top-tier brand!'
  },
  {
    name: 'Marcus Vance',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    product: 'Slim Fit Denim Jacket',
    review: 'Hands down the best online shopping experience I have had. Premium packaging, perfectly fitting garments, and excellent customer service when I asked for a size check.'
  },
  {
    name: 'Elena Rostova',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    product: 'Women Casual Knit Sweater',
    review: 'Super soft wool and perfect stitching. It has become my go-to piece for winter. Loved the complimentary luxury packaging too!'
  }
];

const Testimonials = () => {
  return (
    <section className="my-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-6"
      >
        <Title text1="WHAT OUR" text2="CUSTOMERS SAY" />
        <p className="w-full sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
          Over 50,000 fashion lovers trust us for high-grade quality, modern style, and exceptional service.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {reviews.map((rev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            className="relative p-8 rounded-2xl glass-card border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/60 shadow-lg flex flex-col justify-between"
          >
            <Quote className="absolute top-6 right-6 w-10 h-10 text-orange-500/10 dark:text-orange-400/10" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-6 italic">
                "{rev.review}"
              </p>
            </div>

            <div>
              <div className="text-[11px] font-medium text-orange-600 dark:text-orange-400 mb-3 bg-orange-50 dark:bg-orange-950/40 px-2.5 py-1 rounded-md w-fit border border-orange-200/50 dark:border-orange-900/30">
                Item: {rev.product}
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  onError={(e) => { e.target.src = assets.profile_icon; }}
                  className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/30"
                />
                <div>
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                  </h4>
                  <span className="text-[11px] text-gray-400 font-light">{rev.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
