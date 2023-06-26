import {SafeAreaView, ScrollView} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useTranslation} from "react-i18next";
import {Searchbar} from "react-native-paper";
import {useState} from "react";

export const MovieSearch = ({navigation}) => {
    // const {t} = useTranslation()
    // const [query, setQuery] = useState("")
    // const [results, setResults] = useState([])
    return (
        <SafeAreaView>
            {/*<Searchbar placeholder={t('translation\:owner\.labels\.movieSearch\.searchField')}*/}
            {/*           onChangeText={(q)=>setQuery(q)}*/}
            {/*           value={query}*/}
            {/*/>*/}
            {/*<ScrollView>*/}
            {/*    {*/}
            {/*        //results.map((item, i) => <Image key={"image-"+i}></Image>)*/}
            {/*    }*/}
            {/*</ScrollView>*/}
        </SafeAreaView>
    )

}
