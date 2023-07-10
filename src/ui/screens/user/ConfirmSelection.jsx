import * as React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { HeaderLogo } from '../../components/general/HeaderLogo';
import {Button} from "../../components/general/Button";
import { Text as TextRNP } from 'react-native-paper';
import { ConfirmationDetailsComponent } from '../../components/user/ConfirmationDetailsComponent';
import { ConfirmationTicketsComponent } from '../../components/user/ConfirmationTicketsComponent';
import { postReservation } from '../../../networking/api/ReservationController';

export const ConfirmSelection = ({route, navigation}) => {
    const {t} = useTranslation();
    const { screeningId, seatsReserved, ticketQuantity, ticketPrice, details } = route.params.confirmationInfo

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    const [disablePurhcase, setDisablePurhcase] = React.useState(false)

    const handleGoBack = () =>{
        navigation.goBack()
    }

    const handleConfirm = async () =>{
        //TODO: NTH - Añadir pantalla/mensaje de GRACIAS POR COMPRAR
        setDisablePurhcase(true)
        const confirmReserveBody = {
            screeningId: '649a4f2f00221a05f561ccfa',
            seatsReserved: [
              {
                seatRow: "C",
                seatColumn: "3"
              },
              {
                seatRow: "C",
                seatColumn: "4"
              }
            ]
          }
        
        setIsLoading(true)
        try {
            const response = await postReservation(confirmReserveBody)
            if (response.status === 200) {
                console.log('RES', JSON.stringify(response))
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>

            <ScrollView style={styles.container}>
                <TextRNP variant='titleMedium' style={styles.indications} >
                    {t("translation\:user\.labels\.movieConfirmation\.almost_there")}
                </TextRNP>
                <View style={styles.lineSeparator}></View>
                <TextRNP variant='titleMedium' style={styles.indications} >
                    {t("translation\:user\.labels\.movieConfirmation\.indication_confirmation")}
                </TextRNP>
                <ConfirmationDetailsComponent details={details} seats={seatsReserved} />
                <ConfirmationTicketsComponent ticketQuantity={ticketQuantity} ticketPrice={ticketPrice} />
                <View style={styles.detailsTickets}>
                </View>
                <View style={styles.dualRow}>
                    <View style={styles.button}>
                        <Button type={"secondary"} onPress={()=>handleGoBack()}>
                            {t("translation\:user\.captions\.seatsSelection\.back")}
                        </Button>
                    </View>
                    <View style={styles.button}>
                        <Button type={ disablePurhcase ? "disabled" : "cta"} onPress={()=>handleConfirm()}>
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
        paddingHorizontal: 5,
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
        marginBottom: 5,
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
    lineSeparator: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary
    }, 
})