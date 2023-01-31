import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
import { BooksList } from "./src/screens/BooksList"
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import AppTheme from "./src/consts/app-theme"
import { NavigationContainer } from "@react-navigation/native"
import { AppNavigator } from "./src/navigators/AppNavigator"
import { Provider as StoreProvider } from 'react-redux'
import {store} from "./src/store"

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={AppTheme} >
        <NavigationContainer theme={AppTheme}>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;