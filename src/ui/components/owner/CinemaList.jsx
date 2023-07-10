import {Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../general/Button";
import {useTranslation} from "react-i18next";
import {CinemaListItem} from "./CinemaListItem";
import {NewCinemaPanelButton} from "./NewCinemaPanelButton";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useEffect} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import * as React from "react";

export const CinemaList = (props) => {
    const {t} = useTranslation()
    const navigation = useNavigation()

    useEffect(()=>{
        navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault()
        })
    }, [navigation])
    return (
        <SafeAreaView style={styles.container}>
            {props.data && props.data.length === 0 ?
                <View style={styles.emptyListContainer}>
                    <Icon name={"popcorn"} style={styles.icon}></Icon>
                    <Text style={styles.text}>{t("translation\:owner\.landing\.noCinemasFound")}</Text>
                    <Button type={"cta"} onPress={()=>props.navigateTo("NewCinema")}>
                        {t("translation\:owner\.landing\.addCinemaButton")}
                    </Button>
                </View>
            :
                <ScrollView contentContainerStyle={styles.cinemaList}>
                    {drawCinemaListItems(props)}
                    <NewCinemaPanelButton onPress={()=>props.navigateTo("NewCinema")}/>
                </ScrollView>}
        </SafeAreaView>
    );
};

const drawCinemaListItems = (props) => {
    return props.data.map((item) =>
        <CinemaListItem
            key={item.id}
            data={item}
            onPress={()=>props.navigateTo("CinemaDetails", {
                data:item
            })}
        />)
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginTop:10
    },
    cinemaList: {
        display:"flex",
        flexDirection:"column",
        gap:20
    },
    emptyListContainer:{
        display:"flex",
        minHeight:Dimensions.get("screen").height - 100,
        justifyContent:"center",
        alignItems:"center",
        gap:30,
        marginTop:-50
    },
    text:{
        color:COLORS.secondary,
        fontSize:25
    },
    icon:{
        fontSize:200,
        color:COLORS.lightgrey,
        margin:0,
        padding:0
    }
})
