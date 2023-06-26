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

const Tab = createMaterialTopTabNavigator()

export const CinemaDetails = ({route, navigation}) => {
    const {data} = route.params
    const {t} = useTranslation()
    const [screen, setScreen] = useState(t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings"))

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:()=><ScreenHeader text={t('translation\:owner\.titles\.cinemaDetails')}/>,
            headerStyle: {backgroundColor: COLORS.background}
        })
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
                    {(props) => <TheaterList {...props}/>}
                </Tab.Screen>
            </Tab.Navigator>
            <FAB action={()=>navigation.navigate(getRouteName())}/>
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
