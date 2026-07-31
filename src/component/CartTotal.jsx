import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Tittle from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Tittle text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm text-gray-700 dark:text-gray-300'>
        <div className='flex justify-between'>
        <p>Subtotal</p>
        <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr className='dark:border-gray-800' />
        <div className='flex justify-between'>
        <p>Shipping Fee</p>
        <p>{currency}{delivery_fee}.00</p>
        </div>
        <hr className='dark:border-gray-800' />
        <div className='flex justify-between text-gray-900 dark:text-gray-100'>
        <b>Total</b>
        <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + Number(delivery_fee)}.00</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
