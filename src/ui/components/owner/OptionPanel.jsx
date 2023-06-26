import {Drawer, Text} from "react-native-paper";
import {useState} from "react";
import { logoutOwnerUser } from '../../../networking/api/AuthController'
import useEncryptedStorage from "../../../hooks/useEncryptedStorage";
import {StackActions, useNavigation} from "@react-navigation/native";

export const OptionPanel = (props) => {
    const [active, setActive] = useState('');
    const { removeUserSession } = useEncryptedStorage()
    const navigation = useNavigation()

    const handleScreenChange = (screen) => {
        setActive(screen)
        props.navigateTo(screen)
    }

    const handleLogout = () => {
        logoutOwnerUser().then(r => {
            removeUserSession().then()
        })

        navigation.dispatch(StackActions.popToTop());

        //props.navigateTo('LoginNavigator', {name: 'Login'})

        //props.openLogOutDialog()
    }

    return (
        <Drawer.Section>
            <Text>testmail@testmail.com</Text>
            <Drawer.Item
                label="Ver mis cines"
                active={active === 'content'}
                onPress={() => handleScreenChange('content')}
            />
            <Drawer.Item
                label="Cambiar contraseña"
                active={active === 'second'}
                onPress={() =>  handleScreenChange('changePwd')}
            />
            <Drawer.Item
                label="Cerrar sesión"
                onPress={() => handleLogout()}
            />
        </Drawer.Section>
    );
};
