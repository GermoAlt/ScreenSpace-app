import {Drawer, Text} from "react-native-paper";
import {useState} from "react";

export const OptionPanel = (props) => {
    const [active, setActive] = useState('');

    const handleScreenChange = (screen) => {
        setActive(screen)
        props.navigateTo(screen)
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
                onPress={() => handleScreenChange('changePwd')}
            />
            <Drawer.Item
                label="Cerrar sesión"
                onPress={() => props.openLogOutDialog()}
            />
        </Drawer.Section>
    );
};
