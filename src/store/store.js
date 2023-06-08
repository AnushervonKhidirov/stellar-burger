import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import modalSlice from './modalSlice'
import ingredientDetailSlice from './ingredientDetailSlice'
import ingredientListSlice from './ingredientListSlice'
import orderDetailSlice from './orderDetailSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        ingredientDetails: ingredientDetailSlice,
        ingredientList: ingredientListSlice,
        orderDetails: orderDetailSlice,
    },
    middleware: [thunk]
})
