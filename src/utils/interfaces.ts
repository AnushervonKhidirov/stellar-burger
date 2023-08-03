import { loginUser, registerUser } from '../services/user/action'
// import type { TLoginResponse } from './burger-api'

export interface Ingredient {
    readonly _id: string
    readonly name: string
    readonly type: IngredientCategories
    readonly proteins: number
    readonly fat: number
    readonly carbohydrates: number
    readonly calories: number
    readonly price: number
    readonly image: string
    readonly image_mobile: string
    readonly image_large: string
    readonly __v: number
    readonly key?: string
}

export interface IFooterText {
    readonly text: string
    readonly link: {
        readonly title: string
        readonly href: string
    }
}

export interface IFormInput {
    readonly type: 'text' | 'email' | 'password'
    readonly name: string
    readonly placeholder: string
}

export interface ICategoriesPosition {
    readonly category: IngredientCategories
    top: number
    bottom: number
}

export type IngredientCategories = Readonly<'bun' | 'sauce' | 'main'>
export type TCloseModal = () => void

// api
export interface IToken {
    readonly accessToken: string
    readonly refreshToken: string
}

export interface ILoginData {
    readonly email: string
    readonly password: string
}

export interface IRegisterData extends ILoginData {
    readonly name: string
}

export interface IUpdateUserData {
    readonly name?: string
    readonly email?: string
    readonly password?: string
}

export interface IForgotPassword {
    readonly email: string
}

export interface IResetPassword {
    readonly password: string
    readonly token: string
}

export interface IError {
    message: string
    fileName?: string
    lineNumber?: string
    options?: {
        cause: string
    }
}

export interface IFetchOptions {
    method: 'GET' | 'POST' | 'PATCH'
    body?: string
    headers: {
        [key: string]: string
    }
}

// submit
export type TSubmitFormFunc<T> = (data: T) => void

export interface IRejectedValueThunk {
    rejectValue: TRejectedWithValue
}

export type TRejectedWithValue = any

// WebSocket
export enum WebSocketStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export type TOrderStatuses = 'created' | 'pending' | 'done'

export interface IOrderDataReceived {
    readonly orders: IOrderItem[]
    readonly success: boolean
    readonly total: number
    readonly totalToday: number
}

export interface IOrderItem {
    readonly _id: string
    readonly ingredients: string[]
    readonly name: string
    readonly number: number
    readonly status: TOrderStatuses
    readonly createdAt: Date
    readonly updatedAt: Date
}
