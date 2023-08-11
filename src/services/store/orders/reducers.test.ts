import orderDetailSlice, { initialState, clearOrder } from './slice'
import { sendOrder, getOrder } from './action'

test('clear constructor testing', () => {
    const action = { type: clearOrder.type }
    expect(orderDetailSlice(undefined, action)).toEqual(initialState)
})

describe('send order testing', () => {
    test('send order pending', () => {
        const action = {
            type: sendOrder.pending.type,
            meta: { arg: ['124123', '124121', '124125'] },
        }

        const result = {
            ingredientsId: ['124123', '124121', '124125'],
            isLoading: true,
            rejected: false,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })

    test('send order rejected', () => {
        const action = { type: sendOrder.rejected.type }

        const result = {
            isLoading: false,
            rejected: true,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })

    test('send order fulfilled', () => {
        const orderPayload = {
            order: {
                number: 1663232,
                name: 'gold burger',
                status: 'done',
                createdAt: '2023-08-11T15:42:54.683Z',
            },
        }

        const action = { type: sendOrder.fulfilled.type, payload: orderPayload }

        const result = {
            number: 1663232,
            name: 'gold burger',
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            isLoading: false,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })
})

describe('get order testing', () => {
    test('get order pending', () => {
        const action = {
            type: getOrder.pending.type,
        }

        const result = {
            isLoading: true,
            rejected: false,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })

    test('get order rejected', () => {
        const action = { type: getOrder.rejected.type }

        const result = {
            isLoading: false,
            rejected: true,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })

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

        const action = { type: getOrder.fulfilled.type, payload: orderPayload }

        const result = {
            number: 1663232,
            name: 'gold burger',
            ingredientsId: ['124123', '124121', '124125'],
            status: 'done',
            createdAt: '2023-08-11T15:42:54.683Z',
            isLoading: false,
        }

        expect(orderDetailSlice(initialState, action)).toEqual({ ...initialState, ...result })
    })
})
