import ingredientTabSlice, {
    setTypesPosition,
    setScrollPosition,
    setCurrentTab,
    setAutoScroll,
    initialState
} from './slice'

describe('Ingredient tabs testing', () => {
    test('setCurrentTab test', () => {
        const categoryPayload = 'main'
        const action = { type: setCurrentTab.type, payload: categoryPayload }

        expect(ingredientTabSlice(initialState, action)).toEqual({
            ...initialState,
            currentTab: categoryPayload,
        })
    })
    test('setAutoScroll test', () => {
        const autoScrollStatePayload = true
        const action = { type: setAutoScroll.type, payload: autoScrollStatePayload }

        expect(ingredientTabSlice(initialState, action)).toEqual({
            ...initialState,
            isAutoScroll: autoScrollStatePayload,
        })
    })
    test('setScrollPosition test', () => {
        const scrollPositionPayload = 355
        const action = { type: setScrollPosition.type, payload: scrollPositionPayload }

        expect(ingredientTabSlice(initialState, action)).toEqual({
            ...initialState,
            scrollPosition: scrollPositionPayload,
        })
    })
    test('setTypesPosition test', () => {
        const categoryPositionPayload = {
            category: 'bun',
            top: 10,
            bottom: 100,
        }
        const action = { type: setTypesPosition.type, payload: categoryPositionPayload }
        const ingredientsTypePosition = initialState.ingredientsTypePosition

        expect(ingredientTabSlice(initialState, action)).toEqual({
            ...initialState,
            ingredientsTypePosition: {
                ...ingredientsTypePosition,
                [categoryPositionPayload.category]: {
                    top: categoryPositionPayload.top,
                    bottom: categoryPositionPayload.bottom,
                },
            },
        })
    })
})
