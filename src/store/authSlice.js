import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, logIn, logOut, forgetPassword, resetPassword } from '../utils/burger-api'

const registerUser = createAsyncThunk('auth/register', async data => register(data))
const loginUser = createAsyncThunk('auth/login', async data => logIn(data))
const logoutUser = createAsyncThunk('auth/logout', async () => logOut())
const sendForgetPassword = createAsyncThunk('auth/forget-password', async data => forgetPassword(data))
const sendResetPassword = createAsyncThunk('auth/reset-password', async data => resetPassword(data) )

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthorized: false,
        isLoading: false,
        rejected: false,
        userData: null,
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.userData = { ...payload.user }
                state.isAuthorized = true
            })
            .addCase(registerUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })

        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.userData = { ...payload.user }
                state.isAuthorized = true
            })
            .addCase(loginUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })

        builder
            .addCase(logoutUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(logoutUser.fulfilled, state => {
                state.isLoading = false
                state.userData = null
                state.isAuthorized = false
            })
            .addCase(logoutUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export { registerUser, loginUser, logoutUser, sendForgetPassword, sendResetPassword }
export default authSlice.reducer
