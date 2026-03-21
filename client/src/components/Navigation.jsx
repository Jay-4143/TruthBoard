import { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Navigation = () => {
  const { user, businessUser, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = useCallback(async () => {
    if (!user && !businessUser) return;
    try {
      setLoadingNotifications(true);
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoadingNotifications(false);
    }
  }, [user, businessUser]);

  useEffect(() => {
    if (user || businessUser) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [user, businessUser, fetchNotifications]);

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

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        try {
          const { data } = await api.get(`/companies/search?q=${searchQuery}&limit=5`);
          setSearchResults(data);
          setShowResults(true);
        } catch (error) {
          console.error('Search failed', error);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  return (
    <nav className="bg-[#191919] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo & Conditional Search */}
        <div className="flex items-center gap-8 flex-1">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[#00b67a] text-2xl md:text-3xl">★</span>
            <span className="text-xl md:text-2xl font-bold tracking-tight hidden sm:block">TruthBoard</span>
          </Link>

          <div 
             ref={searchRef}
             className={`relative flex-1 max-w-md hidden lg:block transition-all duration-300 ${scrolled && location.pathname === '/' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for a company or category..."
                className="w-full bg-white text-gray-900 border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#00b67a] transition-all outline-none shadow-inner"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {showResults && searchResults.length > 0 && scrolled && location.pathname === '/' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl text-gray-900 overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-top-2">
                {searchResults.map((company) => (
                  <Link
                    key={company._id}
                    to={`/company/${company.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    onClick={() => { setShowResults(false); setSearchQuery(''); }}
                  >
                    <div className="w-8 h-8 bg-green-50 text-green-600 rounded flex items-center justify-center font-bold text-xs uppercase">
                      {company.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold truncate">{company.name}</div>
                      <div className="text-xs text-gray-500 truncate">{company.website}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Links & Auth */}
        <div className="hidden lg:flex items-center gap-6 ml-4">
          {location.pathname !== '/write-review' && (
            <Link to="/write-review" className="text-sm font-bold hover:text-[#00b67a] transition-colors whitespace-nowrap">Write a review</Link>
          )}

          <Link to="/categories" className="text-sm font-bold hover:text-[#00b67a] transition-colors">Categories</Link>
          <Link to="/blog" className="text-sm font-bold hover:text-[#00b67a] transition-colors">Blog</Link>
          
          {(user || businessUser) && (
            <button 
               onClick={() => setShowNotifications(true)}
               className="relative text-white hover:text-[#00b67a] transition-colors ml-2 group"
            >
               <Bell className="h-5 w-5" />
               {unreadCount > 0 && (
                 <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#191919] text-[10px] text-white flex items-center justify-center font-bold">
                   {unreadCount > 9 ? '9+' : unreadCount}
                 </div>
               )}
            </button>
          )}

          {user ? (
            <div className="relative flex items-center gap-4 ml-2" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00b67a] to-teal-400 flex items-center justify-center text-white font-bold text-xs shadow-sm capitalize overflow-hidden">
                  {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" /> : user.name[0]}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute top-full right-0 mt-3 w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 text-gray-900 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                  <div className="px-5 py-3 border-b border-gray-50 mb-1">
                    <div className="text-sm font-bold text-[#1a1c21] truncate">{user.name}</div>
                    <div className="text-xs font-semibold text-gray-400 truncate">{user.email || user.phoneNumber}</div>
                  </div>
                  
                  <Link to="/my-reviews" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#00b67a] transition-all">
                    My Reviews
                  </Link>
                  <Link to="/users/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#00b67a] transition-all">
                    My Settings
                  </Link>
                   <Link to="/help" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-[#00b67a] transition-all">
                     Help
                   </Link>
                   
                   {(businessUser || (user && (user.role === 'companyOwner' || user.role === 'admin'))) && (
                     <Link to="/business/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all border-t border-gray-50">
                       Business Dashboard
                     </Link>
                   )}
                  
                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                  
                  <button
                    onClick={() => { logout(); navigate('/'); setProfileOpen(false); }}
                    className="w-full text-left px-5 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition-all flex items-center gap-3"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-sm font-bold hover:text-white transition-colors ml-2 whitespace-nowrap">Log in</Link>
          )}

          {(businessUser || (user && (user.role === 'companyOwner' || user.role === 'admin'))) && location.pathname.startsWith('/business') ? (
            <Link
              to="/business/dashboard"
              className="bg-[#00b67a] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#009966] transition-all ml-2 whitespace-nowrap"
            >
              Business Dashboard
            </Link>
          ) : (
            <Link
              to="/business"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2563eb] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all ml-2 whitespace-nowrap"
            >
              For businesses
            </Link>
          )}
        </div>
          
        {/* Mobile Overlay Toggle */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 hover:bg-[#2a2a4e] rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen 
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
        </button>
      </div>

      {/* Mobile Menu */}
       {mobileMenuOpen && (
        <div className="lg:hidden bg-[#191919] border-t border-gray-800 px-4 py-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
           <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium py-2 border-b border-gray-800">Categories</Link>
           <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium py-2 border-b border-gray-800">Blog</Link>
           
           {user ? (
             <div className="pt-2">
                 <Link to="/my-reviews" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium py-2 border-b border-gray-800 text-gray-300">My reviews</Link>
                 <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium py-2 border-b border-gray-800 text-gray-300">Profile</Link>
                 {(user.role === 'companyOwner' || user.role === 'admin') && (
                   <Link to="/business/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-base font-bold py-2 border-b border-gray-800 text-blue-400">Business Dashboard</Link>
                 )}
             </div>
           ) : (
             <div className="pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium py-2 border-b border-gray-800">Log in</Link>
             </div>
           )}
           
           <div className="pt-4">
             {(businessUser || (user && (user.role === 'companyOwner' || user.role === 'admin'))) && location.pathname.startsWith('/business') ? (
               <Link
                 to="/business/dashboard"
                 onClick={() => setMobileMenuOpen(false)}
                 className="w-full block text-center bg-[#00b67a] text-white px-5 py-3 rounded-full text-base font-bold hover:bg-[#009966] transition-colors"
               >
                 Business Dashboard
               </Link>
             ) : (
               <Link
                 to="/business"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => setMobileMenuOpen(false)}
                 className="w-full block text-center bg-[#2563eb] text-white px-5 py-3 rounded-full text-base font-bold hover:bg-blue-700 transition-colors"
               >
                 For businesses
               </Link>
             )}
           </div>
        </div>
      )}

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
                        <p className="text-sm text-gray-500 font-medium font-sans">Loading notifications...</p>
                      </div>
                    ) : notifications.length > 0 ? (
                      <div className="divide-y divide-gray-50 flex flex-col font-sans">
                        <div className="px-8 py-3 bg-gray-50/50 flex justify-between items-center">
                          <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">{unreadCount} Unread</span>
                          <button 
                            onClick={markAllAsRead}
                            className="text-[12px] font-black text-[#00b67a] hover:underline uppercase tracking-tight"
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
                                  <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap">
                                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                  </span>
                                </div>
                                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-semibold">
                                  {notification.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 h-full font-sans">
                        <div className="w-20 h-20 rounded-full bg-[#ebfaf5] flex items-center justify-center">
                          <Bell className="w-9 h-9 text-[#00b67a]" />
                        </div>
                        <div className="space-y-1 text-gray-900">
                          <h3 className="text-[18px] font-black tracking-tight">You're all caught up!</h3>
                          <p className="text-[14px] font-bold text-gray-400">When you get notifications, they'll show up here.</p>
                        </div>
                      </div>
                    )}
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </nav>
  );
};

/* ─── Footer Implementation ─── */
const Footer = () => (
  <footer className="bg-[#191919] text-white pt-16 pb-8 border-t border-gray-800 font-sans">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Footer Top: Logo */}
      <div className="mb-12">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-[#00b67a] text-3xl">★</span>
          <span className="text-2xl font-bold tracking-tight">TruthBoard</span>
        </Link>
      </div>

      {/* Footer Grid: 5 Columns */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
        {/* Column 1: About us */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-gray-200">About us</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">How TruthBoard works</li>
            <li className="hover:text-white cursor-pointer transition-colors">Our story</li>
            <li className="hover:text-white cursor-pointer transition-colors">What we believe</li>
            <li className="hover:text-white cursor-pointer transition-colors flex items-center gap-2">
              Jobs <span className="bg-[#b4ffff] text-black px-1.5 py-0.5 rounded text-[10px] font-bold">Hiring!</span>
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Press</li>
            <li className="hover:text-white cursor-pointer transition-colors">TruthBoard Legal</li>
            <li className="hover:text-white cursor-pointer transition-colors">Investor Relations</li>
          </ul>
        </div>

        {/* Column 2: Review community */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-gray-200">Review community</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Join the community</li>
            <li className="hover:text-white cursor-pointer transition-colors">Leave a review</li>
            <li className="hover:text-white cursor-pointer transition-colors">Search for a company</li>
          </ul>
        </div>

        {/* Column 3: Businesses */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-gray-200">Businesses</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Features</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-white cursor-pointer transition-colors">Partners</li>
            <li className="hover:text-white cursor-pointer transition-colors">Agency Partners</li>
            <li className="hover:text-white cursor-pointer transition-colors">Find us on Capterra</li>
            <li className="hover:text-white cursor-pointer transition-colors">Find us on G2</li>
            <li className="hover:text-white cursor-pointer transition-colors">Data Solutions</li>
          </ul>
        </div>

        {/* Column 4: Resources */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-gray-200">Resources</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><Link to="/business" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">For businesses</Link></li>
            <li className="hover:text-white cursor-pointer transition-colors">Webinars and Videos</li>
            <li className="hover:text-white cursor-pointer transition-colors">Guides and Reports</li>
            <li className="hover:text-white cursor-pointer transition-colors">Customer Stories</li>
            <li className="hover:text-white cursor-pointer transition-colors">Developers</li>
            <li className="hover:text-white cursor-pointer transition-colors">Tech Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">System Status</li>
          </ul>
        </div>

        {/* Column 5: Contact */}
        <div>
          <h4 className="text-sm font-bold mb-6 text-gray-200">Contact</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer transition-colors">Contact Sales</li>
            <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-white cursor-pointer transition-colors">Our Offices</li>
          </ul>
        </div>
      </div>

      {/* Footer Middle: Country & Social */}
      <div className="mt-20 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Country Selector Mockup */}
        <div className="relative group">
          <div className="flex items-center gap-3 bg-[#111111] border border-gray-700 rounded p-3 pr-10 cursor-pointer min-w-[240px]">
            <img src="https://flagcdn.com/us.svg" className="w-5 h-4 object-cover" alt="US" />
            <span className="text-sm font-medium">United States</span>
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-gray-300 mr-2">Follow us on</span>
          <div className="flex gap-4">
             {['in', 'f', '𝕏', 'y'].map((platform, idx) => (
                <div key={idx} className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer transition-colors text-lg font-bold">
                  {platform}
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom: Links & Copyright */}
      <div className="mt-12 pt-8 border-t border-[#2a2a2a]">
        <div className="flex flex-wrap gap-x-6 gap-y-4 text-xs font-bold text-gray-400 mb-8">
          <span className="hover:text-white cursor-pointer">Terms and Conditions</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Company Guidelines</span>
          <span className="hover:text-white cursor-pointer">Trademark Guidelines</span>
          <span className="hover:text-white cursor-pointer">Manage cookies</span>
          <span className="hover:text-white cursor-pointer">Modern Slavery Statement</span>
        </div>
        <p className="text-[11px] font-medium text-gray-500 hover:text-white cursor-pointer mb-8">
          Do not sell or share my personal information
        </p>
        <div className="text-[11px] text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} TruthBoard Inc. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export { Navigation, Footer };
