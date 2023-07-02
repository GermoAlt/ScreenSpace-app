import * as React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { CinemaOffers } from '../../components/user/CinemaOffers';
import { Text } from '../../components/general/Text';
import { mock_data } from '../../../assets/data/user_lading';
import { HeaderLogo } from '../../components/general/HeaderLogo';


export const UserLanding = ({navigation}) => {
    const {t} = useTranslation();

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)
    
    const [movieOffer, setMovieOffer] = React.useState(mock_data)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <View style={styles.dualRow}>
                <Text alignment="left" marginTop={35} size="medium">
                    CERCA TUYO
                </Text>
                <Text alignment="right" marginTop={35} size="xxxsmall">
                    Filtros
                </Text>
            </View>
            <FlatList
                data={movieOffer}
                renderItem={
                    ({item}) => <CinemaOffers cinemas={item} />
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
        gap: 15
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