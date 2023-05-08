import React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "./src/views/Splash";

const Stack = createNativeStackNavigator();
function App(): JSX.Element {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Splash"}>
            <Stack.Screen name={"Splash"} component={Splash}
            options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;
