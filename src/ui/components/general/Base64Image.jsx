import {useState} from "react";
import {Image, StyleSheet, View} from "react-native";

export const Base64Image = (props) => {
    // const [loading, setLoading] = useState()
    console.log(props.data)
    return (
        <Image style={styles.image} source={{uri: props.data.image}}/>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius:8,
        width: 140,
        height: 210,
        resizeMode: "contain",

    }
})
