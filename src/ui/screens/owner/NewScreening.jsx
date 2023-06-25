import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {TextInput} from "../../components/general/TextInput";
import {MovieSelectionPanel} from "../../components/owner/NewScreening/MovieSelectionPanel";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {DatePickerField} from "../../components/owner/NewScreening/DatePickerField";
import {AvailabilityPanel} from "../../components/owner/NewScreening/AvailabilityPanel";
import {useState} from "react";
import {Dropdown} from "../../components/general/Dropdown";
import {Button} from "../../components/general/Button";
import {useTranslation} from "react-i18next";

export const NewScreening = ({navigation}) => {
    const {t} = useTranslation()

    const [movie, setMovie] = useState({})
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    //const {cinema} = props

    return (
        <SafeAreaView style={styles.container}>
            <Text>cinema.name</Text>
            <Dropdown/>
            <MovieSelectionPanel movie={movie} setMovie={(e)=>setMovie(e)}/>
            <View style={styles.dateTimeContainer}>
                <CalendarPickerField date={date} setDate={(date)=>setDate(date)}/>
                <DatePickerField time={time} setTime={(time)=>setTime(time)}/>
            </View>
            <AvailabilityPanel date={date} time={time}/>
            <View style={styles.buttonContainer}>
                <Button icon={"check-circle-outline"}>{t("translation\:general\.labels\.confirm")}</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        flex:1,
        paddingHorizontal:30,
    },
    dateTimeContainer:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:15,
    },
    buttonContainer: {
        display:"flex",
        marginTop:20
    }
})
