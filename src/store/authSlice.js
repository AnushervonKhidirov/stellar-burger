import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, logIn, logOut } from '../utils/burger-api'

const registerUser = createAsyncThunk('profile/register', async data => register(data))
const loginUser = createAsyncThunk('profile/login', async data => logIn(data))
const logoutUser = createAsyncThunk('profile/logout', async () => logOut())

const authSlice = createSlice({
    name: 'profile',
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

export { registerUser, loginUser, logoutUser }
export default authSlice.reducer
