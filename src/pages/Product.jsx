import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../component/RelatedProduct';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='border-t border-gray-200/80 dark:border-gray-800/80 pt-10'
    >
      {/* Product Data */}
      <div className='flex gap-10 sm:gap-14 flex-col lg:flex-row'>
        
        {/* Product Images Container */}
        <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[20%] w-full gap-3'>
            {productData.image.map((item, index) => (
              <motion.img 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                className={`w-[22%] sm:w-full flex-shrink-0 cursor-pointer rounded-xl bg-gray-100 dark:bg-gray-800 border-2 transition-all p-1 ${
                  item === image ? 'border-orange-500 shadow-md scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                }`} 
                alt="" 
              />
            ))}
          </div>
          
          <div className='w-full sm:w-[80%] bg-gray-100 dark:bg-gray-800/60 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden glass-card min-h-[380px] sm:min-h-[480px]'>
            <AnimatePresence mode="wait">
              <motion.img 
                key={image}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className='w-full h-auto max-h-[500px] object-contain rounded-xl' 
                src={image} 
                alt={productData.name} 
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Product Details Info */}
        <div className='flex-1 flex flex-col justify-center'>
          <h1 className='font-semibold text-3xl text-gray-900 dark:text-white tracking-tight'>
            {productData.name}
          </h1>

          <div className='flex items-center gap-1.5 mt-3'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="" className='w-4' />
            ))}
            <img src={assets.star_dull_icon} alt="" className='w-4' />
            <p className='pl-2 text-xs font-medium text-gray-500 dark:text-gray-400'>(122 Reviews)</p>
          </div>

          <p className='mt-6 text-3xl font-bold text-gray-900 dark:text-white tracking-tight'>
            {currency}{productData.price}
          </p>

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
                  className={`py-2.5 px-5 rounded-xl text-sm font-medium border transition-all ${
                    item === size 
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

          {/* Add to Cart CTA */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(productData._id, size)} 
            className='bg-gradient-to-r from-gray-900 to-black dark:from-white dark:to-gray-100 text-white dark:text-black font-semibold px-10 py-4 rounded-2xl text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 w-full sm:w-max'
          >
            <ShoppingBag className='w-4 h-4' />
            <span>ADD TO CART</span>
          </motion.button>

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
          <b className='border-b-2 border-orange-500 px-6 py-3 text-sm text-gray-900 dark:text-white font-semibold'>Description</b>
          <p className='px-6 py-3 text-sm text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-700 transition-colors'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 p-6 text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed glass-card rounded-b-2xl border-t-0'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence.</p>
          <p>E-commerce websites have gained immense popularity due to their convenience, accessibility, and global reach. They offer a wide range of products with detailed descriptions, customer reviews, and secure checkout mechanisms.</p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </motion.div>
  );
};

export default Product;