import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import {ScreeningListItem} from "./ScreeningListItem";

export const ScreeningList = (props) => {

    const [screenings, setScreenings] = useState([{}])

    useEffect(()=>{

    })

    return(
        <ScrollView style={styles.container}>
            {screenings.map((item) => <ScreeningListItem data={item}/>)}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        display:'flex'
    }
})
