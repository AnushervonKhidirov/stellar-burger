import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchIngredients } from '../utils/burger-api'

export const loadIngredient = createAsyncThunk('ingredientList/loadIngredient', async () => {
    return fetchIngredients().then(data => data.map(elem => ({ ...elem, amount: 0, peakId: 0 })))
})

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        ingredients: [],
        loading: false,
    },
    extraReducers: builder => {
        builder.addCase(loadIngredient.pending, state => {
            state.loading = true
        })
        builder.addCase(loadIngredient.fulfilled, (state, action) => {
            state.ingredients = action.payload
            state.loading = false
        })
        builder.addCase(loadIngredient.rejected, state => {
            state.loading = false
        })
    },
})

// export const { loadIngredient } = ingredientListSlice.actions
export default ingredientListSlice.reducer
