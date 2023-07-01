import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchIngredients } from '../../utils/burger-api'

import type { Ingredient } from '../../utils/interfaces'

export const loadIngredient: any = createAsyncThunk('ingredientList/loadIngredient', async () =>
    fetchIngredients()
)

interface IngredientList {
    ingredients: Ingredient[]
    isLoading: boolean
    rejected: boolean
}

const initialState: IngredientList = {
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
            .addCase(loadIngredient.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
                state.ingredients = action.payload
                state.isLoading = false
            })
            .addCase(loadIngredient.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export default ingredientListSlice.reducer
