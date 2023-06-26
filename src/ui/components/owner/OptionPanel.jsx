import {Drawer, Text} from "react-native-paper";
import {useState} from "react";
import { logoutOwnerUser } from '../../../networking/api/AuthController'
import useEncryptedStorage from "../../../hooks/useEncryptedStorage";

export const OptionPanel = (props) => {
    const [active, setActive] = useState('');
    const { removeUserSession } = useEncryptedStorage()

    const handleScreenChange = (screen) => {
        setActive(screen)
        props.navigateTo(screen)
    }

    const handleLogout = () => {
        logoutOwnerUser()
        removeUserSession()
        props.navigateTo('LoginNavigator', {name: 'Login'})
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
