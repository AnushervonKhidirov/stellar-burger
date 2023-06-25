import { useSelector, useDispatch } from 'react-redux'
import { addIngredientToConstructor } from '../../../services/store/constructorIngredientListSlice'

import { useDrop } from 'react-dnd'

import BurgerConstructorBun from '../burger-constructor-bun/BurgerConstructorBun'
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients'
import OrderBlock from '../order-block/OrderBlock'

import styles from './BurgerConstructor.module.css'

export default function BurgerConstructor() {
    return (
        <div className={styles.constructor_wrapper}>
            <BurgerConstructorBlock />
            <OrderBlock />
        </div>
    )
}

function BurgerConstructorBlock() {
    const dispatch = useDispatch()
    const constructorList = useSelector(store => store.constructorIngredientList)

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredientToConstructor(ingredient))
        },
    })

    return (
        <div className={styles.constructor} ref={dropRef}>
            <BurgerConstructorBun position='top' />
            <BurgerConstructorIngredients ingredientList={constructorList.ingredients} />
            <BurgerConstructorBun position='bottom' />
        </div>
    )
}
