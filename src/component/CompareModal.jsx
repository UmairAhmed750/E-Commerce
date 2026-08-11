import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Star, ShoppingBag, Trash2 } from 'lucide-react';

const CompareModal = () => {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    compareItems,
    products,
    formatPrice,
    toggleCompareItem,
    clearCompare,
    addToCart
  } = useContext(ShopContext);

  if (!isCompareModalOpen || !compareItems || compareItems.length === 0) return null;

  const compareProducts = products.filter(p => compareItems.includes(p._id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCompareModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-5xl z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-bold">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Product Comparison Matrix</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Comparing {compareProducts.length} selected items side-by-side</p>
              </div>
            </div>

            <button
              onClick={clearCompare}
              className="text-xs font-semibold text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Comparison</span>
            </button>
          </div>

          {/* Comparison Matrix Table / Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {compareProducts.map((product) => {
              const image = Array.isArray(product.image) ? product.image[0] : product.image;
              const firstSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
              return (
                <div
                  key={product._id}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-800/60 relative group"
                >
                  <button
                    onClick={() => toggleCompareItem(product._id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 text-gray-400 hover:text-red-500 hover:bg-white transition-colors z-10"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4 border border-gray-200/50 dark:border-gray-700/50">
                      <img src={image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {product.category || 'Apparel'}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-0.5 line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-lg font-extrabold text-orange-600 dark:text-orange-400 mt-2">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center gap-1 text-amber-400 text-xs mt-2">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">4.8 (120+ reviews)</span>
                    </div>

                    {/* Spec comparison rows */}
                    <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-gray-700/60 text-xs flex flex-col gap-2">
                      <div>
                        <span className="text-gray-400 font-medium block text-[10px] uppercase">Available Sizes:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.sizes ? product.sizes.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-800 dark:text-gray-200">
                              {s}
                            </span>
                          )) : <span className="text-gray-400">Standard</span>}
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-gray-400 font-medium block text-[10px] uppercase">Stock Status:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">In Stock (Fast Shipping)</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart(product._id, firstSize)}
                    className="mt-6 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CompareModal;
