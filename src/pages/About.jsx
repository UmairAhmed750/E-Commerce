import React from 'react'
import Tittle from '../component/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../component/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Tittle text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Forever Living Products is a company dedicated to sourcing, growing, manufacturing, and distributing aloe vera and other health and beauty products. Founded in 1978, the company owns its aloe fields, manufacturing facilities, and distribution channels. They are known for their commitment to quality and purity, and they operate in over 160 countries. .</p>
        <p>Forever Living Products (foreverliving.com) is a multi-billion dollar company founded in 1978 by Rex Maughan. They focus on health and beauty products, particularly those derived from aloe vera, and operate through a multi-level marketing structure. </p>
        <b className='text-gray-800'>Our Mission</b>
        <p>The phrase "our mission forever" generally refers to a long-term commitment to a specific purpose or goal. It signifies a dedication that extends beyond a temporary endeavor, implying a continuous and enduring effort towards achieving a desired outcome. This could be applied to various contexts, such as a company's mission, a personal goal, or an organization's core values</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Tittle text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance:</b>
              <p className='text-gray-600'>We meticolusly select and veteach product ensure it meets our stringent quality standerds.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className='text-gray-600'>with our user-friendly interface and hassle-free ordering process,shopping has naver been eastie.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service:</b>
              <p className='text-gray-600'>professionals is here to assist you the way, ensuring your satifaction is your top priority.</p>
          </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
