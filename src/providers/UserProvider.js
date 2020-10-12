import React, { useState, useEffect } from 'react'
import { auth, generateUserDocument } from "../firebase";


export const UserContext = React.createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [idToken, setIdToken] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const userDetails = await generateUserDocument(userAuth);
      setUser(userDetails);
      setUserLoading(false);
      if (userDetails) {
        const token = await auth.currentUser.getIdToken();
        setIdToken(token);
      } else {
        setIdToken(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{user, userLoading}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider