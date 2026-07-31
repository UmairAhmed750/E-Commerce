import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Card from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import SearchBar from './component/SearchBar'
import ScrollToTop from './component/ScrollToTop'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300'>
      <ScrollToTop />
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/product/:productId' element={<Product />} />
      <Route path='/cart' element={<Card/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/place-Order' element={<PlaceOrder/>}/>
      <Route path='/orders' element={<Orders/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
