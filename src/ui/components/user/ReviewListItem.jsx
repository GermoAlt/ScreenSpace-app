import {StyleSheet, View} from "react-native";
import {CardPanel} from "../general/CardPanel";
import {Text} from "react-native-paper";
import {NoInteractionStarsRating} from "./NoInteractionStarsRating";
import {COLORS} from "../../styles/Colors";

export const ReviewListItem = (props) => {
    const {review} = props
    return (
        <CardPanel style={styles.container}>
            <NoInteractionStarsRating rating={review.rating.rating}></NoInteractionStarsRating>
            <Text style={styles.text}>
                {review.comment.comment}
            </Text>
        </CardPanel>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        gap:10
    },
    text: {
        color:COLORS.secondary,
        fontSize:20
    }
})
