import {SafeAreaView} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";

export const MovieSearch = () => {
    const {t} = useTranslation()
    return (
        <SafeAreaView>
            <TextInput label={t('translation\:owner\.labels\.movieSearch\.searchField')}></TextInput>
        </SafeAreaView>
    )

}
