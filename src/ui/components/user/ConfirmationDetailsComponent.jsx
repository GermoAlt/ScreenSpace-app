import * as React from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP, Chip } from 'react-native-paper';
import {useTranslation} from "react-i18next";

export const ConfirmationDetailsComponent = (props) => {
    const { details, seats } = props
    const {t} = useTranslation();

    const getDate = () => {
        return details.screeningDate.toString().substr(0,5)
    }
    const getTime = () => {
        return details.screeningDate.toString().substr(10,6)
    }
    const dateTime = getDate() + ' ' + getTime()

    const parsedSeats = () => {
        const stringSeats = []
        seats.map((item) => {
            stringSeats.push(Object.keys(item).map(key => `${item[key]}`).join(""))
        })
        return stringSeats.join(', ')
    }
    
    const data = [
        {
            label: t("translation\:user\.labels\.movieConfirmation\.movie"),
            value: details.movieTitle
        },
        {
            label: t("translation\:user\.labels\.movieConfirmation\.cinema"),
            value: details.cinemaName
        },
        {
            label: t("translation\:user\.labels\.movieConfirmation\.date_time"),
            value: dateTime
        },
        {
            label: t("translation\:user\.labels\.movieConfirmation\.seats"),
            value: parsedSeats()
        }
    ]   
    
    
    return (
        <View style={styles.container}>  
            { data.map((item, index) =>
                <View style={styles.rowData} key={`${item.value} - ${index}`}>
                    <TextRNP variant='titleMedium' style={styles.label} >
                        {item.label}
                    </TextRNP>
                    <TextRNP variant='titleMedium' style={styles.value} >
                        {item.value}
                    </TextRNP>
                </View>
            )}
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 5,
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
        color:COLORS.off_grey,
        alignSelf: 'flex-end'
    },
    
})