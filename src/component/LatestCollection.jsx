import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  const { products } = useContext(ShopContext) ;
  const [latestProducts, setLatestProducts] = useState([]);


  // useEffect(()=>{
  //   setLatestProducts(products.slice(0,10));
  // },[])
  useEffect(() => {
  if (products && products.length) {
    setLatestProducts(products.slice(0, 10));
  }
}, [products]);


  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
      <Tittle text1={'LATEST'} text2={'COLLECTION'} />
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
     Looking to satiate your fashion hunger? Well, Ideas Man is right here to quench your thirst for high-end and luxurious fashion with their top of the line clothes for men. At Ideas Man, we have a wide variety of menswear ranging from polo shirts, t-shirts, dress shirts, casual shirts, men’s sweaters, khakis, jackets, jeans and dress pants. Not only the western attires, but we are favorites in the market</p>
      </div>

      {/* // {redring products} */}

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {latestProducts.length > 0 ? (
  latestProducts.map((item, index) => (
    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
  ))
) : (
  <p>Loading...</p>
)}
   

      </div>

    </div>
  )
}

export default LatestCollection


    // {
    //       latestProducts.map((item,index)=>(
    //         <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    //       ))
    //     }