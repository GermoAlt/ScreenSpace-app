import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {OwnerLanding} from "./OwnerLanding";

const Stack = createNativeStackNavigator();
export const OwnerNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={"OwnerLanding"}
                component={OwnerLanding}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    );
};
