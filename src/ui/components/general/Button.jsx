import {Button as RNButton, useTheme} from "react-native-paper";
import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";

export const Button = (props) => {
    const theme = useTheme();
    const styles = StyleSheet.create({
        red:{
            buttonColor:theme.colors.primary,
            textColor:theme.colors.secondary
        },
        cta:{
            buttonColor:theme.colors.cta,
            textColor:theme.colors.secondary},
        disabled:{
            buttonColor:theme.colors.primary,
            textColor:theme.colors.secondary}
    })
    const { children, type, ...rest } = props;
    const [buttonStyle, setButtonStyle] = useState(styles.cta)
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        switch (type) {
            case 'default':
                setButtonStyle(styles.base);
                setDisabled(false);
                break;
            case 'cta':
                setButtonStyle(styles.cta);
                setDisabled(false);
                break;
            case 'disabled':
                setButtonStyle(styles.disabled);
                setDisabled(true);
                break;
            default:
                setButtonStyle(styles.cta);
                setDisabled(false);
        }
    }, [type]);
    return (
        <RNButton {...rest}
                  buttonColor={buttonStyle.buttonColor}
                  textColor={buttonStyle.textColor}
                  disabled={disabled}
        >
            {children}
        </RNButton>
    );

};

