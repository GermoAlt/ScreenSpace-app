import {Pressable, StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconText} from "../../general/IconText";
import {COLORS} from "../../../styles/Colors";
import {SmallBase64Image} from "../../general/SmallBase64Image";
import {useNavigation} from "@react-navigation/native";

export const ScreeningListItem = (props) => {
    const { data, cinema } = props
    const { navigate } = useNavigation()

    const getTotalSeats = () => {
        const seatsLayout = data.theater.seatsLayout
        return parseInt(seatsLayout.numColumns) * parseInt(seatsLayout.numRows)
    }

    const getDate = () => {
        const arrDate = data.date.toString().slice(0,10).split('/')
        return arrDate[0] + '/' + arrDate[1]
    }

    const getTime = () => {
        return data.date.toString().slice(11,16)
    }

    return (
        <Pressable onPress={()=>navigate("NewScreening", {
            cinema: cinema,
            existingScreening: data
        })}>
            <CardPanel style={styles.container}>
                <SmallBase64Image data={data.movie} />
                <View style={styles.infoContainer}>
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
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row",
        gap:10
    },
    infoContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"stretch",
        flex:1
    },
    topText:{
        color:COLORS.primary,
        fontSize:18,
        lineHeight:20
    },
    title:{
        color:COLORS.secondary,
        fontSize:25,
        lineHeight:26,
    },
    bottomRow:{},
    row:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    }
})
