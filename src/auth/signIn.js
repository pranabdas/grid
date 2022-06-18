import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};
