import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { registerUser, loginUser, logoutUser, getUser, updateUser } from './action'

interface UserState {
    isAuthChecked: Boolean
    isAuthorized: Boolean
    isLoading: Boolean
    rejected: Boolean
    userInfo: UserInfo | null
}

interface UserInfo {
    name: string
    email: string
}

interface FulfilledPayload {
    success: boolean
    user: UserInfo
    accessToken: string
    refreshToken: string
}

interface UserData {
    success: boolean
    user: UserInfo
}

// interface RejectedPayload {
//     success: boolean
//     message: string
// }

const initialState: UserState = {
    isAuthChecked: false,
    isAuthorized: false,
    isLoading: false,
    rejected: false,
    userInfo: null,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(registerUser.pending, state => {
                state.isLoading = true
                state.rejected = false
                state.isAuthChecked = false
            })
            .addCase(
                registerUser.fulfilled,
                (state, { payload }: PayloadAction<FulfilledPayload>) => {
                    state.isLoading = false
                    state.userInfo = { ...payload.user }
                    state.isAuthorized = true
                    state.isAuthChecked = true
                }
            )
            .addCase(registerUser.rejected, (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false
                state.rejected = true
                alert(payload.message)
                state.isAuthChecked = true
            })

        builder
            .addCase(loginUser.pending, state => {
                state.isLoading = true
                state.rejected = false
                state.isAuthChecked = false
            })
            .addCase(loginUser.fulfilled, (state, { payload }: PayloadAction<FulfilledPayload>) => {
                state.isLoading = false
                state.userInfo = { ...payload.user }
                state.isAuthorized = true
                state.isAuthChecked = true
            })
            .addCase(loginUser.rejected, (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false
                state.rejected = true
                state.isAuthChecked = true
                alert(payload.message)
            })

        builder
            .addCase(logoutUser.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(logoutUser.fulfilled, state => {
                state.isLoading = false
                state.userInfo = null
                state.isAuthorized = false
            })
            .addCase(logoutUser.rejected, (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false
                state.rejected = true
                alert(payload.message)
            })

        builder
            .addCase(getUser.pending, state => {
                state.isLoading = true
                state.rejected = false
                state.isAuthChecked = false
            })
            .addCase(getUser.fulfilled, (state, { payload }: PayloadAction<UserData>) => {
                state.userInfo = { ...payload.user }
                state.isAuthorized = true
                state.isLoading = false
                state.isAuthChecked = true
            })
            .addCase(getUser.rejected, state => {
                state.isLoading = false
                state.rejected = true
                state.isAuthChecked = true
            })

        builder
            .addCase(updateUser.pending, state => {
                state.isLoading = true
                state.rejected = false
                state.isAuthChecked = false
            })
            .addCase(updateUser.fulfilled, (state, { payload }: PayloadAction<UserData>) => {
                state.userInfo = { ...payload.user }
                state.isAuthorized = true
                state.isLoading = false
                state.isAuthChecked = true
            })
            .addCase(updateUser.rejected, (state, { payload }: PayloadAction<any>) => {
                state.isLoading = false
                state.rejected = true
                state.isAuthChecked = true
                alert(payload.message)
            })
    },
})

export { registerUser, loginUser, logoutUser }
export default profileSlice.reducer
