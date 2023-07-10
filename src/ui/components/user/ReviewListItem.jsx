import {View} from "react-native";
import {CardPanel} from "../general/CardPanel";
import {Text} from "react-native-paper";

export const ReviewListItem = (props) => {
    const {review} = props
    return (
        <CardPanel>
            <Text>
                {review.id}
            </Text>
        </CardPanel>
    )
}
