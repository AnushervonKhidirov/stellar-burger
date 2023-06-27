import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    register,
    logIn,
    logOut,
    getUserData,
    updateUserData,
} from '../../utils/burger-api'

const registerUser = createAsyncThunk('profile/register', async (data, rejectWithValue) =>
    register(data, rejectWithValue)
)
const loginUser = createAsyncThunk('profile/login', async (data, rejectWithValue) =>
    logIn(data, rejectWithValue)
)
const logoutUser = createAsyncThunk('profile/logout', async (data, rejectWithValue) =>
    logOut(rejectWithValue)
)
const getUser = createAsyncThunk('profile/getUser', async (data, rejectWithValue) =>
    getUserData(rejectWithValue)
)
const updateUser = createAsyncThunk('profile/updateUser', async (data, rejectWithValue) =>
    updateUserData(data, rejectWithValue)
)

export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    updateUser,
}
