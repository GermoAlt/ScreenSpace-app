import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components/general/Text';
import {TextInput} from '../../components/general/TextInput';
import {Button} from '../../components/general/Button';
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {forgotPassword, resetPassword} from "../../../networking/api/AuthController";

export default function RecoverPassword({navigation}) {
  const {t} = useTranslation();
  const [email, setEmail] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const recoverPassword = async () => {
    setLoading(true)
    body = {
      "email": email,
    }
    try {
        const response = await forgotPassword(body)
        console.log('response', JSON.stringify(response.status))
        if (response.status === 200) navigation.navigate('RegisterCode', { nextScreen: 'ChangePassword', email, password:'' })
        
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
      <Text alignment="center" marginBottom={20} textColorMode size="medium">
        {t('translation:login.labels.register.forgotPasswordTitle')}
      </Text>

      <View style={styles.form}>
        <TextInput
          label={t('translation:login.labels.login.emailPlaceholder')}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text alignment="center" marginTop={35} size="xxxsmall">
          {t('translation:login.labels.register.forgotPasswordDescription')}
        </Text>

        <Button
          mode="contained"
          marginTop={60}
          marginLeft={50}
          marginRight={50}
          onPress={() => recoverPassword()}>
          {t('translation:login.captions.register.forgotPasswordButton')}
        </Button>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 35,
  },
  form: {
    justifyContent: "center",
    width: "80%",
    rowGap: 40,
  },
});