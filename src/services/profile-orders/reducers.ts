import { WebSocketStatus, type IOrderDataReceived } from '../../utils/interfaces'

import { createReducer } from '@reduxjs/toolkit'
import {
    wsProfileDisconnectAction,
    wsProfileOpenAction,
    wsProfileCloseAction,
    wsProfileErrorAction,
    wsProfileMessageAction,
} from './actions'

export interface IProfileOrdersStore {
    list: IOrderDataReceived
    status: WebSocketStatus
    connectingError: string
}

const initialState: IProfileOrdersStore = {
    list: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0,
    },
    status: WebSocketStatus.OFFLINE,
    connectingError: '',
}

export const profileOrdersListReducers = createReducer(initialState, builder => {
    builder
        .addCase(wsProfileOpenAction, state => {
            state.status = WebSocketStatus.ONLINE
        })
        .addCase(wsProfileCloseAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(wsProfileDisconnectAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(wsProfileErrorAction, (state, { payload }) => {
            state.connectingError = payload
        })
        .addCase(wsProfileMessageAction, (state, { payload }) => {
            state.list = payload
            state.list.orders.length > 0 && state.list.orders.reverse()
        })
})
