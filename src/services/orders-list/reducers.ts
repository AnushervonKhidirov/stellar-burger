import { type IOrderListStore, WebSocketStatus } from './types'

import { createReducer } from '@reduxjs/toolkit'
import { disconnectAction, openAction, closeAction, errorAction, messageAction } from './actions'

const initialState: IOrderListStore = {
    list: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0,
    },
    doneIdList: [],
    restIdList: [],
    status: WebSocketStatus.OFFLINE,
    connectingError: '',
}

export const ordersListReducers = createReducer(initialState, builder => {
    builder
        .addCase(openAction, state => {
            state.status = WebSocketStatus.ONLINE
        })
        .addCase(closeAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(disconnectAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(errorAction, (state, { payload }) => {
            state.connectingError = payload
        })
        .addCase(messageAction, (state, { payload }) => {
            state.doneIdList = []
            state.restIdList = []

            state.list = payload

            state.list.orders.forEach(order => {
                order.status === 'done'
                    ? state.doneIdList.push(order.number)
                    : state.restIdList.push(order.number)
            })
        })
})
