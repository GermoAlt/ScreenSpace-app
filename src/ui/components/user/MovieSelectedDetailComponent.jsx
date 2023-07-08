import * as React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import { Text as TextRNP } from 'react-native-paper';
import { LabelValueComponent } from '../general/LabelValueComponent';


export const MovieSelectedDetailComponent = (props) => {
    
    const movie  = props.movie
    const {t} = useTranslation()
    
    const movieDuration = movie.duration + ' minutos'

    return (
        <View style={styles.container}>
            <View style={styles.dualRow} >
                <View>
                    <Image style={styles.image} source={{uri: movie.image}}/>
                    <TextRNP variant='labelLarge' style={styles.movieRated}>
                        +13 (con reservas)
                    </TextRNP>
                </View>
                <View>
                    <TextRNP variant='titleLarge' style={styles.movieName}>
                        {movie.title}
                    </TextRNP>
                    <TextRNP variant='titleMedium' style={styles.movieSynopsis}>
                        {movie.synopsis}
                    </TextRNP>
                </View>        
            </View>
            <View>
                
                <LabelValueComponent label={t('translation:user.labels.movieSelected.genre')} value={movie.genre.join(" ")} />
                <LabelValueComponent label={t('translation:user.labels.movieSelected.duration')} value={movieDuration} />
                <LabelValueComponent label={t('translation:user.labels.movieSelected.actors')} value={movie.actors.join(", ")} />
                <LabelValueComponent label={t('translation:user.labels.movieSelected.director')} value={movie.director} />
                </View>            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginHorizontal: 5,
        gap: 5,
        marginBottom: 5,
    },
    image: {
        width: 140,
        height: 210,
        resizeMode: "contain",
    },
    movieGenre: {
        color: COLORS.primary,
    },
    movieName: {
        marginTop: 8,
        color: COLORS.off_white,
        fontWeight: "700",
        textTransform: 'uppercase'
    },
    movieRated: {
        color: COLORS.off_grey,
        paddingHorizontal: 8,
        width: 140,
        paddingVertical: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: COLORS.off_grey,
        marginTop: 8,
        marginBottom: 20
    },
    movieSynopsis: {
        color: COLORS.off_white,
        marginTop: 10,
        width: 200,
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
 
})