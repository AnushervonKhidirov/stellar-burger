import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { addIngredientToConstructor } from '../../../services/store/constructorIngredientListSlice'

import { useDrop } from 'react-dnd'

import BurgerConstructorBun from '../burger-constructor-bun/BurgerConstructorBun'
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients'
import OrderBlock from '../order-block/OrderBlock'
import OrderDetails from '../../common/order-details/OrderDetails'
import Modal from '../../common/modal/Modal'
import Loader from '../../common/loader/Loader'

import { clearOrder } from '../../../services/orders/slice'

import styles from './BurgerConstructor.module.css'

import type { Ingredient } from '../../../utils/interfaces'

export default function BurgerConstructor() {
    const dispatch = useAppDispatch()

    const orderNumber = useAppSelector(store => store.orderDetails.orderNumber)

    function closeModalHandler() {
        dispatch(clearOrder())
    }

    return (
        <>
            <div className={styles.constructor_wrapper}>
                <BurgerConstructorBlock />
                <OrderBlock />
            </div>
            {orderNumber && <Modal onClose={closeModalHandler}><OrderDetails /></Modal>}
        </>
    )
}

function BurgerConstructorBlock() {
    const dispatch = useAppDispatch()
    const isOrderLoading = useAppSelector(store => store.orderDetails.isLoading)

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(ingredient: Ingredient) {
            dispatch(addIngredientToConstructor(ingredient))
        },
    })

    return (
        <div className={isOrderLoading ? styles.constructor_loading : styles.constructor_inner} ref={dropRef}>
            <BurgerConstructorBun position='top' />
            <BurgerConstructorIngredients />
            <BurgerConstructorBun position='bottom' />
            {isOrderLoading && <Loader />}
        </div>
    )
}
