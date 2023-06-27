import { createSlice } from '@reduxjs/toolkit'
import { sendIngredientsId } from './action'

const initialState = {
    orderName: null,
    orderNumber: null,
    ingredientsId: [],
    isLoading: false,
    rejected: false,
}

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState,
    reducers: {
        clearOrder: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(sendIngredientsId.pending, (state, action) => {
                state.ingredientsId = action.meta.arg
                state.isLoading = true
                state.rejected = false
            })
            .addCase(sendIngredientsId.fulfilled, (state, action) => {
                state.orderNumber = action.payload.order.number
                state.orderName = action.payload.name
                state.isLoading = false
            })
            .addCase(sendIngredientsId.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export const { clearOrder } = orderDetailSlice.actions
export default orderDetailSlice.reducer
