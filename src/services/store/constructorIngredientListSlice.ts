import { createSlice } from '@reduxjs/toolkit'
import { sendIngredientsId } from '../orders/action'
import { v4 as uuidv4 } from 'uuid'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ingredient, ConstructorIngredient } from '../../utils/interfaces'


interface ConstructorList {
    bun: Ingredient | null
    ingredients: ConstructorIngredient[]
}

interface ChangeOrderPayload {
    ingredientList: ConstructorIngredient[],
    key: string,
    side: -1 | 1
}

const initialState: ConstructorList = {
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
                : state.ingredients.push({ ...payload, key: uuidv4() })
        },
        removeIngredientFromConstructor: (state, { payload }: PayloadAction<ConstructorIngredient>) => {
            state.ingredients = state.ingredients.filter(
                (item: ConstructorIngredient) => item.key !== payload.key
            )
        },
        changeIngredientOrder: (state, { payload }: PayloadAction<ChangeOrderPayload>) => {
            const ingredientList = payload.ingredientList
            let currentIndex = ingredientList.findIndex(
                (item: ConstructorIngredient) => item.key === payload.key
            )
            let nextIndex = currentIndex + payload.side

            if (nextIndex < 0 || nextIndex > ingredientList.length - 1) return

            state.ingredients = ingredientList.map((ing: ConstructorIngredient, index: number) =>
                index === currentIndex
                    ? ingredientList[nextIndex]
                    : index === nextIndex
                    ? ingredientList[currentIndex]
                    : ing
            )
        },
    },
    extraReducers: builder => {
        builder.addCase(sendIngredientsId.fulfilled, () => initialState)
    },
})

export const {
    addIngredientToConstructor,
    removeIngredientFromConstructor,
    changeIngredientOrder,
} = constructorIngredientListSlice.actions
export default constructorIngredientListSlice.reducer
