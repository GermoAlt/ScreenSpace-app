/* eslint-disable prettier/prettier */
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Login"
import Register from "./Register";
import RecoverPassword from "./RecoverPassword"
import RegisterCode from "./RegisterCode"
import ChangePassword from "./ChangePassword"
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
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {backgroundColor: COLORS.background}
                }}
            />
            <Stack.Screen
                name={"RecoverPassword"}
                component={RecoverPassword}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {backgroundColor: COLORS.background}
                }}
            />
            <Stack.Screen
                name={"RegisterCode"}
                component={RegisterCode}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {backgroundColor: COLORS.background}
                }}
            />
            <Stack.Screen
                name={"ChangePassword"}
                component={ChangePassword}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {backgroundColor: COLORS.background}
                }}
            />
        </Stack.Navigator>
    );
};
