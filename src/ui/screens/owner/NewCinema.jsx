import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native";
import Swiper from 'react-native-swiper'
import {TextInput} from "../../components/general/TextInput";
import {COLORS} from "../../styles/Colors";
import {useTranslation} from "react-i18next";
import {Button} from "../../components/general/Button";
import MapView from "react-native-maps";
export const NewCinema = () => {
    const {t} = useTranslation()
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <Swiper loop={false}
                    dotColor={COLORS.off_white}
                    activeDotColor={COLORS.primary}
                    paginationStyle={styles.swiperDots}
                    showsPagination={false}
                    showsButtons={true}
            >

                <ScrollView contentContainerStyle={styles.container}>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.name")}/>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.price")}/>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.companyName")}/>
                    <View style={styles.dualRow}>
                        <TextInput label={t("translation\:owner\.labels\.newCinema\.street")}
                                   style={[styles.dualRowElement, styles.big]}/>
                        <TextInput label={t("translation\:owner\.labels\.newCinema\.number")}
                                   style={[styles.dualRowElement]}/>
                    </View>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.neighborhood")}/>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.locality")}/>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.province")}/>
                    <TextInput label={t("translation\:owner\.labels\.newCinema\.country")}/>
                </ScrollView>

                <View style={styles.container}>
                    <MapView initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} style={styles.map}/>
                    <View style={styles.dualRow}>
                        <TextInput style={styles.bottomInputs} label={t("translation\:owner\.labels\.newCinema\.latitude")}></TextInput>
                        <TextInput style={styles.bottomInputs} label={t("translation\:owner\.labels\.newCinema\.longitude")}></TextInput>
                    </View>
                </View>
            </Swiper>
            <View style={styles.buttonRow}>
                <Button>asaaas</Button>
                <Button>asaaas</Button>
            </View>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    swiperDots:{
        display:'flex',
        gap:30,
        position: 'absolute',
        bottom: 50,
    },
    container:{
        display:"flex",
        flexDirection:"column",
        paddingHorizontal:10,
        flex:1,
        gap:15,
        marginBottom:100
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap:15
    },
    dualRowElement:{
        flex:1
    },
    big:{
        flexGrow:2
    },
    buttonRow:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginBottom:30
    },
    map:{
        flex:1
    },
    mapContainer:{
        flex:1
    },
    bottomInputs:{
        flex:1
    }
})
