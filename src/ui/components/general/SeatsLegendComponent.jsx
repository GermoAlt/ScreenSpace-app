import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP, IconButton } from 'react-native-paper';
import {useTranslation} from "react-i18next";

export const SeatsLegendComponent = () => {
    const {t} = useTranslation();
    return (
        <View style={styles.parentContainer}>
            <TextRNP variant='titleLarge' style={styles.title} >
                {t("translation\:user\.labels\.movieReservation\.seatLegend\.seatSelection")}
            </TextRNP>
            <View style={styles.iconsContainer}>
                <View style={styles.container}>
                    <IconButton icon={"sofa-single"} size={20} iconColor={COLORS.vacantSeat}/>
                    <TextRNP variant='labelMedium' style={styles.label} >
                        {t("translation\:user\.labels\.movieReservation\.seatLegend\.vacant")}
                    </TextRNP>
                </View>
                <View style={styles.container}>
                    <IconButton icon={"sofa-single"} size={20} iconColor={COLORS.reservedSeat} />
                    <TextRNP variant='labelMedium' style={styles.label} >
                        {t("translation\:user\.labels\.movieReservation\.seatLegend\.reserved")}
                    </TextRNP>
                </View>
                <View style={styles.container}>
                    <IconButton icon={"sofa-single"} size={20} iconColor={COLORS.selectedSeat}/>
                    <TextRNP variant='labelMedium' style={styles.label} >
                        {t("translation\:user\.labels\.movieReservation\.seatLegend\.selected")}
                    </TextRNP>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    parentContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
        gap: 5,
    },
    iconsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    container: {
        display: "flex",
        flexDirection: "row",
    },
    title: {
        color:COLORS.off_white,
        fontWeight: '700'
    },
    label: {
        alignSelf: 'center',
        color:COLORS.off_grey,
    },
})