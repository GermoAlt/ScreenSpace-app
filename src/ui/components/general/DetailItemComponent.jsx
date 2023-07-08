import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text as TextRNP } from 'react-native-paper';

export const DetailItemComponent = (props) => {
    
    const { icon, label }  = props

    return (
        <View style={styles.container}>
            <Icon name={icon} style={styles.icon} />
            <TextRNP variant='titleMedium' style={styles.label} >
                {label}
            </TextRNP>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        gap: 5,
        marginTop: 10,
    },
    icon: {
        fontSize:40,
        alignSelf:'center',
        color:COLORS.primary,
    },
    label: {
        color:COLORS.off_grey,
        alignSelf:'center',
    }
})