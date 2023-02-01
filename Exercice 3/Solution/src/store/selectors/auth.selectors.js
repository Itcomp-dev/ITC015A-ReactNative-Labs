import { createSelector } from '@reduxjs/toolkit'

const authState = (state) => state.auth



const selectAccessToken = createSelector(authState, (state) => state.accessToken) 
const selectTokenExpiration = createSelector(authState, (state) => state.expiresIn)
const selectUserInfo = createSelector(authState, (state) => state.userInfo)
const selectLoading = createSelector(authState, (state) => state.loading)

export const AuthSelectors = {
    selectAccessToken,
    selectTokenExpiration,
    selectUserInfo,
    selectLoading
}