import {CardPanel} from "../../general/CardPanel";
import {Pressable, StyleSheet, View} from "react-native";
import {IconText} from "../../general/IconText";
import {Text} from "react-native-paper";
import {COLORS} from "../../../styles/Colors";
import {useNavigation} from "@react-navigation/native";

export const TheaterListItem = (props) => {
    const { data, cinema } = props

    const {navigate} = useNavigation()
    const getTotalSeats = () => {
        const seatsLayout = data.seatsLayout
        return parseInt(seatsLayout.numColumns) * parseInt(seatsLayout.numRows)
    }

    return (
        <Pressable onPress={()=>navigate("NewTheater", {
            cinema: cinema,
            existingTheater: data
        })}>
            <CardPanel>
                <View style={styles.container}>
                    <Text style={styles.name}>{data.name}</Text>
                    <View style={styles.row}>
                        <IconText icon={"currency-usd"}>{data.pricePerFunction}</IconText>
                        <IconText icon={"sofa-single"}>{getTotalSeats()}</IconText>
                    </View>
                </View>
            </CardPanel>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        gap:15,
        padding:2
    },
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
