import * as React from 'react';
import {SafeAreaView, StyleSheet, View, FlatList, ScrollView, Pressable, PermissionsAndroid} from "react-native";
import Geolocation from 'react-native-geolocation-service';
import {useTranslation} from "react-i18next";
import {COLORS} from "../../styles/Colors";
import { CinemaOffersComponent } from '../../components/user/CinemaOffersComponent';
import { Text } from '../../components/general/Text';
import { mock_data } from '../../../assets/data/user_lading';
import { HeaderLogo } from '../../components/general/HeaderLogo';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useGeolocation from '../../../hooks/useGeolocation';
import { getMoviesFiltered } from '../../../networking/api/MovieController';
import { getCinemas } from '../../../networking/api/CinemaController';
import useCinemas from '../../../hooks/useCinemas';

export const UserLanding = ({navigation}) => {
    const {t} = useTranslation();

    const { geolocation, setGeolocation } = useGeolocation()

    const [location, setLocation] = React.useState(false);
    const [errMsg, setErrMsg] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false)

    //const [movieOffer, setMovieOffer] = React.useState(mock_data)
    const [movieOffer, setMovieOffer] = React.useState([])

    const showFilters = () => {
        navigation.navigate('Filters')
    }

    React.useEffect(() => {
        getLocation()
    },[])

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
          //console.log('res is:', res);
          if (res) {
            Geolocation.getCurrentPosition(
              position => {
                setLocation(position);
                setGeolocation(position)

                fetchNearByCinemas(position)
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );


          }
        });
        //console.log(location);
      };

    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: t("translation\:general\.permissions\.geolocation\.title"),
              message: t("translation\:general\.permissions\.geolocation\.message"),
              buttonNeutral: t("translation\:general\.permissions\.geolocation\.buttonNeutral"),
              buttonNegative: t("translation\:general\.permissions\.geolocation\.buttonNegative"),
              buttonPositive: t("translation\:general\.permissions\.geolocation\.buttonPositive"),
            },
          );
          //console.log('granted', granted);
          if (granted === 'granted') {
            console.log('You can use Geolocation');
            return true;
          } else {
            console.log('You cannot use Geolocation');
            return false;
          }
        } catch (err) {
          return false;
        }
    };


    const fetchCinemas = async () => {
        try {
            const response = await getCinemas()
            const allCinemas = response.data.map((item) => { return { id: item.id, title: item.name }})
            console.log('allCinemas', allCinemas)
            setCinemas(allCinemas)

        } catch (error) {
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
        }
    }

    const fetchNearByCinemas = async (geoloc) => {
        console.log('geoLoc', geoloc)

        const body = {
            latitute: geoloc.coords.latitude, //LatituDe misspelled by BE Monkey :)
            longitude: geoloc.coords.longitude,
            maxDistance: '15' // TODO - Migrate to Config File
        }

        setIsLoading(true)
        try {
            const response = await getMoviesFiltered(body)
            response.data.reverse()
            const cinemaOffers = response.data.map((item) => {
                return {
                    id: item.cinema.id,
                    name: item.cinema.name,
                    distance: item.distance,
                    movies: item.movies
                }
            })
            setMovieOffer(cinemaOffers)


        } catch (error) {
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
        }
        setIsLoading(false)

    }
    console.log("mv",movieOffer)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderLogo />
            </View>
            <View style={styles.dualRow}>
                <Text alignment="left" marginTop={35} size="medium">
                    {t("translation\:user\.labels\.landing\.nearBy")}
                </Text>
                <View style={styles.dualRow} marginTop={45}>
                    <Pressable onPress={()=> showFilters()}>
                        <Icon name="filter" style={styles.icon} />
                        <Text alignment="right" size="xxxsmall">
                            {t("translation\:user\.labels\.landing\.filters")}
                        </Text>
                    </Pressable>
                </View>
            </View>
            {movieOffer.length > 0 ?
                <ScrollView>
                    {movieOffer.map((item) =>
                         <CinemaOffersComponent key={item.id} cinemas={item} navigation={navigation}/>
                    )}
                </ScrollView>
                :
                <View>
                    <Text>empty</Text>
                </View>
            }

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 10,
        gap: 15,
        marginBottom: 10,
        flex:1
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
    },
    dualRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 15,
    },
    icon: {
        fontSize:15,
        color:COLORS.off_white,
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
