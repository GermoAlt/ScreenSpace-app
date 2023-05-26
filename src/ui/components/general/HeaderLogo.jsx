import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {COLORS} from "../../styles/Colors";

export const HeaderLogo = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.screenText]}>SCREEN</Text>
            <Text style={[styles.text, styles.spaceText]}>SPACE</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flexDirection:"row"
    },
    text:{
        fontSize:50,
        fontFamily:'Oswald-Medium',
        lineHeight:60,
        height:50
    },
    screenText:{
        color:COLORS.primary
    },
    spaceText:{}
})

