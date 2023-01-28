import { DefaultTheme } from 'react-native-paper';
import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native';
import merge from "deepmerge"

const combinedTheme = merge(DefaultTheme, DefaultNavigationTheme)

const theme = {
    ...combinedTheme,
    colors: {
        ...combinedTheme.colors,
        primary: '#872e2e', 
    },
};


export default theme;