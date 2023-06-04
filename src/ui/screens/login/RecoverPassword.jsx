import React from 'react';
import {SafeAreaView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components/general/Text';
import {TextInput} from '../../components/general/TextInput';
import {Button} from '../../components/general/Button';

export default function RecoverPassword({navigation}) {
  const {t} = useTranslation();
  const [email, setEmail] = React.useState('');

  return (
    <SafeAreaView>
      <Text alignment="center" textColorMode size="medium">
        {t('translation:login.labels.register.forgotPasswordTitle')}
      </Text>

      <TextInput
        label={t('translation:login.labels.login.emailPlaceholder')}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <Text alignment="center" size="xxsmall">
        {t('translation:login.labels.register.forgotPasswordDescription')}
      </Text>

      <Button
        mode="contained"
        marginLeft={100}
        marginRight={100}
        onPress={() => navigation.navigate('RegisterCode')}>
        {t('translation:login.captions.register.forgotPasswordButton')}
      </Button>
    </SafeAreaView>
  );
}
