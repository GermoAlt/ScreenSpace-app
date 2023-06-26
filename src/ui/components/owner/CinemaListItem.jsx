import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CardPanel} from "../general/CardPanel";
import {IconText} from "../general/IconText";

export const CinemaListItem = (props) => {
    const data = props.data
    return (
        <Pressable onPress={props.onPress}>
            <CardPanel style={styles.contentContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <IconText icon={"map-marker"}>{data.address.street + " " + data.address.number}</IconText>
            </CardPanel>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    title:{
        color:COLORS.primary,
        fontSize:30,
        lineHeight:30,
    },
    contentContainer:{
        display:"flex",
        padding:10,
        gap:15
    },
    text:{
        fontSize:20,
        color:COLORS.secondary
    },
    icon:{
        color:COLORS.primary,
        fontSize:30
    }
})
