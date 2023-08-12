import type { Ingredient } from '../../../utils/interfaces'
import type { IChangeOrderPayload } from './slice'

import { sendOrder } from '../orders/action'

import constructorIngredientListSlice, {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    changeIngredientOrder,
    initialState,
} from './slice'

const ingredient: Ingredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    key: '62633d74-e90c-45b9-8ccb-883abf349523',
}

const ingredientToReplace: Ingredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    key: '62633d74-e90c-45b9-8ccb-883abf349521',
}

describe('constructor list testing', () => {
    test('add to constructor test', () => {
        const action = { type: addIngredientToConstructor.type, payload: ingredient }

        expect(constructorIngredientListSlice(initialState, action)).toEqual({
            ...initialState,
            ingredients: [ingredient],
        })
    })

    test('remove from constructor test', () => {
        const state = {
            bun: null,
            ingredients: [ingredient],
        }

        const action = { type: removeIngredientFromConstructor.type, payload: ingredient }

        expect(constructorIngredientListSlice(state, action)).toEqual(initialState)
    })

    test('change ingredient position in constructor test', () => {
        const payloadData: IChangeOrderPayload = {
            ingredients: [ingredient, ingredientToReplace],
            key: '62633d74-e90c-45b9-8ccb-883abf349521',
            side: -1,
        }

        const action = { type: changeIngredientOrder.type, payload: payloadData }

        const state = {
            bun: null,
            ingredients: [ingredient, ingredientToReplace],
        }

        expect(constructorIngredientListSlice(state, action)).toEqual({
            bun: null,
            ingredients: [ingredientToReplace, ingredient],
        })
    })
})

test('clear constructor ingredient test', () => {
    const action = { type: sendOrder.fulfilled.type }

    const state = {
        bun: null,
        ingredients: [ingredient, ingredientToReplace],
    }

    expect(constructorIngredientListSlice(state, action)).toEqual(initialState)
})