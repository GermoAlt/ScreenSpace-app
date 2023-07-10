import * as React from 'react';
import {SafeAreaView, StyleSheet, View } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import {Dropdown} from "../../components/general/Dropdown";
import { Text } from '../../components/general/Text';
import { MovieSelectedDetailComponent } from '../../components/user/MovieSelectedDetailComponent';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import { mock_filters } from "../../../assets/data/user_filters";
import { getCinemas } from '../../../networking/api/CinemaController';
import { Formik } from 'formik';
import * as yup from 'yup';

export const MovieSelection = ({route, navigation}) => {
    const {t} = useTranslation();
    const movie = route.params.movieData
    const [ cinemas, setCinemas ] = React.useState([])



    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
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

    const handleCinemaChange = async (value) => {
        if (!value) return
        const cinema = value

        setIsLoading(true)
        setErrMsg('')

        const reservationData = {
            cinema,
            movie
        }
        navigation.navigate('MovieReservation', {reservationData})
        
        
        setIsLoading(false)
        
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <Formik
                initialValues={{ cinema:{} }}
            >
                {({ setFieldValue, values }) => (
                    <Dropdown list={cinemas}
                        value={values.cinema}
                        setValue={(value) => { 
                            setFieldValue("cinema", value) 
                            handleCinemaChange(value)
                        }} 
                    />
                )}
            </Formik>
            <MovieSelectedDetailComponent movie={movie} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15,
        marginBottom: 10,
        minHeight: "80%"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    scrollView: {
        marginHorizontal: 20,
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
    loadingContainer:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        minHeight:350
    },
    loadingText:{
        color:COLORS.secondary,
        fontSize:24,
    }
})