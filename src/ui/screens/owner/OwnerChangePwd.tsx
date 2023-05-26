import {SafeAreaView} from "react-native";
import {TextInput} from "../../components/general/TextInput";
import {useState} from "react";
import {SecureTextInput} from "../../components/general/SecureTextInput";

export const OwnerChangePwd = () => {
    const[data, setData] = useState(
        {"email":"", "currPwd":"", "newPwd":"", "newPwdConfirm":""})
    return (
        <SafeAreaView>
            <TextInput value={data.email} editable={false} label={"Email"}></TextInput>
            <SecureTextInput secureTextEntry={true} value={data.currPwd} label={"Contraseña Actual"}></SecureTextInput>
            <SecureTextInput secureTextEntry={true} value={data.newPwd} label={"Contraseña nueva"}></SecureTextInput>
            <SecureTextInput secureTextEntry={true} value={data.newPwdConfirm} label={"Confirmar contraseña"}></SecureTextInput>


        </SafeAreaView>
    );
};
