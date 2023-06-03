import BurgerNavigation from './burget-navigation/BurgerNavigation'
import BurgerIngredientsInner from './burger-ingredients-inner/BurgerIngredientsInner'

import styles from './BurgerIngredients.module.css'

function BurgerIngredients() {

    return (
        <div className={styles.burger_ingredients}>
            <HeaderConstructor />
            <BurgerIngredientsInner />
        </div>
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
