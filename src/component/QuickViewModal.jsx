import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Heart, ShoppingBag, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, currency, addToCart, buyNow, isInWishlist, toggleWishlist } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!quickViewProduct) return null;

  const images = Array.isArray(quickViewProduct.image) ? quickViewProduct.image : [quickViewProduct.image];
  const isFav = isInWishlist(quickViewProduct._id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct._id, selectedSize);
    if (selectedSize) {
      setQuickViewProduct(null);
      setSelectedSize('');
    }
  };

  const handleBuyNow = async () => {
    const success = await buyNow(quickViewProduct._id, selectedSize);
    if (success) {
      setQuickViewProduct(null);
      setSelectedSize('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setQuickViewProduct(null);
            setSelectedSize('');
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-3xl z-10 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-thin"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              setQuickViewProduct(null);
              setSelectedSize('');
            }}
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-gray-100/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-md backdrop-blur-md cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8">
            {/* Left: Product Images */}
            <div className="flex flex-col gap-2.5">
              <div className="w-full aspect-[4/5] sm:aspect-square max-h-64 sm:max-h-80 md:max-h-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-800 relative shadow-sm">
                <img
                  src={images[activeImageIndex] || images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx
                          ? 'border-orange-500 scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-xs uppercase font-bold text-orange-600 dark:text-orange-400 tracking-wider">
                    {quickViewProduct.category || 'Collection'}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-[11px]">4.8 (120+ reviews)</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                  {quickViewProduct.name}
                </h2>

                <p className="text-xl sm:text-2xl font-extrabold text-orange-600 dark:text-orange-400 mt-1.5 sm:mt-2">
                  {currency}{quickViewProduct.price}
                </p>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {quickViewProduct.description || 'Premium quality e-commerce apparel designed for comfort and style.'}
                </p>

                {/* Size Selector */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="mt-3 sm:mt-4">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider mb-1.5">
                      Select Size
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition-all ${selectedSize === size
                              ? 'bg-orange-500 text-white border-orange-500 shadow-md scale-105'
                              : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-orange-500'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2.5">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gray-900 dark:bg-gray-800 hover:bg-black dark:hover:bg-gray-700 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>Add to Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    className="flex-1 w-full py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span>Buy Now</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWishlist(quickViewProduct._id)}
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all ${isFav
                        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-600'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-rose-500'
                      }`}
                    title="Toggle Wishlist"
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </motion.button>
                </div>

                <Link
                  to={`/product/${quickViewProduct._id}`}
                  onClick={() => setQuickViewProduct(null)}
                  className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors py-0.5"
                >
                  View Full Product Details →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
