import { createSlice } from '@reduxjs/toolkit'
import { sendOrder } from '../orders/action'
import { v4 as uuidV4 } from 'uuid'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ingredient } from '../../utils/interfaces'

interface IConstructorList {
    bun: Ingredient | null
    ingredients: Ingredient[]
}

interface IChangeOrderPayload {
    ingredientList: Ingredient[]
    readonly key: string
    readonly side: -1 | 1
}

const initialState: IConstructorList = {
    bun: null,
    ingredients: [],
}

export const constructorIngredientListSlice = createSlice({
    name: 'constructorIngredientList',
    initialState,
    reducers: {
        addIngredientToConstructor: (state, { payload }: PayloadAction<Ingredient>) => {
            payload.type === 'bun'
                ? (state.bun = payload)
                : state.ingredients.push({ ...payload, key: uuidV4() })
        },
        removeIngredientFromConstructor: (state, { payload }: PayloadAction<Ingredient>) => {
            state.ingredients = state.ingredients.filter(
                (item: Ingredient) => item.key !== payload.key
            )
        },
        changeIngredientOrder: (state, { payload }: PayloadAction<IChangeOrderPayload>) => {
            const ingredientList = payload.ingredientList
            let currentIndex = ingredientList.findIndex(
                (item: Ingredient) => item.key === payload.key
            )
            let nextIndex = currentIndex + payload.side

            if (nextIndex < 0 || nextIndex > ingredientList.length - 1) return

            state.ingredients = ingredientList.map((ing: Ingredient, index: number) =>
                index === currentIndex
                    ? ingredientList[nextIndex]
                    : index === nextIndex
                    ? ingredientList[currentIndex]
                    : ing
            )
        },
    },
    extraReducers: builder => {
        builder.addCase(sendOrder.fulfilled, () => initialState)
    },
})

export const {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    changeIngredientOrder,
} = constructorIngredientListSlice.actions
export default constructorIngredientListSlice.reducer
