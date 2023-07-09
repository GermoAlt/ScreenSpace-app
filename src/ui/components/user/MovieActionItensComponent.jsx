import * as React from 'react';
import {StyleSheet, View, Share, Pressable} from "react-native";

import {useTranslation} from "react-i18next";
import { ActionItemComponent } from '../general/ActionItemComponent';

export const MovieActionItensComponent = (props) => {
    const {t} = useTranslation();
    const movie  = props.movie

    //Para Calificar: star-box-outline ?? comment-edit-outline
    const onShare = async () => {
        const bodyMessage = `${t("translation\:user\.labels\.movieSelected\.movie")}: ${movie.title}\n` +  `${t("translation\:user\.labels\.movieSelected\.genre")}: ${movie.genre.join(',')}\n` + `${t("translation\:user\.labels\.movieSelected\.rating")}: ${movie.rating}/5`
        try {
          //const result = await Share.share(
            await Share.share(  
            { message: bodyMessage,
              title: 'Mirá la película que podemos ir a ver!' },
            { dialogTitle: 'ScreenSpace Share'});
          
            /* POR AHORA NO NOS IMPORTA EL RESULTADO DEL SHARE
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
          */
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <View style={styles.container}>
            <ActionItemComponent icon="comment-multiple-outline" label={t("translation\:user\.labels\.movieActionItems\.comments")} />
            <ActionItemComponent icon="comment-edit-outline" label={t("translation\:user\.labels\.movieActionItems\.rate")} />
            <Pressable onPress={() => onShare()}>
                <ActionItemComponent icon="share-variant-outline" label={t("translation\:user\.labels\.movieActionItems\.share")} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 5,
        marginBottom: 5,
    },
})