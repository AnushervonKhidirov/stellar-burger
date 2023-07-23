import type { Ingredient } from '../../utils/interfaces'

import { createSlice } from '@reduxjs/toolkit'
import { loadIngredient } from './action'

interface IngredientListState {
    ingredients: Ingredient[]
    isLoading: boolean
    rejected: boolean
}

const initialState: IngredientListState = {
    ingredients: [],
    isLoading: false,
    rejected: false,
}

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadIngredient.pending, state => {
                state.isLoading = true
            })
            .addCase(loadIngredient.fulfilled, (state, { payload }) => {
                state.ingredients = payload
                state.isLoading = false
            })
            .addCase(loadIngredient.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export default ingredientListSlice.reducer
