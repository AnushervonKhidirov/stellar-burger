import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    ingredient: null
}

export const ingredientDetailSlice = createSlice({
    name: 'ingredientDetail',
    initialState,
    reducers: {
        setDetail: (state, action) => {
            state.ingredient = action.payload
        },
        clearDetail: () => initialState,
    },
})

export const { setDetail, clearDetail } = ingredientDetailSlice.actions
export default ingredientDetailSlice.reducer
