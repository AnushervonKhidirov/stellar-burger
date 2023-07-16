import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchIngredients } from "../../utils/burger-api"

export const loadIngredient: any = createAsyncThunk('ingredientList/loadIngredient', async () =>
    fetchIngredients()
)