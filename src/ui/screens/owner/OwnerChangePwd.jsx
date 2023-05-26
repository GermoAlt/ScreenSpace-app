import {SafeAreaView, View} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useState} from "react";
import {SecureTextInput} from "../../components/general/SecureTextInput";
import {Button} from "../../components/general/Button";

export const OwnerChangePwd = () => {
    const[data, setData] = useState(
        {"email":"", "currPwd":"", "newPwd":"", "newPwdConfirm":""})

    const handleChange = (key, value) => {
        setData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    }

    return (
        <SafeAreaView>
            <View>
            <TextInput value={data.email} editable={false} label={"Email"}></TextInput>
            <SecureTextInput value={data.currPwd}
                             label={"Contraseña Actual"}
                             onChangeText={value => handleChange('currPwd', value)}
            />
            <SecureTextInput value={data.newPwd}
                             label={"Contraseña nueva"}
                             onChangeText={value => handleChange('newPwd', value)}
            />
            <SecureTextInput value={data.newPwdConfirm}
                             label={"Confirmar contraseña"}
                             onChangeText={value => handleChange('newPwdConfirm', value)}
            />
            </View>
            <View>
                <Button>Cambiar contraseña</Button>
            </View>
        </SafeAreaView>
    );
};
