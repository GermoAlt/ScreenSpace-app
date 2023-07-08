import {StyleSheet, View} from "react-native";
import { Surface, Text } from 'react-native-paper';
import {COLORS} from "../../styles/Colors";

export const StepperComponent = (props) => {
    const { steps, currentStep } = props
    return (
        <View style={styles.container}>
            { steps.map((step) =>
                <Surface key={step.id} style={currentStep === Number(step.label) ? styles.stepSelectedStyle : styles.stepStyle} elevation={4}>
                  <Text style={styles.textLabel}>{step.label}</Text>
                </Surface>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-around',
        gap: 35
    },
    label: {
        color:COLORS.off_white,
    },
    chip: {
        color:COLORS.off_white,
        marginRight: 8
    },
    textLabel: {
        color:COLORS.off_white,
        fontWeight: '700'
    },
    stepStyle: {
        
        backgroundColor:COLORS.tertiary,
        fontSize: 18,
        padding: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        
        borderRadius: 99
    },
    stepSelectedStyle: {
        color:COLORS.off_white,
        backgroundColor:COLORS.primary,
        fontSize: 18,
        padding: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        
        borderRadius: 99
    }
})
