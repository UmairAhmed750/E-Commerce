import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../component/RelatedProduct';
import ProductItem from '../component/ProductItem';
import Tittle from '../component/Title';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ShieldCheck, Truck, RotateCcw, Heart, Star, Send, User, Zap } from 'lucide-react';

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    buyNow,
    isInWishlist,
    toggleWishlist,
    productReviews,
    addProductReview
  } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'reviews'

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Image Zoom Lens Magnifier State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ xPercent: 50, yPercent: 50, lensLeft: 0, lensTop: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    const lensWidth = 140;
    const lensHeight = 140;

    const lensLeft = Math.max(0, Math.min(rect.width - lensWidth, x - lensWidth / 2));
    const lensTop = Math.max(0, Math.min(rect.height - lensHeight, y - lensHeight / 2));

    setZoomPos({ xPercent, yPercent, lensLeft, lensTop });
  };

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const isFav = isInWishlist(productData._id);

  // Reviews calculations
  const customReviews = productReviews[productData._id] || [];
  const defaultReviews = [
    { name: 'Ayesha Khan', rating: 5, date: 'July 28, 2026', comment: 'Absolutely loved the fabric and color! Fits perfectly and came super fast.' },
    { name: 'Hamza Malik', rating: 4, date: 'July 15, 2026', comment: 'Great quality for the price. Would buy again.' }
  ];
  const allReviews = [...customReviews, ...defaultReviews];
  const avgRating = (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev = {
      name: reviewerName.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      comment: reviewComment.trim()
    };

    addProductReview(productData._id, newRev);
    setReviewerName('');
    setReviewComment('');
    setReviewRating(5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10'
    >
      {/* Product Data */}
      <div className='flex gap-10 sm:gap-14 flex-col lg:flex-row relative'>

        {/* Product Images Container */}
        <div className={`flex-1 flex flex-col-reverse gap-4 sm:flex-row relative ${isZooming ? 'z-50' : 'z-10'}`}>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[20%] w-full gap-3'>
            {productData.image.map((item, index) => (
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className={`w-[22%] sm:w-full flex-shrink-0 cursor-pointer rounded-xl bg-gray-100 dark:bg-gray-800 border-2 transition-all p-1 ${item === image ? 'border-orange-500 shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                alt=""
              />
            ))}
          </div>

          <div
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            className='w-full sm:w-[80%] bg-gray-100 dark:bg-gray-800/60 rounded-2xl p-4 flex items-center justify-center relative glass-card min-h-[380px] sm:min-h-[480px] cursor-crosshair group'
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className='w-full h-auto max-h-[500px] object-contain rounded-xl select-none'
                src={image}
                alt={productData.name}
              />
            </AnimatePresence>

            {/* Lens Box Overlay on Hover */}
            {isZooming && (
              <div
                style={{
                  left: `${zoomPos.lensLeft}px`,
                  top: `${zoomPos.lensTop}px`,
                  width: '140px',
                  height: '140px',
                }}
                className="absolute pointer-events-none border-2 border-orange-500 bg-orange-500/20 dark:bg-white/20 backdrop-blur-[1px] rounded-xl z-30 shadow-2xl transition-all duration-75 ease-out hidden lg:block"
              />
            )}

            {/* Side Magnified High-Res Zoom Window */}
            <AnimatePresence>
              {isZooming && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-[102%] top-0 w-[105%] h-full bg-white dark:bg-gray-950 rounded-3xl shadow-2xl border-2 border-orange-500/60 overflow-hidden z-50 hidden lg:block"
                >
                  <div
                    className="w-full h-full bg-no-repeat transition-all duration-75 ease-out"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: '280% 280%',
                      backgroundPosition: `${zoomPos.xPercent}% ${zoomPos.yPercent}%`
                    }}
                  />
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 shadow-md">
                    🔍 2.8x HD Zoom
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Product Details Info (Fades out when image zooming is active) */}
        <div className={`flex-1 flex flex-col justify-center transition-all duration-300 ${isZooming ? 'lg:opacity-0 lg:pointer-events-none' : 'opacity-100'}`}>
          <div className='flex items-center justify-between gap-4'>
            <h1 className='font-semibold text-3xl text-gray-900 dark:text-white tracking-tight'>
              {productData.name}
            </h1>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleWishlist(productData._id)}
              className={`p-3 rounded-2xl border transition-all ${isFav
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-500 shadow-md'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:text-rose-500'
                }`}
              title={isFav ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          <div className='flex items-center gap-2 mt-3 cursor-pointer' onClick={() => setActiveTab('reviews')}>
            <div className='flex items-center text-amber-400'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(avgRating) ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`}
                />
              ))}
            </div>
            <p className='text-xs font-semibold text-gray-700 dark:text-gray-300'>
              {avgRating} <span className='text-gray-500 dark:text-gray-400 font-normal'>({allReviews.length} Reviews)</span>
            </p>
          </div>

          <div className='flex items-center gap-3 mt-6'>
            <p className='text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
              {currency}{productData.price}
            </p>
            {productData.isSoldOut && (
              <span className="px-3.5 py-1 rounded-full bg-rose-600/90 text-white font-extrabold text-xs tracking-wider uppercase backdrop-blur-md shadow-md border border-white/20">
                🚫 OUT OF STOCK (SOLD OUT)
              </span>
            )}
          </div>

          <p className='mt-4 text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-lg'>
            {productData.description}
          </p>

          {/* Select Size */}
          <div className='flex flex-col gap-3 my-8'>
            <p className='text-sm font-semibold tracking-wider text-gray-900 dark:text-white uppercase'>Select Size</p>
            <div className='flex gap-3 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSize(item)}
                  className={`py-2.5 px-5 rounded-xl text-sm font-medium border transition-all ${item === size
                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:border-gray-400'
                    }`}
                  key={index}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Add to Cart & Buy Now CTA Buttons */}
          <div className='flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2'>
            {productData.isSoldOut ? (
              <div className="w-full py-4 px-8 rounded-2xl bg-gray-800 text-gray-400 font-bold text-sm text-center uppercase border border-gray-700 shadow-inner">
                🚫 THIS ITEM IS CURRENTLY SOLD OUT
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(productData._id, size)}
                  className='bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black font-semibold px-8 py-4 rounded-2xl text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer border border-transparent'
                >
                  <ShoppingBag className='w-4 h-4' />
                  <span>ADD TO CART</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => buyNow(productData._id, size)}
                  className='bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-sm tracking-wider uppercase shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto cursor-pointer'
                >
                  <Zap className='w-4 h-4 fill-current text-white' />
                  <span>BUY NOW</span>
                </motion.button>
              </>
            )}
          </div>

          <hr className='mt-8 dark:border-gray-800' />

          {/* Product Features Badges */}
          <div className='text-xs text-gray-500 dark:text-gray-400 mt-6 flex flex-col gap-2.5 font-light'>
            <div className='flex items-center gap-2.5'>
              <ShieldCheck className='w-4 h-4 text-orange-500' />
              <span>100% Original Authentic Product.</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <Truck className='w-4 h-4 text-orange-500' />
              <span>Cash on delivery is available on this product.</span>
            </div>
            <div className='flex items-center gap-2.5'>
              <RotateCcw className='w-4 h-4 text-orange-500' />
              <span>Easy return and exchange policy within 7 days.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Review Tabs */}
      <div className='mt-20'>
        <div className='flex border-b border-gray-200 dark:border-gray-800'>
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 ${activeTab === 'description'
                ? 'border-orange-500 text-gray-900 dark:text-white'
                : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-sm font-semibold transition-all border-b-2 flex items-center gap-2 ${activeTab === 'reviews'
                ? 'border-orange-500 text-gray-900 dark:text-white'
                : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
          >
            <span>Reviews</span>
            <span className='px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 text-xs'>
              {allReviews.length}
            </span>
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className='flex flex-col gap-4 p-6 text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed glass-card rounded-b-2xl border-t-0'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
            <p>E-commerce websites have gained immense popularity due to their convenience, accessibility, and global reach. They offer a wide range of products with detailed descriptions, customer reviews, and secure checkout mechanisms.</p>
          </div>
        ) : (
          <div className='p-6 glass-card rounded-b-2xl border-t-0 flex flex-col gap-8'>
            {/* Rating Breakdown & Review Submission Header */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start border-b border-gray-200/60 dark:border-gray-800/60 pb-8'>
              {/* Star Rating Overview */}
              <div>
                <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>Customer Ratings</h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-extrabold text-gray-900 dark:text-white'>{avgRating}</span>
                  <div className='flex items-center text-amber-400'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`} />
                    ))}
                  </div>
                  <span className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Based on {allReviews.length} reviews</span>
                </div>

                {/* Progress bars */}
                <div className='flex flex-col gap-2 mt-4 max-w-xs'>
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = allReviews.filter(r => r.rating === stars).length;
                    const percent = (count / allReviews.length) * 100;
                    return (
                      <div key={stars} className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400'>
                        <span className='w-8 font-semibold'>{stars} ★</span>
                        <div className='flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden'>
                          <div className='h-full bg-amber-400 rounded-full' style={{ width: `${percent}%` }} />
                        </div>
                        <span className='w-6 text-right font-medium'>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Review Form */}
              <form onSubmit={handleReviewSubmit} className='p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 flex flex-col gap-3'>
                <h4 className='text-sm font-bold text-gray-900 dark:text-white'>Write a Customer Review</h4>

                <div>
                  <label className='text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 block'>Your Rating</label>
                  <div className='flex gap-1 text-amber-400 cursor-pointer'>
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <Star
                        key={starVal}
                        onClick={() => setReviewRating(starVal)}
                        className={`w-6 h-6 transition-transform hover:scale-110 ${starVal <= reviewRating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <input
                    type='text'
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder='Your Name (e.g. Mahad)'
                    className='w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500'
                  />
                </div>

                <div>
                  <textarea
                    rows='3'
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder='Write your feedback about this product...'
                    className='w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 resize-none'
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  className='py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all'
                >
                  <Send className='w-3.5 h-3.5' />
                  <span>Submit Review</span>
                </motion.button>
              </form>
            </div>

            {/* Existing Customer Reviews List */}
            <div className='flex flex-col gap-4'>
              {allReviews.map((rev, idx) => (
                <div key={idx} className='p-4 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 flex flex-col gap-2'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2.5'>
                      <div className='w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center justify-center'>
                        <User className='w-4 h-4' />
                      </div>
                      <div>
                        <p className='text-xs font-bold text-gray-900 dark:text-white'>{rev.name}</p>
                        <p className='text-[10px] text-gray-400'>{rev.date}</p>
                      </div>
                    </div>

                    <div className='flex items-center text-amber-400'>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`} />
                      ))}
                    </div>
                  </div>
                  <p className='text-xs text-gray-700 dark:text-gray-300 leading-relaxed pl-10'>
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Display Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </motion.div>
  );
};

export default Product;