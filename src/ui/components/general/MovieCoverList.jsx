import * as React from 'react';
import {StyleSheet, Image, View, FlatList, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { Base64Image } from '../general/Base64Image';
import { Text } from '../../components/general/Text';

export const MovieCoverList = (props) => {
    const {t} = useTranslation();
    const { movies } = props

    return (
        <FlatList
            data={movies}
            horizontal
            renderItem={
                ({item}) => <Image style={styles.image} source={{uri: item.image}}/> 
            }
            keyExtractor={item => item.id}
        />
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
    scrollView: {
        marginHorizontal: 20,
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
    },
    image: {
        borderRadius:8,
        width: 140,
        height: 210,
        resizeMode: "contain",
        marginTop: 20,
        marginRight: 10
    }
})