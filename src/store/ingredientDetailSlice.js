import { createSlice } from '@reduxjs/toolkit'

export const ingredientDetailSlice = createSlice({
    name: 'ingredientDetail',
    initialState: {
        ingredient: null
    },
    reducers: {
        setDetail: (state, action) => {
            state.ingredient = action.payload
        },
        clearDetail: state => {
            state.ingredient = null
        },
    },
})

export const { setDetail, clearDetail } = ingredientDetailSlice.actions
export default ingredientDetailSlice.reducer
