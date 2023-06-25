import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {OwnerLanding} from "./OwnerLanding";
import {NewCinema} from "./NewCinema";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import {CinemaDetails} from "./CinemaDetails";
import {NewScreening} from "./NewScreening";
import {NewTheater} from "./NewTheater";

const Stack = createNativeStackNavigator();
export const OwnerNavigator = () => {
    const {t} = useTranslation()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"OwnerLanding"}
                component={OwnerLanding}
                options={{headerShown: false}}
            />
            <Stack.Screen name={"NewCinema"}
                          component={NewCinema}
                          options={{
                              headerShown: true,
                              headerTitle: () => <ScreenHeader text={t("translation\:owner\.titles\.newCinema")}/>,
                              headerStyle: {backgroundColor: COLORS.background}
                          }}/>
            <Stack.Screen name={"CinemaDetails"}
                          component={CinemaDetails}
                          options={{
                              headerShown: true,
                              headerTitle: () => <ScreenHeader text={t("translation\:owner\.titles\.cinemaDetails")}/>,
                              headerStyle: {backgroundColor: COLORS.background}
                          }}
            />
            <Stack.Screen name={"NewScreening"}
                          component={NewScreening}
                          options={{
                              headerShown: true,
                              headerTitle: () => <ScreenHeader text={t("translation\:owner\.titles\.newScreening")}/>,
                              headerStyle: {backgroundColor: COLORS.background}
                          }}
            />
            <Stack.Screen name={"NewTheater"}
                          component={NewTheater}
                          options={{
                              headerShown: true,
                              headerTitle: () => <ScreenHeader text={t("translation\:owner\.titles\.newTheater")}/>,
                              headerStyle: {backgroundColor: COLORS.background}
                          }}
            />
        </Stack.Navigator>
    );
};
