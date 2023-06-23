/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import {Button} from '../components/general/Button';
import {useTranslation} from 'react-i18next';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useEncryptedStorage from '../../hooks/useEncryptedStorage';

export default function Landing({navigation}) {
  const {t} = useTranslation();
  const { auth } = useAuth()
  const { retrieveUserSession, clearStorage } = useEncryptedStorage()

  const usarAutenticacion = true  // MANDALE FALSE PARA QUE MUESTRE LA LANDING

  useEffect(() => {

    if (usarAutenticacion){
      //clearStorage()
      const getUserData = async () => {
        const user = await retrieveUserSession()
        if (user) {
          navigation.navigate('OwnerNavigator')
        }else{
          navigation.navigate('LoginNavigator')
        }
      }
      getUserData()
    }
    
  }, [])
  

  return (
    <SafeAreaView>
      
      <Button
        icon="movie-roll"
        mode="contained"
        marginLeft={100}
        marginRight={100}
        onPress={() => navigation.navigate('LoginNavigator')}>
        Login Navigator
      </Button>
      <Button
        icon="movie-roll"
        mode="contained"
        marginLeft={100}
        marginRight={100}
        onPress={() => navigation.navigate('OwnerNavigator')}>
        {t('translation:landing.ownerNavigateButton')}
      </Button>
      <Button
        icon="account-circle"
        mode="contained"
        marginLeft={100}
        marginRight={100}
        onPress={() => navigation.navigate('UserNavigator')}>
        {t('translation:landing.userNavigateButton')}
      </Button>
    </SafeAreaView>
  );
}