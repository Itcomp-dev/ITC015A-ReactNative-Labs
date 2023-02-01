import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'
import { booksReducer } from './slices/books.slice'


export const store = configureStore({
    reducer: {
        books: booksReducer,
        auth: authReducer
    },
  })