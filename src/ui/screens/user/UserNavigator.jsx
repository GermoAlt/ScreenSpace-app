import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ScreenHeader } from "../../components/owner/ScreenHeader";
import { UserLanding } from "./UserLanding";
import { MovieDetail } from "./MovieDetail";
import { Filters } from "./Filters";

const Stack = createNativeStackNavigator();
export const UserNavigator = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen name={"UserLanding"}
                          component={UserLanding}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"MovieDetail"}
                          component={MovieDetail}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"Filters"}
                          component={Filters}
                          options={{headerShown: false}}
            />
        </Stack.Navigator>    
    );
};
