import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {OwnerLanding} from "./OwnerLanding";
import {NewCinema} from "./NewCinema";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";

const Stack = createNativeStackNavigator();
export const OwnerNavigator = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"OwnerLanding"}
                component={OwnerLanding}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name={"newCinema"}
                component={NewCinema}
                options={{
                    headerShown:true,
                    headerTitle:()=><ScreenHeader text={t("translation\:owner\.titles\.newCinema")}/>,
                    headerStyle: {backgroundColor:COLORS.background}
            }}
            />
        </Stack.Navigator>
    );
};
