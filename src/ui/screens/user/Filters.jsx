import * as React from 'react';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {Dropdown} from "../../components/general/Dropdown";
import {Button} from "../../components/general/Button";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import { mock_filters } from "../../../assets/data/user_filters";
import { HeaderLogo } from "../../components/general/HeaderLogo";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getCinemas } from '../../../networking/api/CinemaController';
import useGeolocation from '../../../hooks/useGeolocation';

export const Filters = ({navigation}) => {
    const {t} = useTranslation()
    const { geolocation } = useGeolocation()

    const { genres, distances, ratings, movies } = mock_filters
    const [cinemas, setCinemas] = React.useState([]);
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    //TODO - Pasarlo a un Provider
    React.useEffect(() => {

        console.log('geolocation', geolocation)

        const fetchCinemas = async () => {
            setIsLoading(true)
            try {
                const response = await getCinemas()
                const allCinemas = response.data.map((item) => { return { id: item.id, title: item.name }})
                setCinemas(allCinemas)

            } catch (error) {
                console.log('error', JSON.stringify(error))
                switch (error.response.data.status) {
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
            setIsLoading(false)
        }
        
        fetchCinemas()
        
    }, [])
   

    const handleSetFilters = async (values) => {

        setIsLoading(true)
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
        
        setIsLoading(false)
        
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
                    <View style={styles.titleContainer}>
                        <Icon name="filter" style={styles.icon} />
                        <Text style={styles.title}>{t("translation\:user\.labels\.landing\.filters")}</Text>
                    </View>    
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
                <View style={styles.dualRow}>
                    <View style={styles.button}>
                        <Button type={"secondary"} onPress={()=>handleSubmit()}>
                            {t("translation\:user\.captions\.filters\.clear")}
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button type={"cta"} onPress={()=>handleSubmit()}>
                            {t("translation\:user\.captions\.filters\.apply")}
                        </Button>
                    </View>
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
        paddingHorizontal:20,
        gap:10,  
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        gap: 8
    },
    icon: {
        alignSelf: 'center',
        fontSize:24,
        color:COLORS.off_white,
    },
    title:{
        color:COLORS.secondary,
        fontSize:20,

    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        marginTop: 50,
        marginHorizontal: 25,
        gap: 10,
        justifyContent: "center",
    },
    button: {
        width: '50%'
    },  

    buttonContainer: {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:'space-evenly',
        marginTop: 70,
        marginBottom: 20
    },
    
    errorText: {
        fontSize: 10,
        color: COLORS.primary,
    },
})
