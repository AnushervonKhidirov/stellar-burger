import type { FC } from 'react'
import type { IngredientCategories } from '../../../utils/interfaces'

import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { setAutoScroll, setCurrentTab } from '../../../services/store/ingredientTabSlice'
import BurgerNavigation from '../burger-navigation/BurgerNavigation'
import BurgerIngredientList from '../burger-ingredient-list/BurgerIngredientList'

import type { Tabs } from '../../../services/store/ingredientTabSlice'

import styles from './BurgerIngredients.module.css'

const BurgerIngredients: FC = () => {
    const dispatch = useAppDispatch()

    const { isAutoScroll, ingredientsTypePosition, scrollPosition, currentTab } =
        useAppSelector<Tabs>(store => store.ingredientTab)

    useEffect(() => {
        if (isAutoScroll) return
        let key: IngredientCategories

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

export default BurgerIngredients
