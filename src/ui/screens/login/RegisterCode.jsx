import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Text} from '../../components/general/Text';
import {TextInput} from '../../components/general/TextInput';
import {Button} from '../../components/general/Button';

export default function RegisterCode({navigation}) {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <Text alignment="center" textColorMode size="large">
        {t('translation:login.labels.register.securityCodeText')}
      </Text>

      <View style={styles.row}>
        <TextInput maxLength={1} textAlign="center" />
        <TextInput maxLength={1} textAlign="center" />
        <TextInput maxLength={1} textAlign="center" />
        <TextInput maxLength={1} textAlign="center" />
        <TextInput maxLength={1} textAlign="center" />
        <TextInput maxLength={1} textAlign="center" />
      </View>

      <Text alignment="center" size="xxsmall">
        {t('translation:login.labels.register.securityCodeDescription')}
      </Text>

      <Button
        mode="contained"
        disabled
        marginLeft={100}
        marginRight={100}>
        {t('translation:login.captions.register.registerButton')}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 7
  }
});
