import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import PhoneLogin from '../components/auth/PhoneLogin';

const WriteReview = () => {
  const { companyId: initialCompanyId } = useParams();
  const [searchParams] = useSearchParams();
  const companySlug = searchParams.get('slug');
  
  // Steps: 1 = search, 2 = review form, 3 = confirmation
  const [step, setStep] = useState(initialCompanyId || companySlug ? 2 : 1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [recentCompanies, setRecentCompanies] = useState([]);
  
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [dateOfExperience, setDateOfExperience] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [error, setError] = useState('');

  // Auth inline state
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authStep, setAuthStep] = useState('email'); // 'email' | 'signup'
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [showPhoneAuth, setShowPhoneAuth] = useState(false);

  // Submitted review data for confirmation page
  const [submittedReview, setSubmittedReview] = useState(null);
  
  const { user, businessUser, login, register, loginWithPhone } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load Recent Companies
  useEffect(() => {
    const stored = localStorage.getItem('recentCompanies');
    if (stored) setRecentCompanies(JSON.parse(stored));
  }, []);

  const saveToRecent = (company) => {
    const updated = [company, ...recentCompanies.filter(c => c._id !== company._id)].slice(0, 3);
    setRecentCompanies(updated);
    localStorage.setItem('recentCompanies', JSON.stringify(updated));
  };

   // Fetch company from URL params
   useEffect(() => {
     const fetchSelectedCompany = async () => {
       if (!initialCompanyId && !companySlug) return;
       
       setCompanyLoading(true);
       // Mock Support
       if (initialCompanyId === "apple_mock_id") {
         setSelectedCompany({ _id: "apple_mock_id", name: "Apple", website: "www.apple.com" });
         setCompanyLoading(false);
         return;
       }
       if (initialCompanyId === "amazon_mock_id") {
         setSelectedCompany({ _id: "amazon_mock_id", name: "Amazon", website: "www.amazon.com" });
         setCompanyLoading(false);
         return;
       }
 
       try {
         const identifier = initialCompanyId || companySlug;
         const { data } = await api.get(`/companies/${identifier}`);
         setSelectedCompany(data);
         if (!initialCompanyId && companySlug) {
           // If we started with slug, update URL to ID for consistency
           // navigate(`/company/${data._id}/review`, { replace: true });
         }
       } catch (err) { 
         console.error('Failed to fetch company:', err);
         // Fallback search if by ID failed
         if (initialCompanyId) {
           try {
             const { data: searchData } = await api.get(`/companies/search?q=${initialCompanyId}`);
             if (searchData.length > 0) setSelectedCompany(searchData[0]);
           } catch (e) { console.error(e); }
         }
       } finally {
         setCompanyLoading(false);
       }
     };
     fetchSelectedCompany();
   }, [initialCompanyId, companySlug]);

  // Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 1) {
        try {
          const { data } = await api.get(`/companies/search?q=${searchQuery}&limit=5`);
          setSearchResults(data);
        } catch (err) { console.error(err); }
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    saveToRecent(company);
    setStep(2);
    setSearchQuery('');
  };

  // Handle inline email auth
  const handleEmailContinue = async (e) => {
    e.preventDefault();
    if (authStep === 'email') {
      if (!authEmail.trim()) return setAuthError('Please enter your email');
      setAuthStep('signup');
      setAuthError('');
      return;
    }
    // signup step
    if (!authName.trim()) return setAuthError('Please enter your name');
    if (!authPassword || authPassword.length < 6) return setAuthError('Password must be at least 6 characters');
    
    setAuthLoading(true);
    setAuthError('');
    try {
      await register(authName, authEmail, authPassword);
      // After successful registration, auto-submit the review
      handleAutoSubmit();
    } catch (err) {
      // If user already exists, try login
      try {
        await login(authEmail, authPassword);
        handleAutoSubmit();
      } catch (loginErr) {
        setAuthError(loginErr.response?.data?.message || 'Sign up failed. Try logging in instead.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePhoneLoginSuccess = async (idToken) => {
    try {
      await loginWithPhone(idToken);
      handleAutoSubmit();
    } catch (err) {
      setAuthError('Authentication failed on our server. Please try again.');
    }
  };

  // Auto-submit after auth
  const handleAutoSubmit = async () => {
    if (rating === 0 || title.length < 3 || reviewText.length < 8 || !dateOfExperience) return;
    
    // Mock simulation
    if (selectedCompany?._id?.includes('mock_id')) {
      setSubmittedReview({
        _id: 'mock_' + Date.now(),
        rating,
        title,
        reviewText,
        dateOfExperience,
        companyName: selectedCompany?.name
      });
      setStep(3);
      return;
    }

    try {
      const { data } = await api.post('/reviews', {
        companyId: selectedCompany._id,
        rating,
        title,
        reviewText,
        dateOfExperience
      });
      setSubmittedReview({
        ...data,
        rating,
        title,
        reviewText,
        dateOfExperience,
        companyName: selectedCompany?.name
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  // Normal submit (when already logged in)
   const handleSubmit = async (e) => {
     e.preventDefault();
     const currentUser = user || businessUser;
     if (!currentUser) return;
     if (!selectedCompany) return setError('Company data is still loading. Please wait a moment.');
     if (rating === 0) return setError('Please select a star rating');
    if (title.length < 3) return setError('Please provide a descriptive title');
    if (reviewText.length < 8) return setError('Your review must be at least 10 characters');
    if (!dateOfExperience) return setError('Please select a date of experience');

    setLoading(true);
    setError('');

    // Mock simulation
    if (selectedCompany?._id?.includes('mock_id')) {
      setTimeout(() => {
        setSubmittedReview({
          _id: 'mock_' + Date.now(),
          rating,
          title,
          reviewText,
          dateOfExperience,
          companyName: selectedCompany?.name
        });
        setStep(3);
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const { data } = await api.post('/reviews', {
        companyId: selectedCompany._id,
        rating,
        title,
        reviewText,
        dateOfExperience
      });
      setSubmittedReview({
        ...data,
        rating,
        title,
        reviewText,
        dateOfExperience,
        companyName: selectedCompany?.name
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  /* ═══════════════════════════════════════════
     STEP 3: CONFIRMATION PAGE
     ═══════════════════════════════════════════ */
  if (step === 3) {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <div className="min-h-screen bg-white">
        {/* Green stars banner */}
        <div className="bg-white pt-8 pb-0 px-4">
          <div className="max-w-2xl mx-auto flex flex-wrap gap-1 justify-center">
            {Array.from({ length: 18 }).map((_, i) => (
              <svg key={i} className="w-8 h-8 text-[#00b67a]" viewBox="0 0 24 24" fill="currentColor" style={{ transform: `rotate(${Math.random() * 30 - 15}deg)` }}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1a1c21] mb-8">Thanks for your review!</h1>

          {/* Review Card */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
            {/* Company header */}
            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg font-bold text-gray-600">
                {selectedCompany?.name?.[0] || 'C'}
              </div>
              <span className="text-base font-bold text-[#1a1c21]">{selectedCompany?.name || submittedReview?.companyName}</span>
            </div>

            {/* Pending notice */}
            <div className="mx-5 mt-4 mb-4 bg-[#f5f5f0] rounded-lg px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
              </svg>
              <span className="text-sm text-gray-700">Your review is pending. <button className="font-bold text-[#1a1c21] hover:underline">Read more</button></span>
            </div>

            {/* User info */}
            <div className="px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00b67a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
              </div>
              <div>
                <p className="font-bold text-[#1a1c21] text-sm">{user?.name || businessUser?.name || 'User'}</p>
                <p className="text-xs text-gray-500">0 reviews &nbsp;•&nbsp; 🌐 IN</p>
              </div>
            </div>

            {/* Star rating */}
            <div className="px-5 py-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <div key={s} className={`w-7 h-7 ${s <= (submittedReview?.rating || rating) ? 'bg-[#00b67a]' : 'bg-gray-200'} rounded-[3px] flex items-center justify-center`}>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* Review content */}
            <div className="px-5 py-3">
              <h3 className="font-bold text-[#1a1c21] text-base mb-2">{submittedReview?.title || title}...</h3>
              <p className="text-[#4162ff] text-sm leading-relaxed">{submittedReview?.reviewText || reviewText}</p>
            </div>

            {/* Date & tags */}
            <div className="px-5 py-3 flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{formattedDate}</span>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Unpromoted review</span>
            </div>

            {/* Edit / Delete */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-6">
              <button className="text-sm font-bold text-gray-600 flex items-center gap-1.5 hover:text-[#1a1c21] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                Edit
              </button>
              <button className="text-sm font-bold text-gray-600 flex items-center gap-1.5 hover:text-red-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                Delete
              </button>
            </div>
          </div>

          {/* What's next? */}
          <h2 className="text-xl md:text-2xl font-bold text-[#1a1c21] text-center mb-6">What&apos;s next?</h2>

          {/* Become verified */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
            <div className="w-10 h-10 bg-[#00b67a] rounded-full flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-[#1a1c21] mb-2">Become a verified reviewer</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">All you need is a photo ID. Verifying helps ensure real people are writing the reviews you read, builds trust online, and lets everyone shop with confidence.</p>
            <p className="text-sm text-gray-600 mb-5">Your ID will never be shown on TruthBoard—we&apos;ll only display a verification badge. <button className="font-bold text-[#4162ff] hover:underline">Learn more</button></p>
            <button className="text-[#00b67a] font-bold text-sm border border-[#00b67a] px-5 py-2.5 rounded-full hover:bg-[#00b67a] hover:text-white transition-all">Get started</button>
          </div>

          {/* Keep 'em coming */}
          <div className="text-center py-8">
            <h3 className="text-lg font-bold text-[#1a1c21] mb-4">Keep &apos;em coming...</h3>
            <Link to="/write-review" onClick={() => { setStep(1); setSelectedCompany(null); setRating(0); setTitle(''); setReviewText(''); setDateOfExperience(''); setSubmittedReview(null); }} className="inline-block bg-[#00b67a] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#009966] transition-all shadow-lg">
              Review more companies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {step === 1 ? (
        <div className="animate-in fade-in duration-700">
          {/* Hero Section */}
          <div className="bg-[#c0f5d4] pt-20 pb-20 md:pt-24 md:pb-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a1c21] mb-6 tracking-tight">Share your experience</h1>
              <p className="text-lg md:text-xl text-[#1a1c21] mb-12">Help others make the right choice.</p>

              <div className="relative max-w-2xl mx-auto group">
                <div className="flex items-center bg-white rounded-full p-2 shadow-2xl transition-all duration-300 focus-within:ring-4 focus-within:ring-green-400/20">
                  <div className="pl-6 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </div>
                  <input type="text" placeholder="Find a company to review" className="w-full py-4 px-6 text-lg text-gray-900 focus:outline-none placeholder-gray-400 font-medium rounded-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>

                {searchQuery.length > 1 && (
                  <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-50 border border-gray-100">
                    {searchResults.length > 0 ? (
                      <div className="divide-y divide-gray-50">
                        {searchResults.map(company => (
                          <button key={company._id} onClick={() => handleSelectCompany(company)} className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors text-left">
                            <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center font-bold text-xl shrink-0">{company.name[0]}</div>
                            <div><div className="font-bold text-gray-900 text-lg leading-tight">{company.name}</div><div className="text-sm text-gray-400 font-medium">{company.website}</div></div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-10 text-center text-gray-400 font-medium italic">No companies found matching &ldquo;{searchQuery}&rdquo;</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Section */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-xl md:text-2xl font-bold text-[#1a1c21] mb-10">Ready to write your review?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recentCompanies.length > 0 ? (
                recentCompanies.map(company => (
                  <button key={company._id} onClick={() => handleSelectCompany(company)} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 text-left flex flex-col items-start">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 group-hover:bg-green-50 transition-colors">{company.name[0]}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#00b67a] transition-colors">{company.name}</h3>
                      <p className="text-gray-400 text-xs font-medium mb-4">{company.website}</p>
                      <div className="flex gap-1">{[1,2,3,4,5].map(s => <div key={s} className="w-5 h-5 bg-gray-200 rounded-sm" />)}<span className="text-xs text-gray-400 ml-2 font-bold">(0)</span></div>
                    </div>
                  </button>
                ))
              ) : (
                <>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center opacity-60">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4" /><div className="h-4 w-24 bg-gray-200 rounded mb-2" /><div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-4" /><div className="h-4 w-24 bg-gray-200 rounded mb-2" /><div className="h-3 w-32 bg-gray-200 rounded" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ═══════════════════════════════════════════
           STEP 2: REVIEW FORM
           ═══════════════════════════════════════════ */
        <div className="py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-xl mx-auto">
             {/* Selected Company Header */}
             <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 mb-8">
               <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner uppercase">
                 {companyLoading ? (
                   <div className="animate-pulse bg-gray-200 w-full h-full rounded-xl"></div>
                 ) : (
                   selectedCompany?.name?.[0] || '?'
                 )}
               </div>
               <div className="flex-1">
                 {companyLoading ? (
                   <div className="space-y-2">
                     <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                     <div className="h-3 bg-gray-100 rounded w-48 animate-pulse"></div>
                   </div>
                 ) : (
                   <>
                     <h2 className="text-lg font-bold text-[#1a1c21] tracking-tight">{selectedCompany?.name || 'Unknown Company'}</h2>
                     <p className="text-gray-400 font-medium text-sm">{selectedCompany?.website || 'Website not available'}</p>
                   </>
                 )}
               </div>
               <button onClick={() => { setStep(1); setSelectedCompany(null); setRating(0); }} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>
             </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100">⚠️ {error}</div>}

              {/* Rating */}
              <div className="flex justify-center flex-col items-center gap-4">
                <StarRating rating={rating} setRating={setRating} interactive={true} size="h-11 w-11" />
              </div>

              {rating > 0 && (
                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                  {/* Review text */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <label htmlFor="text" className="text-base font-semibold text-[#1a1c21]">Tell us more about your experience</label>
                      <button type="button" className="text-[#4162ff] text-xs font-bold flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Want a tip?
                      </button>
                    </div>
                    <textarea id="text" rows="6" className="w-full px-4 py-4 border border-gray-200 rounded-xl outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] transition-all text-base placeholder-gray-300 resize-none shadow-sm" placeholder="Share your experience..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
                    {reviewText.length > 0 && reviewText.length < 10 && (
                      <p className="text-orange-500 text-xs font-bold flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                        Your review must be at least 10 characters.
                      </p>
                    )}
                    <button type="button" className="text-[#4162ff] text-xs font-bold hover:underline">Read our Guidelines for Reviewers</button>
                  </div>

                  {/* Title */}
                  <div className="space-y-3">
                    <label htmlFor="title" className="text-base font-semibold text-[#1a1c21]">Give your review a title</label>
                    <input type="text" id="title" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] transition-all text-base placeholder-gray-300 shadow-sm" placeholder="What's important for people to know?" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>

                  {/* Date */}
                  <div className="space-y-3">
                    <label htmlFor="date" className="text-base font-semibold text-[#1a1c21] flex items-center gap-2">
                      Date of experience
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </label>
                    <input type="date" id="date" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] transition-all text-base shadow-sm bg-white" value={dateOfExperience} max={new Date().toISOString().split('T')[0]} onChange={(e) => setDateOfExperience(e.target.value)} />
                  </div>

                  {/* Disclaimer */}
                  <div className="text-sm text-gray-500 leading-relaxed font-medium">
                    By submitting this review, you confirm it&apos;s <button type="button" className="text-[#4162ff] font-bold underline">based on a genuine experience</button> and you haven&apos;t received an incentive to write it.
                  </div>

                  {/* ─── AUTH / SUBMIT SECTION ─── */}
                  {(user || businessUser) ? (
                    /* LOGGED IN: Show Submit button directly */
                    <div className="pt-4">
                     <button type="submit" disabled={loading || companyLoading || !selectedCompany} className="w-full bg-[#1a1c21] text-white py-4 rounded-full font-bold text-base hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg">
                       {loading ? 'Submitting...' : companyLoading ? 'Loading company...' : 'Submit review'}
                     </button>
                    </div>
                  ) : (
                    /* NOT LOGGED IN: Show login options */
                    <div className="pt-8 border-t border-gray-100 space-y-6">
                      <div className="text-center">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">Just one last step</h4>
                        <p className="text-gray-400 text-sm font-medium">It&apos;s your story to tell—sign in to submit.</p>
                      </div>

                      <div className="space-y-3 max-w-sm mx-auto">
                        {/* Social buttons */}
                        <button type="button" className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-100 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-all text-sm">
                          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                          Continue with Google
                        </button>
                        <button type="button" className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877f2] text-white rounded-full font-bold hover:bg-[#166fe5] shadow-lg shadow-blue-500/20 transition-all text-sm">
                          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          Continue with Facebook
                        </button>
                        <button type="button" className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full font-bold hover:bg-[#111] shadow-lg transition-all text-sm">
                          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                          Sign in with Apple
                        </button>

                        {/* Continue with email toggle */}
                        <button type="button" onClick={() => setShowEmailForm(!showEmailForm)} className="w-full text-center text-[#4162ff] font-bold text-sm hover:underline mt-4 block">
                          Continue with email
                        </button>

                        <div className="relative my-6">
                          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Or</span></div>
                        </div>

                        {!showPhoneAuth ? (
                          <button 
                            type="button" 
                            onClick={() => setShowPhoneAuth(true)}
                            className="w-full flex items-center justify-center gap-3 py-3 border-2 border-gray-100 rounded-full font-bold text-gray-700 hover:bg-gray-50 transition-all text-sm"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Continue with Phone
                          </button>
                        ) : (
                          <PhoneLogin 
                            onLoginSuccess={handlePhoneLoginSuccess}
                            onCancel={() => setShowPhoneAuth(false)}
                          />
                        )}

                        {/* ─── INLINE EMAIL FORM ─── */}
                        {showEmailForm && (
                          <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {authError && <div className="bg-orange-50 text-orange-600 p-3 rounded-lg text-sm font-bold border border-orange-100">{authError}</div>}

                            {/* Email field (always visible) */}
                            <div className="space-y-1.5">
                              <label className="text-sm font-semibold text-[#1a1c21]">Email</label>
                              <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] text-base placeholder-gray-400" placeholder="your@email.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} />
                            </div>

                            {authStep === 'email' ? (
                              /* Step 1: Just email → Continue */
                              <button type="button" onClick={handleEmailContinue} className="w-full bg-[#1a1c21] text-white py-3.5 rounded-full font-bold text-sm hover:bg-black transition-all">
                                Continue with email
                              </button>
                            ) : (
                              /* Step 2: Name + Password + Sign up */
                              <div className="space-y-4 animate-in fade-in duration-300">
                                <div className="space-y-1.5">
                                  <label className="text-sm font-semibold text-[#1a1c21]">Name (publicly visible)</label>
                                  <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] text-base placeholder-gray-400" placeholder="Your name" value={authName} onChange={(e) => setAuthName(e.target.value)} />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-sm font-semibold text-[#1a1c21]">Password</label>
                                  <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] text-base placeholder-gray-400" placeholder="Create a password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} />
                                </div>

                                <label className="flex items-start gap-2.5 cursor-pointer">
                                  <input type="checkbox" checked={emailUpdates} onChange={(e) => setEmailUpdates(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-[#00b67a] focus:ring-[#00b67a] mt-0.5" />
                                  <span className="text-sm text-gray-600 leading-relaxed">I&apos;m happy to receive email updates, including TruthBoard recommendations, tips, and news.</span>
                                </label>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                  By continuing, you agree to TruthBoard&apos;s <button type="button" className="text-[#4162ff] font-bold">Terms and Conditions</button> and <button type="button" className="text-[#4162ff] font-bold">Privacy Policy</button>.
                                </p>

                                <button type="button" onClick={handleEmailContinue} disabled={authLoading} className="w-full bg-[#1a1c21] text-white py-3.5 rounded-full font-bold text-sm hover:bg-black transition-all disabled:opacity-50">
                                  {authLoading ? 'Signing up...' : 'Sign up'}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
