import * as React from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text as TextRNP, Chip } from 'react-native-paper';
import {useTranslation} from "react-i18next";

export const ChipsLabelValue = (props) => {
    
    const [chipSelected, setChipSelected] = React.useState({label: ''})
    const { label, values, handleOptionSelected} = props
    
    const {t} = useTranslation();

    React.useEffect(() => {
        if (values === []){
            setChipSelected({label: ''})
        }
    }, [values])

    const handleSelectedChip = (item) => {
        setChipSelected(item)
        handleOptionSelected(item)

    }
    
    return (
        <View style={styles.container}>  
            <TextRNP variant='titleLarge' style={styles.label} >
                {label}
            </TextRNP>
            <FlatList
                data={values}
                horizontal
                renderItem={
                    ({item}) =>
                        <Chip icon='' style={chipSelected.label === item.label ? styles.chipSelected : styles.chip} selectedColor={COLORS.off_white} textStyle={styles.chipText} selected={chipSelected.label === item.label} onPress={()=> handleSelectedChip(item)}>{item.label}</Chip> 
                }
                keyExtractor={item => item.label}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 9,
        marginBottom: 8
    },
    label: {
        color:COLORS.off_white,
    },
    chip: {
        color:COLORS.off_white,
        backgroundColor:COLORS.tertiary,
        marginRight: 8,
        borderRadius: 99
    },
    chipSelected: {
        color:COLORS.off_white,
        backgroundColor:COLORS.primary,
        marginRight: 8,
        borderRadius: 99
    },
    chipText: {
        color:COLORS.off_white,
        fontSize: 18
    }
    
})