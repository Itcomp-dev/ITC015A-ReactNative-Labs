import React, { useState, useEffect } from 'react'
import { BookItem } from "../components/BookItem"
import { FlatList } from "react-native"
import BOOKS from "../data/books.json"
import { useNavigation } from '@react-navigation/native'
import { Searchbar, TouchableRipple } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { BooksSelectors } from "../store/selectors/books.selectors"
import { clearBooks, fetchBooks } from '../store/slices/books.slice'
import { getBooks } from '../store/actions/books.actions'
import { RefreshControl } from 'react-native-gesture-handler'

export const BooksList = () => {

    const [pageIndex, setPageIndex] = useState(0)

    let navigation = useNavigation()
    const books = useSelector(BooksSelectors.selectBooks)
    const isLoading = useSelector(BooksSelectors.selectBooksLoading)

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const dispatch = useDispatch()

    const viewDetails = (book) => {
        navigation.navigate('BookDetail', { book })
    }

    useEffect(() => {
        dispatch(getBooks({
            skipCount: pageIndex * 10,
            maxResultCount: 10,
            filter: searchQuery
        }))
    }, [pageIndex])


    useEffect(() => {
        if (!isLoading) {
            dispatch(clearBooks())
            dispatch(getBooks({
                skipCount: pageIndex * 10,
                maxResultCount: 10,
                filter: searchQuery
            }))
        }
    }, [searchQuery])




    const renderBook = ({ item }) => (
        <TouchableRipple onPress={() => viewDetails(item)}>
            <BookItem title={item.title}
                thumbnailUrl={item.thumbnailUrl}
                shortDescription={item.shortDescription}
                authors={item.authors} />
        </TouchableRipple>
    );


    return <>
        <Searchbar
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={searchQuery} />
        <FlatList
            data={books}
            renderItem={renderBook}
            keyExtractor={item => item.id}
            onEndReached={() => setPageIndex(pageIndex + 1)}
            onEndReachedThreshold={0.5}
            refreshControl={<RefreshControl refreshing={isLoading} />}
        />
    </>
}
