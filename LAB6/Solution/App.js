
import React from 'react'
import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
import { BooksList } from "./src/screens/BooksList"
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import AppTheme from "./src/consts/app-theme"
import { NavigationContainer } from "@react-navigation/native"
import { HomeNavigator } from "./src/navigators/HomeNavigator"


const App = () => {
  return (
    <PaperProvider theme={AppTheme} >
      <NavigationContainer theme={AppTheme}>
        <HomeNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;