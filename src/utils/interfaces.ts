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
