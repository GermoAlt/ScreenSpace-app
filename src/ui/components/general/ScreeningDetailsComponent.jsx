import {StyleSheet, View} from "react-native";
import { DetailItemComponent } from './DetailItemComponent';
import { Text as TextRNP } from 'react-native-paper';
import {COLORS} from "../../styles/Colors";

export const ScreeningDetailsComponent = (props) => {
    
    const details = props.details
    const reservationDate = () => {
        return details.screeningDate?.toString().substr(0,5)
    }
    const reservationTime = () => {
        return details.screeningDate?.toString().substr(10,6)
    }

    return (
        <View style={styles.container}> 
            <View style={styles.labelsContainer}>
                <TextRNP variant='headlineMedium' style={styles.labelTitle} >
                    {details.movieTitle}
                </TextRNP>
                <TextRNP variant='titleSmall' style={styles.labelDuration} >
                    {details.movieDuration + ' min.'}
                </TextRNP>
            </View>
            <View style={styles.lineSeparator}></View>
            <View style={styles.iconsContainer}>
                <DetailItemComponent icon="map-marker" label={details.cinemaName} />
                <DetailItemComponent icon="calendar-month" label={reservationDate()}  />
                <DetailItemComponent icon="clock-outline" label={reservationTime()}  />

            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
        marginBottom: 5,
    },
    labelsContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 5,
    },
    labelTitle: {
        textTransform: 'uppercase',
        fontWeight: 800,
        color:COLORS.off_white,
    },
    labelDuration: {
        color:COLORS.off_grey,
    },
    lineSeparator: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary
    },  
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        rowGap: 2,
        columnGap: 20,
        marginBottom: 5,
    },
})