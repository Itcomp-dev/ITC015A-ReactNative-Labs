import { createSlice } from '@reduxjs/toolkit'
import Books from "../../data/books.json"
import { getBooks, addBook } from '../actions/books.actions'

const booksInitialState = {
    items: [],
    totalCount: 0,
    loading: false,
    insertStatus: 'idle' //or 'pending', 'fulfilled', 'rejected'
}

const booksSlice = createSlice({
    name: 'books',
    initialState: booksInitialState,
    extraReducers: builder=>{
        builder.addCase(getBooks.pending, (state, action)=>{
            state.loading = true
        });
        builder.addCase(getBooks.fulfilled, (state, action)=>{
            let page = action.payload
            state.items = state.items.concat(page.items)
            state.totalCount = page.totalCount
            state.loading = false 
        });
        builder.addCase(getBooks.rejected, (state, action)=>{
            //TODO handle network errors 
            state.loading = false 
        });
        builder.addCase(addBook.pending, (state, action)=>{
            state.insertStatus = 'pending'
        });
        builder.addCase(addBook.fulfilled, (state, action)=>{
            let book = action.payload
            state.items.unshift(book)
            state.insertStatus = 'fulfilled'
        });
        builder.addCase(addBook.rejected, (state, action)=>{
            state.insertStatus = 'rejected'
        });
    },
    reducers: { 
        
    }
})

export const booksReducer = booksSlice.reducer