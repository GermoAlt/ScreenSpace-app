import {Pressable, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {Button} from "../general/Button";
import {useTranslation} from "react-i18next";
import {CinemaListItem} from "./CinemaListItem";
import {NewCinemaPanelButton} from "./NewCinemaPanelButton";

export const CinemaList = (props) => {
    const {t} = useTranslation()
    return (
        <SafeAreaView style={styles.container}>
            {props.data && props.data.length === 0 ?
                <View>
                    <Text></Text>
                    <Button type={"cta"} onPress={()=>props.navigateTo("NewCinema")}>
                        {t("translation\:owner\.landing\.addCinemaButton")}
                    </Button>
                </View>
            :
                <ScrollView contentContainerStyle={styles.cinemaList}>
                    {drawCinemaListItems(props.data)}
                    <NewCinemaPanelButton />
                </ScrollView>}
        </SafeAreaView>
    );
};

const drawCinemaListItems = (list) => {
    return list.map((item) => <CinemaListItem data={item} key={item.id}/>)
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginTop:10
    },
    cinemaList: {
        display:"flex",
        flexDirection:"column",
        gap:20
    }
})
