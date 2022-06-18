import { auth } from "./firebase";

export const signOut = () => {
  return auth.signOut();
};
