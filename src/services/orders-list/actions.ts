import { createAction } from '@reduxjs/toolkit'
import type { IOrderDataReceived } from './types'

export const connectAction = createAction<string, 'WEB_SOCKET_CONNECT'>('WEB_SOCKET_CONNECT')
export const disconnectAction = createAction<void, 'WEB_SOCKET_DISCONNECT'>('WEB_SOCKET_DISCONNECT')
export const connectingAction = createAction<void, 'WEB_SOCKET_CONNECTING'>('WEB_SOCKET_CONNECTING')
export const openAction = createAction<void, 'WEB_SOCKET_OPEN'>('WEB_SOCKET_OPEN')
export const closeAction = createAction<void, 'WEB_SOCKET_CLOSE'>('WEB_SOCKET_CLOSE')
export const errorAction = createAction<string, 'WEB_SOCKET_ERROR'>('WEB_SOCKET_ERROR')
export const messageAction = createAction<IOrderDataReceived, 'WEB_SOCKET_MESSAGE'>('WEB_SOCKET_MESSAGE')

export type TWebSocketOrderActions =
    | ReturnType<typeof connectAction>
    | ReturnType<typeof disconnectAction>
    | ReturnType<typeof connectingAction>
    | ReturnType<typeof openAction>
    | ReturnType<typeof closeAction>
    | ReturnType<typeof errorAction>
