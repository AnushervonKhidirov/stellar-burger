import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { register, logIn, logOut, forgetPassword, resetPassword } from '../utils/burger-api'

const registerUser = createAsyncThunk('auth/register', async (data, rejectWithValue) =>
    register(data, rejectWithValue)
)
const loginUser = createAsyncThunk('auth/login', async (data, rejectWithValue) =>
    logIn(data, rejectWithValue)
)
const logoutUser = createAsyncThunk('auth/logout', async (data, rejectWithValue) =>
    logOut(rejectWithValue)
)
const sendForgetPassword = createAsyncThunk('auth/forget-password', async (data, rejectWithValue) =>
    forgetPassword(data, rejectWithValue)
)
const sendResetPassword = createAsyncThunk('auth/reset-password', async (data, rejectWithValue) =>
    resetPassword(data, rejectWithValue)
)

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
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.rejected = true
                alert(payload.message)
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
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.rejected = true
                alert(payload.message)
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
            .addCase(logoutUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.rejected = true
                alert(payload.message)
            })

        builder
            .addCase(sendForgetPassword.fulfilled, (state, { payload }) => {
                alert(payload.message)
            })
            .addCase(sendForgetPassword.rejected, (state, { payload }) => {
                alert(payload.message)
            })

        builder
            .addCase(sendResetPassword.fulfilled, (state, { payload }) => {
                alert(payload.message)
            })
            .addCase(sendResetPassword.rejected, (state, { payload }) => {
                alert(payload.message)
            })
    },
})

export { registerUser, loginUser, logoutUser, sendForgetPassword, sendResetPassword }
export default authSlice.reducer
