import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Tittle from '../component/Title';
import { motion } from 'framer-motion';
import { User, Mail, ShieldCheck, Heart, Package, LogOut, Calendar, Star, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, setUserProfile, isAdminLoggedIn, userLogout, getWishlistCount } = useContext(ShopContext);
  const navigate = useNavigate();

  const activeEmail = (user?.email || '').toLowerCase();
  const isUserAdmin = isAdminLoggedIn || activeEmail === 'admin@gmail.com';

  // Protect /profile route: If not logged in, redirect to /login immediately
  React.useEffect(() => {
    if (!activeEmail && !user && !isAdminLoggedIn) {
      navigate('/login');
    }
  }, [activeEmail, user, isAdminLoggedIn, navigate]);

  if (!activeEmail && !user && !isAdminLoggedIn) {
    return null;
  }

  const displayName = isUserAdmin
    ? 'Admin Account'
    : (user?.name || (activeEmail ? activeEmail.split('@')[0] : 'User'));

  const firstLetter = displayName.charAt(0).toUpperCase();

  const handleAvatarFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result;
        setUserProfile({
          ...(user || { name: displayName, email: activeEmail, role: isUserAdmin ? 'admin' : 'user' }),
          avatar: avatarUrl
        });
        toast.success("Profile photo updated! 📸");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-t border-gray-200/80 dark:border-gray-800/80 pt-8 min-h-[70vh] max-w-4xl mx-auto"
    >
      <div className="text-2xl mb-6">
        <Tittle text1={'MY'} text2={'PROFILE'} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Avatar Card with Photo Upload, Name, Email & Status */}
        <div className="p-6 rounded-3xl glass-panel border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
          {/* Avatar Circle with Photo & Camera Upload Button */}
          <div className="relative group mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white flex items-center justify-center text-4xl font-extrabold shadow-xl shadow-orange-500/30 border-4 border-white dark:border-gray-900 overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span>{firstLetter}</span>
              )}
            </div>

            <label
              className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs shadow-lg border-2 border-white dark:border-gray-900 cursor-pointer transition-transform hover:scale-110 flex items-center justify-center"
              title="Upload Profile Photo from PC / Mobile Storage"
            >
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* User Name */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">{displayName}</h2>

          {/* User Email */}
          <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">{activeEmail || 'Not Signed In'}</p>

          <div className="mt-4 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-extrabold text-[11px] uppercase flex items-center gap-1.5 border border-orange-200 dark:border-orange-900/50">
            {isUserAdmin ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Store Admin</span>
              </>
            ) : activeEmail ? (
              <>
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Customer Profile</span>
              </>
            ) : (
              <span>Guest User</span>
            )}
          </div>

          {activeEmail ? (
            <button
              onClick={userLogout}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-2 border border-red-200 dark:border-red-900/40 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="mt-8 w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/25"
            >
              <User className="w-4 h-4" />
              <span>Sign In to Account</span>
            </button>
          )}
        </div>

        {/* Right Side: Account Details Overview */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="p-6 rounded-3xl glass-card border border-gray-200/80 dark:border-gray-800/80 flex flex-col gap-4 bg-white/50 dark:bg-gray-900/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 pb-3">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-semibold">Account Name</p>
                  <p className="font-bold text-gray-900 dark:text-white text-xs">{displayName}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-semibold">Email Address</p>
                  <p className="font-bold text-gray-900 dark:text-white text-xs">{activeEmail || 'Not configured'}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] uppercase font-semibold">Security Status</p>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">Active Session</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Navigation Shortcuts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/orders"
              className="p-5 rounded-2xl glass-card border border-gray-200/80 dark:border-gray-800/80 hover:border-orange-500 dark:hover:border-orange-500 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">My Orders</h4>
                  <p className="text-xs text-gray-400">View placed order history</p>
                </div>
              </div>
            </Link>

            <Link
              to="/wishlist"
              className="p-5 rounded-2xl glass-card border border-gray-200/80 dark:border-gray-800/80 hover:border-rose-500 dark:hover:border-rose-500 transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">Saved Wishlist</h4>
                  <p className="text-xs text-gray-400">{getWishlistCount()} items saved</p>
                </div>
              </div>
            </Link>
          </div>

          {isUserAdmin && (
            <Link
              to="/admin"
              className="p-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/20 flex items-center justify-between transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Go to Admin Store Owner Portal</span>
              </div>
              <span>→</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
