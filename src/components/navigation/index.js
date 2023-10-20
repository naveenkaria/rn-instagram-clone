import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { SignInStack, SignOutStack } from "./authNavigation";

const Navigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = authUser();
    return () => unsubscribe;
  }, []);

  const authUser = async () => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      });
    } catch (error) {
      console.log("Firebase User Auth State Error: ", error);
    }
  };

  return <>{currentUser ? <SignInStack /> : <SignOutStack />}</>;
};

export default Navigation;
