import type {
    IToken,
    TRejectedWithValue,
    IRejectedWithValueObj,
    ILoginData,
    IRegisterData,
    IUpdateUserData,
    IError,
    IFetchOptions,
    Ingredient,
} from './interfaces'

import { IUserInfo } from '../services/user/slice'

const setToken = (result: IToken) => {
    localStorage.setItem('accessToken', result.accessToken.replace('Bearer ', ''))
    localStorage.setItem('refreshToken', result.refreshToken)
}

export const API_URL = 'https://norma.nomoreparties.space/api'

export const checkResponse = <T>(res: Response, rejectWithValue?: TRejectedWithValue): Promise<T> =>
    res.ok
        ? res.json()
        : res.json().then((err: IError) => {
              return rejectWithValue ? rejectWithValue(err) : Promise.reject(err)
          })

export type TServerResponse<T> = { success: boolean } & T
export type TServerResponseMessage = { message: string }

type TIngredientsResponse = TServerResponse<{ data: Ingredient[] }>
export type TOrderResponse = TServerResponse<{ name: string; order: { number: number } }>
type TUserInfoResponse = TServerResponse<{ user: IUserInfo }>
type TLoginResponse = TServerResponse<TUserInfoResponse & IToken>
type TLogoutResponse = TServerResponse<TServerResponseMessage>
type TUpdateToken = TServerResponse<IToken>

export const fetchIngredients = async () => {
    const res = await fetch(`${API_URL}/ingredients`)
    const result = await checkResponse<TIngredientsResponse>(res)
    return result.data
}

export const fetchOrder = async (
    ingredientsID: string[],
    rejectWithValue: TRejectedWithValue
) => {
    const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify({ ingredients: ingredientsID }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse<TOrderResponse>(res, rejectWithValue)
}

export const fetchOrderDetail = async (orderID: string) => {
    const res = await fetch(`${API_URL}/orders/${orderID}`)
    return await checkResponse<Ingredient>(res)
}

export const register = async (data: IRegisterData, { rejectWithValue }: IRejectedWithValueObj) => {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse<TLoginResponse>(res, rejectWithValue)
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

    const result = await checkResponse<TLoginResponse>(res, rejectWithValue)
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

    const result = await checkResponse<TLogoutResponse>(res, rejectWithValue)
    if (result.success) localStorage.clear()

    return result
}

export const getUserData = async ({ rejectWithValue }: IRejectedWithValueObj) => {
    return fetchWithRefresh<TUserInfoResponse>(
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

    return fetchWithRefresh<TUserInfoResponse>(
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

const updateToken = async () => {
    const res = await fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    return await checkResponse<TUpdateToken>(res)
}

const fetchWithRefresh = async <T>(
    url: string,
    options: IFetchOptions,
    rejectWithValue: TRejectedWithValue
) => {
    try {
        const res = await fetch(url, options)
        return await checkResponse<T>(res)
    } catch (err: any) {
        if (err.message === 'jwt expired') {
            const refreshData = await updateToken()

            if (!refreshData.success) return Promise.reject(refreshData)
            setToken(refreshData)

            options.headers.authorization = refreshData.accessToken

            const res = await fetch(url, options)
            return await checkResponse<T>(res, rejectWithValue)
        } else {
            return Promise.reject(err)
        }
    }
}
