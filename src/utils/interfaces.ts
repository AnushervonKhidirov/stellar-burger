interface Ingredient {
    _id: string
    name: string
    type: IngredientTypes
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
}

interface ConstructorIngredient extends Ingredient {
    key?: string
}

interface FooterText {
    text: string
    link: {
        title: string
        href: string
    }
}

interface FormInput {
    type: 'text' | 'email' | 'password'
    name: string
    placeholder: string
}

interface TypesPositionPayload {
    type: IngredientTypes
    top: number
    bottom: number
}

type IngredientTypes = 'bun' | 'sauce' | 'main'
type CloseModal = () => void

export type {
    Ingredient,
    FooterText,
    FormInput,
    CloseModal,
    TypesPositionPayload,
    IngredientTypes,
    ConstructorIngredient,
}
