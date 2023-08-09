import type { Ingredient } from '../../utils/interfaces'
import ingredientDetailSlice, { setDetail, clearDetail, initialState } from './slice'

describe('Ingredient detail testing', () => {
    const ingredient: Ingredient = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    }
    
    test('setDetail test', () => {
        const action = { type: setDetail.type, payload: ingredient }

        expect(ingredientDetailSlice(initialState, action)).toEqual({ingredient: ingredient})
    })
    test('clearDetail test', () => {
        const action = { type: clearDetail.type, payload: ingredient }

        expect(ingredientDetailSlice({ ingredient: ingredient }, action)).toEqual(initialState)
    })
})
