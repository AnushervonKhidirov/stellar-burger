import { createSlice } from '@reduxjs/toolkit'
import { sendIngredientsId } from './orderDetailSlice';
import { v4 as uuidv4 } from 'uuid';

function increaseAmount(amount) {
    return Number.isInteger(amount) ? amount + 1 : 1
}

function decreaseAmount(amount) {
    return amount ? amount - 1 : 0
}

export const constructorIngredientListSlice = createSlice({
    name: 'constructorIngredientList',
    initialState: {
        bun: {},
        ingredients: [],
        totalPrice: 0,
        amounts: {}
    },
    reducers: {
        addIngredientToConstructor: (state, action) => {
            if (action.payload.type === 'bun') {
                if (action.payload._id === state.bun._id) return

                state.amounts[state.bun._id] = 0
                state.bun = action.payload
                
                state.ingredients = state.ingredients.filter(
                    ingredient => !(ingredient.type === 'bun' && action.payload.type === 'bun')
                )
            } else {
                state.ingredients.push({ ...action.payload, key: uuidv4() })
            }

            state.totalPrice = state.ingredients.reduce((acc, item) => acc + item.price, 0) + (state.bun.price ? state.bun.price * 2 : 0)
            state.amounts[action.payload._id] = increaseAmount(state.amounts[action.payload._id])
        },
        removeIngredientFromConstructor: (state, action) => {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.key !== action.payload.key)
            state.totalPrice = state.ingredients.reduce((acc, item) => acc + item.price, 0) + (state.bun.price ? state.bun.price * 2 : 0)
            state.amounts[action.payload._id] = decreaseAmount(state.amounts[action.payload._id])
        },
        changeIngredientOrder: (state, action) => {
            const ingredientList = action.payload.ingredientList
            let currentIndex = ingredientList.findIndex(item => item.key === action.payload.key)
            let nextIndex = currentIndex + action.payload.side

            if (nextIndex < 0 || nextIndex > ingredientList.length - 1) return

            state.ingredients = ingredientList.map((ing, index) => (
                index === currentIndex ? ingredientList[nextIndex] : index === nextIndex ? ingredientList[currentIndex] : ing
            ))
        }
    },
    extraReducers: builder => {
        builder.addCase(sendIngredientsId.fulfilled, state => {
            state.bun = {}
            state.ingredients = []
            state.totalPrice = 0
            state.amounts = {}
        })
    }
})

export const { addIngredientToConstructor, removeIngredientFromConstructor, changeIngredientOrder } = constructorIngredientListSlice.actions
export default constructorIngredientListSlice.reducer
