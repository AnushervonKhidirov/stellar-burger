import { createAction } from '@reduxjs/toolkit'
import type { IOrderDataReceived } from '../../../utils/interfaces'

export const wsProfileConnectAction = createAction<string, 'WEB_SOCKET_PROFILE_CONNECT'>('WEB_SOCKET_PROFILE_CONNECT')
export const wsProfileDisconnectAction = createAction<void, 'WEB_SOCKET_PROFILE_DISCONNECT'>('WEB_SOCKET_PROFILE_DISCONNECT')
export const wsProfileConnectingAction = createAction<void, 'WEB_SOCKET_PROFILE_CONNECTING'>('WEB_SOCKET_PROFILE_CONNECTING')
export const wsProfileOpenAction = createAction<void, 'WEB_SOCKET_PROFILE_OPEN'>('WEB_SOCKET_PROFILE_OPEN')
export const wsProfileCloseAction = createAction<void, 'WEB_SOCKET_PROFILE_CLOSE'>('WEB_SOCKET_PROFILE_CLOSE')
export const wsProfileErrorAction = createAction<string, 'WEB_SOCKET_PROFILE_ERROR'>('WEB_SOCKET_PROFILE_ERROR')
export const wsProfileMessageAction = createAction<IOrderDataReceived, 'WEB_SOCKET_PROFILE_MESSAGE'>('WEB_SOCKET_PROFILE_MESSAGE')

export type TWebSocketOrderActions =
    | ReturnType<typeof wsProfileConnectAction>
    | ReturnType<typeof wsProfileDisconnectAction>
    | ReturnType<typeof wsProfileConnectingAction>
    | ReturnType<typeof wsProfileOpenAction>
    | ReturnType<typeof wsProfileCloseAction>
    | ReturnType<typeof wsProfileErrorAction>
    | ReturnType<typeof wsProfileMessageAction>
