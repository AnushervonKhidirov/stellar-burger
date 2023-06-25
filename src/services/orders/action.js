import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchOrder } from "../../utils/burger-api"

const sendIngredientsId = createAsyncThunk(
    'orderDetail/sendIngredientsId',
    async (data, { rejectWithValue }) => {
        return fetchOrder(data, rejectWithValue)
    }
)

export { sendIngredientsId }