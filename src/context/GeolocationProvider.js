import { createContext, useState } from "react";

const GeolocationContext = createContext({});

export const GeolocationProvider = ({ children }) => {

    //const {retrieveUserSession} = useEncryptedStorage()
    const [geolocation, setGeolocation] = useState();

    return (
        <GeolocationContext.Provider value={{geolocation, setGeolocation}}>
            {children}
        </GeolocationContext.Provider>
    )
}

export default GeolocationContext;
