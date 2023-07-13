import type {
    IToken,
    TRejectedWithValue,
    IRejectedWithValueObj,
    ILoginData,
    IRegisterData,
    IUpdateUserData,
    IForgotPassword,
    IResetPassword,
    IError,
    IFetchOptions,
} from './interfaces'

const setToken = (result: IToken) => {
    localStorage.setItem('accessToken', result.accessToken.replace('Bearer ', ''))
    localStorage.setItem('refreshToken', result.refreshToken)
}

export const API_URL = 'https://norma.nomoreparties.space/api'

export const checkResponse = (res: Response, rejectWithValue?: TRejectedWithValue) =>
    res.ok
        ? res.json()
        : res.json().then((err: IError) => {
              return rejectWithValue ? rejectWithValue(err) : Promise.reject(err)
          })

export const fetchIngredients = async () => {
    const res = await fetch(`${API_URL}/ingredients`)
    const result = await checkResponse(res)
    return result.data
}

export const fetchOrder = async (
    ingredientsID: string[],
    { rejectWithValue }: IRejectedWithValueObj
) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({ ingredients: ingredientsID }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res, rejectWithValue)
}

export const fetchOrderDetail = async (orderID: string) => {
    const res = await fetch(`${API_URL}/orders/${orderID}`)
    return await checkResponse(res)
}

export const register = async (data: IRegisterData, { rejectWithValue }: IRejectedWithValueObj) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) setToken(result)

    return result
}

export const logIn = async (data: ILoginData, { rejectWithValue }: IRejectedWithValueObj) => {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) setToken(result)

    return result
}

export const logOut = async ({ rejectWithValue }: IRejectedWithValueObj) => {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse(res, rejectWithValue)
    if (result.success) localStorage.clear()

    return result
}

export const getUserData = async ({ rejectWithValue }: IRejectedWithValueObj) => {
    return fetchWithRefresh(
        `${API_URL}/auth/user`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
        rejectWithValue
    )
}

export const updateUserData = async (
    data: IUpdateUserData,
    { rejectWithValue }: IRejectedWithValueObj
) => {
    if (Object.keys(data).length === 0) return rejectWithValue({ message: 'Nothing to change' })

    return fetchWithRefresh(
        `${API_URL}/auth/user`,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
        rejectWithValue
    )
}

export const forgetPassword = async (
    data: IForgotPassword,
    { rejectWithValue }: IRejectedWithValueObj
) => {
    if (data.email === '') return rejectWithValue({ message: 'Please enter your email' })

    const res = await fetch(`${API_URL}/password-reset`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res, rejectWithValue)
}

export const resetPassword = async (
    data: IResetPassword,
    { rejectWithValue }: IRejectedWithValueObj
) => {
    const res = await fetch(`${API_URL}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res, rejectWithValue)
}

const updateToken = async () => {
    const res = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse(res)
}

const fetchWithRefresh = async (
    url: string,
    options: IFetchOptions,
    rejectWithValue: TRejectedWithValue
) => {
    try {
        const res = await fetch(url, options)
        return await checkResponse(res)
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await updateToken()

            if (!refreshData.success) return Promise.reject(refreshData)
            setToken(refreshData)

            options.headers.authorization = refreshData.accessToken

            const res = await fetch(url, options)
            return await checkResponse(res, rejectWithValue)
        } else {
            return Promise.reject(err)
        }
    }
}
