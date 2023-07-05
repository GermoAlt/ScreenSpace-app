import * as React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList, ScrollView, Pressable} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { CinemaOffersComponent } from '../../components/user/CinemaOffersComponent';
import { Text } from '../../components/general/Text';
import { mock_data } from '../../../assets/data/user_lading';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const UserLanding = ({navigation}) => {
    const {t} = useTranslation();

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    
    const [movieOffer, setMovieOffer] = React.useState(mock_data)

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
                    {t("translation\:user\.labels\.landing\.nearBy")}
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
            <FlatList
                data={movieOffer}
                renderItem={
                    ({item}) => <CinemaOffersComponent cinemas={item} navigation={navigation} />
                }
                keyExtractor={item => item.id}
            />
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
        minHeight: "80%"
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