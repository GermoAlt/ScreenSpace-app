import {Image, StyleSheet} from "react-native";

export const SmallBase64Image = (props) => {
    return (
        <Image style={styles.image} source={{uri: props.data.image}}/>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius:8,
        width: 80,
        height: 120,
        resizeMode: "contain",
    }
})
