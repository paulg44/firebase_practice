import { create } from "zustand";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.js";

// Can I do a variable of isLoggedIn to protect routes etc??

export const useAuth = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  message: null,
  isLoggedIn: false,

  signup: async (email, username, password) => {
    set({ isLoading: true, error: null });
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: username,
          });
          set({
            isLoading: false,
            isAuthenticated: true,
            user: user.displayName,
            isLoggedIn: true,
          });
          console.log(user);
        }
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      set({ error: errorMessage });
      console.log(errorCode, errorMessage);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
  },
}));
