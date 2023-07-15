import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ICategoriesPosition, IngredientCategories } from '../../utils/interfaces'

interface Tabs {
    currentTab: IngredientCategories
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
        setTypesPosition: (state, action: PayloadAction<ICategoriesPosition>) => {
            state.ingredientsTypePosition[action.payload.category].top = action.payload.top
            state.ingredientsTypePosition[action.payload.category].bottom = action.payload.bottom
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
