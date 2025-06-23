import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebaseConfig";

export const signInWithGoogle = async () => {
  try {
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
    return {
      success: false,
      error: error.message,
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
      error: error.message,
    };
  }
}; 