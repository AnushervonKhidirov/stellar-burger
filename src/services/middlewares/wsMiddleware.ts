import type { Middleware } from 'redux'
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { updateToken } from '../../utils/burger-api'
import { JWT_EXPIRED_MESSAGE_WS } from '../../utils/constants'

export type TWsActionTypes = {
    readonly wsConnect: ActionCreatorWithPayload<string>
    readonly wsConnecting: ActionCreatorWithoutPayload
    readonly wsDisconnecting: ActionCreatorWithoutPayload
    readonly wsOpen: ActionCreatorWithoutPayload
    readonly wsClose: ActionCreatorWithoutPayload
    readonly wsError: ActionCreatorWithPayload<string>
    readonly wsMessage: ActionCreatorWithPayload<any>
}

type TWsMiddleware = (wsActions: TWsActionTypes) => Middleware<{}, any>

export const wsMiddleware: TWsMiddleware = wsActions => store => next => action => {
    const { dispatch } = store
    const { wsConnect, wsDisconnecting, wsOpen, wsClose, wsMessage, wsError } = wsActions
    let socket: WebSocket | null = null

    if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload)
    }

    if (socket) {
        socket.onopen = () => {
            dispatch(wsOpen())
        }

        socket.onerror = () => {
            dispatch(wsError('error'))
        }

        socket.onmessage = event => {
            const { data } = event
            const parsedData = JSON.parse(data)

            if (parsedData.success) dispatch(wsMessage(parsedData))
            if (parsedData.message === JWT_EXPIRED_MESSAGE_WS) updateToken()
        }

        socket.onclose = () => {
            dispatch(wsClose())
        }

        if (wsDisconnecting.match(action)) {
            socket.close()
            socket = null
        }
    }

    next(action)
}
