import {StyleSheet, View} from "react-native";
import {useState} from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Text} from "react-native-paper";


export const AvailabilityPanel = (props) => {
    const {theater, date} = props
    const [type, setTypeStyles] = useState(types[1])

    return <View style={[styles.container, type.styles.container]}>
                <View>
                    <Icon name={type.icon} style={type.styles.icon}/>
                </View>
                <View>
                    <Text style={styles.title}>dasdasd</Text>
                    <Text>dasdasdasdas</Text>
                </View>
            </View>
}

const styles = StyleSheet.create({
    container:{
        height:100,
        borderRadius:8,
        display:"flex",
        flexDirection:"row",
        gap:15,
        padding:15
    },

    title:{
        fontSize:18,
    }
})

const infoStyles = StyleSheet.create({
    container:{
        backgroundColor:"#BAE6FD"
    },
    icon:{
        fontSize:24,
        color:"#0369A1"
    },
})

const warnStyles = StyleSheet.create({
    container:{
        backgroundColor:"#FED7AA"
    },
    icon:{
        fontSize:24,
        color:"#C2410C"
    }
})
const successStyles = StyleSheet.create({
    container:{
        backgroundColor:"#A7F3D0"
    },
    icon:{
        fontSize:24,
        color:"#047857"
    }
})

const types = [
    {"type":"info",     "icon":"information",   "styles":infoStyles},
    {"type":"success",  "icon":"check-circle",          "styles":successStyles},
    {"type":"warn",     "icon":"information",   "styles":warnStyles},
]
