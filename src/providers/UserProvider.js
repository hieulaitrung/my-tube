import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { auth, generateUserDocument } from "../firebase";


export const UserContext = React.createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [idToken, setIdToken] = useState(null)
  let history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      const userDetails = await generateUserDocument(userAuth);
      setUser(userDetails);
      if (userDetails) {
        const token = await auth.currentUser.getIdToken();
        setIdToken(token);
      } else {
        setIdToken(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider