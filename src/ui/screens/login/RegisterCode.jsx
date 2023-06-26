import React from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Text} from "../../components/general/Text";
import {TextInput} from "../../components/general/TextInput";
import {Button} from "../../components/general/Button";
import {HeaderLogo} from '../../components/general/HeaderLogo';
import {confirmRegistration} from '../../../networking/api/UserController'
import { resetPassword, confirmResetPassword, loginOwnerUser } from '../../../networking/api/AuthController'
import useAuth from '../../../hooks/useAuth';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import {COLORS} from "../../styles/Colors";

export default function RegisterCode({route,navigation}) {
  const {t} = useTranslation();

  const { nextScreen, email, password } = route.params

  const { setAuth } = useAuth();
  const { storeUserSession } = useEncryptedStorage()

  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const code2Ref = React.useRef();
  const code3Ref = React.useRef();
  const code4Ref = React.useRef();
  const code5Ref = React.useRef();
  const code6Ref = React.useRef();

  const codeValidationSchema = yup.object().shape({
    code1: yup
      .number()
      .required(t('translation:general.forms.errors.required')),
    code2: yup
    .number()
    .required(t('translation:general.forms.errors.required')),
    code3: yup
    .number()
    .required(t('translation:general.forms.errors.required')),
    code4: yup
    .number()
    .required(t('translation:general.forms.errors.required')),
    code5: yup
    .number()
    .required(t('translation:general.forms.errors.required')),
    code6: yup
    .number()
    .required(t('translation:general.forms.errors.required')),
  })

  const sendCode = async (values) => {
    setLoading(true)
    setErrMsg('')
    const securityCode = values.code1 + values.code2 + values.code3 + values.code4 + values.code5 + values.code6
    const body = {
        "email": email,
        "password": password,
        "token": securityCode,
    }
    try {
        let response = null
        if (nextScreen === 'OwnerNavigator'){
          response = await confirmRegistration(body)
        }else{
          response = await resetPassword(body)
        }
        console.log('response', JSON.stringify(response.status))
        if (response.status === 200){
          if (nextScreen === 'OwnerNavigator'){
            const loginResponse = await loginOwnerUser(body) //TODO: Esto lo podriamos evitar si el endpoint confirmRegistration nos devuelve un token
            const accessToken = loginResponse?.data.token
            const data = { email, password, accessToken }
            setAuth(data)
            storeUserSession(data)
          }
          navigation.navigate(nextScreen)
        } 
        
    } catch (error) {

        console.log('error', JSON.stringify(error))
        switch (error.response.status){
            case 400:
            case 401:
            case 404:
              setErrMsg(t('translation:login.errors.register.securityCode')); // "message": "No pending registration for user xxxxx and code 737871"
            break;
            case 500:
              setErrMsg(t('translation:general.errors.default'));
            break;
            default:
              setErrMsg(t('translation:general.errors.default'));
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
      <Formik
            initialValues={{ code1: '', code2: '', code3: '', code4: '', code5: '', code6: '' }}
            onSubmit={values => sendCode(values)}
            validationSchema={codeValidationSchema}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <View style={styles.form}>
            {errMsg && (
              <ErrorMessage iconType="error">{errMsg}</ErrorMessage>    
            )}
            <View style={styles.row}>
              <TextInput
                placeholder="-"
                autoFocus={true}
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code1')}
                onBlur={handleBlur('code1')}
                value={values.code1}
                onChange={(e) => {
                  if (e.nativeEvent.text !== '' && (!isNaN(parseInt(e.nativeEvent.text)))){
                    code2Ref.current?.focus();
                  }}
                }
                blurOnSubmit={false}
                returnKeyType="next"
              />
              <TextInput
                placeholder="-"
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code2')}
                onBlur={handleBlur('code2')}
                value={values.code2}
                onChange={(e) => {
                  if (e.nativeEvent.text !== '' && (!isNaN(parseInt(e.nativeEvent.text)))){
                    code3Ref.current?.focus();
                  }}
                }
                blurOnSubmit={false}
                refInput={code2Ref}
                returnKeyType="next"
              />
              <TextInput
                placeholder="-"
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code3')}
                onBlur={handleBlur('code3')}
                value={values.code3}
                onChange={(e) => {
                  if (e.nativeEvent.text !== '' && (!isNaN(parseInt(e.nativeEvent.text)))){
                    code4Ref.current?.focus();
                  }}
                }
                blurOnSubmit={false}
                refInput={code3Ref}
                returnKeyType="next"
              />
              <TextInput
                placeholder="-"
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code4')}
                onBlur={handleBlur('code4')}
                value={values.code4}
                onChange={(e) => {
                  if (e.nativeEvent.text !== '' && (!isNaN(parseInt(e.nativeEvent.text)))){
                    code5Ref.current?.focus();
                  }}
                }
                blurOnSubmit={false}
                refInput={code4Ref}
                returnKeyType="next"
              />
              <TextInput
                placeholder="-"
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code5')}
                onBlur={handleBlur('code5')}
                value={values.code5}
                onChange={(e) => {
                  if (e.nativeEvent.text !== '' && (!isNaN(parseInt(e.nativeEvent.text)))){
                    code6Ref.current?.focus();
                  }}
                }
                blurOnSubmit={false}
                refInput={code5Ref}
                returnKeyType="next"
              />
              <TextInput
                placeholder="-"
                maxLength={1}
                textAlign="center"
                style={styles.inputText}
                keyboardType="numeric"
                onChangeText={handleChange('code6')}
                onBlur={handleBlur('code6')}
                value={values.code6}
                blurOnSubmit={false}
                refInput={code6Ref}
              />
              {((errors.code1 || errors.code2 || errors.code3 || errors.code4 || errors.code5 || errors.code6 )
              && (touched.code1 || touched.code2 || touched.code3 || touched.code4 || touched.code5 || touched.code6)) &&
              <Text style={styles.errorText}>{t('translation:general.forms.errors.all_required')}</Text>
            }
            </View>
            

            <Text alignment="center" size="xxxsmall">
              {t("translation:login.labels.register.securityCodeDescription")}
            </Text>

            <Button
              mode="contained"
              disabled
              marginLeft={100}
              marginRight={100}
              onPress={handleSubmit}>
              {t("translation:login.captions.register.registerButton")}
            </Button>           
          </View>
        )}
      </Formik>
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
  errorText: {
    fontSize: 10,
    color: COLORS.primary,
  },
  inputText: {
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  }
});
