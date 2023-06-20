import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    register,
    logIn,
    logOut,
    getUserData,
    updateUserData,
} from '../utils/burger-api'

const registerUser = createAsyncThunk('profile/register', async (data, { rejectWithValue }) => {
    return register(data, rejectWithValue)
})

const loginUser = createAsyncThunk('profile/login', async (data, { rejectWithValue }) => {
    return logIn(data, rejectWithValue)
})

const logoutUser = createAsyncThunk('profile/logout', async (data, { rejectWithValue }) => {
    return logOut(rejectWithValue)
})

const getUser = createAsyncThunk('profile/getUser', async (data, { rejectWithValue }) => {
    return getUserData(data, rejectWithValue)
})

const updateUser = createAsyncThunk('profile/updateUser', async (data, { rejectWithValue }) => {
    return updateUserData(data, rejectWithValue)
})

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        isAuthorized: false,
        isLoading: false,
        rejected: false,
        useData: null,
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.useData = { ...payload.user }
                state.isAuthorized = true
                localStorage.setItem('accessToken', payload.accessToken.replace('Bearer ', ''))
                localStorage.setItem('refreshToken', payload.refreshToken)
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
                state.useData = { ...payload.user }
                state.isAuthorized = true
                localStorage.setItem('accessToken', payload.accessToken.replace('Bearer ', ''))
                localStorage.setItem('refreshToken', payload.refreshToken)
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
            .addCase(logoutUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.useData = null
                state.isAuthorized = false
                localStorage.clear()
            })
            .addCase(logoutUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })

        builder
            .addCase(getUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.useData = { ...payload.user }
                state.isAuthorized = true
            })
            .addCase(getUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export { registerUser, loginUser, logoutUser, getUser, updateUser }
export const { setUserInfo } = profileSlice.actions
export default profileSlice.reducer
