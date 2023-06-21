import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import modalSlice from './modalSlice'
import ingredientDetailSlice from './ingredientDetailSlice'
import ingredientListSlice from './ingredientListSlice'
import ingredientTabSlice from './ingredientTabSlice'
import constructorIngredientListSlice from './constructorIngredientListSlice'
import orderDetailSlice from './orderDetailSlice'
import profileSlice from './profileSlice'
import authSlice from './authSlice'

export const store = configureStore({
    reducer: {
        constructorIngredientList: constructorIngredientListSlice,
        ingredientDetails: ingredientDetailSlice,
        ingredientList: ingredientListSlice,
        ingredientTab: ingredientTabSlice,
        orderDetails: orderDetailSlice,
        modal: modalSlice,
        profile: profileSlice,
        auth: authSlice,
    },
    middleware: [thunk],
})
