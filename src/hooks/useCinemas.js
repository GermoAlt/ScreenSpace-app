import { useContext } from "react";
import CinemasContext from "../context/CinemasProvider";

const useCinemas = () => {
    return useContext(CinemasContext);
}

export default useCinemas;
