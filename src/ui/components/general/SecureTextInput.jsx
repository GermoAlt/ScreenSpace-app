import {TextInput as RNTextInput, useTheme} from "react-native-paper";
import {useState} from "react";
import {TextInput} from "./TextInput";


export const SecureTextInput = (props) => {
    const theme = useTheme();
    const [hidden, setHidden] = useState(true)
    const { children, ...rest } = props;
    return (
        <TextInput {...rest}
                     secureTextEntry={hidden}
                     right={
                         <RNTextInput.Icon
                             icon={hidden ? 'eye' : 'eye-off'}
                             onPress={() => setHidden(!hidden)}
                             forceTextInputFocus={false}
                         />
                     }
        >
            {children}
        </TextInput>
    );
};
