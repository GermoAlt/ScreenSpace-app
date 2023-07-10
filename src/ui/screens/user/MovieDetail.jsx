import * as React from 'react';
import {SafeAreaView, StyleSheet, View } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { Text } from '../../components/general/Text';
import {Button} from "../../components/general/Button";
import { MovieDetailComponent } from '../../components/user/MovieDetailComponent';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import { MovieActionItensComponent } from '../../components/user/MovieActionItensComponent';


export const MovieDetail = ({route, navigation}) => {
    const {t} = useTranslation();
    const { movieData } = route.params
    const { movie } = movieData.cinema

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    const handleReserveMovie = () => {
        navigation.navigate('MovieSelection', {movieData: movie})
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <MovieDetailComponent movie={movie} />
            <View >
                <Button type={"cta"} onPress={()=>handleReserveMovie()}>
                    {t("translation\:user\.captions\.movieDetails\.reserve")}
                </Button>
            </View>
            <MovieActionItensComponent movie={movie} />

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
        minHeight: "80%",
        justifyContent:"space-between",
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
