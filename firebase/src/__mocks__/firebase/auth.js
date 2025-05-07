export const createUserWithEmailAndPassword = jest.fn();
export const updateProfile = jest.fn();
export const getAuth = jest.fn().mockReturnValue({
  createUserWithEmailAndPassword,
  updateProfile,
});
