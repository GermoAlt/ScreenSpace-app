import {SafeAreaView} from 'react-native';
import React from "react";
import {Button, TextInput} from "react-native-paper";

export default function Landing() {

    const [text, setText] = React.useState("");
  return (
    <SafeAreaView>
        <TextInput
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
            mode={"outlined"}
        />
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
        </Button>
    </SafeAreaView>
  );
}
