import * as React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {COLORS} from "../../styles/Colors";
import { Text } from '../general/Text';
import { Text as TextRNP } from 'react-native-paper';

export const MovieDetailComponent = (props) => {
    
    const movie  = props.movie
    const movieDuration = movie.duration + ' minutos'

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: movie.image}}/>        
            <View>
                <TextRNP marginTop={5} variant='titleMedium' style={styles.movieGenre}>
                    {movie.genre}
                </TextRNP>
            </View>
            <View style={styles.dualRow}>
                <TextRNP variant='headlineMedium' style={styles.movieName}>
                    {movie.name}
                </TextRNP>
                <View style={styles.dualRow} marginTop={8}>
                    <Text alignment="right" size="xsmall">
                        {movie.rating}
                    </Text>
                    <Text alignment="left" marginTop={6} size="xxxsmall">/5</Text>
                </View>
            </View>
            <TextRNP variant='labelLarge' style={styles.movieDuration}>
                {movieDuration}
            </TextRNP>
            <TextRNP variant='labelLarge' style={styles.movieSynopsis}>
                {movie.synopsis}
            </TextRNP>
        </View>
    );
}

// 

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 5,
        marginBottom: 5,
    },
    image: {
        borderRadius:8,
        height: 210,
        resizeMode: "cover",
        marginTop: 10,
    },
    movieGenre: {
        color: COLORS.primary,
    },
    movieName: {
        color: COLORS.off_white,
        textTransform: 'uppercase'
    },
    movieDuration: {
        color: COLORS.off_grey,
        paddingHorizontal: 5,
        width: 90,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: COLORS.off_grey,
    },
    movieSynopsis: {
        color: COLORS.off_white,
        marginTop: 10
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
 
})