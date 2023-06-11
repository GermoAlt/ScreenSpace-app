import {SafeAreaView} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useEffect, useState} from "react";

export const CinemaDetails = (props) => {
    const [cinema, setCinema] = useState({})
    useEffect(()=> {
    }, [])
    return (
        <SafeAreaView>
            <TextInput></TextInput>
        </SafeAreaView>
    )
}
