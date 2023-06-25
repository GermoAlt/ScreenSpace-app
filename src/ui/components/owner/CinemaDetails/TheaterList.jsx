import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {TheaterListItem} from "./TheaterListItem";

export const TheaterList = (props) => {
    const [theaters, setTheaters] = useState([{},{},{},{},{},{},{},{},{},{},{},])

    useEffect(()=>{

    })

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {theaters.map((item) => <TheaterListItem key={item.id} data={item}/>)}
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
