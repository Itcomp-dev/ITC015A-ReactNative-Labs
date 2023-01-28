import { configureStore } from '@reduxjs/toolkit'
import { booksReducer } from './slices/books.slice'


export const store = configureStore({
    reducer: {
        books: booksReducer
    },
  })