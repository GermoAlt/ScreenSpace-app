import {StyleSheet, View} from "react-native";

export const AvailabilityPanel = (props) => {
    const {theater, date} = props

    return (
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container:{},
    info:{},
    warn:{},
    success:{}
})
