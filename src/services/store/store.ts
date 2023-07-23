import { configureStore } from '@reduxjs/toolkit'
import ingredientListSlice from '../ingredients/slice'
import ingredientTabSlice from './ingredientTabSlice'
import constructorIngredientListSlice from './constructorIngredientListSlice'
import orderDetailSlice from '../orders/slice'
import profileSlice from '../user/slice'

export const store = configureStore({
    reducer: {
        constructorIngredientList: constructorIngredientListSlice,
        ingredientList: ingredientListSlice,
        ingredientTab: ingredientTabSlice,
        orderDetails: orderDetailSlice,
        profile: profileSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch