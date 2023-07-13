import { createSlice } from '@reduxjs/toolkit'
import { sendIngredientsId } from './action'

import type { PayloadAction } from '@reduxjs/toolkit'

export interface IOrderDetailState {
    orderName: string | null
    orderNumber: number | null
    ingredientsId: string[] | void
    isLoading: boolean
    rejected: boolean
}

interface IOrderPayload {
    readonly name: string
    readonly order: { number: number }
    success: boolean
}

const initialState: IOrderDetailState = {
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
        clearOrder: (): IOrderDetailState => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(sendIngredientsId.pending, (state, action) => {
                state.ingredientsId = action.meta.arg
                state.isLoading = true
                state.rejected = false
            })
            .addCase(sendIngredientsId.fulfilled, (state, { payload }: PayloadAction<IOrderPayload>) => {
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
