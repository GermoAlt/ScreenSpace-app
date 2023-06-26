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
import {COLORS} from "../../styles/Colors";

export const NewScreening = ({navigation, route}) => {
    const {t} = useTranslation()

    const {cinema, movie} = route.params

    const [selectedMovie, setSelectedMovie] = useState(movie || {})
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    if(movie && movie !== selectedMovie)setSelectedMovie(movie)

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>

            <Text style={styles.title}>{cinema.name}</Text>
            <Dropdown/>
            <MovieSelectionPanel cinema={cinema} movie={selectedMovie} setMovie={(e)=>setSelectedMovie(e)} navigateTo={(url, options)=>navigation.navigate(url, options)}/>
            <View style={styles.dateTimeContainer}>
                <CalendarPickerField date={date} setDate={(date)=>setDate(date)}/>
                <DatePickerField time={time} setTime={(time)=>setTime(time)}/>
            </View>
            <AvailabilityPanel date={date} time={time}/>

            </View>
            <View style={styles.buttonContainer}>
                <Button icon={"check-circle-outline"}>{t("translation\:general\.labels\.confirm")}</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        display:"flex",
        justifyContent:"space-between",
        flex:1
    },
    container:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        minHeight:"80%",
        paddingHorizontal:30,
        gap:25
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
        alignItems:"center",
        justifyContent:"center",
        marginBottom:50
    },
    title:{
        color:COLORS.secondary,
        fontSize:30,

    }
})
