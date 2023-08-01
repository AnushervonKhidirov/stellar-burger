import type { Middleware } from 'redux'
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

export type TWsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>
    wsConnecting: ActionCreatorWithoutPayload
    wsDisconnecting: ActionCreatorWithoutPayload
    wsOpen: ActionCreatorWithoutPayload
    wsClose: ActionCreatorWithoutPayload
    wsError: ActionCreatorWithPayload<string>
    wsMessage: ActionCreatorWithPayload<any>
}

type TWsMiddleware = (wsActions: TWsActionTypes) => Middleware<{}, any>

export const wsMiddleware: TWsMiddleware = wsActions => store => next => action => {
    const { dispatch } = store

    let socket: WebSocket | null = null

    const { wsConnect, wsDisconnecting, wsOpen, wsClose, wsMessage, wsError } = wsActions

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
