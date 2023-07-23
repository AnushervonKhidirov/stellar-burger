import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchIngredients } from '../../utils/burger-api'

import type { Ingredient } from '../../utils/interfaces'

export const loadIngredient = createAsyncThunk<Ingredient[], void>(
    'ingredientList/loadIngredient',
    async () => fetchIngredients()
)
