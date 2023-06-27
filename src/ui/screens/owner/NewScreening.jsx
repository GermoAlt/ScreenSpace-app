import {useEffect, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {TextInput} from "../../components/general/TextInput";
import {MovieSelectionPanel} from "../../components/owner/NewScreening/MovieSelectionPanel";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {DatePickerField} from "../../components/owner/NewScreening/DatePickerField";
import {AvailabilityPanel} from "../../components/owner/NewScreening/AvailabilityPanel";
import {Dropdown} from "../../components/general/Dropdown";
import {Button} from "../../components/general/Button";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import {getTheatersByCinema} from "../../../networking/api/TheaterController";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import { postScreening } from "../../../networking/api/ScreeningController";


export const NewScreening = ({navigation, route}) => {
    const {t} = useTranslation()

    const {cinema, movie} = route.params
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);


    const [selectedMovie, setSelectedMovie] = useState(movie || {})
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [theaters, setTheaters] = useState([])
    if(movie && movie !== selectedMovie)setSelectedMovie(movie)


     useEffect(()=>{
        const getUserTheaters = async () => {
            const response = await getTheatersByCinema(cinema.id)
            
            const curatedTheaters = response.data.map((item, i)=> {
                return {id:item.id, title:item.name, data:item}
            })
            setTheaters(curatedTheaters)
        }
        getUserTheaters()

    },[])

    const screenValidationSchema = yup.object().shape({
        name: yup
        .string()
        .required(t('translation:general.forms.errors.required')),

    })

    const saveNewScreening = async (values) => {

        if (!time || !date || !selectedMovie) return 

        setLoading(true)
        setErrMsg('')

        const timeText = time.toISOString()
        const dateText = date.toLocaleString("en-GB", {year: "numeric", month: "2-digit", day: "2-digit" })
        const movieDate = (dateText.substring(0,10) + ' ' + timeText.substring(11,19))

        const body = {
            theaterId: values.theaterId.data.id,
            movieId: selectedMovie.id,
            date: movieDate
        }
        
        try {
            const res = await postScreening(body)
            console.log('RES Theat', JSON.stringify(res))
            if (res.status === 200){
                navigation.navigate('CinemaDetails', {data: cinema})
            }else{
                setErrMsg(t('translation:general.errors.default'));
            }
            

        } catch (error) {
            console.log('error', error)
            switch (error.response.data.status){
                case 400:
                case 401:
                    setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
                break;
                case 500:
                    setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                break;
                default:
                    setErrMsg(t('translation:general.errors.default'));
                break;
            }
        }
        setLoading(false)
        
    }

    console.log('theaters', theaters)

    return (
        <SafeAreaView style={styles.screen}>
            <Formik
                initialValues={{ theaterId:{} }}
                onSubmit={values => saveNewScreening(values)}
            >
            {({ handleSubmit, setFieldValue, values }) => (
                <>
                <View style={styles.container}>

                <Text style={styles.title}>{cinema.name}</Text>
                <Dropdown list={theaters}
                    value={values.theaterId}
                    setValue={(value) => setFieldValue("theaterId", value)} 
                />
                <MovieSelectionPanel cinema={cinema} movie={selectedMovie} setMovie={(e)=>setSelectedMovie(e)} navigateTo={(url, options)=>navigation.navigate(url, options)}/>
                <View style={styles.dateTimeContainer}>
                    <CalendarPickerField date={date} 
                    setDate={(date)=>setDate(date)}
                    />
                    <DatePickerField time={time}
                    setTime={(time)=>setTime(time)}
                    />
                </View>
                {/*
                <AvailabilityPanel date={date} time={timer}/>
                */}
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} icon={"check-circle-outline"}>{t("translation\:general\.labels\.confirm")}</Button>
                </View>
                </>
            )}
            </Formik>
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

    },
    errorText: {
        fontSize: 10,
        color: COLORS.primary,
    },
})
