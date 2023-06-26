import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {TheaterListItem} from "./TheaterListItem";

export const TheaterList = ({navigation}) => {
    const [theaters, setTheaters] = useState([{},{},{},{},{},{},{},{},{},{},{},])

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {theaters.map((item, i) => <TheaterListItem key={"theater-"+i} data={item}/>)}
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
