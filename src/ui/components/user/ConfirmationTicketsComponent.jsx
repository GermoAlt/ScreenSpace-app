import * as React from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP, Chip } from 'react-native-paper';
import {useTranslation} from "react-i18next";

export const ConfirmationTicketsComponent = (props) => {
    
    const [chipSelected, setChipSelected] = React.useState({label: ''})
    //const { label, values, handleOptionSelected} = props

    const data =  {
            label: 'Entrada Función',
            value: '2 x $2780'
        }
    
    const totalAmount = 5560
      
    const {t} = useTranslation();
    
    return (
        <View style={styles.container}>  
            <TextRNP variant='titleMedium' style={styles.label} >
                {'Tus Entradas'}
            </TextRNP>
            <View style={styles.lineSeparator}></View>
            <View style={styles.rowData}>
                <TextRNP variant='titleMedium' style={styles.label} >
                    {data.label}
                </TextRNP>
                <TextRNP variant='titleMedium' style={styles.value} >
                    {data.value}
                </TextRNP>
            </View>
            <View style={styles.rowData}>
                <TextRNP variant='titleMedium' style={styles.label} >
                    {'Total'}
                </TextRNP>
                <TextRNP variant='titleMedium' style={styles.value} >
                    ${totalAmount}
                </TextRNP>
            </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 15,
        paddingHorizontal: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 5,
        marginBottom: 8
    },
    lineSeparator: {
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        marginBottom: 8
    }, 
    rowData: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    label: {
        color:COLORS.off_white,
        fontWeight: '800',
        alignSelf: 'flex-start'
    },
    value: {
        color:COLORS.off_white,
        alignSelf: 'flex-end'
    },
    
})