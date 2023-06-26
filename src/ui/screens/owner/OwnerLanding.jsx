/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaView, View, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {Avatar, Dialog, Portal, Text} from "react-native-paper";
import {useEffect, useState} from "react";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {OptionPanel} from "../../components/owner/OptionPanel";
import {ChangePwd} from "./ChangePwd";
import {Button} from "../../components/general/Button";
import {CinemaList} from "../../components/owner/CinemaList";
import {CinemaDetails} from "./CinemaDetails";
import { getCinemas } from "../../../networking/api/CinemaController";


const Drawer = createDrawerNavigator();
export const OwnerLanding = ({navigation}) => {
    const {t} = useTranslation();

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false);
    const [cinemaList, setCinemaList] = useState([])
    /*
    const [cinemaList, setCinemaList] = useState([
        {
            "id":"123",
            "name":"test",
            "address":{},
            "geoLocation": {},
            "owner": {},
            "pricePerFunction":1234.99,
            "screeningsByDay":{}
        },
        {
            "id":"124",
            "name":"test",
            "address":{},
            "geoLocation": {},
            "owner": {},
            "pricePerFunction":1234.99,
            "screeningsByDay":{}
        },
        {
            "id":"13",
            "name":"test",
            "address":{},
            "geoLocation": {},
            "owner": {},
            "pricePerFunction":1234.99,
            "screeningsByDay":{}
        },
    ])
*/
    const getCinemasList = async () => {
        setIsLoading(true)
        try {
            const response = await getCinemas()
            console.log('response', JSON.stringify(response.data))
            if (response.status === 200){
                setCinemaList(response.data)
            }else{
                setErrMsg(t('translation:general.errors.default'));
            }        
            
        } catch (error) {
            console.log('error', JSON.stringify(error))
            switch (error.response.data.status){
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
        }    
        setIsLoading(false)
    }
    
    useEffect(() => {
        getCinemasList()
    }, [])

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
                    <CinemaList navigateTo={(screen, options)=>navigation.getParent().navigate(screen, options)}
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
                component={ChangePwd}
                options={{header:({navigation})=>header(navigation)}}
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

