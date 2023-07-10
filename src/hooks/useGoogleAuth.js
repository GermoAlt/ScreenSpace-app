import { useContext } from "react";
import GoogleAuthContext from "../context/GoogleAuthProvider";

const useGoogleAuth = () => {
    return useContext(GoogleAuthContext);
}

export default useGoogleAuth;
