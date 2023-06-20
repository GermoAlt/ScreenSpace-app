import {SafeAreaView, StyleSheet} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useEffect, useState} from "react";
import {Text} from "../../components/general/Text";
import {Title} from "react-native-paper";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import {CinemaInformationPanel} from "../../components/owner/CinemaDetails/CinemaInformationPanel";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {ScreeningList} from "../../components/owner/CinemaDetails/ScreeningList";
import {TheaterList} from "../../components/owner/CinemaDetails/TheaterList";

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
        <SafeAreaView>
            <CinemaInformationPanel cinemaData={data}/>
            <Tab.Navigator>
                <Tab.Screen
                    name={"CinemaDetailsScreenings"}
                    component={ScreeningList}
                />
                <Tab.Screen
                    name={"CinemaDetailsTheaters"}
                    component={TheaterList}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{

    }
})
