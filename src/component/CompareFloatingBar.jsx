import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, X, ArrowRight, Trash2 } from 'lucide-react';

const CompareFloatingBar = () => {
  const { compareItems, products, clearCompare, setIsCompareModalOpen, toggleCompareItem } = useContext(ShopContext);

  if (!compareItems || compareItems.length === 0) return null;

  const compareProducts = products.filter(p => compareItems.includes(p._id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 260 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl px-4 py-3 sm:px-6 sm:py-3.5 max-w-xl w-[92%] flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center">
            <Scale className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 overflow-hidden">
              {compareProducts.map(p => (
                <div key={p._id} className="relative group">
                  <img
                    src={Array.isArray(p.image) ? p.image[0] : p.image}
                    alt={p.name}
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover bg-gray-100 dark:bg-gray-800"
                  />
                  <button
                    onClick={() => toggleCompareItem(p._id)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove item"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 dark:text-white">
                Comparing {compareItems.length} {compareItems.length === 1 ? 'Item' : 'Items'}
              </p>
              <p className="text-[10px] text-gray-400 font-medium">Max 4 products</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearCompare}
            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Clear all comparison"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCompareModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/25 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareFloatingBar;
