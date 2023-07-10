import {useEffect, useState} from "react";
import {Pressable, SafeAreaView, StyleSheet, View} from "react-native";
import {Dialog, Portal, Text} from "react-native-paper";
import {MovieSelectionPanel} from "../../components/owner/NewScreening/MovieSelectionPanel";
import {CalendarPickerField} from "../../components/owner/NewScreening/CalendarPickerField";
import {DatePickerField} from "../../components/owner/NewScreening/DatePickerField";
import {AvailabilityPanel} from "../../components/owner/NewScreening/AvailabilityPanel";
import {Dropdown} from "../../components/general/Dropdown";
import {Button} from "../../components/general/Button";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import {getTheatersByCinema} from "../../../networking/api/TheaterController";
import {Formik} from 'formik';
import * as yup from 'yup';
import {deleteScreening, postScreening, updateScreening} from "../../../networking/api/ScreeningController";
import {ScreenHeader} from "../../components/owner/ScreenHeader";
import * as React from "react";
import {deleteCinema} from "../../../networking/api/CinemaController";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export const NewScreening = ({navigation, route}) => {
    const {t} = useTranslation()

    const {cinema, movie, existingScreening} = route.params
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const [visibleDialog, setVisibleDialog] = React.useState(false);

    const [selectedMovie, setSelectedMovie] = useState(movie || {})
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())
    const [theaters, setTheaters] = useState([])
    const [existing, setExisting] = useState(
        existingScreening !== null && existingScreening !== undefined
    )

    if (movie && movie !== selectedMovie) setSelectedMovie(movie)

    const parseDateString = (date) => {
        //"date": "11/07/2023 15:33:00",

        let dateStr = date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
        let timeStr = date.slice(11, date.length)
        return new Date(dateStr + "T" + timeStr + "Z")
    }

    useEffect(() => {
        if (existing) {
            navigation.setOptions({
                headerTitle: () => <ScreenHeader text={t('translation\:owner\.titles\.editScreening')}/>,
                headerRight: () => (
                    <Pressable onPress={()=>setVisibleDialog(true)}>
                        <Icon name={"delete"} color={COLORS.secondary} size={30}/>
                    </Pressable>
                )
            })
            setSelectedMovie(existingScreening.movie)
            setDate(parseDateString(existingScreening.date))
            setTime(parseDateString(existingScreening.date))
        }
        getTheatersByCinema(cinema.id).then(response => {
            setTheaters(
                response.data.map((item, i) => {
                    return {id: i, title: item.name, data: item}
                })
            )
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const screenValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required(t('translation:general.forms.errors.required')),

    })

    const submitScreeningData = (values) => {
        if (!time || !date || !selectedMovie) return

        setLoading(true)
        setErrMsg('')

        const timeText = time.toLocaleTimeString("en-GB")
        const dateText = date.toLocaleString("en-GB", {
            year: "numeric", month: "2-digit", day: "2-digit"
        })
        const movieDate = (dateText.substring(0, 10) + ' ' + timeText)

        const body = {
            theaterId: values.theaterId.data.id,
            movieId: selectedMovie.id,
            date: movieDate
        }
        if (existing) {
            editScreening(body)
        } else {
            saveNewScreening(body)
        }
        setLoading(false)
    }

    const editScreening = (body) => {
        updateScreening(existingScreening.id, body).then((res) => {
            navigation.navigate('CinemaDetails', {data: cinema})
        }).catch((error) => {
            console.log(error)
            switch (error.status) {
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

    const saveNewScreening = (body) => {
        postScreening(body).then((res) => {
            navigation.navigate('CinemaDetails', {data: cinema})
        }).catch((error) => {
            console.log(error)
            switch (error.status) {
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

    return (
        <SafeAreaView style={styles.screen}>
            <Portal>
                <Dialog visible={visibleDialog}>
                    <Dialog.Title><Text style={styles.text}>{t("translation\:owner\.titles\.deleteScreening")}</Text></Dialog.Title>
                    <Dialog.Content><Text style={styles.text}>{t("translation\:owner\.labels\.deleteScreening")}</Text></Dialog.Content>
                    <Dialog.Actions>
                        <Button icon={"cancel"} onPress={()=>setVisibleDialog(false)}>{t("translation\:general\.labels\.no")}</Button>
                        <Button type={"default"} icon={"delete"} onPress={()=> {
                            deleteScreening(existingScreening.id).then(r => {
                                navigation.navigate('CinemaDetails', {data: cinema})
                            })
                        }}>{t("translation\:general\.labels\.yes")}</Button>
                    </Dialog.Actions>

                </Dialog>
            </Portal>
            <Formik
                initialValues={{theaterId: existing ? existingScreening.theater : {}}}
                onSubmit={values => submitScreeningData(values)}
            >
                {({handleSubmit, setFieldValue, values}) => (
                    <>
                        <View style={styles.container}>
                            <Text style={styles.title}>{cinema.name}</Text>
                            <Dropdown list={theaters}
                                      value={existing ? existingScreening.theater : values.theaterId}
                                      setValue={(value) => setFieldValue("theaterId", value)}
                                      initialValue={existingScreening.theater}
                            />
                            <MovieSelectionPanel cinema={cinema} movie={selectedMovie}
                                                 setMovie={(e) => setSelectedMovie(e)}
                                                 navigateTo={(url, options) => navigation.navigate(url, options)}
                            />
                            <View style={styles.dateTimeContainer}>
                                <CalendarPickerField date={date}
                                                     setDate={(date) => setDate(date)}
                                />
                                <DatePickerField time={time}
                                                 setTime={(time) => setTime(time)}
                                />
                            </View>
                            <AvailabilityPanel theater={existing ? existingScreening.theater : values.theaterId}
                                               date={date} movie={selectedMovie}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button onPress={handleSubmit}
                                    icon={"check-circle-outline"}>
                                {t("translation\:general\.labels\.confirm")}
                            </Button>
                        </View>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        display: "flex",
        justifyContent: "space-between",
        flex: 1
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        minHeight: "80%",
        paddingHorizontal: 30,
        gap: 25
    },
    dateTimeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 15,
    },
    buttonContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50
    },
    title: {
        color: COLORS.secondary,
        fontSize: 30,

    },
    errorText: {
        fontSize: 10,
        color: COLORS.primary,
    },
    text:{
        color:COLORS.secondary
    }
})
