import { WebSocketStatus, type IOrderDataReceived } from '../../../utils/interfaces'

import { createReducer } from '@reduxjs/toolkit'

import {
    wsFeedDisconnectAction,
    wsFeedOpenAction,
    wsFeedCloseAction,
    wsFeedErrorAction,
    wsFeedMessageAction,
} from './actions'

export interface IFeedOrdersStore {
    list: IOrderDataReceived
    doneIdList: number[]
    restIdList: number[]
    status: WebSocketStatus
    connectingError: string
}

export const initialState: IFeedOrdersStore = {
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

export const feedOrdersListReducers = createReducer(initialState, builder => {
    builder
        .addCase(wsFeedOpenAction, state => {
            state.status = WebSocketStatus.ONLINE
        })
        .addCase(wsFeedCloseAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(wsFeedDisconnectAction, state => {
            state.status = WebSocketStatus.OFFLINE
        })
        .addCase(wsFeedErrorAction, (state, { payload }) => {
            state.connectingError = payload
        })
        .addCase(wsFeedMessageAction, (state, { payload }) => {
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
