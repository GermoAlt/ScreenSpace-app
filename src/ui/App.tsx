import React, {useEffect} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Landing from './screens/Landing';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from "react-native-paper";
import {OwnerNavigator} from "./screens/owner/OwnerNavigator";
import {COLORS} from "./styles/Colors";

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DarkTheme,
    dark:true,
    colors: {
        ...DarkTheme.colors,
        ...COLORS
    },
};

function App(): React.JSX.Element {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <PaperProvider theme={MyTheme}>
            <NavigationContainer theme={MyTheme}>
                <Stack.Navigator initialRouteName={'Landing'}>
                    <Stack.Screen
                        name={'Landing'}
                        component={Landing}
                        options={{headerShown: false}}
                    />
                    <Stack.Screen
                        name={"OwnerNavigate"}
                        component={OwnerNavigator}
                        options={{headerShown: false}}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}


export default App;
