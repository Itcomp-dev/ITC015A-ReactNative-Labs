import React, { useEffect } from 'react'
import { BookItem } from "../components/BookItem"
import { FlatList } from "react-native"
import BOOKS from "../data/books.json"
import { useNavigation } from '@react-navigation/native'
import { TouchableRipple } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BooksSelectors } from "../store/selectors/books.selectors"
import { fetchBooks } from '../store/slices/books.slice'

export const BooksList = () => {

    let navigation = useNavigation()
    const books = useSelector(BooksSelectors.selectBooks)
    const dispatch = useDispatch()

    const viewDetails = (book) => {
        navigation.navigate('BookDetail', { book })
    }

    useEffect(() => {
        dispatch(fetchBooks())
    }, [])


    const renderBook = ({ item }) => (
        <TouchableRipple onPress={() => viewDetails(item)}>
            <BookItem title={item.title}
                thumbnailUrl={item.thumbnailUrl}
                shortDescription={item.shortDescription}
                authors={item.authors} />
        </TouchableRipple>

    );

    return <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={item => item.id}
    />
}
