/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Avatar, Dialog, Portal, Text} from "react-native-paper";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionPanel} from "../../components/owner/OptionPanel";
import {ChangePwd} from "./ChangePwd";
import {Button} from "../../components/general/Button";
import {CinemaList} from "../../components/owner/CinemaList";
import {CinemaDetails} from "./CinemaDetails";
import {getCinemas} from "../../../networking/api/CinemaController";
import {CommonActions, StackActions, useFocusEffect} from "@react-navigation/native";
import useEncryptedStorage from "../../../hooks/useEncryptedStorage";
import {logoutOwnerUser} from "../../../networking/api/AuthController";
import {COLORS} from "../../styles/Colors";


const Drawer = createDrawerNavigator();
export const OwnerLanding = ({navigation}) => {
    const {t} = useTranslation();

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [cinemaList, setCinemaList] = useState([])
    const { clearStorage } = useEncryptedStorage()
    const getCinemasList =  () => {
        setIsLoading(true)
        getCinemas().then((response)=>{
            setCinemaList(response.data)
            setIsLoading(false)
        }).catch((error) =>{
            switch (error.status) {
                case 400:
                case 401:
                    setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
                    break;
                case 500:
                    setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                    break;
                default:
                    setErrMsg(t('translation:general.errors.default'));
                    break;
            }
        })
        setIsLoading(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            getCinemasList()
        }, [navigation.getParent().getParent()])
    );

    const showDialog = () => {
        setVisible(true)
    };
    const hideDialog = () => setVisible(false);

    const handleLogout = async () => {

        try {
            const res = await logoutOwnerUser()
            await clearStorage()
            if (res.status === 200){
                navigation.push("LoginNavigator")
            }else{
                setErrMsg(t('translation:general.errors.default'));
            }

        } catch (error) {
            console.log('error', JSON.stringify(error))
            switch (error.response.data.status){
                case 400:
                case 401:
                case 500:
                    setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                break;
                default:
                    setErrMsg(t('translation:general.errors.default'));
                break;
            }
        }
        hideDialog()
    }

    const Content = ({navigation}) => {
        return (
            <SafeAreaView>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>{t("translation\:login\.labels\.logout\.titleText")}</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">{t("translation\:login\.labels\.logout\.dialogText")}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button type={"default"} onPress={()=>handleLogout()}>{t("translation\:general\.labels\.confirm")}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                {isLoading ?
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>{t("translation\:general\.labels\.loading")}...</Text>
                    </View>
                    :
                    <CinemaList navigateTo={(screen, options) => {
                        navigation.getParent().navigate(screen, options)
                    }}
                                data={cinemaList}/>
                }
            </SafeAreaView>
        )
    }

    return (
        <Drawer.Navigator
            initialRouteName={'content'}
            drawerContent={(props) =>
                <OptionPanel {...props}
                             openLogOutDialog={() => showDialog()}
                             navigateTo={(screen) => {
                                 navigation.navigate(screen)
                             }}
                             toTop={()=>navigation.getParent().popToTop()}
                />
            }
            screenOptions={{
                drawerPosition: "right",
                drawerStyle: {
                    backgroundColor: COLORS.background
                },
        }}
        >
            <Drawer.Screen
                name={'content'}
                component={Content}
                options={{header: ({navigation}) => header(navigation)}}
            />
            <Drawer.Screen
                name={'changePwd'}
                component={ChangePwd}
                options={{header: ({navigation}) => header(navigation)}}
            />
            <Drawer.Screen
                name={'CinemaDetails'}
                component={CinemaDetails}
            />
        </Drawer.Navigator>
    );
};

const header = (navigation) => {
    return (
        <View style={styles.header}>
            <HeaderLogo/>
            <Avatar.Icon icon={"account-outline"} size={45} onTouchStart={() => navigation.openDrawer()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    loadingContainer:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        minHeight:350
    },
    loadingText:{
        color:COLORS.secondary,
        fontSize:24,
    }
})

