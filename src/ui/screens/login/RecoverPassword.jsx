import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components/general/Text';
import {TextInput} from '../../components/general/TextInput';
import {Button} from '../../components/general/Button';
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {forgotPassword, resetPassword} from "../../../networking/api/AuthController";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import {COLORS} from "../../styles/Colors";


export default function RecoverPassword({navigation}) {
  const {t} = useTranslation();
  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const recoverValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('translation:general.forms.validations.email'))
      .required(t('translation:general.forms.errors.required')),
  })

  const recoverPassword = async (values) => {
    setLoading(true)
    setErrMsg('')
    try {
        const response = await forgotPassword(values)
        console.log('response', JSON.stringify(response.status))
        if (response.status === 200) navigation.navigate('RegisterCode', { nextScreen: 'ChangePassword', email: values.email, password:'' })
        
    } catch (error) {
      console.log('error', error.response)
        switch (error.response.status){
            case 400:
            case 401:
            case 404:  
              setErrMsg(t('translation:login.errors.recover.emailNotFound')); // "Email xxxx does not exists"
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
      <Text alignment="center" marginBottom={20} textColorMode size="medium">
        {t('translation:login.labels.register.forgotPasswordTitle')}
      </Text>
      <Formik
            initialValues={{ email: ''}}
            onSubmit={values => recoverPassword(values)}
            validationSchema={recoverValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.form}>
              {errMsg && (
                <ErrorMessage iconType="error">{errMsg}</ErrorMessage>    
              )}
              <TextInput
                keyboardType="email-address"
                label={t('translation:login.labels.login.emailPlaceholder')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {(errors.email && touched.email) &&
                <Text style={styles.errorText}>{errors.email}</Text>
              }
              <Text alignment="center" marginTop={35} size="xxxsmall">
                {t('translation:login.labels.register.forgotPasswordDescription')}
              </Text>

              <Button
                mode="contained"
                marginTop={60}
                marginLeft={50}
                marginRight={50}
                onPress={handleSubmit}>
                {t('translation:login.captions.register.forgotPasswordButton')}
              </Button>
            </View>
          )}
      </Formik>
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
  errorText: {
    fontSize: 10,
    color: COLORS.primary,
  },
});