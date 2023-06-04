/* eslint-disable prettier/prettier */
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Login"
import Register from "./Register";
import RecoverPassword from "./RecoverPassword"
import RegisterCode from "./RegisterCode"
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";

const Stack = createNativeStackNavigator();
export const LoginNavigator = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"Login"}
                component={Login}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name={"Register"}
                component={Register}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name={"RecoverPassword"}
                component={RecoverPassword}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name={"RegisterCode"}
                component={RegisterCode}
                options={{headerShown:false}}
            />

        </Stack.Navigator>
    );
};
