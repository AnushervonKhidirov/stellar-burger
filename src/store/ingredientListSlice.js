import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchIngredients } from '../utils/burger-api'

export const loadIngredient = createAsyncThunk('ingredientList/loadIngredient', async () => {
    return fetchIngredients().then(data => data.map(elem => ({ ...elem, amount: 0, peakId: 0 })))
})

export const ingredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        ingredients: [],
        leaded: false,
        rejected: false,
    },
    extraReducers: builder => {
        builder.addCase(loadIngredient.pending, state => {
            state.leaded = false
        })
        builder.addCase(loadIngredient.fulfilled, (state, action) => {
            state.ingredients = action.payload
            state.leaded = true
        })
        builder.addCase(loadIngredient.rejected, state => {
            state.leaded = true
            state.rejected = true
        })
    },
})

export default ingredientListSlice.reducer
