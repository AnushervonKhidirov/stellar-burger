import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from '../../utils/burger-api'

import type { IOrderPayload } from './slice'
import type { IRejectedValueThunk } from '../../utils/interfaces'

export const sendIngredientsId = createAsyncThunk<IOrderPayload, string[], IRejectedValueThunk>(
    'orderDetail/sendIngredientsId',
    async (data, { rejectWithValue }) => fetchOrder(data, rejectWithValue)
)
