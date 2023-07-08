import {ScrollView, StyleSheet, View} from "react-native";
import {useEffect, useState, useCallback} from "react";
import {TheaterListItem} from "./TheaterListItem";
import {CardPanel} from "../../general/CardPanel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../../styles/Colors";
import {Text} from "react-native-paper";
import {useTranslation} from "react-i18next";

export const TheaterList = (props) => {
    const {t} = useTranslation()
    const {navigation, setScreen} = props
    const theaters = props.theaters

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {theaters && theaters.length > 0 ?
                theaters.map((item, i) => <TheaterListItem key={"theater-"+i} data={item}/>)
                :
                <CardPanel style={styles.card}>
                    <Icon name={"theater"} color={COLORS.secondary} size={50} />
                    <Text style={styles.text}>{t("translation\:owner\.labels\.cinemaDetails\.tabs\.theaters\.empty")}</Text>
                </CardPanel>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical:30,
        display:'flex',
        gap:20
    },
    card: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
    text:{
        color:COLORS.secondary,
        fontSize:20
    }
})
