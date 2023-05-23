import {Button as RNButton, useTheme} from "react-native-paper";

export const Button = (props) => {
    const theme = useTheme();
    const { children, ...rest } = props;
    return (
        <RNButton {...rest}
                  buttonColor={theme.colors.primary}
                  textColor={theme.colors.secondary}
        >
            {children}
        </RNButton>
    );
};
