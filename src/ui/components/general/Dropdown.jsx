import {StyleSheet, View} from "react-native";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconButton} from "react-native-paper";
import {TextInput} from "./TextInput";

export const Dropdown = (props) => {

    const data = props.list
    const initialValue = props.initialValue ? props.initialValue : ''

    return (
        <View>
            <AutocompleteDropdown inputContainerStyle={styles.inputContainer}
                                  containerStyle={styles.container}
                                  ChevronIconComponent={<IconButton icon={"chevron-down"}></IconButton>}
                                  textInputProps={{style:{color:COLORS.secondary}}}
                                  dataSet={data}
                                  onSelectItem={(item)=>props.setValue(item)}
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
