import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import modalSlice from './modalSlice'
import ingredientListSlice from './ingredientListSlice'
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
        modal: modalSlice,
        profile: profileSlice,
    },
    middleware: [thunk],
})
