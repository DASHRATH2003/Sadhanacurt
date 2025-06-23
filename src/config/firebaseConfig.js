import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpjMz_gzDUtdLtBryB1hDBccT7vgqRYaE",
  authDomain: "sadhana-cart.firebaseapp.com",
  projectId: "sadhana-cart",
  storageBucket: "sadhana-cart.firebasestorage.app",
  messagingSenderId: "126398142924",
  appId: "1:126398142924:web:86f6c4c5cbe9a91685a569",
  measurementId: "G-YB7BJQF2YD"
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
