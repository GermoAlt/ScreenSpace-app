import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {HeaderLogo} from "../../components/general/HeaderLogo";
import {getReviewsByMovie} from "../../../networking/api/ReviewController";
import {useEffect, useState} from "react";
import {ReviewListItem} from "../../components/user/ReviewListItem";
import {Text} from "react-native-paper";

export const MovieReviews = ({route, navigation}) => {
    const {movie} = route.params
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        getReviewsByMovie(movie.id).then((res)=>{
            setReviews(res.data)
        }).catch((error)=>{
            console.error(error)
        })
    }, [])

    return (
        <SafeAreaView>
            <HeaderLogo/>
            <ScrollView contentContainerStyle={styles.container}>
                {
                    reviews.length > 0 ?
                        reviews.map((item)=> { return <ReviewListItem review={item} key={item.id} />
                        })
                        :
                        <View>
                            <Text>
                                No reviews
                            </Text>
                        </View>
                }
            </ScrollView>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container:{
        paddingVertical:20
    }
})
