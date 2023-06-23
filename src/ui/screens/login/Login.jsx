/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import { TextInput } from '../../components/general/TextInput';
import {Text} from '../../components/general/Text';
import {Button} from '../../components/general/Button';
import {useTranslation} from 'react-i18next';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import { loginOwnerUser } from '../../../networking/api/AuthController';
import useAuth from '../../../hooks/useAuth';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';

export default function Login({navigation}) {
  const {t} = useTranslation();
  const { setAuth } = useAuth();
  const { storeUserSession } = useEncryptedStorage()

  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const loginUser = async () => {
    setLoading(true)
    body = {
        "email": userName,
        "password": userPassword
    }
    try {
        const response = await loginOwnerUser(body)
        console.log('response', response)
        const accessToken = response?.data.token
        const data = { userName, userPassword, accessToken }
        setAuth(data)
        storeUserSession(data)
        setUserName('')
        setUserPassword('')
        navigation.navigate('OwnerNavigator')
        
    } catch (error) {
        console.log('error', error.response)
        switch (error.response.data.status){
            case 400:
                setErrMsg('Missing Username or Password');
            break;
            case 401:
                setErrMsg('Unauthorized');
            break;
            case 500: 
                setErrMsg('Internal Server Error');
            break;
            default:
                setErrMsg('Login Failed');
            break;
        }
    }
    setLoading(false)
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <HeaderLogo />
        </View>
        <View style={styles.form}>
            <Text alignment="center" size="xxsmall">
                {errMsg}
            </Text>
            <TextInput
                label={t('translation:login.labels.login.emailPlaceholder')}
                value={userName}
                onChangeText={text => setUserName(text)}
            />
            <TextInput
                label={t('translation:login.labels.login.passwordPlaceholder')}
                value={userPassword}
                onChangeText={text => setUserPassword(text)}
            />
            <Button
                type={loading ? 'disabled' : 'cta'}
                mode="contained"
                marginTop={30}
                marginLeft={100}
                marginRight={100}
                onPress={loginUser}>
                {t('translation:login.captions.login.loginButton')}
            </Button>
        </View>
        <View style={styles.footer}>
            <Text 
                alignment="center"
                onPress={() => navigation.navigate('Register')}
                size="xxsmall"
                textColorMode={true}
            >{t('translation:login.labels.login.noAccountYet') + ' ' + t('translation:login.labels.login.registerAccount')}</Text>
            <Text 
                alignment="center"
                onPress={() => navigation.navigate('RecoverPassword')}
                size="xxsmall"
                textColorMode={true}
            >{t('translation:login.labels.login.forgotPassword')  + ' ' + t('translation:login.labels.login.recoverPass')}</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: 100,
        marginBottom: 35,
    },
    form: {
        flex: 3,
        justifyContent: 'center',
        width: '80%',
        rowGap: 20,
    },
    footer: {
        flex: 2,
        rowGap: 10,
        justifyContent: 'center',
        alignContent: 'flex-end',
        
    },
});
