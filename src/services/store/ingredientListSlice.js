import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchIngredients } from '../../utils/burger-api'

export const loadIngredient = createAsyncThunk('ingredientList/loadIngredient', async () =>
    fetchIngredients()
)

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        ingredients: [],
        isLoading: false,
        rejected: false,
    },
    extraReducers: builder => {
        builder.addCase(loadIngredient.pending, state => {
            state.isLoading = true
        })
        builder.addCase(loadIngredient.fulfilled, (state, action) => {
            state.ingredients = action.payload
            state.isLoading = false
        })
        builder.addCase(loadIngredient.rejected, state => {
            state.isLoading = false
            state.rejected = true
        })
    },
})

export default ingredientListSlice.reducer
