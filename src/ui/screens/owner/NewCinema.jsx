import * as React from 'react';
import {KeyboardAvoidingView, LogBox, ScrollView, StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper'
import {TextInput} from "../../components/general/TextInput";
import {Text} from "../../components/general/Text";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/general/Button";
import MapView, {Marker} from "react-native-maps";
import {ErrorMessage} from '../../components/general/ErrorMessage';
import {Formik} from 'formik';
import * as yup from 'yup';
import {postCinemas, updateCinema} from '../../../networking/api/CinemaController';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {ScreenHeader} from "../../components/owner/ScreenHeader";

const Tab = createMaterialTopTabNavigator()

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const NewCinema = ({navigation, route}) => {
    const {t} = useTranslation()
    const [errMsg, setErrMsg] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const {existingCinema} = route.params
    const [existing, setExisting] = useState(
        existingCinema !== null && existingCinema !== undefined
    )

    useEffect(()=>{
        console.log("cinemaEx", existingCinema)
        if(existing){
            navigation.setOptions({
                headerTitle: () => <ScreenHeader text={t('translation\:owner\.titles\.editCinema')}/>
            })
        }
    },[])

    const submitCinemaData = (values) => {

        console.log('values', values)
        setLoading(true)
        setErrMsg('')

        const body = {
            name: values.name,
            companyName: values.companyName,
            address: {
                street: values.street,
                number: values.number,
                neighborhood: values.neighborhood,
                city: values.city,
                province: values.province,
                country: values.country
            },
            geoLocation: {
                latitude: values.latitude,
                longitude: values.longitude
            },
            pricePerFunction: 0
        }

        if(existing){
            editCinema(body)
        } else {
            saveNewCinema(body)
        }

        setLoading(false)
    }

    const editCinema =(body)=>{
        updateCinema(existingCinema.id, body).then(()=> {
            navigation.navigate('OwnerLanding')
        }).catch((error) =>{
            console.log('error', JSON.stringify(error))
            switch (error.response.data.status) {
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
        })
    }

    const saveNewCinema = (body) => {
        postCinemas(body).then(()=> {
            navigation.navigate('OwnerLanding')
        }).catch((error) =>{
            console.log('error', JSON.stringify(error))
            switch (error.response.data.status) {
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
        })
    }

    const cinemaValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        street: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        number: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        neighborhood: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        city: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        province: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        country: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        latitude: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
        longitude: yup
            .string()
            .required(t('translation:general.forms.errors.required')),
    })

    return (
        <KeyboardAvoidingView style={{flex: 1}}>
            <Formik
                initialValues={{
                    name: existing ? existingCinema.name : '',
                    companyName: existing ? existingCinema.companyName :'',
                    street: existing ? existingCinema.address.street :'',
                    number: existing ? existingCinema.address.number :'',
                    neighborhood: existing ? existingCinema.address.neighborhood :'',
                    city: existing ? existingCinema.address.city :'',
                    province: existing ? existingCinema.address.province :'',
                    country: existing ? existingCinema.address.country :'',
                    latitude: existing ? existingCinema.geoLocation.latitude+"" :'',
                    longitude: existing ? existingCinema.geoLocation.longitude+"" :'',
                }}
                onSubmit={values => submitCinemaData(values)}
                validationSchema={cinemaValidationSchema}
            >
                {({
                      handleChange, handleBlur,
                      handleSubmit, values, errors,
                      touched, isValid, setFieldValue
                  }) => (
                    <>
                        <Tab.Navigator tabBar={() => {
                        }}>
                            <Tab.Screen name={"NewCinemaForm"} initialParams={{
                                handleChange, handleBlur,
                                handleSubmit, values, errors,
                                touched, isValid
                            }}>
                                {() => {
                                    return <View>
                                        <ScrollView contentContainerStyle={styles.container}
                                                    automaticallyAdjustKeyboardInsets={true}>
                                            {errMsg && (
                                                <ErrorMessage iconType="error">{errMsg}</ErrorMessage>
                                            )}
                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.name")}
                                                       onChangeText={handleChange('name')}
                                                       onBlur={handleBlur('name')}
                                                       value={values.name}/>
                                            {(errors.name && touched.name) &&
                                                <Text style={styles.errorText}>{errors.name}</Text>
                                            }


                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.companyName")}
                                                       onChangeText={handleChange('companyName')}
                                                       onBlur={handleBlur('companyName')}
                                                       value={values.companyName}/>
                                            {(errors.companyName && touched.companyName) &&
                                                <Text style={styles.errorText}>{errors.companyName}</Text>
                                            }

                                            <View style={styles.dualRow}>
                                                <TextInput label={t("translation\:owner\.labels\.newCinema\.street")}
                                                           style={[styles.dualRowElement, styles.big]}
                                                           onChangeText={handleChange('street')}
                                                           onBlur={handleBlur('street')}
                                                           value={values.street}/>
                                                {(errors.street && touched.street) &&
                                                    <Text style={styles.errorText}>{errors.street}</Text>
                                                }
                                                <TextInput label={t("translation\:owner\.labels\.newCinema\.number")}
                                                           style={[styles.dualRowElement]}
                                                           onChangeText={handleChange('number')}
                                                           onBlur={handleBlur('number')}
                                                           value={values.number}/>
                                                {(errors.number && touched.number) &&
                                                    <Text style={styles.errorText}>{errors.number}</Text>
                                                }
                                            </View>
                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.neighborhood")}
                                                       onChangeText={handleChange('neighborhood')}
                                                       onBlur={handleBlur('neighborhood')}
                                                       value={values.neighborhood}/>
                                            {(errors.neighborhood && touched.neighborhood) &&
                                                <Text style={styles.errorText}>{errors.neighborhood}</Text>
                                            }
                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.locality")}
                                                       onChangeText={handleChange('city')}
                                                       onBlur={handleBlur('city')}
                                                       value={values.city}/>
                                            {(errors.city && touched.city) &&
                                                <Text style={styles.errorText}>{errors.city}</Text>
                                            }
                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.province")}
                                                       onChangeText={handleChange('province')}
                                                       onBlur={handleBlur('province')}
                                                       value={values.province}/>
                                            {(errors.province && touched.province) &&
                                                <Text style={styles.errorText}>{errors.province}</Text>
                                            }
                                            <TextInput label={t("translation\:owner\.labels\.newCinema\.country")}
                                                       onChangeText={handleChange('country')}
                                                       onBlur={handleBlur('country')}
                                                       value={values.country}/>
                                            {(errors.country && touched.country) &&
                                                <Text style={styles.errorText}>{errors.country}</Text>
                                            }
                                        </ScrollView>
                                        <View style={styles.buttonRow}>
                                            <Button onPress={() => navigation.navigate("NewCinemaMap")}>{t("translation\:general\.labels\.next")}</Button>
                                        </View>
                                    </View>
                                }}

                            </Tab.Screen>
                            <Tab.Screen name={"NewCinemaMap"} initialParams={{
                                handleChange, handleBlur,
                                handleSubmit, values, errors,
                                touched, isValid, setFieldValue
                            }}>
                                {() => {
                                    return <View style={styles.container}>
                                        <MapView initialRegion={{
                                            latitude: -34.603722,
                                            longitude: -58.381592,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }} style={styles.map}>
                                            <Marker coordinate={{
                                                latitude: parseFloat(values.latitude),
                                                longitude: parseFloat(values.longitude)
                                            }} draggable onDragEnd={(e)=>{
                                                setFieldValue("latitude", e.nativeEvent.coordinate.latitude.toString().slice(0,10))
                                                setFieldValue("longitude", e.nativeEvent.coordinate.longitude.toString().slice(0,10))
                                                console.log(e)
                                            }}/>
                                        </MapView>
                                        <View style={styles.dualRow}>
                                            <TextInput style={styles.bottomInputs}
                                                       label={t("translation\:owner\.labels\.newCinema\.latitude")}
                                                       onChangeText={handleChange('latitude')}
                                                       onBlur={handleBlur('latitude')}
                                                       value={values.latitude}/>
                                            {(errors.latitude && touched.latitude) &&
                                                <Text style={styles.errorText}>{errors.latitude}</Text>
                                            }
                                            <TextInput style={styles.bottomInputs}
                                                       label={t("translation\:owner\.labels\.newCinema\.longitude")}
                                                       onChangeText={handleChange('longitude')}
                                                       onBlur={handleBlur('longitude')}
                                                       value={values.longitude}/>
                                            {(errors.longitude && touched.longitude) &&
                                                <Text style={styles.errorText}>{errors.longitude}</Text>
                                            }
                                        </View>
                                        <View style={styles.buttonRow}>
                                            <Button type={"default"} onPress={() => navigation.navigate("NewCinemaForm")}>{t("translation\:general\.labels\.back")}</Button>
                                            <Button onPress={handleSubmit}>{t("translation\:general\.labels\.confirm")}</Button>
                                        </View>
                                    </View>
                                }}
                            </Tab.Screen>
                        </Tab.Navigator>

                    </>
                )}
            </Formik>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    swiperDots: {
        display: 'flex',
        gap: 30,
        position: 'absolute',
        bottom: 50,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15,
        marginBottom: 10,
        minHeight: "80%"
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
    dualRowElement: {
        flex: 1
    },
    big: {
        flexGrow: 2
    },
    buttonRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 30
    },
    map: {
        flex: 1
    },
    mapContainer: {
        flex: 1
    },
    bottomInputs: {
        flex: 1
    }
})
