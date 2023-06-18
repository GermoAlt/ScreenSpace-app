import React, {useRef} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Text} from "../../components/general/Text";
import {TextInput} from "../../components/general/TextInput";
import {Button} from "../../components/general/Button";
import {HeaderLogo} from '../../components/general/HeaderLogo';

export default function RegisterCode({navigation}) {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderLogo />
      </View>
      <Text alignment="center" marginBottom={20} textColorMode size="large">
        {t("translation:login.labels.register.securityCodeText")}
      </Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <TextInput
            autoFocus={true}
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
          <TextInput
            maxLength={1}
            textAlign="center"
            keyboardType="numeric"
          />
        </View>

        <Text alignment="center" size="xxxsmall">
          {t("translation:login.labels.register.securityCodeDescription")}
        </Text>

        <Button
          mode="contained"
          disabled
          marginLeft={100}
          marginRight={100}
          onPress={() => navigation.navigate('ChangePassword')}>
          {t("translation:login.captions.register.registerButton")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 35,
  },
  form: {
    justifyContent: 'center',
    width: '90%',
    rowGap: 40,
  },
  row: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 7,
  },
});
