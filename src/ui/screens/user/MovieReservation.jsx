import * as React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import {Dropdown} from "../../components/general/Dropdown";
import { Text } from '../../components/general/Text';
import { MovieSelectedDetailComponent } from '../../components/user/MovieSelectedDetailComponent';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import { mock_filters } from "../../../assets/data/user_filters";
import { Formik } from 'formik';
import * as yup from 'yup';
import { ChipsLabelValue } from '../../components/user/ChipsLabelValue';
import { MovieSchedulerComponent } from '../../components/user/MovieSchedulerComponent';
import { getScreenings } from '../../../networking/api/ScreeningController';

export const MovieReservation = ({route, navigation}) => {
    const {t} = useTranslation();
    const { movie, cinema } = route.params.reservationData
    const { cinemas } = mock_filters
    const [cinemaSelected, setCinemaSelected] = React.useState(cinema)
    const [screeningData, setScreeningData] = React.useState({dates:[]})

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const fetchScreeningsData = async () => {
            setIsLoading(true)
            try {
                const response = await getScreenings(cinemaSelected.id)
                if (response.status === 200) {
                    if (response.data.dates !== null){ 
                        setScreeningData(response.data)
                    }else{
                        setScreeningData({dates:[]})
                    }
                } else {
                    setErrMsg(t('translation:general.errors.default'));
                }
    
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
        
        fetchScreeningsData()
    }, [cinemaSelected])

    
    const handleCinemaChange = async (value) => {
        if (!value) return
        setCinemaSelected(value)        
    }

    const handleConfirm = (value) =>{
        console.log('Confirm Value', value)
        const reservationBody = {
            cinemaId: cinemaSelected.id,
            screeningId: value,
            seatsReserved: {
              seatRow: '',
              seatColumn: ''
            }
        }

        navigation.navigate('SeatsSelection', { reservationInfo: { cinema: cinemaSelected, movieSelected: movie, reservationBody }})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <Formik
                initialValues={{ cinema:cinemaSelected }}
            >
                {({ setFieldValue, values }) => (
                    <Dropdown list={cinemas}
                        value={values.cinemaSelected}
                        setValue={(value) => { 
                            setFieldValue("cinemaSelected", value) 
                            handleCinemaChange(value)
                        }} 
                        initialValue={cinemaSelected}
                    />
                )}
            </Formik>
            <ScrollView style={styles.container}>
                <MovieSchedulerComponent screeningData={screeningData} handleConfirm={handleConfirm} />
                <MovieSelectedDetailComponent movie={movie} />
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15,
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