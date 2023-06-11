import {Pressable, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {CardPanel} from "../general/CardPanel";

export const CinemaListItem = (props) => {
    const data = props.data
    return (
        <Pressable>
            <CardPanel>
                <Text style={styles.title}>{data.name}</Text>
                <View style={styles.contentContainer}>
                    <Icon name={"map-marker"} style={styles.icon}/>
                    <Text style={styles.text}>{data.pricePerFunction}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Icon name={"currency-usd"} style={styles.icon}/>
                    <Text style={styles.text}>{data.pricePerFunction}</Text>
                </View>
            </CardPanel>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    title:{
        color:COLORS.primary,
        fontSize:30,
        lineHeight:30
    },
    contentContainer:{
        display:"flex",
        flexDirection:"row",
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
