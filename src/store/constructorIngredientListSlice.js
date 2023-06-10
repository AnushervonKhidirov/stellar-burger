import { createSlice } from '@reduxjs/toolkit'

function increaseAmount(amount) {
    return Number.isInteger(amount) ? amount + 1 : 1
}

function decreaseAmount(amount) {
    return amount ? amount - 1 : 0
}

export const constructorIngredientListSlice = createSlice({
    name: 'ingredientList',
    initialState: {
        bun: {},
        ingredients: [],
        totalPrice: 0,
        key: 0,
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
                state.ingredients.push({ ...action.payload, key: state.key })
            }

            state.totalPrice = state.ingredients.reduce((acc, item) => acc + item.price, 0) + (state.bun.price ? state.bun.price * 2 : 0)

            state.amounts[action.payload._id] = increaseAmount(state.amounts[action.payload._id])
            state.key++
        },
        removeIngredientFromConstructor: (state, action) => {
            state.ingredients = state.ingredients.filter(
                ingredient => !(ingredient._id === action.payload._id && ingredient.key === action.payload.key)
            )
            state.totalPrice = state.ingredients.reduce((acc, item) => acc + item.price, 0) + (state.bun.price ? state.bun.price * 2 : 0)

            state.amounts[action.payload._id] = decreaseAmount(state.amounts[action.payload._id])
        },
        changeIngredientOrder: (state, action) => {
            const ingredientList = action.payload.allIngredients
            let currentIndex = ingredientList.findIndex(item => item._id === action.payload.id && item.key === action.payload.key)
            let nextIndex = currentIndex + action.payload.side

            if (nextIndex < 0 || nextIndex > ingredientList.length - 1) return

            state.ingredients = ingredientList.map((ing, index) => (
                index === currentIndex ? ingredientList[nextIndex] : index === nextIndex ? ingredientList[currentIndex] : ing
            ))
        }
    },
})

export const { addIngredientToConstructor, removeIngredientFromConstructor, changeIngredientOrder } = constructorIngredientListSlice.actions
export default constructorIngredientListSlice.reducer
