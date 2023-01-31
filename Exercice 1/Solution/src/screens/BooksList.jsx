import React, { useState } from 'react'
import { BookItem } from "../components/BookItem"
import { FlatList } from "react-native"
import BOOKS from "../data/books.json"
import { useNavigation } from '@react-navigation/native'
import { TouchableRipple } from 'react-native-paper'

export const BooksList = () => {

    let navigation = useNavigation()
    const [books, setBooks] = useState(BOOKS)

    const viewDetails = (book) => {
        navigation.navigate('BookDetail', { book })
    }

    const renderBook = ({ item }) => (
        <TouchableRipple onPress={() => viewDetails(item)}>
            <BookItem title={item.title}
                thumbnailUrl={item.thumbnailUrl}
                shortDescription={item.shortDescription}
                longDescription={item.longDescription}
                publishedDate={item.publishedDate}
                categories={item.categories}
                authors={item.authors} />
        </TouchableRipple>

    );

    return <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={item => item.id}
    />
}
