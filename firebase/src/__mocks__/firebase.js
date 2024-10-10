export const initializeApp = jest.fn();
export const getAuth = jest.fn().mockReturnValue({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
});
