import {StyleSheet, View} from "react-native";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {COLORS} from "../../styles/Colors";
import {IconButton} from "react-native-paper";
import {useEffect, useState} from "react";

export const Dropdown = (props) => {
    const data = props.list
    const initialValue = props.initialValue ? props.initialValue : ''


    return (
        <View>
            <AutocompleteDropdown inputContainerStyle={styles.inputContainer}
                                  containerStyle={styles.container}
                                  ChevronIconComponent={<IconButton icon={"chevron-down"} />}
                                  textInputProps={{style:{color:COLORS.secondary}}}
                                  dataSet={data}
                                  onSelectItem={(item) => {
                                      props.setValue(item)
                                  }}
                                  initialValue={initialValue}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        borderColor:COLORS.secondary,
        borderWidth:1,
        borderRadius:5,
    },
    inputContainer: {
        backgroundColor: COLORS.background,
    },
    rightButtonsContainer:{
        color:"white",
    }
})
