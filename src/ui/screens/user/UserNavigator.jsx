import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ScreenHeader } from "../../components/owner/ScreenHeader";
import { UserLanding } from "./UserLanding";

const Stack = createNativeStackNavigator();
export const UserNavigator = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen name={"UserLanding"}
                          component={UserLanding}
                          options={{headerShown: false}}
            />
        </Stack.Navigator>    
    );
};
