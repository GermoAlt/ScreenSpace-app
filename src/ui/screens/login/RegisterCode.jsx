import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Text} from "../../components/general/Text";
import {TextInput} from "../../components/general/TextInput";
import {Button} from "../../components/general/Button";
import {HeaderLogo} from '../../components/general/HeaderLogo';
import {confirmRegistration} from '../../../networking/api/UserController'
import { resetPassword, confirmResetPassword } from '../../../networking/api/AuthController'

export default function RegisterCode({route,navigation}) {
  const {t} = useTranslation();

  const { nextScreen, email, password } = route.params

  const [code1, setCode1] = React.useState('');
  const [code2, setCode2] = React.useState('');
  const [code3, setCode3] = React.useState('');
  const [code4, setCode4] = React.useState('');
  const [code5, setCode5] = React.useState('');
  const [code6, setCode6] = React.useState('');

  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendCode = async () => {
    setLoading(true)
    const securityCode = code1 + code2 + code3 + code4 + code5 + code6
    body = {
        "email": email,
        "password": password,
        "token": securityCode,
    }
    try {
        let response = null
        console.log('nextScreen', nextScreen)
        if (nextScreen === 'OwnerNavigator'){
          console.log('Bod', body)
          response = await confirmRegistration(body)
        }else{
          response = await confirmResetPassword(body)
        }
        console.log('response', JSON.stringify(response.status))
        if (response.status === 200) navigation.navigate(nextScreen)
        
    } catch (error) {
      console.log('error', error)
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
      <Text alignment="center" marginBottom={20} textColorMode size="large">
        {t("translation:login.labels.register.securityCodeText")}
      </Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            autoFocus={true}
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code1}
            onChangeText={text => setCode1(text)}
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code2}
            onChangeText={text => setCode2(text)}
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code3}
            onChangeText={text => setCode3(text)}
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code4}
            onChangeText={text => setCode4(text)}
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code5}
            onChangeText={text => setCode5(text)}
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
            value={code6}
            onChangeText={text => setCode6(text)}
          />
        </View>

        <Text alignment="center" size="xxxsmall">
          {t("translation:login.labels.register.securityCodeDescription")}
        </Text>

        <Button
          mode="contained"
          disabled
          marginLeft={100}
          marginRight={100}
          onPress={() => sendCode()}>
          {t("translation:login.captions.register.registerButton")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 35,
  },
  form: {
    justifyContent: 'center',
    width: '90%',
    rowGap: 40,
  },
  row: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
  },
});
