import { createContext, useState } from "react";
import useEncryptedStorage from "../hooks/useEncryptedStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const {retrieveUserSession} = useEncryptedStorage()
    const [auth, setAuth] = useState({retrieveUserSession});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
