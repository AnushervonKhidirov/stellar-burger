import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { TypesPositionPayload, IngredientTypes } from '../../utils/interfaces'

interface Tabs {
    currentTab: IngredientTypes
    scrollPosition: number
    isAutoScroll: boolean
    ingredientsTypePosition: {
        bun: TypesPosition
        sauce: TypesPosition
        main: TypesPosition
    }
}

interface TypesPosition {
    top: number
    bottom: number
}

const initialState: Tabs = {
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
}

export const ingredientTabSlice = createSlice({
    name: 'ingredientTab',
    initialState,
    reducers: {
        setTypesPosition: (state, action: PayloadAction<TypesPositionPayload>) => {
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

export const { setTypesPosition, setScrollPosition, setCurrentTab, setAutoScroll } =
    ingredientTabSlice.actions

export default ingredientTabSlice.reducer
