import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  Languages, 
  Camera, 
  Facebook, 
  Download, 
  LogOut, 
  Trash2, 
  ShieldCheck, 
  ChevronRight,
  Settings as SettingsIcon,
  Bell,
  Star,
  Eye,
  ThumbsUp
} from 'lucide-react';

const Settings = () => {
  const { user, logout, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [location, setLocation] = useState(user?.location || '');
  const [country, setCountry] = useState(user?.location || 'India');
  const [language, setLanguage] = useState(user?.language || 'English (United States)');
  
  const [marketingEmails, setMarketingEmails] = useState(user?.notificationPreferences?.marketing ?? true);
  const [personalizedRecs, setPersonalizedRecs] = useState(user?.notificationPreferences?.personalizedRecs ?? true);
  const [latestInsights, setLatestInsights] = useState(user?.notificationPreferences?.latestInsights ?? true);
  const [newsletter, setNewsletter] = useState(user?.notificationPreferences?.newsletter ?? true);
  const [featureUpdates, setFeatureUpdates] = useState(user?.notificationPreferences?.featureUpdates ?? true);
  const [aboutTruthBoard, setAboutTruthBoard] = useState(user?.notificationPreferences?.aboutTruthBoard ?? true);
  const [reviewMilestones, setReviewMilestones] = useState(user?.notificationPreferences?.reviewMilestones ?? true);
  const [reviewInvitations, setReviewInvitations] = useState(user?.notificationPreferences?.reviewInvitations ?? true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const { data } = await api.put('/auth/update-profile', { 
        name, 
        location: country,
        language
      });
      updateUser(data);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update settings' });
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (prefKey, value) => {
    try {
      const { data } = await api.put('/auth/update-profile', {
        notificationPreferences: { [prefKey]: value }
      });
      updateUser(data);
    } catch (err) {
      console.error('Failed to update preference', err);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone and all your reviews will be deleted.')) {
      try {
        await api.delete('/auth/delete-account');
        logout();
        navigate('/');
      } catch (err) {
        alert('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] pb-20">
      {/* Top Header Section */}
      <div className="bg-white border-b border-gray-200 py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-[#fde8e8] flex items-center justify-center text-[#1a1c21] font-bold text-3xl border-2 border-white shadow-sm overflow-hidden">
              {user?.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" /> : (user?.name?.[0] || 'U')}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#1a1c21] mb-1">{user?.name}</h1>
            <p className="text-gray-500 font-semibold text-sm tracking-tight">{user?.location || 'India'}</p>
          </div>
          
          <div className="flex gap-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1a1c21] flex items-center justify-center gap-1.5">
                {user?.reviewCount || 0} <Star className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#4162ff] hover:underline cursor-pointer">Review</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1a1c21] flex items-center justify-center gap-1.5">
                0 <Eye className="w-4 h-4 text-[#4162ff] fill-[#4162ff]" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#4162ff] hover:underline cursor-pointer">Read</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1a1c21] flex items-center justify-center gap-1.5">
                0 <ThumbsUp className="w-4 h-4 text-orange-500 fill-orange-500" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#4162ff] hover:underline cursor-pointer">Useful</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Become verified */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 flex gap-6 items-start shadow-sm">
            <div className="w-12 h-12 bg-[#c0f5d4] rounded-xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#00b67a]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1a1c21] mb-2">Become a verified reviewer</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 font-medium">
                All you need is a photo ID. Verifying helps ensure real people are writing the reviews you read, builds trust online, and lets everyone shop with confidence.
              </p>
              <p className="text-sm text-gray-600 mb-6 font-medium">
                Your ID will never be shown on TruthBoard—we'll only display a verification badge. <button className="text-[#4162ff] font-semibold hover:underline">Learn more</button>
              </p>
              <button className="bg-[#4128df] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#3421b5] transition-all">
                Get started
              </button>
            </div>
          </div>

          {/* Personal settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1c21] mb-6">Personal settings</h2>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1a1c21]">Your profile picture</label>
                <button type="button" className="block bg-[#4128df] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#3421b5] transition-all">
                  Upload your profile picture
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1a1c21]">Email</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1a1c21]">Name (publicly visible)*</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#4162ff] outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-sm font-bold text-[#1a1c21]">Country*</label>
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#4162ff] outline-none transition-all font-medium appearance-none bg-white"
                  style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem'}}
                >
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-sm font-bold text-[#1a1c21]">Language*</label>
                  <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                </div>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-[#4162ff] outline-none transition-all font-medium appearance-none bg-white"
                  style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'currentColor\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2rem'}}
                >
                  <option>English (United States)</option>
                  <option>English (United Kingdom)</option>
                  <option>Hindi</option>
                </select>
              </div>

              <p className="text-xs text-gray-400 font-semibold">*Mandatory</p>

              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#4128df] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#3421b5] transition-all disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save information'}
              </button>
              
              {message.text && (
                <p className={`text-sm font-semibold mt-2 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>

          {/* Email Settings */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1c21] mb-2">Email settings</h2>
            <p className="text-sm text-gray-600 mb-8 font-medium">Choose which kind of emails you'd like to receive. Important emails about your account are always enabled.</p>
            
            <div className="space-y-10">
              {/* Marketing Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#1a1c21]">Marketing</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={marketingEmails} onChange={(e) => { setMarketingEmails(e.target.checked); handlePreferenceChange('marketing', e.target.checked); }} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 font-medium">We keep track of open rates for these. <button className="text-[#4162ff] underline">Learn more</button></p>
                
                <div className="pl-6 space-y-6 border-l-2 border-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Personalized recommendations</p>
                      <p className="text-xs text-gray-500 font-medium">Based on your preferences and activity on TruthBoard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={personalizedRecs} onChange={(e) => { setPersonalizedRecs(e.target.checked); handlePreferenceChange('personalizedRecs', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Latest insights</p>
                      <p className="text-xs text-gray-500 font-medium">Trending companies, inspiration, tips, and more</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={latestInsights} onChange={(e) => { setLatestInsights(e.target.checked); handlePreferenceChange('latestInsights', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Newsletter</p>
                      <p className="text-xs text-gray-500 font-medium">The latest news digest</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={newsletter} onChange={(e) => { setNewsletter(e.target.checked); handlePreferenceChange('newsletter', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Feature updates</p>
                      <p className="text-xs text-gray-500 font-medium">New feature announcements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={featureUpdates} onChange={(e) => { setFeatureUpdates(e.target.checked); handlePreferenceChange('featureUpdates', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">About TruthBoard</p>
                      <p className="text-xs text-gray-500 font-medium">How to make the most of your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={aboutTruthBoard} onChange={(e) => { setAboutTruthBoard(e.target.checked); handlePreferenceChange('aboutTruthBoard', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* General Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <h3 className="text-base font-bold text-[#1a1c21]">General</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={true} disabled className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-500 font-medium">Other messages related to your account.</p>
                
                <div className="pl-6 space-y-6 border-l-2 border-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Review milestones</p>
                      <p className="text-xs text-gray-500 font-medium">Stats celebrating your activity on TruthBoard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={reviewMilestones} onChange={(e) => { setReviewMilestones(e.target.checked); handlePreferenceChange('reviewMilestones', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#1a1c21]">Review invitations</p>
                      <p className="text-xs text-gray-500 font-medium">Emails from companies asking for a review on TruthBoard</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={reviewInvitations} onChange={(e) => { setReviewInvitations(e.target.checked); handlePreferenceChange('reviewInvitations', e.target.checked); }} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4128df]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Data */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1c21] mb-4">Download your TruthBoard data</h2>
            <p className="text-sm text-gray-600 font-medium">
              <button className="text-[#4162ff] underline font-semibold">Click here</button> to see and download your personal data on TruthBoard.
            </p>
          </div>

          {/* Log out everywhere */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1c21] mb-2">Log out everywhere</h2>
            <p className="text-sm text-gray-600 mb-6 font-medium">Log out wherever you have your TruthBoard account open (this includes desktop, mobile, and any other devices).</p>
            <button 
              onClick={() => logout()}
              className="px-8 py-2.5 border-2 border-[#4128df] text-[#4128df] font-bold text-sm rounded-full hover:bg-[#f0edff] transition-all"
            >
              Log out
            </button>
          </div>

          {/* Delete user */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#1a1c21] mb-2">Delete user</h2>
            <p className="text-sm text-gray-600 mb-6 font-medium">When you delete your user profile, your reviews are deleted as well and can not be restored.</p>
            <button 
              onClick={handleDeleteAccount}
              className="px-8 py-2.5 border-2 border-[#4128df] text-[#4128df] font-bold text-sm rounded-full hover:bg-[#f0edff] transition-all"
            >
              Delete my profile
            </button>
          </div>

        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1a1c21] mb-6">My Social Settings</h2>
            <button className="w-full bg-[#1877f2] text-white py-3 rounded flex items-center justify-center gap-3 font-bold text-sm hover:bg-[#166fe5] transition-all">
              <Facebook className="fill-white w-5 h-5" />
              Continue with Facebook
            </button>
          </div>

          {/* Guidelines Sidebar */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#1a1c21] mb-4">Helpful Links</h3>
            <ul className="space-y-4">
              <li><button className="text-sm font-bold text-[#4162ff] hover:underline">Guidelines for Reviewers</button></li>
              <li><button className="text-sm font-bold text-[#4162ff] hover:underline">How to write a review</button></li>
              <li><button className="text-sm font-bold text-[#4162ff] hover:underline">TruthBoard Support</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
