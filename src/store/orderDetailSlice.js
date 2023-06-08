import { createSlice } from '@reduxjs/toolkit'

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        orderNumber: null,
    },
    reducers: {
        setOrderNumber: (state, action) => {
            state.orderNumber = action.payload
        },
        resetOrderNumber: state => {
            state.orderNumber = null
        },
    },
})

export const { setOrderNumber, resetOrderNumber } = orderDetailSlice.actions
export default orderDetailSlice.reducer
