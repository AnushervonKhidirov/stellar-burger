import { useSelector, useDispatch } from 'react-redux'
import { setAutoScroll, setCurrentTab } from '../../../../store/ingredientTabSlice'

import { useEffect } from 'react'
import BurgerNavigation from './burget-navigation/BurgerNavigation'
import BurgerIngredientsInner from './burger-ingredients-inner/BurgerIngredientsInner'

import styles from './BurgerIngredients.module.css'

function BurgerIngredients() {
    const dispatch = useDispatch()

    const { isAutoScroll, ingredientsTypePosition, scrollPosition, currentTab } = useSelector(
        store => store.ingredientTab
    )

    useEffect(() => {
        if (isAutoScroll) return

        for (const key in ingredientsTypePosition) {
            if (
                scrollPosition >= ingredientsTypePosition[key].top &&
                scrollPosition < ingredientsTypePosition[key].bottom
            ) {
                dispatch(setCurrentTab(key))
            }
        }
    }, [dispatch, isAutoScroll, scrollPosition, ingredientsTypePosition])

    useEffect(() => {
        if (isAutoScroll) {
            dispatch(setAutoScroll(!(scrollPosition === ingredientsTypePosition[currentTab].top)))
        }
    }, [dispatch, isAutoScroll, scrollPosition, currentTab, ingredientsTypePosition])

    return (
        <>
            <div className={styles.burger_ingredients}>
                <HeaderConstructor />
                <BurgerIngredientsInner />
            </div>
        </>
    )
}

function HeaderConstructor() {
    return (
        <div>
            <h1 className='text text_type_main-large'>Соберите бургер</h1>
            <BurgerNavigation />
        </div>
    )
}

export default BurgerIngredients
