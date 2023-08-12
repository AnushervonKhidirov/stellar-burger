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
    test('register user fulfilled', () => {
        const pendingAction = { type: registerUser.pending.type }
        const fulfilledAction = { type: registerUser.fulfilled.type, payload: userResponse }

        const fulfilledResult = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('register user rejected', () => {
        const pendingAction = { type: registerUser.pending.type }

        const rejectedAction = {
            type: registerUser.rejected.type,
            payload: { message: 'some error message' },
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
        expect(window.alert).toBeCalledTimes(1)
    })
})

describe('login user testing', () => {
    test('login user fulfilled', () => {
        const pendingAction = { type: loginUser.pending.type }
        const fulfilledAction = { type: loginUser.fulfilled.type, payload: userResponse }

        const fulfilledResult = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('login user rejected', () => {
        const pendingAction = { type: loginUser.pending.type }

        const rejectedAction = {
            type: loginUser.rejected.type,
            payload: { message: 'some error message' },
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
        expect(window.alert).toBeCalledTimes(1)
    })
})

describe('logout user testing', () => {
    test('logout user fulfilled', () => {
        const pendingAction = { type: logoutUser.pending.type }
        const fulfilledAction = { type: logoutUser.fulfilled.type, payload: userResponse }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(undefined, fulfilledAction)).toEqual(initialState)
    })

    test('logout user rejected', () => {
        const pendingAction = { type: logoutUser.pending.type }

        const rejectedAction = {
            type: logoutUser.rejected.type,
            payload: { message: 'some error message' },
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
        })

        expect(window.alert).toBeCalledTimes(1)
    })
})

describe('get user testing', () => {
    test('get user fulfilled', () => {
        const pendingAction = { type: getUser.pending.type }
        const fulfilledAction = { type: getUser.fulfilled.type, payload: userResponse }

        const fulfilledResult = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(undefined, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('get user rejected', () => {
        const pendingAction = { type: getUser.pending.type }

        const rejectedAction = {
            type: getUser.rejected.type,
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })
    })
})

describe('update user testing', () => {
    test('update user fulfilled', () => {
        const pendingAction = { type: updateUser.pending.type }
        const fulfilledAction = { type: updateUser.fulfilled.type, payload: userResponse }

        const fulfilledResult = {
            userInfo: userResponse.user,
            isAuthorized: true,
            isAuthChecked: true,
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(undefined, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('update user rejected', () => {
        const pendingAction = { type: updateUser.pending.type }

        const rejectedAction = {
            type: updateUser.rejected.type,
            payload: { message: 'some error message' },
        }

        expect(profileSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(profileSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
            isAuthChecked: true,
        })

        expect(window.alert).toBeCalledTimes(1)
    })
})
