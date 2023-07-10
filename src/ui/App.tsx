/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Landing} from './screens/Landing';
import SplashScreen from 'react-native-splash-screen';
import {PaperProvider} from "react-native-paper";
import {OwnerNavigator} from "./screens/owner/OwnerNavigator";
import {COLORS} from "./styles/Colors";
import {UserNavigator} from "./screens/user/UserNavigator";
import {enableLatestRenderer} from "react-native-maps";
import {LoginNavigator} from './screens/login/LoginNavigator';
import {AutocompleteDropdownContextProvider} from "react-native-autocomplete-dropdown";
import { AuthProvider } from '../context/AuthProvider';
import { GeolocationProvider } from '../context/GeolocationProvider';
import { CinemasProvider } from '../context/CinemasProvider';

enableLatestRenderer()

const Stack = createNativeStackNavigator();
const MyTheme = {
    ...DarkTheme,
    dark: true,
    colors: {
        ...DarkTheme.colors,
        ...COLORS,
        elevation: {
            level3: COLORS.grey
        }
    },
};

function App(): React.JSX.Element {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <AuthProvider>
            <GeolocationProvider>
                <CinemasProvider>
                    <AutocompleteDropdownContextProvider>
                        <PaperProvider theme={MyTheme}>
                            <NavigationContainer theme={MyTheme}>
                                <Stack.Navigator initialRouteName={'Landing'}>
                                    <Stack.Screen
                                        name={'Landing'}
                                        component={Landing}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name={'LoginNavigator'}
                                        component={LoginNavigator}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name={"OwnerNavigator"}
                                        component={OwnerNavigator}
                                        options={{headerShown: false}}
                                    />
                                    <Stack.Screen
                                        name={"UserNavigator"}
                                        component={UserNavigator}
                                        options={{headerShown: false}}
                                    />

                                </Stack.Navigator>
                            </NavigationContainer>
                        </PaperProvider>
                    </AutocompleteDropdownContextProvider>
                </CinemasProvider>
            </GeolocationProvider>
        </AuthProvider>
    );
}


export default App;
