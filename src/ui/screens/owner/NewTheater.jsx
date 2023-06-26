import {SafeAreaView, StyleSheet, View} from "react-native";
import {Dropdown} from "../../components/general/Dropdown";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";
import {Checkbox, Title} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {Text} from "../../components/general/Text";
import {SeatLayout} from "../../components/general/SeatLayout";
import {Button} from "../../components/general/Button";
import {getCinemas} from "../../../networking/api/CinemaController";

export const NewTheater = () => {
    const {t} = useTranslation()
    const [enabled, setEnabled] = useState(true)
    const [rows, setRows] = useState("")
    const [columns, setColumns] = useState("")
    const [cinemas, setCinemas] = useState()
    const [selectedCinema, setSelectedCinema] = useState()

    useEffect(()=>{
        getCinemas().then((res)=>{
            setCinemas(
                res.data.map((item, i)=> {
                    return {id:item.id, title:item.name, data:item}
                })
            )
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Dropdown list={cinemas} value={selectedCinema} setValue={(item)=>{setSelectedCinema(item)}}/>
                <TextInput label={t('translation\:owner\.labels\.newTheater\.theaterName')} />
                <TextInput label={t('translation\:owner\.labels\.newTheater\.price')} />
                <View style={styles.row}>
                    <Checkbox status={enabled ? 'checked' : 'unchecked'} onPress={()=>setEnabled(!enabled)}/>
                    <Text size={"xxsmall"} style={styles.label}>{t("translation\:owner\.labels\.newTheater\.enabled")}</Text>
                </View>

                <View style={[styles.row, styles.rowColContainer]}>
                    <View style={[styles.row, styles.inputContainer]}>
                        <TextInput
                            autoFocus={true}
                            maxLength={1}
                            textAlign="center"
                            keyboardType="numeric"
                            value={rows}
                            onChangeText={num => setRows(num.replace(/\D/g, ''))}
                        />
                        <Text size={"xsmall"} style={styles.row}>{t("translation\:owner\.labels\.newTheater\.row")}</Text>
                    </View>
                    <View style={[styles.row, styles.inputContainer]}>
                        <TextInput
                            autoFocus={true}
                            maxLength={1}
                            textAlign="center"
                            keyboardType="numeric"
                            value={columns}
                            onChangeText={num => setColumns(num.replace(/\D/g, ''))}
                        />
                        <Text size={"xsmall"} style={styles.row}>{t("translation\:owner\.labels\.newTheater\.column")}</Text>
                    </View>
                </View>
                <View>
                    <SeatLayout rows={rows} columns={columns}/>
                </View>

            </View>
            <View>
                <Button >{t("translation\:general\.labels\.confirm")}</Button>
            </View>
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
    }
})
