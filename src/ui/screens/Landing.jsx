import {SafeAreaView} from 'react-native';
import React from "react";
import {TextInput} from "../components/TextInput"
import {Button} from "../components/Button";

export default function Landing() {

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
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
        </Button>
    </SafeAreaView>
  );
}
