import {Button as RNButton, useTheme} from "react-native-paper";
import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import { COLORS } from "../../styles/Colors";

export const Button = (props) => {
    const theme = useTheme();
    const borderStylesRadius = 4
    const styles = StyleSheet.create({
        red:{
            buttonColor:theme.colors.primary,
            textColor:theme.colors.secondary,
            borderTopLeftRadius: borderStylesRadius,
            borderTopRightRadius: borderStylesRadius,
            borderBottomLeftRadius: borderStylesRadius,
            borderBottomRightRadius: borderStylesRadius,
        },
        secondary:{
            buttonColor:COLORS.off_white,
            textColor:COLORS.primary,
            borderTopLeftRadius: borderStylesRadius,
            borderTopRightRadius: borderStylesRadius,
            borderBottomLeftRadius: borderStylesRadius,
            borderBottomRightRadius: borderStylesRadius,
        },
        cta:{
            buttonColor:theme.colors.cta,
            textColor:theme.colors.secondary,
            borderTopLeftRadius: borderStylesRadius,
            borderTopRightRadius: borderStylesRadius,
            borderBottomLeftRadius: borderStylesRadius,
            borderBottomRightRadius: borderStylesRadius,
        },
        disabled:{
            buttonColor:theme.colors.primary,
            textColor:theme.colors.secondary,
        }
    })
    const { children, type, ...rest } = props;
    const [buttonStyle, setButtonStyle] = useState(styles.cta)
    const [disabled, setDisabled] = useState(false)


    useEffect(() => {
        switch (type) {
            case 'default':
                setButtonStyle(styles.red);
                setDisabled(false);
                break;
            case 'secondary':
                setButtonStyle(styles.secondary);
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
                  compact
                  borderTopLeftRadius={borderStylesRadius}
                  borderTopRightRadius={borderStylesRadius}
                  borderBottomLeftRadius={borderStylesRadius}
                  borderBottomRightRadius={borderStylesRadius}
        >
            {children}
        </RNButton>
    );

};

