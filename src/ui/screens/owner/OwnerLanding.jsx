/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import {SafeAreaView, View, StyleSheet} from "react-native";
import {Avatar, Dialog, Portal, Text} from "react-native-paper";
import { useState} from "react";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionPanel} from "../../components/owner/OptionPanel";
import {OwnerChangePwd} from "./OwnerChangePwd";
import {Button} from "../../components/general/Button";


const Drawer = createDrawerNavigator();
export const OwnerLanding = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true)
    };
    const hideDialog = () => setVisible(false);

    const Content = ({navigation}) => {
        return (
            <SafeAreaView>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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
            drawerContent={(props) =>
                <OptionPanel {...props}
                    openLogOutDialog={()=>showDialog()}
                    navigateTo={(screen)=>navigation.navigate(screen)}
                />
            }
            screenOptions={{drawerPosition:"right"}}
        >
            <Drawer.Screen
                name={'content'}
                component={Content}
                options={{header:({navigation})=>header(navigation)}}
            />
            <Drawer.Screen
                name={'changePwd'}
                component={OwnerChangePwd}
                options={{header:({navigation})=>header(navigation)}}
            />
        </Drawer.Navigator>
    );
};

const header = (navigation) => {
    return (
        <View style={styles.header}>
            <HeaderLogo />
            <Avatar.Icon icon={"account-outline"} size={45} onTouchStart={()=> navigation.openDrawer()} />
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

