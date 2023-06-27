import {CardPanel} from "../../general/CardPanel";
import {StyleSheet, View} from "react-native";
import {IconText} from "../../general/IconText";
import {Text} from "react-native-paper";
import {COLORS} from "../../../styles/Colors";

export const TheaterListItem = (props) => {
    const { data } = props
    const getTotalSeats = () => {
        const seatsLayout = data.seatsLayout
        return parseInt(seatsLayout.numColumns) * parseInt(seatsLayout.numRows)
    }

    return <CardPanel>
        <View style={styles.row}>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.row}>
                <IconText icon={"currency-usd"}>{data.pricePerFunction}</IconText>
                <IconText icon={"sofa-single"}>{getTotalSeats()}</IconText>
            </View>

        </View>
        {/* 
        <View style={styles.row}>
            <IconText icon={"movie-roll"}>d</IconText>
        </View>
        */}
    </CardPanel>

}

const styles = StyleSheet.create({
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    name:{
        fontSize:24,
        color:COLORS.secondary,
        lineHeight:24
    }
})
