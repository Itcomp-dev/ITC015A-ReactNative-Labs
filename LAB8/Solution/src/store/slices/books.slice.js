import { createSlice } from '@reduxjs/toolkit'
import Books from "../../data/books.json"

const booksInitialState = {
    items: [],
    totalCount: 0,
    loading: false,
}

const booksSlice = createSlice({
    name: 'books',
    initialState: booksInitialState,
    reducers: {
        fetchBooks(state) {
            state.items = Books
            state.totalCount = Books.length
        },
        addBook(state, action) {
            state.items.push(action.payload)
            state.totalCount += 1
        },
    }
})

export const {fetchBooks, addBook} = booksSlice.actions;
 export const booksReducer = booksSlice.reducer