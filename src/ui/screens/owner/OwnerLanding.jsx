import {SafeAreaView, View, StyleSheet} from "react-native";
import {Avatar, Text} from "react-native-paper";
import { useState} from "react";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionPanel} from "../../components/owner/OptionPanel";


const Drawer = createDrawerNavigator();
export const OwnerLanding = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)


    const Content = ({navigation}) => {
        return (
            <SafeAreaView>
                {isLoading ?
                    <Text>cargando</Text>
                    :
                    <Text>cargo</Text>}
            </SafeAreaView>
        )
    }

    return (
        <Drawer.Navigator
            initialRouteName={'content'}
            drawerContent={(props) => <OptionPanel {...props}/>}
            screenOptions={{drawerPosition:"right"}}
        >
            <Drawer.Screen
                name={'content'}
                component={Content}
                options={{header:({navigation})=>header(navigation)}}
            />
        </Drawer.Navigator>
    );
};

const header = (navigation) => {
    return (
        <View style={styles.header}>
            <HeaderLogo />
            <Avatar.Text size={40} label={"SS"} onTouchStart={()=> navigation.openDrawer()}></Avatar.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        padding:5
    }
})

