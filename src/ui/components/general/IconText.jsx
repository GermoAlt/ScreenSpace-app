import {StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text} from "react-native-paper";
import {COLORS} from "../../styles/Colors";

export const IconText = (props) => {
    const {icon, children} = props
    return (
        <View style={styles.container}>
            <Icon name={icon} style={styles.icon}/>
            <Text style={styles.text}> {children} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row'
    },
    icon:{
        color:COLORS.primary,
        fontSize:40
    },
    text:{
        color:COLORS.secondary,
        fontSize:24
    }
})
