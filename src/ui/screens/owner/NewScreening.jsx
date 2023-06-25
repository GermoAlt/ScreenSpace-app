import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {TextInput} from "../../components/general/TextInput";
import {MovieSelectionPanel} from "../../components/owner/NewScreening/MovieSelectionPanel";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {DatePickerField} from "../../components/owner/NewScreening/DatePickerField";
import {AvailabilityPanel} from "../../components/owner/NewScreening/AvailabilityPanel";
import {useState} from "react";
import {Dropdown} from "../../components/general/Dropdown";

export const NewScreening = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    //const {cinema} = props

    return (
        <SafeAreaView style={styles.container}>
            <Text>cinema.name</Text>
            <Dropdown/>
            <MovieSelectionPanel/>
            <View style={styles.dateTimeContainer}>
                <CalendarPickerField date={date} setDate={(date)=>setDate(date)}/>
                <DatePickerField time={time} setTime={(time)=>setTime(time)}/>
            </View>
            <AvailabilityPanel/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"stretch"
    },
    dateTimeContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }
})
