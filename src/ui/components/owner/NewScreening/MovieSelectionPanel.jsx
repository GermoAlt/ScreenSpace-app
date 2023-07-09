import {useState} from "react";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {useTranslation} from "react-i18next";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../../styles/Colors";
import {useNavigation} from "@react-navigation/native";
import {Base64Image} from "../../general/Base64Image";
import {IconText} from "../../general/IconText";
import {SmallBase64Image} from "../../general/SmallBase64Image";


export const MovieSelectionPanel = (props) => {
    const {t} = useTranslation()

    const [disabled, setDisabled] = useState(false)
    const {movie, setMovie} = props



    return (
        <Pressable style={styles.container} onPress={() => props.navigateTo("MovieSearch", {cinema: props.cinema})} >
            {

                Object.keys(movie).length === 0 ?
                    <CardPanel style={[styles.container, disabled ? styles.disabled : null]}>
                        <Icon name={"movie-open-plus"} size={100} color={COLORS.secondary}></Icon>
                        <Text style={styles.text}>{t("translation\:owner\.labels\.newScreening\.selectMovie")}</Text>
                    </CardPanel>
                    :
                    <CardPanel style={styles.card}>
                        <SmallBase64Image data={movie} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{movie.title}</Text>
                            <IconText icon={"clock-outline"}>{movie.duration} min</IconText>
                            <View>
                                {movie.genre.map(
                                    (item, i) => (<Text key={item} style={styles.genres}>{item}</Text>)
                                )}
                            </View>
                        </View>
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
    card:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:15,
    },
    disabled: {

    },
    text:{
        color:COLORS.secondary,
        fontSize:18
    },
    row:{
        display:"flex",
        flexDirection:"row",
        gap:15
    },
    infoContainer:{
        display:"flex",
        justifyContent:"space-between",
        flexDirection:"column",
        flex:1,
        gap:10
    },
    title:{
        color:COLORS.primary,
        fontSize:22,
        maxWidth:150
    },
    genres:{
        color:COLORS.secondary
    }
})
