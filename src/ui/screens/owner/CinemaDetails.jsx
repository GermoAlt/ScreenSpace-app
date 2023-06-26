import * as React from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import {CinemaInformationPanel} from "../../components/owner/CinemaDetails/CinemaInformationPanel";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ScreeningList} from "../../components/owner/CinemaDetails/ScreeningList";
import {TheaterList} from "../../components/owner/CinemaDetails/TheaterList";
import FAB from "../../components/general/FAB";
import { getTheatersByCinema } from "../../../networking/api/TheaterController";
//import { getScreenings } from '../../../networking/api/ScreeningController';

const Tab = createMaterialTopTabNavigator()

export const CinemaDetails = ({route, navigation}) => {
    const {data} = route.params
    const idCinema = data.id
    const {t} = useTranslation()
    const [screen, setScreen] = useState(t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings"))
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [theaters, setTheaters] = useState([]);
    const [screenings, setScreenings] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:()=><ScreenHeader text={t('translation\:owner\.titles\.cinemaDetails')}/>,
            headerStyle: {backgroundColor: COLORS.background}
        })
    }, [])

    const getTheaters = async () => {
        setIsLoading(true)
        try {
            const response = await getTheatersByCinema(idCinema)
            if (response.status === 200){
                setTheaters(response.data)
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

    const getScreenings = async () => {
        setIsLoading(true)
        try {
            const response = await getScreenings(data.id)
            console.log('response', JSON.stringify(response.data))
            if (response.status === 200){
                setScreenings(response.data)
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
        getTheaters()
        //setScreenings([])
        //getScreenings()
    }, [])

     const getRouteName = () =>{
            if(screen === t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings")) {
                return "NewScreening"
            }
            return "NewTheater"
     }

    return (
        <SafeAreaView style={styles.container}>
            <CinemaInformationPanel cinemaData={data}/>
            <Tab.Navigator
                initialRouteName={"CinemaDetailsScreenings"}
                screenOptions={{
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.off_white,
                    tabBarStyle: { backgroundColor: COLORS.background, borderBottomColor:COLORS.off_white, borderBottomWidth:1},
                    tabBarIndicatorContainerStyle:{marginBottom:-1.5},
                }}
                backBehavior={"none"}

            >
                <Tab.Screen
                    name={t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings")}>
                    {(props) => <ScreeningList {...props} setScreen={(e)=>setScreen(e)}/>}
                </Tab.Screen>
                <Tab.Screen
                    name={t("translation\:owner\.labels\.cinemaDetails\.tabs\.theaters")}>
                    {() => <TheaterList theaters={theaters} navigation={navigation} />}
                </Tab.Screen>
            </Tab.Navigator>
            <FAB action={()=>navigation.navigate(getRouteName(), {cinema:data})}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flex:1
    },
    tabBar:{},
    tabBarLabel:{}
})
