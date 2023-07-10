import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { addIngredientToConstructor } from '../../../services/store/constructorIngredientListSlice'
import { useDrop } from 'react-dnd'
import { clearOrder } from '../../../services/orders/slice'

import BurgerConstructorBun from '../burger-constructor-bun/BurgerConstructorBun'
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients'
import OrderBlock from '../order-block/OrderBlock'
import OrderDetails from '../../common/order-details/OrderDetails'
import Modal from '../../common/modal/Modal'
import Loader from '../../common/loader/Loader'

import styles from './BurgerConstructor.module.css'

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch()
    const orderNumber = useAppSelector<number | null>(store => store.orderDetails.orderNumber)

    function closeModalHandler(): void {
        dispatch(clearOrder())
    }

    return (
        <>
            <div className={styles.constructor_wrapper}>
                <BurgerConstructorBlock />
                <OrderBlock />
            </div>
            {orderNumber && (
                <Modal onClose={closeModalHandler}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    )
}

const BurgerConstructorBlock: FC = () => {
    const dispatch = useAppDispatch()
    const isOrderLoading = useAppSelector<boolean>(store => store.orderDetails.isLoading)
    
    const constructorClassName: string = isOrderLoading
        ? styles.constructor_loading
        : styles.constructor_inner

    const [, dropRef] = useDrop<Ingredient>({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredientToConstructor(ingredient))
        },
    })

    return (
        <div className={constructorClassName} ref={dropRef}>
            <BurgerConstructorBun position='top' />
            <BurgerConstructorIngredients />
            <BurgerConstructorBun position='bottom' />
            {isOrderLoading && <Loader />}
        </div>
    )
}

export default BurgerConstructor
