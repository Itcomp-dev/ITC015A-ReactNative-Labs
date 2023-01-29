import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import {View} from "react-native"
import {Headline, Paragraph} from "react-native-paper"
import { Book } from '../store/models/books'

export const BookDetail: React.FC<any> = (props) => {
    let params = useRoute().params as BookDetailParams
    let book = params.book
    return <View>
          <Headline>{book.title}</Headline>
          <Paragraph>{book.longDescription}</Paragraph>
    </View>
}

interface BookDetailParams {
    book: Book
}