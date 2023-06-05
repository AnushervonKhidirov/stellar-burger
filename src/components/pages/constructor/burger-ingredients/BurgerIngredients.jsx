import { useEffect, useState } from 'react'
import { IngredientContext } from '../../../../utils/context'
import BurgerNavigation from './burget-navigation/BurgerNavigation'
import BurgerIngredientsInner from './burger-ingredients-inner/BurgerIngredientsInner'

import styles from './BurgerIngredients.module.css'

function BurgerIngredients() {
    const [currentTab, setCurrentTab] = useState('bun')
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isAutoscroll, setIsAutoscroll] = useState(false)
    const [typesPosition, setTypesPosition] = useState({
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
    })

    useEffect(() => {
        if (isAutoscroll) return

        for (const key in typesPosition) {
            if (scrollPosition >= typesPosition[key].top && scrollPosition < typesPosition[key].bottom) {
                setCurrentTab(key)
            }
        }
    }, [scrollPosition, typesPosition, isAutoscroll])

    useEffect(() => {
        if (isAutoscroll) setIsAutoscroll(!(scrollPosition === typesPosition[currentTab].top))
    }, [currentTab, scrollPosition, isAutoscroll, typesPosition])

    return (
        <IngredientContext.Provider
            value={{
                currentTab,
                setCurrentTab,
                scrollPosition,
                setScrollPosition,
                typesPosition,
                setTypesPosition,
                isAutoscroll,
                setIsAutoscroll,
            }}
        >
            <div className={styles.burger_ingredients}>
                <HeaderConstructor />
                <BurgerIngredientsInner />
            </div>
        </IngredientContext.Provider>
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
