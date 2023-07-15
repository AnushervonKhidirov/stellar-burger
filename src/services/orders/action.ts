import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from '../../utils/burger-api'

export const sendIngredientsId: any = createAsyncThunk(
    'orderDetail/sendIngredientsId',
    async (data: string[], rejectWithValue) => fetchOrder(data, rejectWithValue)
)
