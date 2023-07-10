import {IconButton, Text, Title} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../styles/Colors";

export const SeatLayout = (props) => {
    const {t} = useTranslation()
    console.log("props", props)
    const {rows, columns} = props
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return (
        <View style={styles.container}>
            <Title style={styles.title}>{t("translation\:owner\.labels\.newTheater\.screen")}</Title>
            <View style={styles.seatContainer}>
            {
                [...Array(Number(rows))].map(
                    (e, idx) =>
                        <View style={styles.row} key={"row"+idx}>
                            <Text key={idx} style={styles.text}>{letters[idx]}</Text>
                            {
                                [...Array(Number(columns))].map(
                                    (e, i) =>
                                        <IconButton icon={"sofa-single"} size={35} style={styles.icon} key={"icon-"+i+idx} />
                                )
                            }
                        </View>
                )
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    seatContainer:{

    },
    row:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        margin:0
    },
    title:{
        fontSize:40,
        color:COLORS.secondary,
        fontWeight:"bold",
        lineHeight:40,
        marginLeft:15
    },
    text:{
        fontSize:25,
        color:COLORS.primary,
        marginRight:10
    },
    icon:{
        padding:0,
        margin:0
    }
})
