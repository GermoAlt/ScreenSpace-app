import { createContext, useState } from "react";
import useEncryptedStorage from "../hooks/useEncryptedStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const {retrieveUserSession, retrieveGoogleUserSession} = useEncryptedStorage()
    const [auth, setAuth] = useState({retrieveUserSession});
    const [authClient, setAuthClient] = useState({retrieveGoogleUserSession});

    return (
        <AuthContext.Provider value={{ auth, setAuth, authClient, setAuthClient }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
