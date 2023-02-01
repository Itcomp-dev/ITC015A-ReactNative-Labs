
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signin } from "../datasources/auth.datasource"

export const login = createAsyncThunk('[Auth] login', async (args, thunkApi) => {
    let response = await signin(args.email, args.password);
    console.log(response.data)
    return response.data;
})