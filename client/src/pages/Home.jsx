import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import StarRating from '../components/StarRating';

/* ─── Intersection Observer Hook for Scroll Animations ─── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isInView];
};

/* ─── Animated Counter ─── */
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};



/* ─── Category Data ─── */
const categories = [
  { name: 'Bank', icon: '🏦', slug: 'bank' },
  { name: 'Insurance', icon: '🛡️', slug: 'insurance' },
  { name: 'Car Dealer', icon: '🚗', slug: 'car-dealer' },
  { name: 'Electronics', icon: '💻', slug: 'electronics' },
  { name: 'Clothing Store', icon: '👗', slug: 'clothing' },
  { name: 'Fitness', icon: '💪', slug: 'fitness' },
  { name: 'Travel Agency', icon: '✈️', slug: 'travel' },
  { name: 'Real Estate', icon: '🏠', slug: 'real-estate' },
  { name: 'Energy Supplier', icon: '⚡', slug: 'energy' },
  { name: 'Pet Store', icon: '🐾', slug: 'pet-store' },
  { name: 'Furniture', icon: '🛋️', slug: 'furniture' },
  { name: 'Food & Beverage', icon: '🍽️', slug: 'food-beverage' },
];

/* ─── Mock Recent Reviews ─── */
const mockRecentReviews = [
  { id: 1, author: 'Sarah K.', rating: 5, title: 'Outstanding Service!', text: 'The team went above and beyond. Delivery was swift and the product quality exceeded expectations. Would highly recommend to anyone looking for reliable service.', company: 'TechFlow Solutions', time: '2 minutes ago' },
  { id: 2, author: 'James P.', rating: 4, title: 'Great experience overall', text: 'Very smooth process from start to finish. The customer support was responsive and helpful. Just minor delays in shipping but nothing major.', company: 'Bright Horizons Banking', time: '5 minutes ago' },
  { id: 3, author: 'Maria L.', rating: 5, title: 'Best coffee subscription ever', text: 'I have been a loyal customer for over a year. The quality is consistently excellent and the sustainable sourcing makes me feel good about my purchase.', company: 'GreenEarth Coffee', time: '12 minutes ago' },
  { id: 4, author: 'David R.', rating: 3, title: 'Decent but could improve', text: 'The product itself is fine, but the website experience needs work. Checkout process was a bit clunky and I had issues with applying my discount code.', company: 'TechFlow Solutions', time: '18 minutes ago' },
  { id: 5, author: 'Emily W.', rating: 5, title: 'Incredible customer care', text: 'Had an issue with my order and they resolved it within hours. Sent a replacement immediately and even included a small gift as an apology. Truly exceptional!', company: 'GreenEarth Coffee', time: '25 minutes ago' },
  { id: 6, author: 'Alex T.', rating: 4, title: 'Very reliable banking', text: 'I switched from a major bank and have not looked back. The app is intuitive, fees are transparent, and their financial advisors actually care.', company: 'Bright Horizons Banking', time: '30 minutes ago' },
];

/* ════════════════════════════════════════════════════════════════
   ███   HOME PAGE COMPONENT
   ════════════════════════════════════════════════════════════════ */
