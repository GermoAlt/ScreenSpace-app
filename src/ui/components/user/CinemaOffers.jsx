import * as React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { Base64Image } from '../general/Base64Image';
import { Text } from '../../components/general/Text';
import { MovieCoverList } from '../general/MovieCoverList'; 

export const CinemaOffers = (props) => {
    const {t} = useTranslation();
    
    const { name, distance, movies } = props.cinemas

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    return (
        <View>
            <View style={styles.dualRow}>
                <Text alignment="left" marginTop={35} size="medium">
                    {name}
                </Text>
                <Text alignment="right" marginTop={35} size="xxxsmall">
                    {distance}
                </Text>
            </View>
            <MovieCoverList movies={movies} />
        </View>
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
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
    movieImages: {
        display: "flex",
        flexDirection: "row",
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