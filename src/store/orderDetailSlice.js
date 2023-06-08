import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from '../utils/burger-api'

export const sendIngredientsId = createAsyncThunk('orderDetail/sendIngredientsId', async (data) => {
    return fetchOrder(data)
})

export const orderDetailSlice = createSlice({
    name: 'orderDetail',
    initialState: {
        orderName: null,
        orderNumber: null,
        ingredientsId: [],
        isLoading: false,
        rejected: false,
    },
    extraReducers: builder => {
        builder.addCase(sendIngredientsId.pending, (state, action) => {
            state.ingredientsId = action.meta.arg
            state.isLoading = true
        })
        builder.addCase(sendIngredientsId.fulfilled, (state, action) => {
            state.orderNumber = action.payload.order.number
            state.orderName = action.payload.name
            state.isLoading = false
        })
        builder.addCase(sendIngredientsId.rejected, state => {
            state.isLoading = false
            state.rejected = true
        })
    }
})

export default orderDetailSlice.reducer
