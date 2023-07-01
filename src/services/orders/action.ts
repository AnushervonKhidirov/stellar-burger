import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from '../../utils/burger-api'

const sendIngredientsId: any = createAsyncThunk(
    'orderDetail/sendIngredientsId',
    async (data, rejectWithValue) => fetchOrder(data, rejectWithValue)
)

export { sendIngredientsId }
