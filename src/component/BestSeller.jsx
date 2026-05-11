import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from './Title';
import ProductItem from './ProductItem';
import { assets } from '../assets/frontend_assets/assets';

const BestSeller = () => {
  const { product } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (product && product.length) {
      const bestProduct = product.filter((item) => item.bestSeller);
      setBestSeller(bestProduct.slice(0, 5));
    }
  }, [product]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Tittle text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          Choose words and descriptive adjectives that highlight the unique features of the clothing item
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <p className='col-span-full text-center'>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
