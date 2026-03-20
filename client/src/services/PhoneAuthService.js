import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

class PhoneAuthService {
  constructor() {
    this.confirmationResult = null;
    this.recaptchaVerifier = null;
  }

  // Initialize invisible reCAPTCHA
  setupRecaptcha(containerId) {
    // If verifier exists, clear it first to avoid stale element references
    if (this.recaptchaVerifier) {
      this.clearRecaptcha();
    }

    try {
      this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: (response) => {
          console.log("reCAPTCHA solved");
        },
        'expired-callback': () => {
          console.warn("reCAPTCHA expired");
        }
      });
    } catch (error) {
      console.error("Failed to setup reCAPTCHA:", error);
    }
  }

  // Clear reCAPTCHA instance to allow re-initialization
  clearRecaptcha() {
    if (this.recaptchaVerifier) {
      try {
        // Only clear if the element still exists in DOM to avoid errors
        this.recaptchaVerifier.clear();
      } catch (e) {
        console.warn("Error clearing reCAPTCHA verifier:", e);
      }
      this.recaptchaVerifier = null;
    }
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber) {
    try {
      if (!this.recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      this.confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        this.recaptchaVerifier
      );
      return true;
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  }

  // Verify OTP and return the Firebase ID token
  async verifyOTP(otp) {
    try {
      if (!this.confirmationResult) {
        throw new Error("No pending OTP request");
      }

      const result = await this.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();
      
      return idToken;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
}

export default new PhoneAuthService();
