// .expo/firebaseConfig.js

// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArCSHW39VvK2BXGGiya_rkKct47jh3dTY",
  authDomain: "todoappbasics.firebaseapp.com",
  projectId: "todoappbasics",
  storageBucket: "todoappbasics.appspot.com",
  messagingSenderId: "993676894620",
  appId: "1:993676894620:web:ddce5e6bee183b6599a859",
  measurementId: "G-RM4S7DHDEB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
