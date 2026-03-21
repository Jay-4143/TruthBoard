import { useState, useContext, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, X, Star, UserCircle, LogOut, LayoutDashboard, MessageSquare, BarChart3, UserPlus, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { formatDistanceToNow } from 'date-fns';

const BusinessLayout = () => {
  const { businessUser, logoutBusiness } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const fetchNotifications = useCallback(async () => {
    if (!businessUser) return;
    try {
      setLoadingNotifications(true);
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoadingNotifications(false);
    }
  }, [businessUser]);

  useEffect(() => {
    fetchNotifications();
    // Poll for new notifications every 60 seconds
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => 
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: 'Dashboard', href: '/business/dashboard', icon: LayoutDashboard },
    { name: 'Reviews', href: '/business/reviews', icon: MessageSquare },
    { name: 'Analytics', href: '/business/analytics', icon: BarChart3 },
    { name: 'Collect Reviews', href: '/business/collect-reviews', icon: UserPlus },
    { name: 'Company Profile', href: '/business/profile', icon: UserCircle },
    { name: 'Settings', href: '/business/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logoutBusiness();
    navigate('/business');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1c21] text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-[#00b67a] p-1.5 rounded-lg">
            <Star className="w-6 h-6 text-white" fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg tracking-tight">TruthBoard</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Business</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#2a2d35] text-white border-l-4 border-[#00b67a]' 
                    : 'text-gray-400 hover:bg-[#2a2d35] hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0 relative z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h2 className="text-lg font-semibold text-gray-900 hidden sm:block">
              {businessUser?.companyName || 'Business Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full relative group"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[10px] text-white flex items-center justify-center font-bold">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end hidden md:flex">
                <span className="text-sm font-semibold text-gray-900">{businessUser?.name}</span>
                <span className="text-xs text-gray-500">{businessUser?.role === 'admin' ? 'Administrator' : 'Company Owner'}</span>
              </div>
              <div className="w-9 h-9 bg-[#f0f2f5] rounded-full flex items-center justify-center border border-gray-200 overflow-hidden">
                {businessUser?.avatar ? (
                  <img src={businessUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* ───── NOTIFICATIONS SIDEBAR ───── */}
      <AnimatePresence>
        {showNotifications && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[1000]"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full sm:w-[440px] h-full bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[1001] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">Notifications</h2>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {loadingNotifications && notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-8 h-8 border-4 border-[#00b67a] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-gray-500 font-medium">Loading notifications...</p>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    <div className="px-8 py-3 bg-gray-50/50 flex justify-between items-center">
                      <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">{unreadCount} Unread</span>
                      <button 
                        onClick={markAllAsRead}
                        className="text-[12px] font-bold text-[#00b67a] hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>
                    {notifications.map((notification) => (
                      <div 
                        key={notification._id}
                        onClick={() => {
                          if (!notification.read) markAsRead(notification._id);
                          if (notification.link) navigate(notification.link);
                          setShowNotifications(false);
                        }}
                        className={`px-8 py-6 cursor-pointer transition-all hover:bg-gray-50 relative group ${!notification.read ? 'bg-blue-50/30' : ''}`}
                      >
                        {!notification.read && (
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#00b67a] rounded-full"></div>
                        )}
                        <div className="flex gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                            notification.type === 'NEGATIVE_REVIEW' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-[#00b67a]'
                          }`}>
                            <Bell className="w-5 h-5" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className={`text-[15px] font-bold leading-tight ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                                {notification.title}
                              </h4>
                              <span className="text-[11px] font-medium text-gray-400 whitespace-nowrap">
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-medium">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 h-full">
                    <div className="w-20 h-20 rounded-full bg-[#ebfaf5] flex items-center justify-center">
                      <Bell className="w-9 h-9 text-[#00b67a]" />
                    </div>
                    <div className="space-y-1 text-gray-900">
                      <h3 className="text-[18px] font-bold">You're all caught up!</h3>
                      <p className="text-[14px] font-medium text-gray-400">When you get notifications, they'll show up here.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessLayout;
