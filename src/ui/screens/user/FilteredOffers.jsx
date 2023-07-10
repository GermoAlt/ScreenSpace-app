import * as React from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Pressable} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { CinemaOffersComponent } from '../../components/user/CinemaOffersComponent';
import { Text } from '../../components/general/Text';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const FilteredOffers = ({route, navigation}) => {
    const {t} = useTranslation();

    const filtered = route.params.filteredData
    console.log('filtered', filtered)

    const [movieOffer, setMovieOffer] = React.useState(filtered ? filtered : [])
/*
    React.useEffect(()=>{
        if (movieOffer === []){
            setMovieOffer(route.params.filteredData)
        }
    }, [])
*/
    

    const [location, setLocation] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    //const [movieOffer, setMovieOffer] = React.useState(mock_data)
    //

    const showFilters = () => {
        navigation.navigate('Filters')
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <View style={styles.dualRow}>
                <Text alignment="left" marginTop={35} size="medium">
                    {t("translation\:user\.labels\.landing\.your_results")}
                </Text>
                <View style={styles.dualRow} marginTop={45}>
                    <Pressable onPress={()=> showFilters()}>
                        <Icon name="filter" style={styles.icon} />
                        <Text alignment="right" size="xxxsmall">
                            {t("translation\:user\.labels\.landing\.filters")}
                        </Text>
                    </Pressable>
                </View>
            </View>
            {movieOffer.length > 0 ?
                <ScrollView>
                    {movieOffer.map((item) =>
                         <CinemaOffersComponent key={item.id} cinemas={item} navigation={navigation}/>
                    )}
                </ScrollView>
                :
                <View>
                    <Text >{t("translation\:user\.labels\.landing\.no_results")}</Text>
                </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15,
        marginBottom: 10,
        flex:1
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    scrollView: {
        marginHorizontal: 20,
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15,
    },
    icon: {
        fontSize:15,
        color:COLORS.off_white,
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
