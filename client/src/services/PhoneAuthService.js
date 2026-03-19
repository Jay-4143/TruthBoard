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
    if (this.recaptchaVerifier) return;
    
    this.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved - callback will be triggered when solve is successful
        console.log("reCAPTCHA solved");
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        console.warn("reCAPTCHA expired");
      }
    });
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

  // Verify OTP and return the user's ID token
  async verifyOTP(otp) {
    try {
      if (!this.confirmationResult) {
        throw new Error("No pending OTP request");
      }
      
      const result = await this.confirmationResult.confirm(otp);
      // Get the ID token to send to our backend
      const idToken = await result.user.getIdToken();
      return idToken;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
}

export default new PhoneAuthService();
