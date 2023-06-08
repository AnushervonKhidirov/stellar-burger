import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import modalSlice from './modalSlice'
import ingredientDetailSlice from './ingredientDetailSlice'
import ingredientListSlice from './ingredientListSlice'
import constructorIngredientListSlice from './constructorIngredientListSlice'
import orderDetailSlice from './orderDetailSlice'

export const store = configureStore({
    reducer: {
        constructorIngredientList: constructorIngredientListSlice,
        ingredientDetails: ingredientDetailSlice,
        ingredientList: ingredientListSlice,
        orderDetails: orderDetailSlice,
        modal: modalSlice,
    },
    middleware: [thunk]
})
