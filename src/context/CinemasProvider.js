import { createContext, useState } from "react";

const CinemasContext = createContext({});

export const CinemasProvider = ({ children }) => {

    const [cinemas, setCienemas] = useState();

    return (
        <CinemasContext.Provider value={{cinemas, setCienemas}}>
            {children}
        </CinemasContext.Provider>
    )
}

export default CinemasContext;
