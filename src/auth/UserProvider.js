import { useState, useEffect, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        setSession({ loading: false, user });
      }
    });
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={session}>{children}</UserContext.Provider>
  );
};

export const useSession = () => {
  const session = useContext(UserContext);
  return session;
};
