import * as React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import { ActionItemComponent } from '../general/ActionItemComponent';

export const MovieActionItensComponent = (props) => {
    const {t} = useTranslation();
    const movie  = props.movie

    //Para Calificar: star-box-outline ?? comment-edit-outline

    return (
        <View style={styles.container}>
            <ActionItemComponent icon="comment-multiple-outline" label={t("translation\:user\.labels\.movieActionItems\.comments")} />
            <ActionItemComponent icon="comment-edit-outline" label={t("translation\:user\.labels\.movieActionItems\.rate")} />
            <ActionItemComponent icon="share-variant-outline" label={t("translation\:user\.labels\.movieActionItems\.share")} />
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