import React, { useState, useEffect } from 'react'
import { BookItem } from "../components/BookItem"
import { FlatList } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { TouchableRipple, FAB } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BooksSelectors } from "../store/selectors/books.selectors"
import { getBooks } from '../store/actions/books.actions'
import { RefreshControl } from 'react-native-gesture-handler'
import { Book } from '../store/models/books'

export const BooksList = () => {

    const [pageIndex, setPageIndex] = useState(0)

    let navigation = useNavigation<any>()
    const books = useSelector(BooksSelectors.selectBooks)
    const isLoading = useSelector(BooksSelectors.selectBooksLoading)

    const dispatch = useDispatch<any>()

    const viewDetails = (book) => {
        navigation.navigate('BookDetail', { book })
    }

    useEffect(() => {
        dispatch(getBooks({
            skipCount: pageIndex * 10,
            maxResultCount: 10
        }))
    }, [pageIndex])




    const renderBook = ({ item }) => {
        let book= item as Book;
        return <TouchableRipple onPress={() => viewDetails(book)}>
            <BookItem title={book.title}
                thumbnailUrl={book.thumbnailUrl}
                shortDescription={book.shortDescription}
                authors={book.authors} />
        </TouchableRipple>
    }


    const addNewBook = () => {
        navigation.navigate('NewBook')
    }

    return <>
        <FlatList
            data={books}
            renderItem={renderBook}
            keyExtractor={item => item.id}
            onEndReached={() => setPageIndex(pageIndex + 1)}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={isLoading} />}
        />
        <FAB
            style={{ position: 'absolute', right: 16, bottom: 16 }}
            icon="plus"
            onPress={addNewBook}
        />

    </>
}
