import {View, StyleSheet} from 'react-native';
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {COLORS} from "../../styles/Colors";

export const ErrorMessage = (props) => {
    const {iconType, children} = props
    let icon = ''
    switch (iconType){
        case 'error':
            icon = 'alert'
        break;
        case 'info':
            icon = 'information'
        break;
        case 'offline':
            icon = 'wifi-off'
        break;

    }
    return (
        <View style={styles.errorContainer}>
            <Icon name={icon} style={styles.icon}/>
            <Text style={styles.text}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'space-around',
        backgroundColor: COLORS.off_white,
        padding: 6,
        borderRadius: 5,
        gap: 15
    },
    icon:{
        color:COLORS.primary,
        fontSize:24
    },
    text:{
        color:COLORS.dark,
        fontSize:18
    }
})
