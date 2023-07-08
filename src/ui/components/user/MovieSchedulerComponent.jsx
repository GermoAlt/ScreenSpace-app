import * as React from 'react';
import {StyleSheet, View } from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { ChipsLabelValue } from '../../components/user/ChipsLabelValue';
import {Button} from "../../components/general/Button";
import { mock_screenings } from '../../../assets/data/user_screenings';
import { StepperComponent } from '../general/StepperComponent';

export const MovieSchedulerComponent = (props) => {
    //const { handleConfirm } = props
    //const screeningData = mock_screenings
    const { screeningData, handleConfirm } = props
    
    const {t} = useTranslation();

    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    const [step, setStep] = React.useState(0)
    const [readyToConfirm, setReadyToConfirm] = React.useState(false)
    const [firstStepData, setFirstStepData] = React.useState([])
    const [secondStepData, setSecondStepData] = React.useState([])
    const [thirdStepData, setThirdStepData] = React.useState([])
    const [screeningId, setScreeningId] = React.useState('')

    const getDate = (value) => {
        return value.toString().substr(0,5)
    }
    const getTime = (value) => {
        return value.toString().substr(0,5)
    }

    React.useEffect(() => {
        const dateValues = screeningData.dates.map((item) => { return { label: getDate(item.date), theaters: item.theaters } })
        dateValues.length > 0 ? setStep(1) : setStep(0)
        setFirstStepData(dateValues)
        
    }, [screeningData])

    const handleStepOne = (value) => {
        setStep(1)
        setScreeningId('')
        setSecondStepData([])
        setThirdStepData([])
        setReadyToConfirm(false)
        const theaters = value.theaters.map((item) => { return { label: item.theater, times: item.times } })
        setSecondStepData(theaters)
        setStep(2)
    }

    const handleStepTwo = (value) => {
        setReadyToConfirm(false)
        const times = value.times.map((item) => { return { label: getTime(item.time), screeningId: item.screeningId } })
        setThirdStepData(times)
        setStep(3)
    }

    const handleStepThree = (value) => {
        console.log('value', value)        
        setScreeningId(value.screeningId)
        setReadyToConfirm(true)
    }

    const stepsMap = [
        {
            id: 1,
            label: '1'
        },
        {
            id: 2,
            label: '2'
        },
        {
            id: 3,
            label: '3'
        },
    ]

    return (
        <View style={styles.container}>
            <StepperComponent steps={stepsMap} currentStep={step} />
            { step >= 1 && firstStepData !== [] && (
                <ChipsLabelValue label={t("translation\:user\.labels\.movieReservation\.fistStep\.label")} values={firstStepData} handleOptionSelected={handleStepOne} />
            )}
            { step >= 2 && secondStepData !== [] && (
                <ChipsLabelValue label={t("translation\:user\.labels\.movieReservation\.secondStep\.label")} values={secondStepData} handleOptionSelected={handleStepTwo} />
            )}
            { step >= 3 && thirdStepData !== [] && (
                <ChipsLabelValue label={t("translation\:user\.labels\.movieReservation\.thirdStep\.label")} values={thirdStepData} handleOptionSelected={handleStepThree} />
            )}
            { readyToConfirm && step >= 3 && (
                <Button type={"cta"} onPress={()=>handleConfirm(screeningId)}>
                    {t("translation\:user\.captions\.movieReservation\.confirmReservation")}
                </Button>
            )}  
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 15,
        marginBottom: 10,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5
    },
    scrollView: {
        marginHorizontal: 20,
        marginBottom: 50
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15
    },
    loadingContainer:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        minHeight:350
    },
    loadingText:{
        color:COLORS.secondary,
        fontSize:24,
    }
})