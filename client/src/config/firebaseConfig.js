import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC79BUCL8YUDRoHAJV1Y-zIvRpAPdWS5Js",
  authDomain: "truthboard-cb4ae.firebaseapp.com",
  projectId: "truthboard-cb4ae",
  storageBucket: "truthboard-cb4ae.firebasestorage.app",
  messagingSenderId: "1053819888305",
  appId: "1:1053819888305:web:0e2fb6067402694b403890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 THIS IS IMPORTANT
export const auth = getAuth(app);

export default app;