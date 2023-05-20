import {StyleSheet, Text} from "react-native";
import {COLORS} from "../styles/Colors";

export default function Label(props) {
    return (
        <Text style={styles.baseline}>{props.children}</Text>
    )
}

const styles = new StyleSheet.create({
    baseline: {
        color:COLORS.white
    }
})
