// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_aRBNT8vS0A7V7kytv4u1WZu3PCWQIEI",
  authDomain: "travelvlog-a9fd9.firebaseapp.com",
  projectId: "travelvlog-a9fd9",
  storageBucket: "travelvlog-a9fd9.firebasestorage.app",
  messagingSenderId: "329370647069",
  appId: "1:329370647069:web:58cb6f92a3e3a4908564f4",
  measurementId: "G-QGR2LRYX26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Analytics (optional, only if you're using analytics)
const analytics = getAnalytics(app);

export { db, analytics };
