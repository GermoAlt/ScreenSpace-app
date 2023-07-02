import * as React from 'react';
import {StyleSheet, View, Image} from "react-native";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import { ActionItem } from '../general/ActionItem';

export const MovieActionItensComponent = (props) => {
    const {t} = useTranslation();
    const movie  = props.movie

    //Para Calificar: star-box-outline ?? comment-edit-outline

    return (
        <View style={styles.container}>
            <ActionItem icon="comment-multiple-outline" label={t("translation\:user\.labels\.movieActionItems\.comments")} />
            <ActionItem icon="comment-edit-outline" label={t("translation\:user\.labels\.movieActionItems\.rate")} />
            <ActionItem icon="share-variant-outline" label={t("translation\:user\.labels\.movieActionItems\.share")} />
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