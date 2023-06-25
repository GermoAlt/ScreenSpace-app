import {useState} from "react";
import {StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {useTranslation} from "react-i18next";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../../styles/Colors";


export const MovieSelectionPanel = () => {
    const {t} = useTranslation()

    const [disabled, setDisabled] = useState(false)
    const [movie, setMovie] = useState({})

    if(Object.keys(movie).length === 0) {
        return (
            <CardPanel style={[styles.container, disabled ? styles.disabled : null]}>
                <Icon name={"movie-open-plus"} size={100} color={COLORS.secondary}></Icon>
                <Text style={styles.text}>{t("translation\:owner\.labels\.newScreening\.selectMovie")}</Text>
            </CardPanel>
        )
    }

    return (
        <CardPanel>

        </CardPanel>
    )

}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    disabled: {

    },
    text:{
        color:COLORS.secondary,
        fontSize:18
    }
})
