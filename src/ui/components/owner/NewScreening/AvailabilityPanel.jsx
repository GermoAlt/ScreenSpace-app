import {StyleSheet, View} from "react-native";
import {useEffect, useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text} from "react-native-paper";
import {useTranslation} from "react-i18next";
import {getAvailability} from "../../../../networking/api/ScreeningController";


export const AvailabilityPanel = (props) => {
    const {t} = useTranslation()
    const {theater, date, movie} = props

    const types = [
        {
            "type": "info",
            "icon": "information",
            "styles": infoStyles,
            "title": t("translation\:owner\.labels\.newScreening\.availability\.info\.title"),
            "description": t("translation\:owner\.labels\.newScreening\.availability\.info\.desc")
        },
        {
            "type": "success",
            "icon": "check-circle",
            "styles": successStyles,
            "title": t("translation\:owner\.labels\.newScreening\.availability\.success\.title"),
            "description": t("translation\:owner\.labels\.newScreening\.availability\.success\.desc")
        },
        {
            "type": "warn",
            "icon": "information",
            "styles": warnStyles,
            "title": t("translation\:owner\.labels\.newScreening\.availability\.warn\.title")
        },
    ]

    const [type, setTypeStyles] = useState(types[0])
    console.log("theater prop", movie)

    useEffect(() => {
        if (theater && date && Object.keys(movie).length !== 0) {
            getAvailability({"theater": theater.id, "date": date, "movie": movie.id})
            .then((res) => {
                console.log(res)
            })
            .catch((err)=>{
                console.error(err)
            })
        }
    })


    return <View style={[styles.container, type.styles.container]}>
        <View>
            <Icon name={type.icon} style={type.styles.icon}/>
        </View>
        <View>
            <Text style={styles.title}>{type.title}</Text>
            <Text>{type.description}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        gap: 15,
        padding: 15
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
        fontWeight: "bold"
    }
})

const infoStyles = StyleSheet.create({
    container: {
        backgroundColor: "#BAE6FD"
    },
    icon: {
        fontSize: 24,
        color: "#0369A1"
    },
})

const warnStyles = StyleSheet.create({
    container: {
        backgroundColor: "#FED7AA"
    },
    icon: {
        fontSize: 24,
        color: "#C2410C"
    }
})
const successStyles = StyleSheet.create({
    container: {
        backgroundColor: "#A7F3D0"
    },
    icon: {
        fontSize: 24,
        color: "#047857"
    }
})


