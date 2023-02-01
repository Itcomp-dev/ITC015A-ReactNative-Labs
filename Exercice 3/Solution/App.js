import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
import { BooksList } from "./src/screens/BooksList"
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import AppTheme from "./src/consts/app-theme"
import { NavigationContainer } from "@react-navigation/native"
import { AppNavigator } from "./src/navigators/AppNavigator"
import { AuthNavigator } from "./src/navigators/AuthNavigator"
import { Provider as StoreProvider } from 'react-redux'
import { store } from "./src/store"
import { useIsAuthenticated } from "./src/hooks/useIsAuthenticated"


const ProtectedNavigation = () => {
  const isAuthenticated = useIsAuthenticated()
  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />
}

const App = () => { 
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={AppTheme} >
        <NavigationContainer theme={AppTheme}>
          <ProtectedNavigation />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};


export default App;