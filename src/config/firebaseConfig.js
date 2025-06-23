import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdMERU3oXDi-95QpWrNQloTS4iVqWNGYk",
  authDomain: "sadhanacurt.firebaseapp.com",
  projectId: "sadhanacurt",
  storageBucket: "sadhanacurt.firebasestorage.app",
  messagingSenderId: "906710721096",
  appId: "1:906710721096:web:6642047d940b08fdfa6e7d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add additional scopes and custom parameters
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.email');
googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');
googleProvider.setCustomParameters({
  prompt: 'select_account',
  login_hint: 'user@example.com'
});

const db = getFirestore(app);

export { db, auth, googleProvider };
