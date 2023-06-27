import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState, useCallback} from "react";
import {TheaterListItem} from "./TheaterListItem";

export const TheaterList = (props) => {
    const {navigation, setScreen} = props
    const theaters = props.theaters

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {theaters?.map((item, i) => <TheaterListItem key={"theater-"+i} data={item}/>)}
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
