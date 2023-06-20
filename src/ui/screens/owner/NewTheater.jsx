import {SafeAreaView, View} from "react-native";
import {Dropdown} from "../../components/general/Dropdown";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";
import {Checkbox, Title} from "react-native-paper";
import {useState} from "react";
import {Text} from "../../components/general/Text";
import {SeatLayout} from "../../components/general/SeatLayout";
import {Button} from "../../components/general/Button";

export const NewTheater = () => {
    const {t} = useTranslation()
    const [enabled, setEnabled] = useState(true)
    return (
        <SafeAreaView>
            <Dropdown/>
            <TextInput label={t('translation\:owner\.labels\.newTheater\.theaterName')} />
            <View>
                <Checkbox status={enabled ? 'checked' : 'unchecked'} onPress={()=>setEnabled(!enabled)}/>
                <Text>{t("translation\:owner\.labels\.newTheater\.enabled")}</Text>
            </View>

            <View>
                <View>
                    <TextInput />
                    <Text>{t("translation\:owner\.labels\.newTheater\.row")}</Text>
                </View>
                <View>
                    <TextInput />
                    <Text>{t("translation\:owner\.labels\.newTheater\.column")}</Text>
                </View>
            </View>
            <View>
                <Title>{t("translation\:owner\.labels\.newTheater\.screen")}</Title>
                <SeatLayout />
            </View>
            <View>
                <Button />
            </View>
        </SafeAreaView>
    )
}
