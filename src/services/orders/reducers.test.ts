import orderDetailSlice, { initialState, clearOrder } from './slice'

test('clear constructor', () => {
    const action = { type: clearOrder.type }
    expect(orderDetailSlice(undefined, action)).toEqual(initialState)
})
