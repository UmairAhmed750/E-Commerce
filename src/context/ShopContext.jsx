import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '$';
    const delivery_fee = '10';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({}); 
  const [token,setToken] = useState('')
  const navigate = useNavigate()

  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

const addToCart = async (itemId, size) => {
  if (!size) {
    toast.error('Select Product Size');
    return;
  }

  let updatedCart = structuredClone(cartItems);
  if (updatedCart[itemId]) {
    if (updatedCart[itemId][size]) {
      updatedCart[itemId][size] += 1;
    } else {
      updatedCart[itemId][size] = 1;
    }
  } else {
    updatedCart[itemId] = { [size]: 1 };
  }

  setCartItems(updatedCart);
};

const getCartCounts = () => {
  let totalCount = 0;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const count = cartItems[itemId][size];
      if (count > 0) {
        totalCount += count;
      }
    }
  }
  return totalCount;
};
 
const ubdateQuantity = async (itemId,size,quantity)=>{

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
}

    const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const itemInfo = products.find(product => product._id === itemId);

    if (!itemInfo) continue; // safety check

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];

      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
}

const value = {
  products,
  currency,
  delivery_fee,
  search,
  setSearch,
  showSearch,
  setShowSearch,
  cartItems,         
  addToCart,
  getCartCounts,
ubdateQuantity,
getCartAmount,
navigate,
backendUrl: 'http://localhost:5000/', 
setToken,
token,
theme,
setTheme,
toggleTheme,
};


    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;