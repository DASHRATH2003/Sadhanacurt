import { signInWithPopup, signOut, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";

export const signInWithGoogle = async () => {
  try {
    // Set persistence to LOCAL to persist the auth state
    await setPersistence(auth, browserLocalPersistence);
    
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        username: user.displayName,
        emailOrPhone: user.email,
        photoURL: user.photoURL,
        isSignIn: true,
      },
    };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
    // More specific error messages
    let errorMessage = "Failed to login - ";
    if (error.code === 'auth/popup-blocked') {
      errorMessage += "Please allow popups for this website";
    } else if (error.code === 'auth/popup-closed-by-user') {
      errorMessage += "Login popup was closed";
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage += "Please check your internet connection";
    } else if (error.code === 'auth/unauthorized-domain') {
      errorMessage += "This domain is not authorized for authentication";
    } else {
      errorMessage += error.message;
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return {
      success: false,
      error: "Failed to sign out: " + error.message,
    };
  }
}; 