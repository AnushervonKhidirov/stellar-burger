import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import modalSlice from './modalSlice'
import ingredientDetailSlice from './ingredientDetailSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice,
        ingredientDetails: ingredientDetailSlice,
    },
    middleware: [thunk]
})
