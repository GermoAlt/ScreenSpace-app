import {StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconText} from "../../general/IconText";
import {COLORS} from "../../../styles/Colors";

export const ScreeningListItem = (props) => {
    const { data } = props
    
    const getTotalSeats = () => {
        const seatsLayout = data.theater.seatsLayout
        return parseInt(seatsLayout.numColumns) * parseInt(seatsLayout.numRows)
    }

    const getDate = () => {
        const arrDate = data.date.toString().substr(0,10).split('/')
        return arrDate[1] + '/' + arrDate[0]
    }

    const getTime = () => {
        return data.date.toString().substr(11,18)
    }

    return (
        <CardPanel>
            <View></View>
            <View>
                <View style={styles.row}>
                    <Text style={styles.topText}>{data.theater.name}</Text>
                    <View>
                        <IconText icon={'sofa-single'} >{data.seatsReserved.length+'/'+getTotalSeats()}</IconText>
                    </View>
                </View>
                <Text style={styles.title}>{data.movie.title}</Text>
                <View style={styles.row}>
                    <IconText icon={"clock-outline"}>{getTime()}</IconText>
                    <IconText icon={"calendar-month"}>{getDate()}</IconText>
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
