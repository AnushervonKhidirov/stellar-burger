import { createSlice } from '@reduxjs/toolkit'

export const ingredientTabSlice = createSlice({
    name: 'ingredientTab',
    initialState: {
        currentTab: 'bun',
        scrollPosition: 0,
        isAutoScroll: false,
        ingredientsTypePosition: {
            bun: {
                top: 0,
                bottom: 0,
            },
            sauce: {
                top: 0,
                bottom: 0,
            },
            main: {
                top: 0,
                bottom: 0,
            },
        },
    },
    reducers: {
        setTypesPosition: (state, action) => {
            state.ingredientsTypePosition[action.payload.type].top = action.payload.top
            state.ingredientsTypePosition[action.payload.type].bottom = action.payload.bottom
        },
        setScrollPosition: (state, action) => {
            state.scrollPosition = action.payload
        },
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload
        },
        setAutoScroll: (state, action) => {
            state.isAutoScroll = action.payload
        },
    },
})

export const { setTypesPosition, setScrollPosition, setCurrentTab, setAutoScroll } = ingredientTabSlice.actions

export default ingredientTabSlice.reducer
