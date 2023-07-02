import * as React from 'react';
import {StyleSheet, View, FlatList} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text } from '../general/Text';
import { MovieCoverList } from '../general/MovieCoverList'; 

export const CinemaOffersComponent = (props) => {
    
    const { id, name, distance, movies } = props.cinemas
    const navigation = props.navigation


    const selectMovie = (movie) => {

        const optionSelected = {
            cinema: {
                id,
                name, 
                distance,
                movie: movie
            }
        }
        navigation.navigate('MovieDetail', { movieData: optionSelected })
    }

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
            <MovieCoverList movies={movies} selectMovie={selectMovie} />
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