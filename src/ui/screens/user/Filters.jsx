import {useEffect, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, View} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {TextInput} from "../../components/general/TextInput";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {Dropdown} from "../../components/general/Dropdown";
import {Button} from "../../components/general/Button";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import { mock_filters } from "../../../assets/data/user_filters";
import { HeaderLogo } from "../../components/general/HeaderLogo";

export const Filters = ({navigation}) => {
    const {t} = useTranslation()

    const { cinemas, movies, genres, distances, ratings } = mock_filters
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);


    /*
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
*/
    const handleSetFilters = async (values) => {

        setLoading(true)
        setErrMsg('')

        console.log('VALUES', values)
        
        try {

            const body = {
                cinema: values.cinema.id,
                distance: values.distance.id,
                movie: values.movie.id,
                genre: values.genre.id,
                rating: values.rating.id,
            }
            /*
            const res = await postScreening(body)
            console.log('RES Theat', JSON.stringify(res))
            if (res.status === 200){
                navigation.navigate('CinemaDetails', {data: cinema})
            }else{
                setErrMsg(t('translation:general.errors.default'));
            }
            */

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

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <Formik
                initialValues={{ cinema:{}, distance:{}, movie:{}, genre:{}, ratings:{} }}
                onSubmit={values => handleSetFilters(values)}
            >
            {({ handleSubmit, setFieldValue, values }) => (
                <>
                <View style={styles.container}>
                    <Text style={styles.title}>FILTROS</Text>
                    <Dropdown list={cinemas}
                        value={values.cinema}
                        setValue={(value) => setFieldValue("cinema", value)} 
                    />
                    <Dropdown list={distances}
                        value={values.distance}
                        setValue={(value) => setFieldValue("distance", value)} 
                    />
                    <Dropdown list={movies}
                        value={values.movie}
                        setValue={(value) => setFieldValue("movie", value)} 
                    />
                    <Dropdown list={genres}
                        value={values.genre}
                        setValue={(value) => setFieldValue("genre", value)} 
                    />
                    <Dropdown list={ratings}
                        value={values.rating}
                        setValue={(value) => setFieldValue("rating", value)} 
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button onPress={handleSubmit} >Limpiar</Button>
                    <Button onPress={handleSubmit} >Aplicar</Button>
                </View>
                </>
            )}
            </Formik>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    container:{
        display:"flex",
        flexDirection:"column",
        paddingHorizontal:30,
        gap:10,  
    },
   
    buttonContainer: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-evenly',
        marginTop: 70,
        marginBottom: 20
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