const Home = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Section refs for scroll animations
  const [catRef, catInView] = useInView();
  const [compRef, compInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [reviewsRef, reviewsInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await api.get('/companies');
        setCompanies(data);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const { data } = await api.get(`/companies/search?q=${searchQuery}&limit=5`);
          setSearchResults(data);
        } catch (error) {
          console.error('Search failed', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchQuery]);

  return (
    <div className="bg-white overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO  (Trustpilot-style dark + organic shapes)
         ═══════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#1a1a2e] overflow-hidden">
        {/* Animated organic background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-orange-500 rounded-full opacity-80 animate-[float_8s_ease-in-out_infinite]" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-teal-400 rounded-full opacity-70 animate-[float_10s_ease-in-out_infinite_reverse]" />
          <div className="absolute bottom-20 right-40 w-[250px] h-[250px] bg-green-400 rounded-full opacity-60 animate-[float_12s_ease-in-out_infinite_2s]" />
          <div className="absolute top-10 left-1/3 w-[180px] h-[180px] bg-purple-500 rounded-full opacity-30 animate-[float_9s_ease-in-out_infinite_1s]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          {/* Fade-in Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 animate-[fadeInUp_0.8s_ease-out_both]">
            Find a company you can trust
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            Discover, read, and write reviews
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-2xl transition-all duration-300 focus-within:shadow-green-400/30 focus-within:shadow-2xl">
              <div className="pl-5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search company or category"
                className="w-full py-4 px-4 text-gray-900 focus:outline-none text-base md:text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                autoComplete="off"
              />
              <button className="bg-[#00b67a] hover:bg-[#009966] text-white px-6 md:px-8 py-4 font-semibold transition-colors duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden z-[100] border border-gray-100 text-left animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-sm">
                {searchQuery.trim().length === 0 ? (
                  /* Recent Searches Section */
                  <div className="p-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Searches</div>
                    {localStorage.getItem('recentCompanies') ? (
                      <ul>
                        {JSON.parse(localStorage.getItem('recentCompanies')).map(company => (
                          <li key={company._id}>
                            <Link to={`/company/${company.slug}`}
                              className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150 rounded-xl">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold text-sm mr-3 border border-gray-200">
                                {company.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 text-sm">{company.name}</div>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-4 text-sm text-gray-400 italic">No recent searches</div>
                    )}
                  </div>
                ) : isSearching ? (
                  <div className="p-4 text-gray-500 flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" /> Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map(company => (
                      <li key={company._id}>
                        <Link to={`/company/${company.slug}`}
                          className="flex items-center px-5 py-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-0">
                          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 font-bold text-lg mr-4 border border-green-100">
                            {company.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{company.name}</div>
                            <div className="text-sm text-gray-500">{company.category || 'General'}</div>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-gray-500">No companies found matching &ldquo;{searchQuery}&rdquo;</div>
                )}
              </div>
            )}
          </div>

          {/* Sub-link - Hidden when search dropdown is open to prevent overlap */}
          {!showDropdown && (
            <div className="mt-12 relative z-0 animate-in fade-in duration-500">
              <Link to="/write-review" className="group text-gray-400 hover:text-white transition-all inline-flex items-center gap-2 text-sm font-medium">
                 <span>Bought something recently?</span>
                 <span className="text-[#00b67a] group-hover:underline underline-offset-4 font-bold">Write a review →</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — CATEGORY BROWSING
         ═══════════════════════════════════════════════════════════ */}
      <section ref={catRef} className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between mb-10 transition-all duration-700 ${catInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">What are you looking for?</h2>
            <span className="text-[#00b67a] font-semibold cursor-pointer hover:underline text-xs">See more →</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <div key={cat.slug}
                className={`group bg-white rounded-xl p-5 flex flex-col items-center text-center border border-gray-200 cursor-pointer
                  hover:shadow-lg hover:border-green-300 hover:-translate-y-1 transition-all duration-300
                  ${catInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — EXPLORE COMPANIES  ("Best in" section)
         ═══════════════════════════════════════════════════════════ */}
      <section ref={compRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-10 transition-all duration-700 ${compInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Explore top-rated companies</h2>
            <p className="text-sm text-gray-500 mt-2">Businesses that earned trust from their customers</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {companies.map((company, i) => (
              <Link key={company._id} to={`/company/${company.slug}`}
                className={`group bg-white rounded-2xl border border-gray-200 overflow-hidden
                  hover:shadow-xl hover:border-green-200 transition-all duration-500 transform hover:-translate-y-1
                  ${compInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      {company.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-[#00b67a] transition-colors truncate">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.website}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-5">{company.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className="w-6 h-6 bg-[#00b67a] text-white text-xs flex items-center justify-center first:rounded-l last:rounded-r font-bold">★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">TrustScore <strong>5.0</strong></span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{company.category || 'General'}</span>
                  </div>
                </div>
              </Link>
            ))}
            {companies.length === 0 && (
              <div className="col-span-3 text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                <div className="text-4xl mb-3">🔍</div>
                No companies found. Add some via the seed script!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — ABOUT / "We're TruthBoard"
         ═══════════════════════════════════════════════════════════ */}
      <section ref={aboutRef} className="py-16 md:py-20 bg-[#f5f1eb]">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12
          transition-all duration-700 ${aboutInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
              We&apos;re <span className="text-[#00b67a]">TruthBoard</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              We&apos;re a review platform that&apos;s open to everyone. Our vision is to become the universal symbol of trust
              — by empowering people to shop with confidence, and helping companies improve through genuine feedback.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Every review matters. We believe in transparency, authenticity, and building a community where honest opinions drive better business.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Join our community
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-[#00b67a] to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl animate-[float_6s_ease-in-out_infinite]">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">⭐</div>
                  <div className="text-4xl font-extrabold">1M+</div>
                  <div className="text-sm opacity-90 mt-1">Reviews & counting</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400 rounded-2xl shadow-lg flex items-center justify-center animate-[float_8s_ease-in-out_infinite_reverse]">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">500K</div>
                  <div className="text-xs opacity-90">Companies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — RECENT REVIEWS  (scrolling feed)
         ═══════════════════════════════════════════════════════════ */}
      <section ref={reviewsRef} className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-10 transition-all duration-700 ${reviewsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Recent reviews</h2>
            <p className="text-xs text-gray-500 mt-2">Real-time reviews from our community</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mockRecentReviews.map((review, i) => (
              <div key={review.id}
                className={`bg-white rounded-xl border border-gray-200 p-6
                  hover:shadow-lg hover:border-green-200 transition-all duration-500 transform hover:-translate-y-1
                  ${reviewsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
                    <div className="text-xs text-gray-400">{review.time}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} size="text-base" />
                <h4 className="font-bold text-gray-900 mt-3 mb-2">{review.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{review.text}</p>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">{review.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — STATS BAR
         ═══════════════════════════════════════════════════════════ */}
      <section ref={statsRef} className="py-14 bg-[#1a1a2e] text-white">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-green-400">
                <AnimatedCounter target={300} suffix="M+" />
              </div>
              <div className="text-xs text-gray-400 mt-2">Reviews worldwide</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
                <AnimatedCounter target={800} suffix="K+" />
              </div>
              <div className="text-xs text-gray-400 mt-2">Businesses listed</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-teal-400">
                <AnimatedCounter target={50} suffix="M+" />
              </div>
              <div className="text-xs text-gray-400 mt-2">Monthly visitors</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-purple-400">
                <AnimatedCounter target={100} suffix="+" />
              </div>
              <div className="text-xs text-gray-400 mt-2">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7 — BUSINESS CTA
         ═══════════════════════════════════════════════════════════ */}
      <section ref={ctaRef} className="py-16 md:py-20 bg-gray-50">
        <div className={`max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Looking to grow your business?
          </h2>
          <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
            Strengthen your reputation with reviews on TruthBoard. Claim your company profile today and start connecting with customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register"
              className="bg-[#00b67a] hover:bg-[#009966] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5 inline-flex items-center justify-center gap-2">
              Get started — it&apos;s free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link to="/login"
              className="border-2 border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center justify-center">
              Log in for business
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8 — APP DOWNLOAD BANNER
         ═══════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Shop smarter with the TruthBoard app</h3>
            <p className="text-sm text-gray-500">Read reviews on the go and make smarter choices, anywhere.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
              <span className="text-2xl">🍎</span>
              <div><div className="text-[10px] leading-tight">Download on the</div><div className="font-semibold text-sm">App Store</div></div>
            </div>
            <div className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition">
              <span className="text-2xl">▶️</span>
              <div><div className="text-[10px] leading-tight">Get it on</div><div className="font-semibold text-sm">Google Play</div></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
