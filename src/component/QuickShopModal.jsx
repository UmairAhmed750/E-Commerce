import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const QuickShopModal = () => {
  const { quickShopProduct, setQuickShopProduct, currency, addToCart } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);

  if (!quickShopProduct) return null;

  const images = Array.isArray(quickShopProduct.image) ? quickShopProduct.image : [quickShopProduct.image];
  const mainImage = images[0];

  const sizesList = (quickShopProduct.sizes && quickShopProduct.sizes.length > 0)
    ? quickShopProduct.sizes
    : ['Small', 'Medium', 'Large'];

  const activeSize = selectedSize || sizesList[0];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(quickShopProduct._id, activeSize);
    }
    toast.success(`Added ${quantity} x ${quickShopProduct.name} (${activeSize}) to cart! 🛍️`);
    setQuickShopProduct(null);
    setQuantity(1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickShopProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 w-full max-w-sm z-10 p-6 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickShopProduct(null)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Header */}
          <div className="flex gap-4 items-center">
            <img
              src={mainImage}
              alt={quickShopProduct.name}
              className="w-20 h-24 object-cover object-top rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm"
            />
            <div className="flex-1 pr-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-snug line-clamp-2">
                {quickShopProduct.name}
              </h3>
              <p className="text-sm font-extrabold text-orange-600 dark:text-orange-400 mt-1">
                {currency}{quickShopProduct.price}
              </p>
            </div>
          </div>

          {/* Size Selector */}
          <div className="mt-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              SIZE: <span className="text-orange-600 dark:text-orange-400">{activeSize}</span>
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {sizesList.map((sz) => {
                const isSelected = activeSize === sz;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${isSelected
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-gray-500'
                      }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-5 flex justify-center">
            <div className="flex items-center gap-4 border border-gray-300 dark:border-gray-700 rounded-full px-4 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer p-1"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-gray-900 dark:text-white w-4 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white cursor-pointer p-1"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          {quickShopProduct.isSoldOut ? (
            <div className="w-full mt-6 py-3.5 px-4 rounded-full bg-gray-800 text-gray-400 font-extrabold text-xs tracking-wider uppercase text-center border border-gray-700">
              🚫 ITEM IS SOLD OUT
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full mt-6 py-3.5 px-4 rounded-full bg-cyan-400 hover:bg-cyan-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-cyan-400/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ADD TO CART</span>
            </motion.button>
          )}

          {/* View Full Details Link */}
          <div className="mt-4 text-center">
            <Link
              to={`/product/${quickShopProduct._id}`}
              onClick={() => setQuickShopProduct(null)}
              className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              View full details →
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickShopModal;
