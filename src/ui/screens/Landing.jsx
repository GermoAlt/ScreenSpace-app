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
    const {retrieveUserSession, clearStorage, storeUserSession} = useEncryptedStorage()



    const usarAutenticacion = false  // MANDALE FALSE PARA QUE MUESTRE LA LANDING
    // SI LE MANDASTE FALSE, ESTE CODIGO DE ABAJO TIENE QUE ESTAR PARA QUE USE UN TOKEN
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NDkwZWI5MDA2NmM0NDVjNjNkM2Q1M2Usbmljb2xhcy5tYXJ0aW4uY2Fub0BnbWFpbC5jb20sZmFsc2UiLCJJU19PV05FUl9DTEFJTSI6ZmFsc2UsIkVNQUlMX0NMQUlNIjoibmljb2xhcy5tYXJ0aW4uY2Fub0BnbWFpbC5jb20iLCJleHAiOjE2ODkwMTk1OTJ9.H1ovxpLxoSodJkpCDq3NiH7R2yTyrJQg22skPytJjWyoV_O0hHDGD8V0Z231HYB6vOP7MskqvmdwKAniTsrcgA'
    const setDummyCredentials = async () => {
        const data = { userName: 'nicolas.martin.cano@gmail.com', userPassword: 'prueba', accessToken: token }
        setAuth(data)
        await storeUserSession(data)
    }
    //HASTA ACA

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
                    if(res) {
                        navigation.navigate('OwnerNavigator')
                        setAuth(JSON.parse(res))
                    } else {
                        navigation.navigate('LoginNavigator')
                    }
                }
            )
        }else{
            setDummyCredentials()
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
