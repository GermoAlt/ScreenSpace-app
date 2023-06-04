/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
import { TextInput } from '../../components/general/TextInput';
import {Text} from '../../components/general/Text';
import {Button} from '../../components/general/Button';
import {useTranslation} from 'react-i18next';

export default function Login({navigation}) {
  const {t} = useTranslation();

  const [text, setText] = React.useState('');
  return (
    <SafeAreaView>
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
            marginLeft={100}
            marginRight={100}>
            {t('translation:login.captions.login.loginButton')}
        </Button>
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

    </SafeAreaView>
  );
}
