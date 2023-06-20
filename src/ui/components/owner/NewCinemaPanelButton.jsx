import {Pressable, StyleSheet} from "react-native";
import {CardPanel} from "../general/CardPanel";
import {Text, TouchableRipple} from "react-native-paper";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../styles/Colors";
import {useNavigation} from "@react-navigation/native";

export const NewCinemaPanelButton = (props) => {
    const {t} = useTranslation()
    return (
            <Pressable onPress={props.onPress}>
                <CardPanel style={styles.content}>
                    <Icon name={"theater"} style={styles.icon}/>
                    <Text style={styles.text}>
                        {t("translation\:owner\.labels\.CinemaList\.addCinema")}
                    </Text>
                </CardPanel>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    content:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    icon:{
        fontSize:60,
        color:COLORS.secondary
    },
    text:{
        fontSize:25,
        color:COLORS.secondary
    }
})
