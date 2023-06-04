import {Text as RNText, useTheme} from "react-native-paper";

export const Text = (props) => {
    const theme = useTheme();
    const { children, size, textColorMode, ...rest } = props;

    const mappedVariant = {
        xxsmall: "titleMedium",
        xsmall: "titleLarge",
        small: "headlineSmall",
        medium: "headlineMedium", 
        large: "headlineLarge", 
        xlarge: "displayMedium",
        xxlarge: "displayLarge"
    }

    const styledText = () => {
        const textArray = children.split(' ')
        let firstPart = ''
        let lastPart = ''
        if (textArray.length === 1) {
            lastPart = textArray[0];
        }else{
            firstPart = textArray.slice(0, textArray.length - 1).join(' ')
            lastPart = ' ' + textArray.slice(-1)
        } 
        
        return (
            <RNText {...rest} variant={mappedVariant[size]} style={{textAlign: rest.alignment, color:theme.colors.secondary}}>{firstPart}<RNText style={{color:theme.colors.primary}}>{lastPart}</RNText></RNText>
        )
    }

    return (
        <>
            { textColorMode ? (
                styledText()
            ) :
            (
                <RNText {...rest} 
                variant={mappedVariant[size]}
                style={{
                    color:theme.colors.secondary,
                    textAlign: rest.alignment
                }}>
                    {children}
                </RNText>
            )}
        </>
    );
};