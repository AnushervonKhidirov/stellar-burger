import ingredientListSlice, { initialState } from './slice'
import { loadIngredient } from './action'

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
    },
]

describe('fetch all ingredients', () => {
    test('fetch ingredients fulfilled', () => {
        const pendingAction = { type: loadIngredient.pending.type }
        const fulfilledAction = { type: loadIngredient.fulfilled.type, payload: ingredientsPayload }

        expect(ingredientListSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(ingredientListSlice(initialState, fulfilledAction)).toEqual({
            ...initialState,
            ingredients: ingredientsPayload,
        })
    })

    test('fetch ingredients rejected', () => {
        const pendingAction = { type: loadIngredient.pending.type }
        const rejectedAction = { type: loadIngredient.rejected.type }

        expect(ingredientListSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(ingredientListSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
        })
    })
})
