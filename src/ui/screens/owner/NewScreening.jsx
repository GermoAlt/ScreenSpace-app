import {SafeAreaView, View} from "react-native";
import {Text} from "react-native-paper";
import {TextInput} from "../../components/general/TextInput";
import {MovieSelectionPanel} from "../../components/owner/NewScreening/MovieSelectionPanel";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {DatePickerField} from "../../components/owner/NewScreening/DatePickerField";
import {AvailabilityPanel} from "../../components/owner/NewScreening/AvailabilityPanel";

export const NewScreening = () => {
    return (
        <SafeAreaView>
            <Text>s</Text>
            <TextInput label={"e"}/>
            <MovieSelectionPanel/>
            <View>
                <CalendarPickerField/>
                <DatePickerField/>
            </View>
            <AvailabilityPanel/>
        </SafeAreaView>
    )
}
