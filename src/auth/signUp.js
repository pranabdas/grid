import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const signUp = async ({ firstName, lastName, email, password }) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }

  try {
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
    });
  } catch (error) {
    console.log(error);
  }
};
