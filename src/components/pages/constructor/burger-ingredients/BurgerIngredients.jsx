import { burgerIngredientsPropTypes } from '../../../../types'
import BurgerNavigation from './burget-navigation/BurgerNavigation'
import BurgerIngredientsInner from './burger-ingredients-inner/BurgerIngredientsInner'

import styles from './BurgerIngredients.module.css'

function BurgerIngredients({ data, modalHandler }) {
    return (
        <div className={styles.burger_ingredients}>
            <HeaderConstructor />
            <BurgerIngredientsInner data={data} modalHandler={modalHandler} />
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

BurgerIngredients.propTypes = burgerIngredientsPropTypes

export default BurgerIngredients
