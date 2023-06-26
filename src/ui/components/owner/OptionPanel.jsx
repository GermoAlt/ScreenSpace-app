import {Drawer, Text} from "react-native-paper";
import {useState} from "react";
import { logoutOwnerUser } from '../../../networking/api/AuthController'
import useEncryptedStorage from "../../../hooks/useEncryptedStorage";
import {DrawerActions, StackActions, useNavigation} from "@react-navigation/native";
import useAuth from "../../../hooks/useAuth";
import {StyleSheet, View} from "react-native";
import {COLORS} from "../../styles/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const OptionPanel = (props) => {
    const [active, setActive] = useState('');
    const {auth, setAuth} = useAuth()
    const navigation = useNavigation()

    const handleScreenChange = (screen) => {
        setActive(screen)
        props.navigateTo(screen)
    }

    const handleLogout = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        props.openLogOutDialog()

    }

    return (
        <Drawer.Section>
            <View style={styles.usernameContainer}>
                <Icon name={"account-circle"} style={styles.icon}></Icon>
                <Text style={styles.username}>{auth.userName}</Text>
            </View>

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

const styles = StyleSheet.create({
    usernameContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginVertical:40,
        gap:15
    },
    username:{
        fontSize:15,
        color:COLORS.primary,
        fontWeight:"bold"
    },
    icon:{
        fontSize:75,
        color:COLORS.primary
    }
})
