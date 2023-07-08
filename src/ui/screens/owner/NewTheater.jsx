import React, {useEffect, useState} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Dropdown} from "../../components/general/Dropdown";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";
import {Checkbox, Title} from "react-native-paper";
import {Text} from "../../components/general/Text";
import {SeatLayout} from "../../components/general/SeatLayout";
import {Button} from "../../components/general/Button";
import {getCinemas} from "../../../networking/api/CinemaController";
import { ErrorMessage } from '../../components/general/ErrorMessage';
import { Formik } from 'formik';
import * as yup from 'yup';
import {COLORS} from "../../styles/Colors";
import { postTheaterByCinema } from "../../../networking/api/TheaterController";
import {useNavigation} from "@react-navigation/native";

export const NewTheater = (props) => {
    const cinemaData = props.route.params.cinema
    const defaultCinema = { id:cinemaData.id, title:cinemaData.name, data:cinemaData }
    console.log('cinemaData', cinemaData)
    const {t} = useTranslation()
    const navigation = useNavigation()

    const [enabled, setEnabled] = useState(true)
    const [rows, setRows] = useState("")
    const [columns, setColumns] = useState("")
    const [cinemas, setCinemas] = useState([])
    const [selectedCinema, setSelectedCinema] = useState()

    const [errMsg, setErrMsg] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const theaterValidationSchema = yup.object().shape({
        name: yup
        .string()
        .required(t('translation:general.forms.errors.required')),
        pricePerFunction: yup
        .number()
        .required(t('translation:general.forms.errors.required')),
        numRows: yup
        .number()
        .required(t('translation:general.forms.errors.required')),
        numColumns: yup
        .number()
        .required(t('translation:general.forms.errors.required')),
    })

    useEffect(()=>{
        getCinemas().then(response => {
            setCinemas(
                response.data.map((item, i) => {
                    return {id: item.id, title: item.name, data: item}
                })
            )
        })
    },[])

    const saveNewTheater = async (values) => {
        console.log('values', values)
        setLoading(true)
        setErrMsg('')
        const seatsLayout = {
            numRows: values.numRows,
            numColumns: values.numColumns
        }
        const body = {
            ...values,
            isTemporarilyClosed: !enabled, //Aca se da vuelta porque en FE Ponemos sala ACTIVA/HABILITADA y los BE Monkeys como sala INACTIVA
            seatsLayout,
            cinemaId: values.cinemaId.data.id
        }
        try {
            console.log('body', body)
            const res = await postTheaterByCinema(body)
            console.log('RES Theat', JSON.stringify(res))
            if (res.status === 200){
                navigation.navigate('CinemaDetails', {data: cinemaData})
            }else{
                setErrMsg(t('translation:general.errors.default'));
            }


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
            <Formik
            initialValues={{ cinemaId:{}, name: '', pricePerFunction: '', numRows:'', numColumns:'' }}
            onSubmit={values => saveNewTheater(values)}
            validationSchema={theaterValidationSchema}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isValid }) => (
                <>
                    <View autoFocus>
                    {errMsg && (
                        <ErrorMessage iconType="error">{errMsg}</ErrorMessage>
                    )}
                        <Dropdown list={cinemas}
                            value={values.cinemaId}
                            setValue={(value) => setFieldValue("cinemaId", value)}
                        />

                        <TextInput
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        label={t('translation\:owner\.labels\.newTheater\.theaterName')} />
                        {(errors.name && touched.name) &&
                            <Text style={styles.errorText}>{errors.name}</Text>
                        }

                        <TextInput keyboardType="numeric"
                            onChangeText={handleChange('pricePerFunction')}
                            onBlur={handleBlur('pricePerFunction')}
                            value={values.pricePerFunction}
                            label={t('translation\:owner\.labels\.newTheater\.price')} />
                        {(errors.pricePerFunction && touched.pricePerFunction) &&
                            <Text style={styles.errorText}>{errors.pricePerFunction}</Text>
                        }

                        <View style={styles.row}>
                        <Checkbox status={enabled ? 'checked' : 'unchecked'} onPress={()=>setEnabled(!enabled)}/>
                            <Text size={"xxsmall"} style={styles.label}>{t("translation\:owner\.labels\.newTheater\.enabled")}</Text>
                        </View>

                        <View style={[styles.row, styles.rowColContainer]}>
                            <View style={[styles.row, styles.inputContainer]}>
                                <TextInput
                                    maxLength={1}
                                    textAlign="center"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('numRows')}
                                    onBlur={handleBlur('numRows')}
                                    value={values.numRows}
                                />
                                <Text size={"xsmall"} style={styles.numRows}>{t("translation\:owner\.labels\.newTheater\.row")}</Text>
                            </View>

                            <View style={[styles.row, styles.inputContainer]}>
                                <TextInput
                                    maxLength={1}
                                    textAlign="center"
                                    keyboardType="numeric"
                                    onChangeText={handleChange('numColumns')}
                                    onBlur={handleBlur('numColumns')}
                                    value={values.numColumns}
                                />
                                <Text size={"xsmall"} style={styles.row}>{t("translation\:owner\.labels\.newTheater\.column")}</Text>
                            </View>
                        </View>
                        <View style={[styles.row, styles.inputContainer]}>
                        {(errors.numRows && touched.numRows) &&
                            <Text style={styles.errorText}>{errors.numRows}</Text>
                        }
                        {(errors.numColumns && touched.numColumns) &&
                                <Text style={styles.errorText}>{errors.numColumns}</Text>
                            }
                        </View>
                        <View>
                            <SeatLayout rows={values.numRows} columns={values.numColumns}/>
                        </View>

                    </View>
                    <View>
                        <Button onPress={handleSubmit}>{t("translation\:general\.labels\.confirm")}</Button>
                    </View>
                </>
            )}
            </Formik>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        display:"flex",
        justifyContent:"space-between",
        minHeight:"80%"
    },
    row:{
        display:'flex',
        flexDirection:"row",
        alignItems:"center",
        marginVertical:5
    },
    label:{
        fontSize:50
    },
    inputContainer:{
        gap:10
    },
    rowColContainer:{
        gap:30,
        justifyContent:"space-evenly",
        marginVertical:10
    },
    errorText: {
        fontSize: 10,
        color: COLORS.primary,
    },
})
