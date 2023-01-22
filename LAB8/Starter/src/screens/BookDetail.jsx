import { useRoute } from '@react-navigation/native'
import React from 'react'
import {View} from "react-native"
import {Headline, Paragraph} from "react-native-paper"

export const BookDetail = (props) => {
    let route = useRoute()
    let book = route.params?.book
    return <View>
          <Headline>{book.title}</Headline>
          <Paragraph>{book.longDescription}</Paragraph>
    </View>
}