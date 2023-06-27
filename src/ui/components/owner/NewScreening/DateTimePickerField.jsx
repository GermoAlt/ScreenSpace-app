import {useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {IconButton, Text, TextInput} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DatePicker from "react-native-date-picker";
import {COLORS} from "../../../styles/Colors";

export const DateTimePickerField = (props) => {

    const [open, setOpen] = useState(false)

    return <>
        <Pressable onPress={() => setOpen(true)} style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon name={props.mode === "date" ? "calendar-plus" : "clock-plus-outline"} style={styles.icon}></Icon>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.mode === "date" ? props.data.toLocaleDateString("en-GB") : props.data.toLocaleTimeString("en-GB")}</Text>
            </View>
        </Pressable>
        <DatePicker
            modal
            open={open}
            date={props.data}
            mode={props.mode}
            minimumDate={new Date()}
            onConfirm={(date) => {
                setOpen(false)
                props.setData(date)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
    </>

}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        flexDirection:"row",
        borderRadius:8,
        alignItems:"center",
    },
    iconContainer:{
        display:"flex",
        backgroundColor:COLORS.cta,
        padding:5,
        overflow:"hidden",
        borderTopLeftRadius:8,
        borderBottomLeftRadius:8,
    },
    icon:{
        fontSize:30,
        color:COLORS.secondary
    },
    textContainer:{
        borderColor:COLORS.secondary,
        borderWidth:1,
        padding:7,
        borderLeftWidth:0,
        borderTopRightRadius:8,
        borderBottomRightRadius:8,
        flex:1,
        maxWidth:120
    },
    text:{
        color:COLORS.secondary,
        fontSize:18,
    }
})
