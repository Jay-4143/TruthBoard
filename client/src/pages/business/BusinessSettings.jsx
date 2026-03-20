import { useState } from 'react';
import { 
  Shield, 
  Trash2, 
  AlertTriangle,
  Loader2,
  CheckCircle2,
  X,
  Lock,
  Bell
} from 'lucide-react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const BusinessSettings = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const handleDeleteCompany = async () => {
    if (confirmText !== 'DELETE') return;
    
    setIsDeleting(true);
    setError('');
    
    try {
      await api.delete('/business/profile');
      // Successful deletion
      alert('Company profile deleted successfully. Redirecting to home...');
      window.location.href = '/';
    } catch (err) {
      console.error('Failed to delete company:', err);
      setError(err.response?.data?.message || 'Failed to delete company profile.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 font-medium mt-1">Manage your account preferences and security.</p>
      </div>

      {/* Account Security Placeholder */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden opacity-60">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <Lock className="w-6 h-6 text-gray-400" />
            Security & Password
          </h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Coming Soon</span>
        </div>
        <div className="p-8">
          <p className="text-gray-400 font-medium">Password management and two-factor authentication will be available soon.</p>
        </div>
      </div>

      {/* Notifications Placeholder */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden opacity-60">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="w-6 h-6 text-gray-400" />
            Notification Preferences
          </h2>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Coming Soon</span>
        </div>
        <div className="p-8">
          <p className="text-gray-400 font-medium">Control which email and system notifications you receive.</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/30 rounded-[32px] border border-red-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-red-100/50">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-3">
            <Shield className="w-6 h-6" />
            Danger Zone
          </h2>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900">Delete Company Profile</h3>
              <p className="text-gray-500 font-medium text-sm">
                Permanently remove your company profile, all reviews, and all responses. This action cannot be undone.
              </p>
            </div>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-8 py-4 bg-white border-2 border-red-200 text-red-600 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm shrink-0"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-50 flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button onClick={() => setShowDeleteModal(false)} className="w-10 h-10 rounded-full hover:bg-gray-50 flex items-center justify-center text-gray-400 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-gray-900">Are you absolutely sure?</h3>
                <p className="text-gray-500 font-medium leading-relaxed">
                  This will permanently delete your company profile and all associated data. This action is **irreversible**.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                  Type <span className="text-red-600">DELETE</span> to confirm
                </p>
                <input 
                  type="text" 
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-red-600/20 focus:ring-0 text-center font-bold uppercase tracking-[0.2em] transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button 
                  disabled={confirmText !== 'DELETE' || isDeleting}
                  onClick={handleDeleteCompany}
                  className="w-full py-4 bg-red-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 disabled:opacity-30 disabled:shadow-none"
                >
                  {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                  Delete Permanently
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-4 bg-gray-50 text-gray-500 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-100 transition-all"
                >
                  Keep Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessSettings;
