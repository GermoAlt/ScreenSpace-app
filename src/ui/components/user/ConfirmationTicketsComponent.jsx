import * as React from 'react';
import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP } from 'react-native-paper';
import {useTranslation} from "react-i18next";

export const ConfirmationTicketsComponent = (props) => {
    
    const { ticketQuantity, ticketPrice } = props
    const totalAmount = ticketQuantity * ticketPrice
      
    const {t} = useTranslation();
    
    return (
        <View style={styles.container}>  
            <TextRNP variant='titleMedium' style={styles.label} >
                {t("translation\:user\.labels\.movieConfirmation\.your_tickets")}
            </TextRNP>
            <View style={styles.lineSeparator}></View>
            <View style={styles.rowData}>
                <TextRNP variant='titleMedium' style={styles.label} >
                    {t("translation\:user\.labels\.movieConfirmation\.screening_ticket")}
                </TextRNP>
                <TextRNP variant='titleMedium' style={styles.value} >
                    {ticketQuantity} x ${ticketPrice}
                </TextRNP>
            </View>
            <View style={styles.rowData}>
                <TextRNP variant='titleMedium' style={styles.label} >
                    {t("translation\:user\.labels\.movieConfirmation\.total_amount")}
                </TextRNP>
                <TextRNP variant='titleMedium' style={styles.value} >
                    ${totalAmount}
                </TextRNP>
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 5,
        marginBottom: 8
    },
    lineSeparator: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 8
    }, 
    rowData: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    label: {
        color:COLORS.off_white,
        fontWeight: '800',
        alignSelf: 'flex-start'
    },
    value: {
        color:COLORS.off_white,
        alignSelf: 'flex-end'
    },
    
})