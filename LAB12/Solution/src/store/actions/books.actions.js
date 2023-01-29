import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks, insertBook } from "../datasources/books.datasources";
import Books from "../../data/books.json"

export const getBooks = createAsyncThunk('[Books] getBooks', async (args, thunkApi) => {
    let response = await fetchBooks(args.skipCount, args.maxResultCount);
    return response.data;
})

export const addBook = createAsyncThunk('[Books] addBook', async (args, thunkApi) => {
    let response = await insertBook(args.book);
    return response.data;
})