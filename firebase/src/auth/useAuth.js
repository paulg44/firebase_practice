import { create } from "zustand";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase.js";

export const useAuth = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  message: null,

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
}));
