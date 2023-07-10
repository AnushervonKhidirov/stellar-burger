import { createSlice } from '@reduxjs/toolkit'
import { sendIngredientsId } from './action'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface OrderDetail {
    orderName: string | null
    orderNumber: number | null
    ingredientsId: string[] | void
    isLoading: boolean
    rejected: boolean
}

interface OrderResult {
    name: string
    order: { number: number }
    success: boolean
}

const initialState: OrderDetail = {
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
        clearOrder: (): OrderDetail => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(sendIngredientsId.pending, (state, action) => {
                state.ingredientsId = action.meta.arg
                state.isLoading = true
                state.rejected = false
            })
            .addCase(sendIngredientsId.fulfilled, (state, { payload }: PayloadAction<OrderResult>) => {
                state.orderNumber = payload.order.number
                state.orderName = payload.name
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
