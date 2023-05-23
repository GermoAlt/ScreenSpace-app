import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import SplashScreen from 'react-native-splash-screen';
import {DefaultTheme, PaperProvider} from "react-native-paper";

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={'Landing'}>
                    <Stack.Screen
                        name={'Landing'}
                        component={Landing}
                        options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#282634',
    secondary: 'yellow',
  },
};

export default App;
