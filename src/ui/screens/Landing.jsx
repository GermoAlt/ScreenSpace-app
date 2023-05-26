import {SafeAreaView} from 'react-native';
import React from "react";
import {TextInput} from "../components/general/TextInput"
import {Button} from "../components/general/Button";
import {useTranslation} from "react-i18next";

export default function Landing({navigation}) {
    const {t} = useTranslation()

    const [text, setText] = React.useState("");
    return (
        <SafeAreaView>
            <TextInput
                label="Email"
                value={text}
                onChangeText={text => setText(text)}
            />
            <TextInput
                label="Email AAAAAA "
                value={text}
                onChangeText={text => setText(text)}
            />
            <Button
                icon="movie-roll" mode="contained" onPress={() => navigation.navigate("OwnerNavigator")}>
                {t('translation\:landing\.ownerNavigateButton')}
            </Button>
            <Button icon="account-circle" mode="contained" onPress={() => navigation.navigate("UserNavigator")}>
                {t('translation\:landing\.userNavigateButton')}
            </Button>
        </SafeAreaView>
    );
}
