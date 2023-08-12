import orderDetailSlice, { initialState, clearOrder } from './slice'
import { sendOrder, getOrder } from './action'

test('clear constructor testing', () => {
    const action = { type: clearOrder.type }
    expect(orderDetailSlice(undefined, action)).toEqual(initialState)
})

describe('send order testing', () => {
    test('send order fulfilled', () => {
        const orderPayload = {
            order: {
                number: 1663232,
                name: 'gold burger',
                status: 'done',
                createdAt: '2023-08-11T15:42:54.683Z',
            },
        }

        const pendingAction = {
            type: sendOrder.pending.type,
            meta: { arg: ['124123', '124121', '124125'] },
        }

        const pendingResult = {
            ingredientsId: ['124123', '124121', '124125'],
            isLoading: true,
            rejected: false,
        }

        expect(orderDetailSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            ...pendingResult,
        })

        const fulfilledAction = { type: sendOrder.fulfilled.type, payload: orderPayload }

        const fulfilledResult = {
            number: 1663232,
            name: 'gold burger',
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            isLoading: false,
        }

        expect(orderDetailSlice(initialState, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('send order rejected', () => {
        const pendingAction = {
            type: sendOrder.pending.type,
            meta: { arg: ['124123', '124121', '124125'] },
        }

        const pendingResult = {
            ingredientsId: ['124123', '124121', '124125'],
            isLoading: true,
            rejected: false,
        }

        expect(orderDetailSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            ...pendingResult,
        })

        const rejectedAction = { type: sendOrder.rejected.type }

        const rejectedResult = {
            isLoading: false,
            rejected: true,
        }

        expect(orderDetailSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            ...rejectedResult,
        })
    })
})

describe('get order testing', () => {
    test('get order fulfilled', () => {
        const orderPayload = {
            orders: [
                {
                    number: 1663232,
                    name: 'gold burger',
                    ingredients: ['124123', '124121', '124125'],
                    status: 'done',
                    createdAt: '2023-08-11T15:42:54.683Z',
                },
            ],
        }

        const pendingAction = {
            type: getOrder.pending.type,
        }

        const fulfilledAction = { type: getOrder.fulfilled.type, payload: orderPayload }

        const fulfilledResult = {
            number: 1663232,
            name: 'gold burger',
            ingredientsId: ['124123', '124121', '124125'],
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            isLoading: false,
        }

        expect(orderDetailSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(orderDetailSlice(initialState, fulfilledAction)).toEqual({
            ...initialState,
            ...fulfilledResult,
        })
    })

    test('get order rejected', () => {
        const pendingAction = {
            type: getOrder.pending.type,
        }

        const rejectedAction = { type: getOrder.rejected.type }

        expect(orderDetailSlice(initialState, pendingAction)).toEqual({
            ...initialState,
            isLoading: true,
        })

        expect(orderDetailSlice(initialState, rejectedAction)).toEqual({
            ...initialState,
            rejected: true,
        })
    })
})
