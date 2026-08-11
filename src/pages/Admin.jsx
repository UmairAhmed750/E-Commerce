import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import AnalyticsCharts from '../component/AnalyticsCharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  PlusCircle,
  Package,
  Truck,
  TrendingUp,
  Trash2,
  Lock,
  Mail,
  ArrowRight,
  LogOut,
  Star,
  CheckCircle2,
  DollarSign,
  Users,
  UploadCloud,
  Image as ImageIcon,
  X,
  Edit3
} from 'lucide-react';
import { toast } from 'react-toastify';

const Admin = () => {
  const context = useContext(ShopContext) || {};
  const {
    isAdminLoggedIn = false,
    user = null,
    authLoading = false,
    products = [],
    addProduct = () => { },
    deleteProduct = () => { },
    updateProduct = () => { },
    toggleBestseller = () => { },
    toggleSoldOut = () => { },
    adminOrders = [],
    updateOrderStatus = () => { },
    formatPrice = (p) => `$${p}`,
    navigate = () => { },
    adminLogin = () => { },
    adminLogout = () => { }
  } = context;

  const activeEmail = (user?.email || '').toLowerCase();
  const isUserAdmin = isAdminLoggedIn || activeEmail === 'admin@gmail.com' || localStorage.getItem('isAdminLoggedIn') === 'true';

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Active Tab State inside Admin Dashboard
  const [activeTab, setActiveTab] = useState('products'); // 'analytics' | 'add' | 'products' | 'orders'

  // Add Product Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imagesList, setImagesList] = useState([]); // Array of base64 data URLs (1 to 4 max)
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState(['S', 'M', 'L']);
  const [bestseller, setBestseller] = useState(false);
  const [tag, setTag] = useState('none'); // 'none' | 'trending' | 'popular' | 'new_season' | 'exclusive'
  const [isSoldOut, setIsSoldOut] = useState(false);

  // Search filter inside product list
  const [adminSearch, setAdminSearch] = useState('');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImagesList, setEditImagesList] = useState([]);
  const [editCategory, setEditCategory] = useState('Men');
  const [editSubCategory, setEditSubCategory] = useState('Topwear');
  const [editSizes, setEditSizes] = useState(['S', 'M', 'L']);
  const [editBestseller, setEditBestseller] = useState(false);
  const [editTag, setEditTag] = useState('none');
  const [editIsSoldOut, setEditIsSoldOut] = useState(false);

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setEditName(prod.name || '');
    setEditDescription(prod.description || '');
    setEditPrice(prod.price || '');
    const existingImgs = Array.isArray(prod.image) ? prod.image : [prod.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'];
    setEditImagesList(existingImgs);
    setEditCategory(prod.category || 'Men');
    setEditSubCategory(prod.subCategory || 'Topwear');
    setEditSizes(prod.sizes || ['S', 'M', 'L']);
    setEditBestseller(!!prod.bestseller);
    setEditTag(prod.tag || 'none');
    setEditIsSoldOut(!!prod.isSoldOut);
  };

  const handleEditImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (editImagesList.length + files.length > 4) {
      toast.warning("Maximum 4 images allowed per product!");
    }

    const maxAllowed = 4 - editImagesList.length;
    const filesToProcess = files.slice(0, maxAllowed);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagesList((prev) => {
          if (prev.length >= 4) return prev;
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = null;
  };

  const handleRemoveEditImage = (idxToRemove) => {
    setEditImagesList((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleEditSizeToggle = (sizeVal) => {
    if (editSizes.includes(sizeVal)) {
      setEditSizes(editSizes.filter((s) => s !== sizeVal));
    } else {
      setEditSizes([...editSizes, sizeVal]);
    }
  };

  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editPrice) return;

    if (editImagesList.length === 0) {
      toast.error('Please upload at least 1 product image!');
      return;
    }

    updateProduct(editingProduct._id, {
      name: editName.trim(),
      description: editDescription.trim(),
      price: Number(editPrice),
      imageUrl: editImagesList[0],
      image: editImagesList,
      category: editCategory,
      subCategory: editSubCategory,
      sizes: editSizes,
      bestseller: editBestseller,
      tag: editTag,
      isSoldOut: editIsSoldOut
    });

    setEditingProduct(null);
  };

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    adminLogin(loginEmail, loginPassword);
  };

  const handleMultipleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (imagesList.length + files.length > 4) {
      toast.warning("Maximum 4 images allowed per product!");
    }

    const maxAllowed = 4 - imagesList.length;
    const filesToProcess = files.slice(0, maxAllowed);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagesList((prev) => {
          if (prev.length >= 4) return prev;
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = null;
  };

  const handleRemoveImage = (indexToRemove) => {
    setImagesList((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSizeToggle = (sizeVal) => {
    if (sizes.includes(sizeVal)) {
      setSizes(sizes.filter((s) => s !== sizeVal));
    } else {
      setSizes([...sizes, sizeVal]);
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    if (imagesList.length === 0) {
      toast.error('Please upload at least 1 product image!');
      return;
    }

    addProduct({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl: imagesList[0],
      image: imagesList,
      category,
      subCategory,
      sizes,
      bestseller,
      tag,
      isSoldOut
    });

    // Reset Form
    setName('');
    setDescription('');
    setPrice('');
    setImagesList([]);
    setCategory('Men');
    setSubCategory('Topwear');
    setSizes(['S', 'M', 'L']);
    setBestseller(false);
    setTag('none');
    setIsSoldOut(false);
    setActiveTab('products');
  };

  // If not logged in as Admin, show Admin Authentication Portal Form
  if (!isUserAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[70vh] flex items-center justify-center py-12"
      >
        <form
          onSubmit={handleAdminLoginSubmit}
          className="flex flex-col items-center w-[92%] sm:max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-gray-200/80 dark:border-gray-800/80 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl text-gray-800 dark:text-gray-100 relative overflow-hidden"
        >
          <div className="p-4 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 mb-4 shadow-sm">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-wide mb-1">
            Admin Portal Access
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 text-center font-medium">
            Authorized store administrators only. Use <span className="font-mono font-bold text-orange-600 dark:text-orange-400">admin@gmail.com</span>
          </p>

          <div className="w-full flex flex-col gap-4">
            <div className="relative w-full">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Admin Email (admin@gmail.com)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="relative w-full">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Admin Password (admin123)"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 uppercase tracking-wider transition-all mt-2 cursor-pointer"
            >
              <span>Login to Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-6 text-center">
            Demo Credentials: <span className="font-mono text-gray-700 dark:text-gray-300">admin@gmail.com</span> / <span className="font-mono text-gray-700 dark:text-gray-300">admin123</span>
          </p>
        </form>
      </motion.div>
    );
  }

  // Filtered Products for Admin Catalog Table with crash-proof safe array checks
  const safeProducts = Array.isArray(products) ? products : [];
  const safeOrders = Array.isArray(adminOrders) ? adminOrders : [];

  const filteredProducts = safeProducts.filter(
    (p) =>
      p &&
      p.name &&
      (p.name.toLowerCase().includes((adminSearch || '').toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes((adminSearch || '').toLowerCase())))
  );

  // Total calculated store metrics
  const totalRevenue = safeOrders.reduce((sum, o) => sum + (o?.total || 0), 0) + 1420;
  const activeProductsCount = safeProducts.length;
  const activeOrdersCount = safeOrders.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-t border-gray-200/80 dark:border-gray-800/80 pt-8 min-h-[75vh]"
    >
      {/* Admin Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200/60 dark:border-gray-800/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Admin Control Center</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-extrabold text-[10px] uppercase">
                Owner Mode
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Loggged in as <span className="font-mono text-gray-800 dark:text-gray-200">admin@gmail.com</span></p>
          </div>
        </div>

        <button
          onClick={adminLogout}
          className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-gray-700 dark:text-gray-200 hover:text-red-500 text-xs font-semibold flex items-center gap-2 transition-colors border border-gray-200 dark:border-gray-700"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto pb-1 mb-8">
        {[
          { id: 'products', label: 'Manage Products', icon: Package, count: activeProductsCount },
          { id: 'add', label: 'Add New Product', icon: PlusCircle },
          { id: 'orders', label: 'Manage Customer Orders', icon: Truck, count: activeOrdersCount },
          { id: 'analytics', label: 'Store Analytics', icon: TrendingUp }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-xs font-bold rounded-t-2xl transition-all flex items-center gap-2 border-b-2 whitespace-nowrap ${isActive
                ? 'border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-50/50 dark:bg-orange-950/30'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-[10px] font-extrabold text-gray-800 dark:text-gray-200">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: MANAGE PRODUCTS CATALOG (DELETE & EDIT) */}
      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <input
              type="text"
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              placeholder="Filter catalog by product name or category..."
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white w-full sm:w-80 outline-none focus:border-orange-500"
            />
            <button
              onClick={() => setActiveTab('add')}
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-orange-500/20 self-end sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800/80 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Bestseller</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 text-gray-800 dark:text-gray-200">
                  {filteredProducts.map((prod) => {
                    const img = Array.isArray(prod.image) ? prod.image[0] : prod.image;
                    return (
                      <tr key={prod._id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          <img src={img} alt={prod.name} className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-gray-400 font-mono">ID: {prod._id}</p>
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                            {prod.category} ({prod.subCategory})
                          </span>
                        </td>

                        <td className="p-4 font-extrabold text-orange-600 dark:text-orange-400">
                          {formatPrice(prod.price)}
                        </td>

                        <td className="p-4">
                          <button
                            onClick={() => toggleBestseller(prod._id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${prod.bestseller
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-300'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                              }`}
                          >
                            <Star className={`w-3 h-3 ${prod.bestseller ? 'fill-current' : ''}`} />
                            <span>{prod.bestseller ? 'Top Seller' : 'Standard'}</span>
                          </button>
                        </td>

                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => toggleSoldOut(prod._id)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 cursor-pointer ${prod.isSoldOut
                              ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-800 shadow-sm'
                              : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300/60'
                              }`}
                            title="Click to toggle Sold Out status"
                          >
                            <span>{prod.isSoldOut ? '🚫 Sold Out' : '✅ In Stock'}</span>
                          </button>
                        </td>

                        <td className="p-4 text-right flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(prod)}
                            className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                            title="Edit Product Details & Images"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod._id)}
                            className="p-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete Product Live from Website"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: ADD NEW PRODUCT FORM */}
      {activeTab === 'add' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
          <form onSubmit={handleAddProductSubmit} className="p-6 sm:p-8 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex flex-col gap-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-3">
              Add New Product to Store Catalog
            </h2>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Product Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Premium Cotton Oversized Hoodie"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product material, fitting, and style details..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500 resize-none"
              />
            </div>

            {/* Product Images File Upload (1 to 4 Images limit) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Product Images (Upload 1 to 4 images from PC / Mobile) *
                </label>
                <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                  {imagesList.length} / 4 Images Max
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Uploaded Image Cards */}
                {imagesList.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 group shadow-md"
                  >
                    <img src={imgSrc} alt={`Product preview ${idx + 1}`} className="w-full h-full object-cover" />

                    {/* Badge */}
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-extrabold backdrop-blur-xs">
                      {idx === 0 ? 'Main Image' : `Image ${idx + 1}`}
                    </span>

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs shadow-lg transition-transform hover:scale-110 cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                {/* Add Image Upload Button (Visible if imagesList.length < 4) */}
                {imagesList.length < 4 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white/50 dark:bg-gray-900/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-all group text-center">
                    <div className="p-2.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                        {imagesList.length === 0 ? 'Upload Images' : 'Add More'}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Max 4 images limit</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Price (USD $) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 85"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Sub Category</label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>
            </div>

            {/* Sizes selector */}
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Available Sizes</label>
              <div className="flex gap-2 flex-wrap">
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSizeToggle(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${sizes.includes(s)
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={bestseller}
                  onChange={(e) => setBestseller(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 cursor-pointer"
                />
                <label htmlFor="bestseller" className="text-xs font-medium text-gray-800 dark:text-gray-200 cursor-pointer">
                  Mark as Featured Bestseller
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isSoldOutAdd"
                  checked={isSoldOut}
                  onChange={(e) => setIsSoldOut(e.target.checked)}
                  className="w-4 h-4 accent-rose-500 cursor-pointer"
                />
                <label htmlFor="isSoldOutAdd" className="text-xs font-bold text-rose-600 dark:text-rose-400 cursor-pointer">
                  🚫 Mark as Sold Out
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Special Highlight Tag</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500 font-semibold"
                >
                  <option value="none">Standard Product (No Tag)</option>
                  <option value="trending">🔥 Trending Item</option>
                  <option value="popular">⭐ Popular Item</option>
                  <option value="new_season">✨ New Season</option>
                  <option value="exclusive">👑 Exclusive Item</option>
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="py-3 px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Product Live</span>
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* TAB 3: MANAGE CUSTOMER ORDERS */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-white mb-2">Customer Orders Status Management</h2>
          <div className="grid grid-cols-1 gap-4">
            {(adminOrders || []).map((ord) => (
              <div key={ord.id} className="p-5 rounded-2xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-xs px-2.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                      #{ord.id}
                    </span>
                    <span className="text-xs text-gray-400">{ord.date}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ord.customer}</p>
                  <p className="text-xs text-gray-500 font-medium">{ord.itemsCount} Items | Total: <span className="text-orange-600 dark:text-orange-400 font-bold">{formatPrice(ord.total)}</span></p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400">Status:</span>
                  <select
                    value={ord.status}
                    onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Processing">Processing & Packed</option>
                    <option value="Shipped">Shipped (In Transit)</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* TAB 4: STORE ANALYTICS DASHBOARD */}
      {activeTab === 'analytics' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="p-5 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Store Revenue</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{formatPrice(totalRevenue)}</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Catalog Products</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{activeProductsCount}</p>
              </div>
              <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Customer Orders</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{activeOrdersCount}</p>
              </div>
              <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Truck className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Customers</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">1,280+</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Interactive Analytics & Performance Charts */}
          <AnalyticsCharts />
        </motion.div>
      )}

      {/* EDIT PRODUCT POPUP MODAL */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl z-10 text-gray-900 dark:text-white"
            >
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                    <Edit3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Edit Product</h3>
                    <p className="text-xs text-gray-400 font-mono">ID: {editingProduct._id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProductSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs outline-none focus:border-orange-500 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                {/* Product Images File Upload (1 to 4 Images limit) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Product Images (Upload 1 to 4 images) *
                    </label>
                    <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">
                      {editImagesList.length} / 4 Images Max
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {editImagesList.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 group shadow-md"
                      >
                        <img src={imgSrc} alt={`Product edit preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-extrabold backdrop-blur-xs">
                          {idx === 0 ? 'Main' : `Img ${idx + 1}`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveEditImage(idx)}
                          className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs shadow-lg transition-transform hover:scale-110 cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {editImagesList.length < 4 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-white/50 dark:bg-gray-900/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-all group text-center">
                        <div className="p-2.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {editImagesList.length === 0 ? 'Upload Images' : 'Add More'}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Max 4 limit</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleEditImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Price (USD $) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Category</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs outline-none focus:border-orange-500"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Sub Category</label>
                    <select
                      value={editSubCategory}
                      onChange={(e) => setEditSubCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs outline-none focus:border-orange-500"
                    >
                      <option value="Topwear">Topwear</option>
                      <option value="Bottomwear">Bottomwear</option>
                      <option value="Winterwear">Winterwear</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Available Sizes</label>
                  <div className="flex gap-2 flex-wrap">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleEditSizeToggle(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${editSizes.includes(s)
                          ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="editBestseller"
                      checked={editBestseller}
                      onChange={(e) => setEditBestseller(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 cursor-pointer"
                    />
                    <label htmlFor="editBestseller" className="text-xs font-medium cursor-pointer">
                      Mark as Bestseller
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="editIsSoldOut"
                      checked={editIsSoldOut}
                      onChange={(e) => setEditIsSoldOut(e.target.checked)}
                      className="w-4 h-4 accent-rose-500 cursor-pointer"
                    />
                    <label htmlFor="editIsSoldOut" className="text-xs font-bold text-rose-600 dark:text-rose-400 cursor-pointer">
                      🚫 Mark as Sold Out
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Special Highlight Tag</label>
                    <select
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-white outline-none focus:border-orange-500 font-semibold"
                    >
                      <option value="none">Standard Product (No Tag)</option>
                      <option value="trending">🔥 Trending Item</option>
                      <option value="popular">⭐ Popular Item</option>
                      <option value="new_season">✨ New Season</option>
                      <option value="exclusive">👑 Exclusive Item</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save Changes Live</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Admin;
