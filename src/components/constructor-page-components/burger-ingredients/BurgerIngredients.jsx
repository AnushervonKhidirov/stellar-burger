import { useSelector, useDispatch } from 'react-redux'
import { setAutoScroll, setCurrentTab } from '../../../services/store/ingredientTabSlice'

import { useEffect } from 'react'
import BurgerNavigation from '../burger-navigation/BurgerNavigation'
import BurgerIngredientList from '../burger-ingredient-list/BurgerIngredientList'

export default function BurgerIngredients() {
    const dispatch = useDispatch()

    const { isAutoScroll, ingredientsTypePosition, scrollPosition, currentTab } = useSelector(
        store => store.ingredientTab
    )

    useEffect(() => {
        if (isAutoScroll) return

        for (const key in ingredientsTypePosition) {
            const middleOfType = Math.round(
                (ingredientsTypePosition[key].top + ingredientsTypePosition[key].bottom) / 2
            )

            if (scrollPosition <= middleOfType && !(scrollPosition > middleOfType)) {
                dispatch(setCurrentTab(key))
                break
            }
        }
    }, [dispatch, isAutoScroll, scrollPosition, ingredientsTypePosition])

    useEffect(() => {
        if (isAutoScroll) {
            dispatch(setAutoScroll(!(scrollPosition === ingredientsTypePosition[currentTab].top)))
        }
    }, [dispatch, isAutoScroll, scrollPosition, currentTab, ingredientsTypePosition])

    return (
        <div style={burgerIngredientsStyle}>
            <BurgerNavigation />
            <BurgerIngredientList />
        </div>
    )
}

const burgerIngredientsStyle = {
    display: 'grid',
    gridTemplateRows: 'min-content 1fr',
    gap: '40px',
    overflow: 'hidden',
}
