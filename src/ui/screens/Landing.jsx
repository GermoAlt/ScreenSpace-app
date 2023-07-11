/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useTranslation} from "react-i18next";
import { COLORS } from '../styles/Colors';
import {Button} from '../components/general/Button';
import useAuth from '../../hooks/useAuth';
import useEncryptedStorage from '../../hooks/useEncryptedStorage';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { loginClientUser } from "../../networking/api/AuthController";
import { HeaderLogo } from '../components/general/HeaderLogo';
import { ANDROID_CLIENT_ID } from '../../assets/config/config';

export const Landing = ({navigation}) => {
    const {t} = useTranslation();
    const {auth, setAuth, authClient, setAuthClient} = useAuth()
    const {retrieveUserSession, clearStorage, storeUserSession, storeGoogleUserSession, retrieveGoogleUserSession, removeGoogleUserSession} = useEncryptedStorage()
    const [isSigninInProgress, setIsSigninInProgress] = React.useState(false)
    const [user, setUser] = React.useState({})

    const { setGoogelUserData }= useGoogleAuth()

    React.useEffect(() => {
        
        retrieveUserSession().then(
            (res) => {
                if(res) {
                    navigation.navigate('OwnerNavigator')
                    setAuth(JSON.parse(res))
                }else{
                    GoogleSignin.configure({
                        androidClientId: ANDROID_CLIENT_ID,
                        forceCodeForRefreshToken: true,
                    })
                    isSignedIn()
                }
            }
        )
        
    }, [])

    React.useEffect(()=>{
        navigation.addListener('beforeRemove', (e)=>{
            e.preventDefault()
        })
    }, [navigation])

    

    const getClientToken = async (userData) => {
        //console.log('userData', userData)
        const body = {
            email: userData.user.email,
            id: userData.user.id
        }
        

        try {
            const response = await loginClientUser(body)
            const accessToken = response?.data.token
            const data = { userName: body.email, userPassword: '', accessToken }
            setAuthClient(data)
            await storeGoogleUserSession(data)
            console.log('accessToken', accessToken)
            navigation.navigate('UserNavigator', {name: 'UserLanding'})
        } catch (error) {
            console.log('error', JSON.stringify(error))
            switch (error.response.data.status) {
                case 400:
                case 401:
                    setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
                    break;
                case 500:
                    setErrMsg(t('translation:general.errors.default')); // Internal Server Error
                    break;
                default:
                    setErrMsg(t('translation:general.errors.default'));
                    break;
            }
        }

    }
    
    const signIn = async () => {
        setIsSigninInProgress(true)
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            //console.log('due___', userInfo)
            setUser(userInfo)
            setGoogelUserData(userInfo)
            getClientToken(userInfo)
            
        } catch (error) {
            //console.log('Message___', error.message)
            if (error.code === statusCodes.SIGN_IN_CANCELLED){
                //console.log('User Cancellede the Login Flow')
            }else if (error.code === statusCodes.IN_PROGRESS){
                //console.log('Signin In')
            }else if (error.code = statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
                console.log('Play Services Not Available')
            }else {
                //console.log('Some other Error Happened')
            }
        }
        setIsSigninInProgress(false)
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
            //console.log('edit___', userInfo)
            setUser(userInfo)
            setGoogelUserData(userInfo)
            getClientToken(userInfo)
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
            setGoogelUserData({})
            clearStorage()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <View style={styles.googleLoginBtn}>
                <GoogleSigninButton

                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
                disabled={isSigninInProgress}
                />
            </View>

            <View style={styles.ownerAccess} >
                <Button
                    icon="theater"
                    mode="default"

                    onPress={() => navigation.navigate('LoginNavigator')}>
                    {t('translation:landing.ownerNavigateButton')}
                </Button>
            </View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: 10,
        gap: 25,
        marginBottom: 10,
        minHeight: "80%"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    googleLoginBtn: {
        alignSelf:"center"
    },  
    ownerAccess: {
        alignSelf:"flex-end",
        marginRight: 40,
        marginTop: 150

    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15,
    },
    icon: {
        fontSize:15,
        color:COLORS.off_white,
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
    }
})

/*

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

*/