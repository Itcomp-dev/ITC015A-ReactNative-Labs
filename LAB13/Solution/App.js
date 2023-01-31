import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react' 
import { Provider as PaperProvider } from 'react-native-paper';
import AppTheme from "./src/consts/app-theme"
import { NavigationContainer } from "@react-navigation/native"
import { Provider as StoreProvider } from 'react-redux'
import { store } from "./src/store"
import {changeCulture} from "./src/locales"
import { AppNavigator } from "./src/navigators/AppNavigator"



const App = () => {

  const [lang, setLang] = useState(null);

  useEffect(() => {
    changeCulture(lang)
  }, [lang])

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