import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";

export const CardPanel = ({children, style}) => {
    return (
        <View style={[styles.card, style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.tertiary,
        padding:10,
        borderRadius:8,
        marginHorizontal:30,
        elevation:15
    },
})
