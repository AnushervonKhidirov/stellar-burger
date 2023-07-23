import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchOrder } from '../../utils/burger-api'

import type { IOrderPayload } from './slice'
import type { TRejectedWithValue } from '../../utils/interfaces'

export const sendIngredientsId = createAsyncThunk<
    IOrderPayload,
    string[],
    { rejectValue: TRejectedWithValue }
>('orderDetail/sendIngredientsId', async (data, { rejectWithValue }) =>
    fetchOrder(data, rejectWithValue)
)
