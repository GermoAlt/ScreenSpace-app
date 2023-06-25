import {StyleSheet, View} from "react-native";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconButton} from "react-native-paper";

export const Dropdown = (props) => {

    //const {data} = props
    const data = [
        { id: '1', title: 'Alpha' },
        { id: '2', title: 'Beta' },
        { id: '3', title: 'Gamma' },
    ]

    return (
        <View>
            <AutocompleteDropdown inputContainerStyle={styles.inputContainer}
                                  containerStyle={styles.container}
                                  ChevronIconComponent={<IconButton icon={"chevron-down"}></IconButton>}
                                  dataSet={data}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        borderColor:COLORS.secondary,
        borderWidth:1,
        borderRadius:5
    },
    inputContainer: {
        backgroundColor: COLORS.background
    },
    rightButtonsContainer:{
        color:"white",
    }
})
