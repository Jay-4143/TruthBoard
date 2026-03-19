import React, { useState, useEffect, useRef } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneAuthService from '../../services/PhoneAuthService';

const PhoneLogin = ({ onLoginSuccess, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const resendInterval = useRef(null);

  useEffect(() => {
    // Setup invisible reCAPTCHA on mount
    PhoneAuthService.setupRecaptcha('recaptcha-container');
    
    return () => {
      if (resendInterval.current) clearInterval(resendInterval.current);
    };
  }, []);

  useEffect(() => {
    if (timer > 0) {
      resendInterval.current = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      if (resendInterval.current) clearInterval(resendInterval.current);
    }
    return () => {
      if (resendInterval.current) clearInterval(resendInterval.current);
    };
  }, [timer]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    const parsed = parsePhoneNumberFromString(phoneNumber);
    if (!parsed || !parsed.isValid()) {
      return setError('Please enter a valid phone number with country code (e.g., +1234567890)');
    }

    setLoading(true);
    try {
      await PhoneAuthService.sendOTP(parsed.number);
      setStep('otp');
      setTimer(30);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    if (otp.length !== 6) {
      return setError('OTP must be 6 digits');
    }

    setLoading(true);
    try {
      const idToken = await PhoneAuthService.verifyOTP(otp);
      // Pass the Firebase ID token to the success handler
      onLoginSuccess(idToken);
    } catch (err) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    handleSendOTP({ preventDefault: () => {} });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      <div id="recaptcha-container"></div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900">
          {step === 'phone' ? 'Login with Phone' : 'Verify OTP'}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {step === 'phone' 
            ? 'We will send a 6-digit code to your phone' 
            : `Code sent to ${phoneNumber}`}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handleSendOTP} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
            <input 
              type="tel" 
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] transition-all"
              placeholder="+1 234 567 8900"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a1c21] text-white py-3.5 rounded-full font-bold text-sm hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">6-Digit Code</label>
            <input 
              type="text" 
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#4162ff] focus:ring-1 focus:ring-[#4162ff] transition-all text-center text-2xl tracking-[0.5em] font-bold"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              disabled={loading}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a1c21] text-white py-3.5 rounded-full font-bold text-sm hover:bg-black transition-all disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Login'}
          </button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={handleResend}
              disabled={timer > 0 || loading}
              className={`text-sm font-bold ${timer > 0 ? 'text-gray-400' : 'text-[#4162ff] hover:underline'}`}
            >
              {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
            </button>
          </div>
          <button 
            type="button" 
            onClick={() => setStep('phone')} 
            className="w-full text-center text-gray-500 text-xs hover:underline mt-2"
          >
            Change Phone Number
          </button>
        </form>
      )}

      {onCancel && (
        <button 
          onClick={onCancel}
          className="w-full text-center text-gray-400 text-sm hover:text-gray-600 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default PhoneLogin;
