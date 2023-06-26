import {CardPanel} from "../../general/CardPanel";
import {StyleSheet, View} from "react-native";
import {IconText} from "../../general/IconText";
import {Text} from "react-native-paper";
import {COLORS} from "../../../styles/Colors";

export const TheaterListItem = () => {
    return <CardPanel>
        <View style={styles.row}>
            <Text style={styles.name}>As</Text>
            <View style={styles.row}>
                <IconText icon={"currency-usd"}>d</IconText>
                <IconText icon={"sofa-single"}>s</IconText>
            </View>

        </View>
        <View style={styles.row}>
            <IconText icon={"movie-roll"}>d</IconText>

        </View>
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
