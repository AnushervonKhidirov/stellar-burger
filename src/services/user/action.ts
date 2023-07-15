import type { IRegisterData, ILoginData, IUpdateUserData } from '../../utils/interfaces'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { register, logIn, logOut, getUserData, updateUserData } from '../../utils/burger-api'

export const registerUser = createAsyncThunk(
    'profile/register',
    async (data: IRegisterData, rejectWithValue) => register(data, rejectWithValue)
)
export const loginUser = createAsyncThunk(
    'profile/login',
    async (data: ILoginData, rejectWithValue) => logIn(data, rejectWithValue)
)
export const logoutUser: any = createAsyncThunk(
    'profile/logout',
    async (data: unknown, rejectWithValue) => logOut(rejectWithValue)
)
export const getUser: any = createAsyncThunk('profile/getUser', async (data: unknown, rejectWithValue) =>
    getUserData(rejectWithValue)
)
export const updateUser: any = createAsyncThunk(
    'profile/updateUser',
    async (data: IUpdateUserData, rejectWithValue) => updateUserData(data, rejectWithValue)
)
