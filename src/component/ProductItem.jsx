import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, products, isInWishlist, toggleWishlist, setQuickViewProduct, setQuickShopProduct } = useContext(ShopContext);
  const isFav = isInWishlist(id);
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewHovered, setIsQuickViewHovered] = useState(false);
  const [isQuickShopHovered, setIsQuickShopHovered] = useState(false);

  const imagesList = Array.isArray(image) ? image : [image];
  const primaryImg = imagesList[0];
  const secondaryImg = imagesList.length > 1 ? imagesList[1] : null;

  const prodObj = products.find(p => p._id === id) || { _id: id, image, name, price };
  const rawSizes = prodObj?.sizes || ['S', 'M', 'L'];
  const sizesText = rawSizes.includes('Large') || rawSizes.includes('Medium')
    ? rawSizes.join(', ')
    : rawSizes.map(s => s === 'S' ? 'Small' : s === 'M' ? 'Medium' : s === 'L' ? 'Large' : s === 'XL' ? 'X-Large' : s).join(', ');

  const isItemSoldOut = !!prodObj?.isSoldOut;

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(prodObj);
  };

  const handleQuickShop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isItemSoldOut) {
      toast.error('Sorry, this product is currently Sold Out!');
      return;
    }
    setQuickShopProduct(prodObj);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className='relative group'
    >
      <Link className='text-gray-700 dark:text-gray-200 cursor-pointer block' to={`/product/${id}`}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800/80 relative shadow-sm group-hover:shadow-xl transition-all duration-500 aspect-[3/4]'
        >
          {/* Primary Image */}
          <img
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${isItemSoldOut ? 'filter grayscale-[35%]' : ''
              } ${isHovered && secondaryImg ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'}`}
            src={primaryImg}
            alt={name}
          />

          {/* Secondary Hover Image */}
          {secondaryImg && (
            <img
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${isItemSoldOut ? 'filter grayscale-[35%]' : ''
                } ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
              src={secondaryImg}
              alt={`${name} secondary preview`}
            />
          )}

          <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' />

          {/* Sold Out Badge */}
          {isItemSoldOut && (
            <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-rose-600/95 text-white font-extrabold text-[10px] tracking-wider uppercase backdrop-blur-md shadow-lg border border-white/20">
              🚫 SOLD OUT
            </span>
          )}

          {/* Heart Wishlist Toggle Button (Top Right) */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isFav
                ? 'bg-rose-500 text-white shadow-lg scale-110'
                : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 hover:bg-rose-500 hover:text-white'
              }`}
            title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Center Overlay Buttons (Quick View & Quick Shop) */}
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none px-4 z-20'>
            {/* Quick View Button (Turns into Eye Icon on Hover) */}
            <button
              type="button"
              onMouseEnter={() => setIsQuickViewHovered(true)}
              onMouseLeave={() => setIsQuickViewHovered(false)}
              onClick={handleQuickView}
              className={`pointer-events-auto w-36 h-10 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center shadow-xl cursor-pointer ${isQuickViewHovered
                  ? 'bg-gray-900/90 text-white backdrop-blur-md scale-105 border border-white/20'
                  : 'bg-white/40 dark:bg-black/40 text-gray-900 dark:text-white backdrop-blur-md hover:bg-gray-900/90 hover:text-white border border-white/30'
                }`}
            >
              {isQuickViewHovered ? (
                <Eye className="w-5 h-5 text-white" />
              ) : (
                <span>Quick View</span>
              )}
            </button>

            {/* Quick Shop Button (Turns into Shopping Bag Icon on Hover) */}
            <button
              type="button"
              onMouseEnter={() => setIsQuickShopHovered(true)}
              onMouseLeave={() => setIsQuickShopHovered(false)}
              onClick={handleQuickShop}
              className={`pointer-events-auto w-36 h-10 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center shadow-xl cursor-pointer ${isItemSoldOut
                  ? 'bg-gray-800/80 text-gray-400 cursor-not-allowed border border-gray-600'
                  : isQuickShopHovered
                    ? 'bg-white text-gray-900 scale-105 shadow-2xl'
                    : 'bg-white/40 dark:bg-black/40 text-gray-900 dark:text-white backdrop-blur-md border border-white/30'
                }`}
            >
              {isItemSoldOut ? (
                <span>Sold Out</span>
              ) : isQuickShopHovered ? (
                <ShoppingBag className="w-5 h-5 text-gray-900" />
              ) : (
                <span>Quick Shop</span>
              )}
            </button>
          </div>

          {/* Bottom-Center Sizes Sub-text Overlay */}
          <div className='absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10'>
            <p className='text-[11px] font-bold text-white drop-shadow-lg tracking-wider'>
              {sizesText}
            </p>
          </div>
        </div>

        <div className='pt-2.5 pb-1 px-1'>
          {/* Top Seller / Special Tag Indicator below image */}
          {(() => {
            const prodObj = products.find(p => p._id === id);
            const tagVal = prodObj?.tag;
            const isBestseller = prodObj?.bestseller;

            if (tagVal && tagVal !== 'none') {
              return (
                <span className="text-[11px] font-extrabold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1 mb-0.5">
                  {tagVal === 'trending' && '🔥 Trending'}
                  {tagVal === 'popular' && '⭐ Popular'}
                  {tagVal === 'new_season' && '✨ New Season'}
                  {tagVal === 'exclusive' && '👑 Exclusive'}
                </span>
              );
            }
            if (isBestseller) {
              return (
                <span className="text-[11px] font-extrabold text-amber-500 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Top Seller
                </span>
              );
            }
            return null;
          })()}

          <p className='text-sm font-medium text-gray-800 dark:text-gray-200 truncate group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors'>
            {name}
          </p>
          <p className='text-sm font-bold text-gray-900 dark:text-white mt-1'>
            {currency}{price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductItem;

