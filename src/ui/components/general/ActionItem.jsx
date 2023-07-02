import * as React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text as TextRNP } from 'react-native-paper';

export const ActionItem = (props) => {
    
    const { icon, label }  = props

    return (
        <View style={styles.container}>
            <Icon name={icon} style={styles.icon} />
            <TextRNP variant='labelLarge' style={styles.label} >
                {label}
            </TextRNP>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 5,
        marginTop: 10,
    },
    icon: {
        fontSize:40,
        alignSelf:'center',
        color:COLORS.off_white,
    },
    label: {
        color:COLORS.off_white,
    }
})