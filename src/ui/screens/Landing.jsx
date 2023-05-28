/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import React from 'react';
import {TextInput} from '../components/general/TextInput';
import {Text} from '../components/general/Text';
import {Button} from '../components/general/Button';
import {useTranslation} from 'react-i18next';

export default function Landing({navigation}) {
  const {t} = useTranslation();

  const [text, setText] = React.useState('');
  return (
    <SafeAreaView>
      <TextInput
        label={t('translation:login.emailPlaceholder')}
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        label={t('translation:login.passwordPlaceholder')}
        value={text}
        onChangeText={text => setText(text)}
      />
      <Text 
        alignment="center"
        textColorMode={true}
        size="medium"
      >{t('translation:register.ownerForgotPasswordTitle')}</Text>
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
