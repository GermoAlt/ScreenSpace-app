/* eslint-disable prettier/prettier */
import {SafeAreaView} from 'react-native';
import {Button} from '../components/general/Button';
import {useTranslation} from 'react-i18next';

export default function Landing({navigation}) {
  const {t} = useTranslation();

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
