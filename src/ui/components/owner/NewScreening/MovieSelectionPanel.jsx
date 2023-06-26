import {useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {useTranslation} from "react-i18next";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../../styles/Colors";
import {useNavigation} from "@react-navigation/native";


export const MovieSelectionPanel = (props) => {
    const v = useNavigation()
    const {t} = useTranslation()

    const [disabled, setDisabled] = useState(false)
    const {movie, setMovie} = props


    return (
        <Pressable onPress={() => props.navigateTo("MovieSearch")} >
            {
                Object.keys(movie).length === 0 ?
                    <CardPanel style={[styles.container, disabled ? styles.disabled : null]}>
                        <Icon name={"movie-open-plus"} size={100} color={COLORS.secondary}></Icon>
                        <Text style={styles.text}>{t("translation\:owner\.labels\.newScreening\.selectMovie")}</Text>
                    </CardPanel>
                    :
                    <CardPanel>

                    </CardPanel>
            }
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    disabled: {

    },
    text:{
        color:COLORS.secondary,
        fontSize:18
    }
})
