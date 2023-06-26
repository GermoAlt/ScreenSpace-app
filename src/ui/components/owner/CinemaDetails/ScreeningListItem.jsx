import {StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconText} from "../../general/IconText";
import {COLORS} from "../../../styles/Colors";

export const ScreeningListItem = (props) => {
    return (
        <CardPanel>
            <View></View>
            <View>
                <View style={styles.row}>
                    <Text style={styles.topText}>s</Text>
                    <View>
                        <IconText icon={'sofa-single'} >s</IconText>
                    </View>
                </View>
                <Text style={styles.title}>s</Text>
                <View style={styles.row}>
                    <IconText icon={"clock-outline"}>s</IconText>
                    <IconText icon={"calendar-month"}>s</IconText>
                </View>

            </View>
        </CardPanel>
    )
}

const styles = StyleSheet.create({
    image:{},
    topText:{
        color:COLORS.primary,
        fontSize:20,
        lineHeight:20
    },
    title:{
        color:COLORS.secondary,
        fontSize:28,
        lineHeight:28,
    },
    bottomRow:{},
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
})
