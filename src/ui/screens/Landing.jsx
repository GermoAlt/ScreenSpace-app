import {SafeAreaView} from 'react-native';
import React from "react";
import {TextInput} from "../components/general/TextInput"
import {Button} from "../components/general/Button";

export default function Landing({navigation}) {

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
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("OwnerNavigator")}>
            Ir a OwnerNavigator
        </Button>
        <Button icon="camera" mode="contained" onPress={() => navigation.navigate("UserNavigator")}>
            Ir a UserNavigator
        </Button>
    </SafeAreaView>
  );
}
