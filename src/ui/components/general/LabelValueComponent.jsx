import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP } from 'react-native-paper';

export const LabelValueComponent = (props) => {
    
    const { label, value }  = props

    return (
        <View style={styles.container}>
            <TextRNP variant='titleLarge' style={styles.label} >
                {label}
            </TextRNP>
            <TextRNP variant='titleLarge' style={styles.value} >
                {value}
            </TextRNP>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 5,
        marginBottom: 8
    },
    label: {
        color:COLORS.primary,
    },
    value: {
        color:COLORS.off_white,
    }
    
})