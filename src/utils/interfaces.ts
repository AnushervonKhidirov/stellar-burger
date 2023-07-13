export interface Ingredient {
    readonly _id: string
    readonly name: string
    readonly type: IngredientTypes
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

export interface IProfileState {
    isAuthChecked: boolean
    isAuthorized: boolean
    isLoading: boolean
    rejected: boolean
    userInfo: IUserInfo | null
}

export interface IUserInfo {
    name: string
    email: string
}

export interface FooterText {
    readonly text: string
    readonly link: {
        readonly title: string
        readonly href: string
    }
}

export interface FormInput {
    readonly type: 'text' | 'email' | 'password'
    name: string
    placeholder: string
}

export interface TypesPositionPayload {
    readonly type: IngredientTypes
    top: number
    bottom: number
}

export type IngredientTypes = Readonly<'bun' | 'sauce' | 'main'>
export type CloseModal = () => void

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

// submit
export type TSubmitFormFunc =
    | TForgotPasswordSubmit
    | TResetPasswordSubmit
    | TLoginUser
    | TRegisterUser

export type TForgotPasswordSubmit = (data: IForgotPassword) => void
export type TResetPasswordSubmit = (data: IResetPassword) => void


// Redux actions type
export interface IRejectedWithValueObj {
    rejectWithValue: TRejectedWithValue
}

export type TRejectedWithValue = any

export type TLoginUser = any
export type TRegisterUser = any
