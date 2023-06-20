import {Dimensions, SafeAreaView, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import {CinemaInformationPanel} from "../../components/owner/CinemaDetails/CinemaInformationPanel";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ScreeningList} from "../../components/owner/CinemaDetails/ScreeningList";
import {TheaterList} from "../../components/owner/CinemaDetails/TheaterList";
import {TabBar} from "react-native-tab-view";

const Tab = createMaterialTopTabNavigator()

export const CinemaDetails = ({route, navigation}) => {
    const {data} = route.params
    const {t} = useTranslation()

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:()=><ScreenHeader text={t('translation\:owner\.titles\.cinemaDetails')}/>,
            headerStyle: {backgroundColor: COLORS.background}
        })
        console.log(data)
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <CinemaInformationPanel cinemaData={data}/>
            <Tab.Navigator
                initialLayout={{
                    width: Dimensions.get('window').width
                }}
                initialRouteName={"CinemaDetailsScreenings"}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: COLORS.off_white,
                    tabBarStyle: { backgroundColor: COLORS.background },
                }}
            >
                <Tab.Screen
                    name={t("translation\:owner\.labels\.cinemaDetails\.tabs\.screenings")}
                    component={ScreeningList}
                />
                <Tab.Screen
                    name={t("translation\:owner\.labels\.cinemaDetails\.tabs\.theaters")}
                    component={TheaterList}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        flex:1
    }
})
