import {Pressable, ScrollView, StyleSheet} from "react-native";
import {useEffect} from "react";
import {ScreeningListItem} from "./ScreeningListItem";
import {CardPanel} from "../../general/CardPanel";
import {useTranslation} from "react-i18next";
import {Text} from "react-native-paper";
import {COLORS} from "../../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const ScreeningList = (props) => {
    const { t } = useTranslation()
    const {setScreen, screenings, extended, cinema} = props
    const {navigation} = extended

    useEffect(()=>{
        setScreen(navigation.getState().routes[navigation.getState().index].name)
    })

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {screenings && screenings.length >0 ? screenings.map(
                (item, i) =>
                    <ScreeningListItem key={"screening" + i} data={item} cinema={cinema}/>
                )
                :
                <CardPanel style={styles.card}>
                    <Icon name={"movie-off-outline"} color={COLORS.secondary} size={50} />
                    <Text style={styles.text}>{t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings\.empty")}</Text>
                </CardPanel>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        paddingBottom:100,
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
