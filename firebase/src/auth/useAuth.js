import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase.js";

// Can I do a variable of isLoggedIn to protect routes etc??

export const useAuth = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  message: null,
  success: "",
  // isLoggedIn: false,

  initializeAuthListener: () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        set({
          user: currentUser,
          isLoading: false,
          isAuthenticated: true,
          isLoggedIn: true,
          error: null,
        });
        console.log(
          "Auth state changed: User signed in",
          currentUser.displayName
        );
      } else {
        set({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          isLoggedIn: false,
          error: null, // Clear any previous error
        });
        console.log("Auth state changed: User signed out");
      }
    });
  },

  signup: async (email, username, password) => {
    set({ isLoading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        console.log("User created:", user.uid);

        await updateProfile(user, {
          displayName: username,
        });
        console.log("Profile update requested");
        set({
          isLoading: false,
        });
        console.log(
          "User created successfully. Waiting on auth state listener"
        );
        return { success: true };
      } else {
        set({
          isLoading: false,
          error: "Signup succeeded but failed to get user details",
        });
        return { success: false, error: "User creation failed." };
      }
    } catch (error) {
      const errorMessage = error.message;
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      set({ isLoading: false });
      console.log(
        user,
        "User logged in successfully. Waiting on auth state listener"
      );
    } catch (error) {
      const errorMessage = error.message;
      console.error("Error logging in:", error);
      set({
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthenticated: false,
        isLoggedIn: false,
      });
    }
  },

  logOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await signOut(auth);
      set({ isLoading: false });
      console.log("Successfully logged out. Waiting on auth state listener");
    } catch (error) {
      const errorMessage = error.message;
      console.error("Logout error:", error);
      set({ isLoading: false, error: errorMessage });
    }
  },
}));
