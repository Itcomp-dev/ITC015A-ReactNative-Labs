
import React from 'react'
import { SafeAreaView, StatusBar, View, Dimensions } from "react-native"
import { BooksList } from "./src/screens/BooksList"
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import AppTheme from "./src/consts/app-theme"

const App = () => {
  return (
     <PaperProvider theme={AppTheme} >
       <Appbar.Header>
		          <Appbar.Content title="BooksApp" />
		    </Appbar.Header>
       <BooksList />  
    </PaperProvider>
  );
};

export default App;