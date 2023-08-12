import { WebSocketStatus } from '../../../utils/interfaces'
import { feedOrdersListReducers } from './reducers'
import { initialState } from './reducers'

import {
    wsFeedDisconnectAction,
    wsFeedOpenAction,
    wsFeedCloseAction,
    wsFeedErrorAction,
    wsFeedMessageAction,
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
        expect(feedOrdersListReducers(initialState, { type: wsFeedOpenAction.type })).toEqual({
            ...initialState,
            status: WebSocketStatus.ONLINE,
        })

        expect(feedOrdersListReducers(initialState, { type: wsFeedCloseAction.type })).toEqual({
            ...initialState,
            status: WebSocketStatus.OFFLINE,
        })

        expect(feedOrdersListReducers(initialState, { type: wsFeedDisconnectAction.type })).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.OFFLINE,
            }
        )

        expect(
            feedOrdersListReducers(initialState, {
                type: wsFeedErrorAction.type,
                payload: 'some error',
            })
        ).toEqual({
            ...initialState,
            connectingError: 'some error',
        })

        expect(
            feedOrdersListReducers(initialState, {
                type: wsFeedMessageAction.type,
                payload: response,
            })
        ).toEqual({
            ...initialState,
            list: response,
            doneIdList: [10052, 10054],
            restIdList: [10053],
        })
    })
})
