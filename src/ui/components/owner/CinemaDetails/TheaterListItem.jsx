import {CardPanel} from "../../general/CardPanel";
import {View} from "react-native";
import {IconText} from "../../general/IconText";
import {Text} from "../../general/Text";

export const TheaterListItem = () => {
    return <CardPanel>
        <View>
            <Text>s</Text>
            <IconText icon={"sofa-single"}>s</IconText>
        </View>
        <View>
            <IconText icon={"movie-roll"}>d</IconText>
        </View>
    </CardPanel>

}
