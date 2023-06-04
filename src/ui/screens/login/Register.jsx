import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTranslation} from "react-i18next";
import {Text} from '../../components/general/Text';
import { TextInput } from '../../components/general/TextInput';
import { Button } from '../../components/general/Button';


export default function Register({navigation}) {
    const {t} = useTranslation()
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <SafeAreaView>
        <Text
            alignment="center"
            textColorMode
            size="medium"
        >{t('translation:login.labels.register.titleText')}</Text>

       <TextInput
            label={t('translation:login.labels.login.emailPlaceholder')}
            value={email}
            onChangeText={text => setEmail(text)}
        />
        <TextInput
            label={t('translation:login.labels.login.passwordPlaceholder')}
            value={password}
            onChangeText={text => setPassword(text)}
        />
        <TextInput
            label={t('translation:login.labels.register.confirmPassword')}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
        />
         <Button
            mode="contained"
            marginLeft={100}
            marginRight={100}
            onPress={() => navigation.navigate('RegisterCode')}>
            {t('translation:login.captions.register.registerButton')}
        </Button>
    </SafeAreaView>
  );
}
