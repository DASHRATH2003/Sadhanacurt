import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADym09lylkyz_KoCBxzfTo7X-uHSveUOU",
  authDomain: "react-firebase-1d802.firebaseapp.com",
  projectId: "react-firebase-1d802",
  storageBucket: "react-firebase-1d802.firebasestorage.app",
  messagingSenderId: "639628319251",
  appId: "1:639628319251:web:2f15dd962b1e378994fde6"
};

let app;
let auth;
let db;
let googleProvider;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  db = getFirestore(app);
  
  // Configure Google Auth Provider
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  // Use auth emulator in development
  if (process.env.NODE_ENV === 'development') {
    connectAuthEmulator(auth, 'http://localhost:9099');
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

export { db, auth, googleProvider };
