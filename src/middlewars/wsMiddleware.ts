import type { Middleware } from 'redux'
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

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

            dispatch(wsMessage(parsedData))
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
