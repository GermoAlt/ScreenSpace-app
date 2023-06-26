/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import {Button} from '../components/general/Button';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import useEncryptedStorage from '../../hooks/useEncryptedStorage';
import {CommonActions, useFocusEffect} from "@react-navigation/native";
import * as React from "react";

export const Landing = ({navigation}) => {
    const {t} = useTranslation();
    const {auth, setAuth} = useAuth()
    const {retrieveUserSession, clearStorage} = useEncryptedStorage()


    const usarAutenticacion = true  // MANDALE FALSE PARA QUE MUESTRE LA LANDING

    // useFocusEffect(
    //     React.useCallback(()=>{
    //         navigation.dispatch(
    //             CommonActions.reset({
    //                 index: 0,
    //                 routes: [
    //                     { name: 'Landing' },
    //                 ],
    //             })
    //         );
    //     },[])
    // )

    useEffect(() => {
        if (usarAutenticacion) {
            //clearStorage()
            retrieveUserSession().then(
                (res) => {
                    console.log('res', res)
                    if(res) {
                        navigation.navigate('OwnerNavigator')
                        setAuth(JSON.parse(res))
                    } else {
                        navigation.navigate('LoginNavigator')
                    }
                }
            )
        }
    }, [])

    useEffect(()=>{
        navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault()
        })
    }, [navigation])


    return (
        <SafeAreaView>
            <Button
                icon="movie-roll"
                mode="contained"
                marginLeft={100}
                marginRight={100}
                onPress={() => navigation.navigate('LoginNavigator')}>
                Login Navigator
            </Button>
            <Button
                icon="movie-roll"
                mode="contained"
                marginLeft={100}
                marginRight={100}
                onPress={() => navigation.navigate('OwnerNavigator')}>
                {t('translation:landing.ownerNavigateButton')}
            </Button>
            <Button
                icon="account-circle"
                mode="contained"
                marginLeft={100}
                marginRight={100}
                onPress={() => navigation.navigate('UserNavigator')}>
                {t('translation:landing.userNavigateButton')}
            </Button>
        </SafeAreaView>
    );
}
