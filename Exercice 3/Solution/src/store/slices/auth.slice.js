import { createSlice } from '@reduxjs/toolkit' 
import {login} from "../actions/auth.actions"

const authInitialState = {
    accessToken : null,
    expiresIn : null,
    userInfo : {
        isAuthenticated: false,
        firstName: "",
        lastName: "",
        email: ""
    },
    loading: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    extraReducers: builder=>{
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true
        });
        builder.addCase(login.fulfilled, (state, action)=>{
            let data = action.payload
            state.accessToken = data.accessToken
            state.expiresIn = data.expiresIn
            state.userInfo = data.userInfo 
            state.loading = false

        });
        builder.addCase(login.rejected, (state, action)=>{
            //TODO handle network errors 
            state.loading = false 
        }); 
    },
    reducers: { 
        
    }
})

export const authReducer = authSlice.reducer