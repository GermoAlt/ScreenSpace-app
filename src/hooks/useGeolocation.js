import { useContext } from "react";
import GeolocationContext from "../context/GeolocationProvider";

const useGeolocation = () => {
    return useContext(GeolocationContext);
}

export default useGeolocation;
