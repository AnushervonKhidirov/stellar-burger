import type {
    IRegisterData,
    ILoginData,
    IUpdateUserData,
    IRejectedValueThunk,
} from '../../utils/interfaces'
import type { TLoginResponse, TLogoutResponse, TUserInfoResponse } from '../../utils/burger-api'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { register, logIn, logOut, getUserData, updateUserData } from '../../utils/burger-api'

export const registerUser = createAsyncThunk<TLoginResponse, IRegisterData, IRejectedValueThunk>(
    'profile/register',
    async (data, { rejectWithValue }) => register(data, rejectWithValue)
)

export const loginUser = createAsyncThunk<TLoginResponse, ILoginData, IRejectedValueThunk>(
    'profile/login',
    async (data, { rejectWithValue }) => logIn(data, rejectWithValue)
)

export const logoutUser = createAsyncThunk<TLogoutResponse, void, IRejectedValueThunk>(
    'profile/logout',
    async (data, { rejectWithValue }) => logOut(rejectWithValue)
)

export const getUser = createAsyncThunk<TUserInfoResponse, void, IRejectedValueThunk>(
    'profile/getUser',
    async (data, { rejectWithValue }) => getUserData(rejectWithValue)
)

export const updateUser = createAsyncThunk<TUserInfoResponse, IUpdateUserData, IRejectedValueThunk>(
    'profile/updateUser',
    async (data, { rejectWithValue }) => updateUserData(data, rejectWithValue)
)
