import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";
import {Searchbar} from "react-native-paper";
import {useEffect, useState} from "react";
import {COLORS} from "../../styles/Colors";
import {Base64Image} from "../../components/general/Base64Image";
import {getMovies} from "../../../networking/api/MovieController";

export const MovieSearch = ({navigation}) => {
    const {t} = useTranslation()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    useEffect(()=>{
        getMovies().then(res =>
            setResults(res.data)
        )
        // setResults()
    }, [query])

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar placeholder={t('translation\:owner\.labels\.movieSearch\.searchField')}
                       onChangeText={(q)=>setQuery(q)}
                       value={query} style={styles.searchbar}
                       inputStyle={styles.searchbarInput}
            />
            <ScrollView>
                {
                    results.map((item, i) => {
                        <Base64Image key={"image-" + i} data={item}/>
                    })
                }
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:30
    },
    searchbar:{
        backgroundColor:COLORS.background,
        borderWidth:1,
        borderColor:COLORS.secondary
    },
    searchbarInput:{
        color:COLORS.secondary
    }
})
