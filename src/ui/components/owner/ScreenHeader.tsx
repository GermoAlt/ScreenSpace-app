import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {COLORS} from "../../styles/Colors";

export const ScreenHeader = (props: { text: string }) => {
    let title = props.text.toUpperCase().split(" ")
    const lastWord = title.pop()
    return (
        <View style={styles.container}>
            <Text style={[styles.text]}>{title.toString()}</Text>
            <Text style={[styles.text, styles.highlight]}>{lastWord}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text:{
        color: COLORS.secondary,
        fontSize: 25
    },
    highlight:{
        color: COLORS.primary
    },
    container: {
        display: "flex",
        flexDirection: "row",
        gap:5
    }
})
