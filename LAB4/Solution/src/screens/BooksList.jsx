import React,  {useState}  from  'react'
import  {BookItem}  from  "../components/BookItem"
import {View} from "react-native"


const bookTitles =  ["Zero to One",  "Rich dad poor dad",  "The midnight library"]

export const BooksList = () => {

    const  [books, setBooks]  =  useState(bookTitles)

    return <View>
            {books.map(book=> <BookItem key={book} title={book} />)}  
    </View>
}