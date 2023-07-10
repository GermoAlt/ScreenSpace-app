import * as React from 'react';
import {StyleSheet, View, Share, Pressable} from "react-native";

import {useTranslation} from "react-i18next";
import { ActionItemComponent } from '../general/ActionItemComponent';
import {Dialog, Portal, TextInput} from "react-native-paper";
import {Text} from "../general/Text";
import {Button} from "../general/Button";
import {deleteTheater} from "../../../networking/api/TheaterController";
import {useState} from "react";
import {StarsRating} from "./StarsRating";
import {postReview} from "../../../networking/api/ReviewController";
import {useNavigation} from "@react-navigation/native";

export const MovieActionItensComponent = (props) => {
    const {t} = useTranslation();
    const movie  = props.movie
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [rating, setRating] = useState(0)
    const [ratingText, setRatingText] = useState("")
    const {navigate} = useNavigation()

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
            <Portal>
                <Dialog visible={visibleDialog}>
                    <Dialog.Title>
                        <Text style={styles.text}>
                            {t("translation\:user\.labels\.newReview\.title") + " " + movie.title}
                        </Text>
                    </Dialog.Title>
                    <Dialog.Content>
                        <View style={styles.reviewContainer}>
                            <TextInput multiline
                                       value={ratingText}
                                       onChangeText={(text) => {setRatingText(text)}}
                                       label={t("translation\:user\.labels\.newReview\.textField")}
                            />
                            <StarsRating rating={rating} setRating={(e)=>setRating(e)}></StarsRating>
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button type={"default"}
                                icon={"cancel"}
                                onPress={()=>setVisibleDialog(false)}>
                            {t("translation\:user\.labels\.newReview\.cancel")}
                        </Button>
                        <Button icon={"check-circle-outline"} onPress={()=> {
                            postReview(movie.id, {
                                rating:{rating:rating}, comment:{comment:ratingText}, movieId:movie.id
                            }).then((res) => {
                                setVisibleDialog(false)
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }}>{t("translation\:user\.labels\.newReview\.confirm")}</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
            <Pressable onPress={()=>navigate("MovieReviews", {movie:movie})}>
                <ActionItemComponent icon="comment-multiple-outline" label={t("translation\:user\.labels\.movieActionItems\.comments")} />
            </Pressable>
            <Pressable onPress={()=>setVisibleDialog(true)}>
                <ActionItemComponent icon="comment-edit-outline" label={t("translation\:user\.labels\.movieActionItems\.rate")} />
            </Pressable>
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
    reviewContainer:{
        display: "flex",
        flexDirection:"column",
        gap:20
    },
    text:{
        fontSize:18
    }
})
