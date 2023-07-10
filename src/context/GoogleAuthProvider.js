import { createContext, useState } from "react";

const GoogleAuthContext = createContext({});

export const GoogleAuthProvider = ({ children }) => {

    const [googelUserData, setGoogelUserData] = useState({});

    return (
        <GoogleAuthContext.Provider value={{ googelUserData, setGoogelUserData }}>
            {children}
        </GoogleAuthContext.Provider>
    )
}

export default GoogleAuthContext;
