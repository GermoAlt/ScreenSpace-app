import React from "react";
import {SafeAreaView, View, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {Text} from "../../components/general/Text";
import {SecureTextInput} from "../../components/general/SecureTextInput";
import {TextInput} from "../../components/general/TextInput";
import {Button} from "../../components/general/Button";
import {HeaderLogo} from "../../components/general/HeaderLogo";

export default function ChangePassword({navigation}) {
  const {t} = useTranslation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HeaderLogo />
      </View>
      <View style={styles.form}>
        <Text
          alignment="center"
          marginBottom={10}
          textColorMode
          size="medium">
          {t("translation:login.labels.register.changePasswordTitleText")}
        </Text>

        <TextInput
          label={t("translation:login.labels.login.emailPlaceholder")}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <SecureTextInput
          label={t("translation:login.labels.login.passwordPlaceholder")}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <SecureTextInput
          label={t("translation:login.labels.register.confirmPassword")}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        <Button
          mode="contained"
          marginTop={20}
          marginLeft={100}
          marginRight={100}
          onPress={() => navigation.navigate("Login")}>
          {t("translation:login.captions.register.registerButton")}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 35,
  },
  form: {
    justifyContent: "center",
    width: "80%",
    rowGap: 20,
  },
});
