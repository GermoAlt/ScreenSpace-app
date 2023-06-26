/* eslint-disable prettier/prettier */
import * as React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import { TextInput } from '../../components/general/TextInput';
import {Text} from '../../components/general/Text';
import {SecureTextInput} from "../../components/general/SecureTextInput";
import {Button} from '../../components/general/Button';
import {useTranslation} from 'react-i18next';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import { loginOwnerUser } from '../../../networking/api/AuthController';
import useAuth from '../../../hooks/useAuth';
import useEncryptedStorage from '../../../hooks/useEncryptedStorage';
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import {COLORS} from "../../styles/Colors";

export default function Login({navigation}) {
  const {t} = useTranslation();
  const { setAuth } = useAuth();
  const { storeUserSession } = useEncryptedStorage()

  const [errMsg, setErrMsg] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('translation:general.forms.validations.email'))
      .required(t('translation:general.forms.errors.required')),
    password: yup
      .string()
      .required(t('translation:general.forms.errors.required')),
  })

  const loginUser = async (values) => {
    setLoading(true)
    setErrMsg('')
    try {
        const response = await loginOwnerUser(values)
        console.log('response', response)
        const accessToken = response?.data.token
        const data = { userName: values.email, userPassword: values.password, accessToken }
        setAuth(data)
        await storeUserSession(data)
        navigation.navigate('OwnerNavigator')

    } catch (error) {
        console.log('error', error)
        switch (error.response.data.status){
            case 400:
            case 401:
                setErrMsg(t('translation:login.errors.login.wrongCredentials')); // Bad Request
            break;
            case 500:
                setErrMsg(t('translation:general.errors.default')); // Internal Server Error
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
            initialValues={{ email: '', password: '' }}
            onSubmit={values => loginUser(values)}
            validationSchema={loginValidationSchema}
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
                    <SecureTextInput
                        label={t('translation:login.labels.login.passwordPlaceholder')}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                    {(errors.password && touched.password) &&
                        <Text style={styles.errorText}>{errors.password}</Text>
                    }
                    <Button
                        type={isValid && !loading ? 'cta' : 'disab'}
                        mode="contained"
                        marginTop={30}
                        marginLeft={100}
                        marginRight={100}
                        onPress={handleSubmit}>
                        {t('translation:login.captions.login.loginButton')}
                    </Button>
                </View>
            )}
        </Formik>
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
    errorText: {
        fontSize: 10,
        color: COLORS.primary,
    },
});
