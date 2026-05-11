import React, { useContext } from 'react'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
const Login = () => {

  const [currentState,setCurrentState] = useState('Sign up')
  const{token, setToken, navigate, } = useContext(ShopContext)
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
 const { backendUrl } = useContext(ShopContext);


  const onSumbitHandler = async (event) => {
  event.preventDefault();
  try {
    if (currentState === 'Sign up') {
      const response = await axios.post(`${backendUrl}api/user/register`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      alert("Account created. Please login.");
      setCurrentState('Login');
    } else {
      const response = await axios.post(`${backendUrl}api/user/login`, {
        email,
        password,
      });
      console.log(response.data);
      if (response.data.success) {
        setToken(response.data.token);
        navigate('/');
        console.log("Backend URL:", backendUrl);
      }
    }
  } catch (error) {
    console.error("Error during auth:", error);
    alert("Something went wrong. Please try again.");
  }
};

  
  return (
    <form onSubmit={onSumbitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
        </div>
        {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'/>}
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p className='cursor-pointer'>Forgot your password?</p>
            {
              currentState === 'Login'
              ? <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create account</p>
              : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login here</p>
            }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign up'}</button>
    </form>
  )
}

export default Login
