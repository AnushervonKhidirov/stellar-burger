import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserData, updateUserData } from '../utils/burger-api'

const getUser = createAsyncThunk('profile/getUser', async data => getUserData(data))
const updateUser = createAsyncThunk('profile/updateUser', async data => updateUserData(data))

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

export { getUser, updateUser }
export default profileSlice.reducer
