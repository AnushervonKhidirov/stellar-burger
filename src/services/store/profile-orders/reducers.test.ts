import { WebSocketStatus } from '../../../utils/interfaces'
import { profileOrdersListReducers } from './reducers'
import { initialState } from './reducers'

import {
    wsProfileOpenAction,
    wsProfileCloseAction,
    wsProfileDisconnectAction,
    wsProfileErrorAction,
    wsProfileMessageAction,
} from './actions'

const response = {
    orders: [
        {
            _id: '155312423',
            ingredients: '',
            name: 'bronze burger',
            number: 10052,
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            updatedAt: '2023-08-11T15:42:54.683Z',
        },
        {
            _id: '155312422',
            ingredients: '',
            name: 'silver burger',
            number: 10053,
            status: 'created',
            createdAt: '2023-08-11T15:42:54.683Z',
            updatedAt: '2023-08-11T15:42:54.683Z',
        },
        {
            _id: '155312421',
            ingredients: '',
            name: 'gold burger',
            number: 10054,
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            updatedAt: '2023-08-11T15:42:54.683Z',
        },
    ],
    success: true,
    total: 15000,
    totalToday: 125,
}

describe('feed webSocket testing', () => {
    test('open webSocket', () => {
        expect(profileOrdersListReducers(initialState, { type: wsProfileOpenAction.type })).toEqual({
            ...initialState,
            status: WebSocketStatus.ONLINE,
        })

        expect(profileOrdersListReducers(initialState, { type: wsProfileCloseAction.type })).toEqual({
            ...initialState,
            status: WebSocketStatus.OFFLINE,
        })

        expect(profileOrdersListReducers(initialState, { type: wsProfileDisconnectAction.type })).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.OFFLINE,
            }
        )

        expect(
            profileOrdersListReducers(initialState, {
                type: wsProfileErrorAction.type,
                payload: 'some error',
            })
        ).toEqual({
            ...initialState,
            connectingError: 'some error',
        })

        expect(
            profileOrdersListReducers(initialState, {
                type: wsProfileMessageAction.type,
                payload: response,
            })
        ).toEqual({
            ...initialState,
            list: response,
        })
    })
})
