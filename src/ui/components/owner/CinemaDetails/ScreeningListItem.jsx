import {StyleSheet, View} from "react-native";
import {CardPanel} from "../../general/CardPanel";
import {Text} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconText} from "../../general/IconText";

export const ScreeningListItem = (props) => {
    return (
        <CardPanel>
            <View></View>
            <View>
                <View>
                    <Text>s</Text>
                    <View>
                        <IconText name={'sofa-single'} >s</IconText>
                    </View>
                </View>
                <Text>s</Text>
                <View>
                    <IconText name={"clock-outline"}>s</IconText>
                    <IconText name={"calendar-month"}>s</IconText>
                </View>

            </View>
        </CardPanel>
    )
}

const styles = StyleSheet.create({
    image:{},
    topText:{},
    title:{},
    bottomRow:{}
})
