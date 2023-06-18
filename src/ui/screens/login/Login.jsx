/* eslint-disable prettier/prettier */
import {SafeAreaView, View, StyleSheet} from 'react-native';
import React from 'react';
import { TextInput } from '../../components/general/TextInput';
import {Text} from '../../components/general/Text';
import {Button} from '../../components/general/Button';
import {useTranslation} from 'react-i18next';
import { HeaderLogo } from '../../components/general/HeaderLogo';

export default function Login({navigation}) {
  const {t} = useTranslation();

  const [text, setText] = React.useState('');
  const handleSubmit = () => {
    console.log('Form Submit')
  }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <HeaderLogo />
        </View>
        <View style={styles.form}>
            <TextInput
                label={t('translation:login.labels.login.emailPlaceholder')}
                value={text}
                onChangeText={text => setText(text)}
            />
            <TextInput
                label={t('translation:login.labels.login.passwordPlaceholder')}
                value={text}
                onChangeText={text => setText(text)}
            />
            <Button
                mode="contained"
                marginTop={30}
                marginLeft={100}
                marginRight={100}>
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
