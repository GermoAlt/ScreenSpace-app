import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ScreenHeader } from "../../components/owner/ScreenHeader";
import { UserLanding } from "./UserLanding";
import { MovieDetail } from "./MovieDetail";
import { Filters } from "./Filters";
import { MovieSelection } from "./MovieSelection";
import { MovieReservation } from "./MovieReservation";
import { SeatsSelection } from "./SeatsSelection";
import { ConfirmSelection } from "./ConfirmSelection";
import {MovieReviews} from "./MovieReviews";

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
            <Stack.Screen name={"MovieReviews"}
                          component={MovieReviews}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"Filters"}
                          component={Filters}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"MovieSelection"}
                          component={MovieSelection}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"MovieReservation"}
                          component={MovieReservation}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"SeatsSelection"}
                          component={SeatsSelection}
                          options={{headerShown: false}}
            />
            <Stack.Screen name={"ConfirmSelection"}
                          component={ConfirmSelection}
                          options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
