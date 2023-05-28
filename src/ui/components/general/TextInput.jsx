import {TextInput as RNTextInput, useTheme} from "react-native-paper";


export const TextInput = (props) => {
    const theme = useTheme();
    const { children, ...rest } = props;
    return (
        <RNTextInput {...rest}
                     mode={"outlined"}
                     outlineColor={theme.colors.off_white}
                     textColor={theme.colors.secondary}
        >
            {children}
        </RNTextInput>
    );
};
