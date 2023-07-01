import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setAutoScroll, setCurrentTab } from '../../../services/store/ingredientTabSlice'

import { useEffect } from 'react'
import BurgerNavigation from '../burger-navigation/BurgerNavigation'
import BurgerIngredientList from '../burger-ingredient-list/BurgerIngredientList'

import styles from './BurgerIngredients.module.css'

import type { IngredientTypes } from '../../../utils/interfaces'

export default function BurgerIngredients() {
    const dispatch = useAppDispatch()

    const { isAutoScroll, ingredientsTypePosition, scrollPosition, currentTab } = useAppSelector(
        store => store.ingredientTab
    )

    useEffect(() => {
        if (isAutoScroll) return
        let key: IngredientTypes
        
        for (key in ingredientsTypePosition) {
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
        <div className={styles.burger_ingredients}>
            <BurgerNavigation />
            <BurgerIngredientList />
        </div>
    )
}
