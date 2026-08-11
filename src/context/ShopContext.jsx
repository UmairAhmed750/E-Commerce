import { createContext, useEffect, useState } from "react";
import { products as initialProducts } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  const delivery_fee = '10';
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Clean Auth State
  const [authLoading, setAuthLoading] = useState(false);

  // User Profile State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const setUserProfile = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
  };

  // Role State ('admin' | 'user' | 'guest')
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role') || (localStorage.getItem('isAdminLoggedIn') === 'true' ? 'admin' : (user ? 'user' : 'guest'));
  });

  // Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const parsed = savedUser ? JSON.parse(savedUser) : null;
      return parsed?.email?.toLowerCase() === 'admin@gmail.com' || localStorage.getItem('isAdminLoggedIn') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Local Accounts Registry
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('app_registered_users');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const saveLocalAccount = (email, name, password) => {
    const clean = email.trim().toLowerCase();
    const updated = {
      ...registeredAccounts,
      [clean]: { email: clean, name, password, createdAt: new Date().toISOString() }
    };
    setRegisteredAccounts(updated);
    localStorage.setItem('app_registered_users', JSON.stringify(updated));
  };

  const userSignIn = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const isUserAdmin = cleanEmail === 'admin@gmail.com';

    // Admin Authentication Handler
    if (isUserAdmin) {
      const adminData = { email: 'admin@gmail.com', name: 'Admin', role: 'admin' };
      setIsAdminLoggedIn(true);
      setRole('admin');
      setUserProfile(adminData);
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('role', 'admin');
      toast.success('Welcome back, Admin! 👑');
      navigate('/admin');
      return { success: true, user: adminData };
    }

    // Customer Sign-in
    const localAccount = registeredAccounts[cleanEmail];
    const userName = localAccount?.name || cleanEmail.split('@')[0];
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    const userData = { email: cleanEmail, name: formattedName, role: 'user' };

    setIsAdminLoggedIn(false);
    setRole('user');
    setUserProfile(userData);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.setItem('role', 'user');
    toast.success(`Signed in as ${formattedName}! 👋`);
    navigate('/');
    return { success: true, user: userData };
  };

  const userSignUp = async (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const userName = name.trim() ? name.trim() : cleanEmail.split('@')[0];
    const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

    saveLocalAccount(cleanEmail, formattedName, password);

    setIsAdminLoggedIn(false);
    setRole('guest');
    setUser(null);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('user');

    return { success: true, user: { email: cleanEmail, name: formattedName } };
  };

  const userSignOut = async () => {
    setIsAdminLoggedIn(false);
    setRole('guest');
    setUser(null);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const supabaseSignIn = userSignIn;
  const supabaseSignUp = userSignUp;
  const supabaseSignOut = userSignOut;
  const adminLogin = userSignIn;
  const adminLogout = userSignOut;
  const userLogout = userSignOut;

  const getUserInitial = () => {
    if (isAdminLoggedIn || role === 'admin' || user?.email === 'admin@gmail.com') return 'A';
    if (user && user.name) return user.name.charAt(0).toUpperCase();
    if (user && user.email) return user.email.charAt(0).toUpperCase();
    return null;
  };

  // Dynamic Product Management (Add, Delete, Bestseller toggle)
  const [customProducts, setCustomProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('customProducts');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [deletedProductIds, setDeletedProductIds] = useState(() => {
    try {
      const saved = localStorage.getItem('deletedProductIds');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('customProducts', JSON.stringify(customProducts));
  }, [customProducts]);

  useEffect(() => {
    localStorage.setItem('deletedProductIds', JSON.stringify(deletedProductIds));
  }, [deletedProductIds]);

  // Combine initial products & custom added products, minus deleted ones
  const products = [...customProducts, ...initialProducts].filter(
    (p) => !deletedProductIds.includes(p._id)
  );

  const addProduct = (productData) => {
    const newProduct = {
      _id: `prod_${Date.now()}`,
      name: productData.name,
      description: productData.description || 'Premium e-commerce apparel.',
      price: Number(productData.price) || 50,
      image: Array.isArray(productData.image) && productData.image.length > 0
        ? productData.image
        : [productData.imageUrl || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'],
      category: productData.category || 'Men',
      subCategory: productData.subCategory || 'Topwear',
      sizes: productData.sizes && productData.sizes.length > 0 ? productData.sizes : ['S', 'M', 'L', 'XL'],
      date: Date.now(),
      bestseller: productData.bestseller || false,
      tag: productData.tag || 'none',
      isSoldOut: productData.isSoldOut || false
    };

    setCustomProducts((prev) => [newProduct, ...prev]);
    toast.success(`"${newProduct.name}" added to catalog live! 🚀`);
    return newProduct;
  };

  const deleteProduct = (productId) => {
    const found = products.find((p) => p._id === productId);
    const title = found ? found.name : 'Product';

    setCustomProducts((prev) => prev.filter((p) => p._id !== productId));
    setDeletedProductIds((prev) => [...prev, productId]);
    toast.info(`"${title}" deleted from website`);
  };

  const updateProduct = (productId, updatedData) => {
    setCustomProducts((prev) => {
      const exists = prev.some((p) => p._id === productId);
      if (exists) {
        return prev.map((p) => (p._id === productId ? { ...p, ...updatedData } : p));
      } else {
        const builtIn = initialProducts.find((p) => p._id === productId);
        const merged = { ...(builtIn || {}), ...updatedData, _id: productId };
        return [merged, ...prev];
      }
    });
    toast.success(`"${updatedData.name || 'Product'}" updated live on store! ✏️`);
  };

  const toggleBestseller = (productId) => {
    const target = products.find(p => p._id === productId);
    const newStatus = !target?.bestseller;
    updateProduct(productId, { bestseller: newStatus });
  };

  const toggleSoldOut = (productId) => {
    const target = products.find((p) => p._id === productId);
    const newStatus = !target?.isSoldOut;
    updateProduct(productId, { isSoldOut: newStatus });
  };

  // Admin Order Management
  const [adminOrders, setAdminOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('adminOrders');
      return saved ? JSON.parse(saved) : [
        { id: 'ORD-98214', customer: 'Mahad Khan', total: 130, status: 'Shipped', date: 'July 30, 2026', itemsCount: 2 },
        { id: 'ORD-98224', customer: 'Ayesha Ahmed', total: 85, status: 'Order Placed', date: 'Aug 01, 2026', itemsCount: 1 },
        { id: 'ORD-98234', customer: 'Hamza Ali', total: 210, status: 'Processing', date: 'Aug 02, 2026', itemsCount: 3 }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('adminOrders', JSON.stringify(adminOrders));
  }, [adminOrders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setAdminOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order #${orderId} status updated to "${newStatus}"!`);
  };

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState('');

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
    // Requirement 5: Protect shopping actions. If visitor is NOT logged in, redirect to /login.
    if (!user) {
      toast.info('Please sign in to add products to your cart!');
      navigate('/login');
      return false;
    }

    if (!size) {
      toast.error('Select Product Size');
      return false;
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
    return true;
  };

  const buyNow = async (itemId, size) => {
    if (!user) {
      toast.info('Please sign in to make a purchase!');
      navigate('/login');
      return false;
    }

    if (!size) {
      toast.error('Select Product Size');
      return false;
    }
    const added = await addToCart(itemId, size);
    if (added) {
      navigate('/place-order');
    }
    return added;
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

  const ubdateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }
    return totalAmount;
  };

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (itemId) => {
    const itemInfo = products.find((p) => p._id === itemId);
    const titleName = itemInfo ? itemInfo.name : 'Product';
    if (wishlist.includes(itemId)) {
      setWishlist((prev) => prev.filter((id) => id !== itemId));
      toast.info(`${titleName} removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, itemId]);
      toast.success(`${titleName} added to Wishlist! ❤️`);
    }
  };

  const isInWishlist = (itemId) => wishlist.includes(itemId);
  const getWishlistCount = () => wishlist.length;

  const removeFromWishlist = (itemId) => {
    setWishlist((prev) => prev.filter((id) => id !== itemId));
    toast.info('Item removed from Wishlist');
  };

  // Promo Coupon System
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const VALID_COUPONS = {
    SAVE10: { code: 'SAVE10', type: 'percent', value: 10, title: '10% OFF Discount' },
    FLAT20: { code: 'FLAT20', type: 'flat', value: 20, title: '$20 Flat Discount' },
    FREESHIP: { code: 'FREESHIP', type: 'freeship', value: 10, title: 'Free Delivery' },
  };

  const applyCoupon = (codeStr) => {
    const cleanCode = codeStr.trim().toUpperCase();
    if (VALID_COUPONS[cleanCode]) {
      setAppliedCoupon(VALID_COUPONS[cleanCode]);
      toast.success(`Coupon "${cleanCode}" applied successfully! 🎉`);
      return true;
    } else {
      toast.error('Invalid Coupon Code. Try SAVE10, FLAT20 or FREESHIP');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  const getDiscountAmount = () => {
    const subtotal = getCartAmount();
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === 'flat') {
      return Math.min(appliedCoupon.value, subtotal);
    }
    if (appliedCoupon.type === 'freeship') {
      return Number(delivery_fee);
    }
    return 0;
  };

  const getFinalShippingFee = () => {
    if (getCartAmount() === 0) return 0;
    if (appliedCoupon && appliedCoupon.type === 'freeship') return 0;
    return Number(delivery_fee);
  };

  const getFinalTotal = () => {
    const subtotal = getCartAmount();
    if (subtotal === 0) return 0;
    const shipping = getFinalShippingFee();
    const discount = getDiscountAmount();
    if (appliedCoupon && appliedCoupon.type === 'freeship') {
      return subtotal;
    }
    return Math.max(0, subtotal + shipping - discount);
  };

  // Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Quick Shop Modal State
  const [quickShopProduct, setQuickShopProduct] = useState(null);

  // User Product Reviews
  const [productReviews, setProductReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('productReviews');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const addProductReview = (productId, reviewData) => {
    setProductReviews((prev) => {
      const existing = prev[productId] || [];
      const updated = [reviewData, ...existing];
      const newReviewsObj = { ...prev, [productId]: updated };
      localStorage.setItem('productReviews', JSON.stringify(newReviewsObj));
      return newReviewsObj;
    });
    toast.success('Thank you! Your review has been published.');
  };

  // Multi-Currency State
  const CURRENCIES = {
    USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
    EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.78, label: 'GBP (£)' },
    PKR: { code: 'PKR', symbol: 'Rs ', rate: 278, label: 'PKR (Rs)' },
  };

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(() => {
    return localStorage.getItem('currencyCode') || 'USD';
  });

  const activeCurrency = CURRENCIES[selectedCurrencyCode] || CURRENCIES.USD;
  const currencySymbol = activeCurrency.symbol;

  const changeCurrency = (code) => {
    if (CURRENCIES[code]) {
      setSelectedCurrencyCode(code);
      localStorage.setItem('currencyCode', code);
      toast.success(`Currency switched to ${CURRENCIES[code].label}`);
    }
  };

  const formatPrice = (priceInUSD) => {
    const numericUSD = Number(priceInUSD) || 0;
    const converted = numericUSD * activeCurrency.rate;
    if (activeCurrency.code === 'PKR') {
      return `${activeCurrency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${activeCurrency.symbol}${converted.toFixed(2)}`;
  };

  // Product Compare State
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('compareItems');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('compareItems', JSON.stringify(compareItems));
  }, [compareItems]);

  const toggleCompareItem = (itemId) => {
    if (compareItems.includes(itemId)) {
      setCompareItems((prev) => prev.filter((id) => id !== itemId));
      toast.info('Item removed from comparison');
    } else {
      if (compareItems.length >= 4) {
        toast.warning('You can compare a maximum of 4 products at a time.');
        return;
      }
      setCompareItems((prev) => [...prev, itemId]);
      toast.success('Product added to comparison ⚖️');
    }
  };

  const isInCompare = (itemId) => compareItems.includes(itemId);

  const clearCompare = () => {
    setCompareItems([]);
    toast.info('Comparison cleared');
  };

  // Free Shipping Calculation
  const freeShippingThresholdUSD = 100;
  const subtotalUSD = getCartAmount();
  const amountLeftForFreeShipping = Math.max(0, freeShippingThresholdUSD - subtotalUSD);
  const freeShippingPercent = Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100));

  const value = {
    products,
    currency: currencySymbol,
    currencySymbol,
    selectedCurrencyCode,
    CURRENCIES,
    changeCurrency,
    formatPrice,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    buyNow,
    getCartCounts,
    ubdateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    theme,
    setTheme,
    toggleTheme,

    // User Auth State
    user,
    setUserProfile,
    getUserInitial,
    role,
    supabaseSession: null,
    supabaseUser: user,
    supabaseSignIn,
    supabaseSignUp,
    supabaseSignOut,
    authLoading,
    userLogout,

    // Admin Auth & Capabilities
    isAdminLoggedIn: isAdminLoggedIn || role === 'admin' || user?.email === 'admin@gmail.com',
    adminLogin,
    adminLogout,
    addProduct,
    deleteProduct,
    updateProduct,
    toggleBestseller,
    toggleSoldOut,
    adminOrders,
    updateOrderStatus,

    // Wishlist
    wishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
    removeFromWishlist,

    // Coupons
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getFinalShippingFee,
    getFinalTotal,

    // Quick View
    quickViewProduct,
    setQuickViewProduct,

    // Quick Shop
    quickShopProduct,
    setQuickShopProduct,

    // Reviews
    productReviews,
    addProductReview,

    // Compare System
    compareItems,
    toggleCompareItem,
    isInCompare,
    clearCompare,
    isCompareModalOpen,
    setIsCompareModalOpen,

    // Free Shipping Progress
    freeShippingThresholdUSD,
    amountLeftForFreeShipping,
    freeShippingPercent,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;