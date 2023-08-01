import { createAction } from '@reduxjs/toolkit'
import type { IOrderDataReceived } from '../../utils/interfaces'

export const wsFeedConnectAction = createAction<string, 'WEB_SOCKET_FEED_CONNECT'>('WEB_SOCKET_FEED_CONNECT')
export const wsFeedDisconnectAction = createAction<void, 'WEB_SOCKET_FEED_DISCONNECT'>('WEB_SOCKET_FEED_DISCONNECT')
export const wsFeedConnectingAction = createAction<void, 'WEB_SOCKET_FEED_CONNECTING'>('WEB_SOCKET_FEED_CONNECTING')
export const wsFeedOpenAction = createAction<void, 'WEB_SOCKET_FEED_OPEN'>('WEB_SOCKET_FEED_OPEN')
export const wsFeedCloseAction = createAction<void, 'WEB_SOCKET_FEED_CLOSE'>('WEB_SOCKET_FEED_CLOSE')
export const wsFeedErrorAction = createAction<string, 'WEB_SOCKET_FEED_ERROR'>('WEB_SOCKET_FEED_ERROR')
export const wsFeedMessageAction = createAction<IOrderDataReceived, 'WEB_SOCKET_FEED_MESSAGE'>('WEB_SOCKET_FEED_MESSAGE')

export type TWebSocketOrderActions =
    | ReturnType<typeof wsFeedConnectAction>
    | ReturnType<typeof wsFeedDisconnectAction>
    | ReturnType<typeof wsFeedConnectingAction>
    | ReturnType<typeof wsFeedOpenAction>
    | ReturnType<typeof wsFeedCloseAction>
    | ReturnType<typeof wsFeedErrorAction>
    | ReturnType<typeof wsFeedMessageAction>
