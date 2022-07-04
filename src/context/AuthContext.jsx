import { useState, useEffect, createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signUp =  (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
    return setDoc(doc(db, 'users', email), {
      watchlist: [],
    })
  }

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    return () => unsubscribe();
  }, [])

  return (
    <UserContext.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(UserContext);
}



