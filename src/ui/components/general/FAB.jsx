import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as RNPFAB} from 'react-native-paper';
import {COLORS} from "../../styles/Colors";

const FAB = (props) => (
    <RNPFAB
        icon="plus"
        style={styles.fab}
        onPress={() => props.action}
        color={COLORS.secondary}
    />
);

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 26,
        right: 0,
        bottom: 0,
        backgroundColor:COLORS.cta,
    },
})

export default FAB;
