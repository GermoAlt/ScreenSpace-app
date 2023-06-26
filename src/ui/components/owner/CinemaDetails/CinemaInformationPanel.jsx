import {StyleSheet, View} from "react-native";
import {Title} from "react-native-paper";
import {IconText} from "../../general/IconText";
import {COLORS} from "../../../styles/Colors";

export const CinemaInformationPanel = (props) => {
    return (
        <View style={styles.container}>
            <Title style={styles.title}>{props.cinemaData.name}</Title>
            <IconText icon={'map-marker'}>{props.cinemaData.address.street + " " + props.cinemaData.address.number}</IconText>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        paddingHorizontal:30,
        paddingVertical:20
    },
    title:{
        fontSize:30,
        lineHeight:30,
        color:COLORS.secondary,
        fontWeight:"500",
        marginBottom:5
    }
})
