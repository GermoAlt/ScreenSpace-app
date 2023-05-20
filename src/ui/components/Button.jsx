import {Pressable, StyleSheet, Text} from "react-native";
import {COLORS} from "../styles/Colors";
import Label from "./Label";

export default function Button(props) {
    return <Pressable onPress={()=>{}} style={[styles.baseline, styles.primary]}>
        <Label>{props.children}</Label>
    </Pressable>
}

const styles = new StyleSheet.create({
    baseline:{
        padding:8,
        width:80,
        height:40,
        borderRadius:4
    },
    primary:{
        backgroundColor:COLORS.cta,
    },
})
