import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks, insertBook } from "../datasources/books.datasources";
import { Book, PagedResult } from "../models/books";

export const getBooks = createAsyncThunk<PagedResult<Book>, any>('[Books] getBooks', async (args, thunkApi) => {
    let response = await fetchBooks(args.skipCount, args.maxResultCount);
    return response.data;
})

export const addBook = createAsyncThunk<Book, {book:Book}>('[Books] addBook', async (args, thunkApi) => {
    let response = await insertBook(args.book);
    return response.data;
})