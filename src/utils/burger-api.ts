import type {
    IToken,
    TRejectedWithValue,
    ILoginData,
    IRegisterData,
    IUpdateUserData,
    IError,
    IFetchOptions,
    Ingredient,
} from './interfaces'

import type { IOrderPayload, IGetOrderPayload } from '../services/orders/slice'

import {
    INGREDIENTS_URL,
    ORDERS_URL,
    REGISTER_URL,
    LOGIN_URL,
    LOGOUT_URL,
    USER_URL,
    UPDATE_TOKEN_URL,
    JWT_EXPIRED_MESSAGE,
    accessToken,
    refreshToken,
} from './constants'

import { IUserInfo } from '../services/user/slice'

const setToken = (result: IToken) => {
    localStorage.setItem('accessToken', result.accessToken.replace('Bearer ', ''))
    localStorage.setItem('refreshToken', result.refreshToken)
}

export const checkResponse = <T>(res: Response, rejectWithValue?: TRejectedWithValue): Promise<T> =>
    res.ok
        ? res.json()
        : res.json().then((err: IError) => {
              return rejectWithValue ? rejectWithValue(err) : Promise.reject(err)
          })

export type TServerResponse<T> = { success: boolean } & T
export type TServerResponseMessage = { message: string }

export type TIngredientsResponse = TServerResponse<{ data: Ingredient[] }>
export type TOrderResponse = TServerResponse<IOrderPayload>
export type TGetOrderResponse = TServerResponse<IGetOrderPayload>
export type TUserInfoResponse = TServerResponse<{ user: IUserInfo }>
export type TLoginResponse = TServerResponse<TUserInfoResponse & IToken>
export type TLogoutResponse = TServerResponse<TServerResponseMessage>
export type TUpdateToken = TServerResponse<IToken>

export const fetchIngredients = async () => {
    const res = await fetch(INGREDIENTS_URL)
    const result = await checkResponse<TIngredientsResponse>(res)
    return result.data
}

export const fetchOrder = async (ingredientsID: string[], rejectWithValue: TRejectedWithValue) => {
    return fetchWithRefresh<TOrderResponse>(
        ORDERS_URL,
        {
            method: 'POST',
            body: JSON.stringify({ ingredients: ingredientsID }),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${accessToken}`,
            },
        },
        rejectWithValue
    )
}

export const fetchOrderDetail = async (orderID: string, rejectWithValue: TRejectedWithValue) => {
    const res = await fetch(`${ORDERS_URL}/${orderID}`)
    return await checkResponse<TGetOrderResponse>(res, rejectWithValue)
}

export const register = async (data: IRegisterData, rejectWithValue: TRejectedWithValue) => {
    const res = await fetch(REGISTER_URL, {
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

export const logIn = async (data: ILoginData, rejectWithValue: TRejectedWithValue) => {
    const res = await fetch(LOGIN_URL, {
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

export const logOut = async (rejectWithValue: TRejectedWithValue) => {
    const res = await fetch(LOGOUT_URL, {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })

    const result = await checkResponse<TLogoutResponse>(res, rejectWithValue)
    if (result.success) localStorage.clear()

    return result
}

export const getUserData = async (rejectWithValue: TRejectedWithValue) => {
    return fetchWithRefresh<TUserInfoResponse>(
        USER_URL,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${accessToken}`,
            },
        },
        rejectWithValue
    )
}

export const updateUserData = async (
    data: IUpdateUserData,
    rejectWithValue: TRejectedWithValue
) => {
    if (Object.keys(data).length === 0) return rejectWithValue({ message: 'Nothing to change' })

    return fetchWithRefresh<TUserInfoResponse>(
        USER_URL,
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${accessToken}`,
            },
        },
        rejectWithValue
    )
}

const updateToken = async () => {
    const res = await fetch(UPDATE_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify({ token: refreshToken }),
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
        if (err.message === JWT_EXPIRED_MESSAGE) {
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
