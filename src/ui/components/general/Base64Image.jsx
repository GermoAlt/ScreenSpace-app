import {useState} from "react";
import {Image, StyleSheet, View} from "react-native";

export const Base64Image = (props) => {
    // const [loading, setLoading] = useState()
    console.log(props.item)
    return (
        <Image style={{width: 100, height: 50, resizeMode: Base64Image.resizeMode.contain, borderWidth: 1, borderColor: 'red'}} source={{uri: props.item.image}}/>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius:15

    }
})
