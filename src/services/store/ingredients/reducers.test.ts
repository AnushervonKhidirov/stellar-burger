import ingredientListSlice, { initialState } from './slice'
import { loadIngredient } from './action'


describe('fetch all ingredients', () => {
    test('fetch ingredients pending', () => {
        const action = { type: loadIngredient.pending.type }
        
        expect(ingredientListSlice(initialState, action)).toEqual({ ...initialState, isLoading: true })
    })

    test('fetch ingredients rejected', () => {
        const action = { type: loadIngredient.rejected.type }

        expect(ingredientListSlice(initialState, action)).toEqual({ ...initialState, rejected: true })
    })

    test('fetch ingredients fulfilled', () => {
        const ingredientsPayload = [
            {
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
            },
            {
                _id: '643da5c3f7b9001cfa093c',
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
        ]

        const action = { type: loadIngredient.fulfilled.type, payload: ingredientsPayload }

        expect(ingredientListSlice(initialState, action)).toEqual({ ...initialState, ingredients: ingredientsPayload })
    })
})