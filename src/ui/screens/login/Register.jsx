import React from "react";
import {SafeAreaView, View, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {Text} from "../../components/general/Text";
import {SecureTextInput} from "../../components/general/SecureTextInput";
import {TextInput} from "../../components/general/TextInput";
import {Button} from "../../components/general/Button";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {createOwnerUser} from "../../../networking/api/UserController";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import {COLORS} from "../../styles/Colors";


export default function Register({navigation}) {
  const {t} = useTranslation();
  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('translation:general.forms.validations.email'))
      .required(t('translation:general.forms.errors.required')),
    password: yup
      .string()
      .required(t('translation:general.forms.errors.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('translation:login.errors.register.passwordMatch'))
      .required(t('translation:general.forms.errors.required')),
  })

  const registerUser = async (values) => {
    setLoading(true)
    setErrMsg('')
    body = { ...values, "isOwner": true }
    try {
        const response = await createOwnerUser(body)
        if (response.status === 200){
          navigation.navigate('RegisterCode', { nextScreen: 'OwnerNavigator', email: values.email, password: values.password })
        }else{
         setErrMsg(t('translation:general.errors.default'));
        }
    } catch (error) {
        // console.log('error', error)
        // console.log('Error ', JSON.stringify(error))
        switch (error.response.status){
            case 400:
                setErrMsg(t('translation:login.errors.register.emailExists')); // Bad Request - "message":User with email xxxxxx already exists
            break;
            case 401:
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
      <Formik
            initialValues={{ email: '', password: '', confirmPassword: '' }}
            onSubmit={values => registerUser(values)}
            validationSchema={registerValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
            <View style={styles.form}>
              {errMsg && (
                <ErrorMessage iconType="error">{errMsg}</ErrorMessage>
              )}
              <Text
                alignment="center"
                marginBottom={10}
                textColorMode
                size="medium">
                {t("translation:login.labels.register.titleText")}
              </Text>

              <TextInput
                keyboardType="email-address"
                label={t("translation:login.labels.login.emailPlaceholder")}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {(errors.email && touched.email) &&
                <Text style={styles.errorText}>{errors.email}</Text>
              }
              <SecureTextInput
                label={t("translation:login.labels.login.passwordPlaceholder")}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {(errors.password && touched.password) &&
                <Text style={styles.errorText}>{errors.password}</Text>
              }
              <SecureTextInput
                label={t("translation:login.labels.register.confirmPassword")}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              {(errors.confirmPassword && touched.confirmPassword) &&
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              }
              <Button
                mode="contained"
                marginTop={20}
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
    rowGap: 20,
  },
  errorText: {
    fontSize: 10,
    color: COLORS.primary,
  },
});
