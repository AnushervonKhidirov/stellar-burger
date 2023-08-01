import { configureStore } from '@reduxjs/toolkit'
import ingredientListSlice from '../ingredients/slice'
import ingredientTabSlice from './ingredientTabSlice'
import constructorIngredientListSlice from './constructorIngredientListSlice'
import orderDetailSlice from '../orders/slice'
import profileSlice from '../user/slice'
import { feedOrdersListReducers } from '../feed-orders/reducers'
import { profileOrdersListReducers } from '../profile-orders/reducers'

import { wsMiddleware } from '../../middlewars/wsMiddleware'

import {
    wsFeedConnectAction,
    wsFeedConnectingAction,
    wsFeedDisconnectAction,
    wsFeedOpenAction,
    wsFeedCloseAction,
    wsFeedErrorAction,
    wsFeedMessageAction,
} from '../feed-orders/actions'

import {
    wsProfileConnectAction,
    wsProfileConnectingAction,
    wsProfileDisconnectAction,
    wsProfileOpenAction,
    wsProfileCloseAction,
    wsProfileErrorAction,
    wsProfileMessageAction,
} from '../profile-orders/actions'

const feedOrdersMiddleware = wsMiddleware({
    wsConnect: wsFeedConnectAction,
    wsConnecting: wsFeedConnectingAction,
    wsDisconnecting: wsFeedDisconnectAction,
    wsOpen: wsFeedOpenAction,
    wsClose: wsFeedCloseAction,
    wsError: wsFeedErrorAction,
    wsMessage: wsFeedMessageAction,
})

const profileOrdersMiddleware = wsMiddleware({
    wsConnect: wsProfileConnectAction,
    wsConnecting: wsProfileConnectingAction,
    wsDisconnecting: wsProfileDisconnectAction,
    wsOpen: wsProfileOpenAction,
    wsClose: wsProfileCloseAction,
    wsError: wsProfileErrorAction,
    wsMessage: wsProfileMessageAction,
})

export const store = configureStore({
    reducer: {
        constructorIngredientList: constructorIngredientListSlice,
        ingredientList: ingredientListSlice,
        ingredientTab: ingredientTabSlice,
        orderDetails: orderDetailSlice,
        feedOrderList: feedOrdersListReducers,
        profileOrderList: profileOrdersListReducers,
        profile: profileSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedOrdersMiddleware, profileOrdersMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
