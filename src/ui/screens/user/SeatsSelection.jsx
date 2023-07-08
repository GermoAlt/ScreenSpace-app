import * as React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { HeaderLogo } from '../../components/general/HeaderLogo';
import {Button} from "../../components/general/Button";
import { ScreeningDetailsComponent } from '../../components/general/ScreeningDetailsComponent';
import { SeatsLegendComponent } from '../../components/general/SeatsLegendComponent';
import { getScreening } from '../../../networking/api/ScreeningController';
import { SeatSelectionLayout } from '../../components/general/SeatSelectionLayout';
import { Text as TextRNP } from 'react-native-paper';

export const SeatsSelection = ({route, navigation}) => {
    const {t} = useTranslation();
    const { movieSelected, cinema, reservationBody } = route.params.reservationInfo
    
    const [detailsData, setDetailsData] = React.useState({})
    const [theaterDetails, setTheaterDetails] = React.useState({})
    const arrSeatsSelected = []
   // const [seatsLayout, setSeatsLayout] = React.useState({})
   // const [reservedSeats, setReservedSeats] = React.useState([])

  //  console.log('movieSelected', movieSelected)
  //  console.log('cinemaSelected', cinemaSelected)
    console.log('reservationBody', reservationBody)

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        const fetchScreeningInfo = async () => {
            setIsLoading(true)
            try {
                const response = await getScreening(reservationBody.screeningId)
                if (response.status === 200) {
                    parseScreeningData(response.data)
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
        
        fetchScreeningInfo()
    }, [])


    const parseScreeningData = (dataR) => {
        const { id, theater, movie, seatsReserved, date } = dataR
        
        const details = {
            movieTitle: movie.title,
            movieDuration: movie.duration,
            cinemaName: cinema.title,
            screeningDate: date,
        }
        const theater_details = {
            rows: theater.seatsLayout.numRows,
            cols: theater.seatsLayout.numColumns,
            pricePerFunction: theater.pricePerFunction
        }

        setDetailsData(details)
        setTheaterDetails(theater_details)
    }

    

    const handleGoBack = () =>{
        navigation.goBack()
    }

    const updateSelection = (arrSeats) => {
        if (arrSeats.seatSelected){
            arrSeatsSelected.push(arrSeats.seatSelection)
        }else{
            arrSeatsSelected.splice(arrSeatsSelected.indexOf(arrSeats.seatSelection),1)
        }        
    }

    const handlePurchase = () =>{
        if (arrSeatsSelected.length === 0) return

        //TODO: NTH - Añadir validacion de butaca vacia en el medio??

        arrSeatsSelected.map((item) => {
            console.log('item', item)
        })


        /*
        const reservationBodyComplete = {
            cinemaId: cinema.id,
            screeningId: value,
            seatsReserved: {
              seatRow: 3,
              seatColumn: 3
            }
        }
        */
        //navigation.navigate('ConfirmationScreen', {reservationBodyComplete})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>

            <ScrollView style={styles.container}>
                <ScreeningDetailsComponent details={detailsData} />
                <SeatsLegendComponent />
                <SeatSelectionLayout rows={theaterDetails.rows} columns={theaterDetails.cols} updateSelection={updateSelection} />
                <TextRNP variant='titleMedium' style={styles.indications} >
                Para seleccionar las butacas, toca los asientos disponibles que deseas reservar.
                </TextRNP>
                <View style={styles.dualRow}>
                    <View style={styles.button}>
                        <Button type={"cta"} onPress={()=>handleGoBack()}>
                            {t("translation\:user\.captions\.seatsSelection\.back")}
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button type={"cta"} onPress={()=>handlePurchase()}>
                            {t("translation\:user\.captions\.seatsSelection\.purchase")}
                        </Button>
                    </View>
                </View>
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
    indications: {
        marginTop: 5,
        textAlign: 'center',
        color: COLORS.off_white
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        gap: 10,
        justifyContent: "center"
    },
    button: {
        width: '50%'
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