import { configureStore } from '@reduxjs/toolkit'
import ingredientListSlice from '../ingredients/slice'
import ingredientTabSlice from './ingredientTabSlice'
import constructorIngredientListSlice from './constructorIngredientListSlice'
import orderDetailSlice from '../orders/slice'
import profileSlice from '../user/slice'
import { ordersListReducers } from '../orders-list/reducers'

import { wsMiddleware } from '../orders-list/middleware'

import {
    connectAction,
    connectingAction,
    disconnectAction,
    openAction,
    closeAction,
    errorAction,
    messageAction,
} from '../orders-list/actions'

const ordersMiddleware = wsMiddleware({
    wsConnect: connectAction,
    wsConnecting: connectingAction,
    wsDisconnecting: disconnectAction,
    wsOpen: openAction,
    wsClose: closeAction,
    wsError: errorAction,
    wsMessage: messageAction,
})

export const store = configureStore({
    reducer: {
        constructorIngredientList: constructorIngredientListSlice,
        ingredientList: ingredientListSlice,
        ingredientTab: ingredientTabSlice,
        orderDetails: orderDetailSlice,
        orderList: ordersListReducers,
        profile: profileSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ordersMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
