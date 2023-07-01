import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Ingredient } from '../../utils/interfaces'

interface IngredientDetail {
    ingredient: Ingredient | null
}

const initialState: IngredientDetail = {
    ingredient: null
}

export const ingredientDetailSlice = createSlice({
    name: 'ingredientDetail',
    initialState,
    reducers: {
        setDetail: (state, action: PayloadAction<Ingredient>) => {
            state.ingredient = action.payload
        },
        clearDetail: () => initialState,
    },
})

export const { setDetail, clearDetail } = ingredientDetailSlice.actions
export default ingredientDetailSlice.reducer
