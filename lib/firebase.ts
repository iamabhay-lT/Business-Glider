import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNesG5CVO27F9qQF4c0OKLrOfpDyXBAXo",
  authDomain: "business-glider.firebaseapp.com",
  projectId: "business-glider",
  storageBucket: "business-glider.firebasestorage.app",
  messagingSenderId: "910340785343",
  appId: "1:910340785343:web:d16e6c847d5836166e720a"
};

const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);
