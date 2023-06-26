import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {ScreeningListItem} from "./ScreeningListItem";

export const ScreeningList = (props) => {

    const [screenings, setScreenings] = useState([{},{},{},{},{},{},{},{},{},])
    useEffect(()=>{

    })

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {screenings.map((item, i) => <ScreeningListItem key={"screening" + i} data={item}/>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:30,
        display:'flex',
        gap:20
    }
})
