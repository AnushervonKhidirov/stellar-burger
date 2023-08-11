import profileSlice from './slice'
import { registerUser, loginUser, logoutUser, getUser, updateUser } from './action'
import { initialState } from './slice'

const userResponse = {
    success: true,
    user: {
        email: 'test@gmail.com',
        name: 'Tester',
    },
    accessToken: 'Bearer test.test.test',
    refreshToken: 'test.test.test',
}

window.alert = jest.fn()

describe('register user testing', () => {
    test('register user pending', () => {
        const action = { type: registerUser.pending.type }
        expect(profileSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('register user rejected', () => {
        const action = {
            type: registerUser.rejected.type,
            payload: { message: 'some error message' },
        }
        expect(profileSlice(initialState, action)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
        expect(window.alert).toBeCalledTimes(1)
    })

    test('register user fulfilled', () => {
        const action = { type: registerUser.fulfilled.type, payload: userResponse }

        const result = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })
})

describe('login user testing', () => {
    test('login user pending', () => {
        const action = { type: loginUser.pending.type }
        expect(profileSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('login user rejected', () => {
        const action = {
            type: loginUser.rejected.type,
            payload: { message: 'some error message' },
        }
        expect(profileSlice(initialState, action)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
        expect(window.alert).toBeCalledTimes(1)
    })

    test('login user fulfilled', () => {
        const action = { type: loginUser.fulfilled.type, payload: userResponse }

        const result = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })
})

describe('logout user testing', () => {
    test('logout user pending', () => {
        const action = { type: logoutUser.pending.type }
        expect(profileSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('logout user rejected', () => {
        const action = {
            type: logoutUser.rejected.type,
            payload: { message: 'some error message' },
        }
        expect(profileSlice(initialState, action)).toEqual({
            ...initialState,
            rejected: true,
        })
        expect(window.alert).toBeCalledTimes(1)
    })

    test('logout user fulfilled', () => {
        const action = { type: logoutUser.fulfilled.type, payload: userResponse }

        expect(profileSlice(undefined, action)).toEqual(initialState)
    })
})

describe('get user testing', () => {
    test('get user pending', () => {
        const action = { type: getUser.pending.type }
        expect(profileSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('get user rejected', () => {
        const action = {
            type: getUser.rejected.type,
        }
        expect(profileSlice(initialState, action)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
    })

    test('get user fulfilled', () => {
        const action = { type: getUser.fulfilled.type, payload: userResponse }

        const result = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(undefined, action)).toEqual({ ...initialState, ...result })
    })
})

describe('update user testing', () => {
    test('update user pending', () => {
        const action = { type: updateUser.pending.type }
        expect(profileSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('update user rejected', () => {
        const action = {
            type: updateUser.rejected.type,
            payload: { message: 'some error message' },
        }
        expect(profileSlice(initialState, action)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })

        expect(window.alert).toBeCalledTimes(1)
    })

    test('update user fulfilled', () => {
        const action = { type: updateUser.fulfilled.type, payload: userResponse }

        const result = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(undefined, action)).toEqual({ ...initialState, ...result })
    })
})
