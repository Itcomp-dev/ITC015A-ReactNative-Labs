import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "../datasources/books.datasources";
import Books from "../../data/books.json"

export const getBooks = createAsyncThunk('[Books] getBooks',  async (args, thunkApi) => {
    let response = await fetchBooks(args.skipCount, args.maxResultCount);
    return response.data;
})