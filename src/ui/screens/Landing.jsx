/* eslint-disable prettier/prettier */
import * as React from "react";
import {SafeAreaView} from 'react-native';
import {Button} from '../components/general/Button';
import {useTranslation} from 'react-i18next';
import {useEffect, useState} from 'react';
import useAuth from '../../hooks/useAuth';
import useEncryptedStorage from '../../hooks/useEncryptedStorage';
import {CommonActions, useFocusEffect} from "@react-navigation/native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export const Landing = ({navigation}) => {
    const {t} = useTranslation();
    const {auth, setAuth} = useAuth()
    const {retrieveUserSession, clearStorage, storeUserSession} = useEncryptedStorage()



    const usarAutenticacion = false  // MANDALE FALSE PARA QUE MUESTRE LA LANDING
    // SI LE MANDASTE FALSE, ESTE CODIGO DE ABAJO TIENE QUE ESTAR PARA QUE USE UN TOKEN
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NDkwZWI5MDA2NmM0NDVjNjNkM2Q1M2Usbmljb2xhcy5tYXJ0aW4uY2Fub0BnbWFpbC5jb20sZmFsc2UiLCJJU19PV05FUl9DTEFJTSI6ZmFsc2UsIkVNQUlMX0NMQUlNIjoibmljb2xhcy5tYXJ0aW4uY2Fub0BnbWFpbC5jb20iLCJleHAiOjE2ODkwOTcxMTl9.J-e0qko36ZTQnD4xzZJCjKj9yaD0cXOkhPLiR2sMjyS0aIQzzUQN8LuLrs0xeYsHHImdWQqt12G1UYybm3ir1A'
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

    const [user, setUser] = React.useState({})
    
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: '133745401400-p070phcl0q8hglb64uakqn82t6i1cog8.apps.googleusercontent.com',
            //webClientId: '133745401400-enfomql1df2e3qn102k1sgam1ug206rh.apps.googleusercontent.com',
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        })
        isSignedIn()
    }, [])

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            console.log('due___', userInfo)
            setUser(userInfo)
        } catch (error) {
            console.log('Message___', error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED){
                console.log('User Cancellede the Login Flow')
            }else if (error.code === statusCodes.IN_PROGRESS){
                console.log('Signin In')
            }else if (error.code = statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                console.log('Play Services Not Available')
            }else {
                console.log('Some other Error Happened')
            }
        }
    }

    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn()
        if (!!isSignedIn){
            getCurrentUserInfo()
        }else{
            console.log('Plase Login')
        }
    }

    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently()
            console.log('edit___', userInfo)
            setUser(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED){
                alert('User has not signed in yet')
                console.log('User has not signed in yet')
            }else{
                alert('Something went wrong')
                console.log('Something went wrong')
            }
        }
    }

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()
            setUser({})
        } catch (error) {
            console.error(error)
        }
    }

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
            <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            //disabled={this.state.isSigninInProgress}
            />
            
        </SafeAreaView>
    );
}
