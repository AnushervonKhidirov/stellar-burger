import type { TOrderStatuses } from '../../../utils/interfaces'
import type { IFullOrderDetails } from '../../../components/orders-components/full-order-details/FullOrderDetails'

import { createSlice } from '@reduxjs/toolkit'
import { sendOrder, getOrder } from './action'

export interface IOrderDetailState {
    readonly name: string
    readonly number: number | null
    readonly ingredientsId: string[]
    readonly status: TOrderStatuses | null
    readonly createdAt: string
    readonly isLoading: boolean
    readonly rejected: boolean
}

export interface IOrderPayload {
    readonly name: string
    readonly order: IFullOrderDetails
}

export interface IGetOrderPayload {
    orders: IFullOrderDetails[]
}

export const initialState: IOrderDetailState = {
    name: '',
    number: null,
    status: null,
    createdAt: '',
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
            .addCase(sendOrder.pending, (state, action) => {
                state.ingredientsId = action.meta.arg
                state.isLoading = true
                state.rejected = false
            })
            .addCase(sendOrder.fulfilled, (state, { payload }) => {
                state.number = payload.order.number
                state.name = payload.order.name
                state.status = payload.order.status
                state.createdAt = payload.order.createdAt
                state.isLoading = false
            })
            .addCase(sendOrder.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })

        builder
            .addCase(getOrder.pending, state => {
                state.isLoading = true
                state.rejected = false
            })
            .addCase(getOrder.fulfilled, (state, { payload }) => {
                state.number = payload.orders[0].number
                state.name = payload.orders[0].name
                state.ingredientsId = payload.orders[0].ingredients
                state.status = payload.orders[0].status
                state.createdAt = payload.orders[0].createdAt
                state.isLoading = false
            })
            .addCase(getOrder.rejected, state => {
                state.isLoading = false
                state.rejected = true
            })
    },
})

export const { clearOrder } = orderDetailSlice.actions
export default orderDetailSlice.reducer
