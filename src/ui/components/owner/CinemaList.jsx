import {SafeAreaView, View} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../general/Button";
import {useTranslation} from "react-i18next";

export const CinemaList = (props) => {
    const {t} = useTranslation()
    return (
        <SafeAreaView>
            {props.data && props.data.length === 0 ?
                <View>
                    <Text></Text>
                    <Button type={"cta"} onPress={()=>props.navigateTo("newCinema")}>
                        {t("translation\:owner\.landing\.addCinemaButton")}
                    </Button>
                </View>
            :
            <Text>hay data</Text>}
        </SafeAreaView>
    );
};
