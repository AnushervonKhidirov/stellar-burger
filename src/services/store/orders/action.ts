import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder, fetchOrderDetail, TOrderResponse, TGetOrderResponse } from '../../../utils/burger-api'

import type { IRejectedValueThunk } from '../../../utils/interfaces'

export const sendOrder = createAsyncThunk<TOrderResponse, string[], IRejectedValueThunk>(
    'orderDetail/sendOrder',
    async (data, { rejectWithValue }) => fetchOrder(data, rejectWithValue)
)

export const getOrder = createAsyncThunk<TGetOrderResponse, string, IRejectedValueThunk>(
    'orderDetail/getOrder',
    async (orderID, { rejectWithValue }) => fetchOrderDetail(orderID, rejectWithValue)
)
