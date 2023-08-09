import type { FC } from 'react'
import type { Ingredient } from '../../../utils/interfaces'

import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { addIngredientToConstructor } from '../../../services/constructor-ingredient-list/slice'
import { useDrop } from 'react-dnd'
import { v4 as uuidV4 } from 'uuid'
import { clearOrder } from '../../../services/orders/slice'

import BurgerConstructorBun from '../burger-constructor-bun/BurgerConstructorBun'
import BurgerConstructorIngredients from '../burger-constructor-ingredients/BurgerConstructorIngredients'
import OrderBlock from '../order-block/OrderBlock'
import OrderDetails from '../../common/order-details/OrderDetails'
import Modal from '../../common/modal/Modal'
import Loader from '../../common/loader/Loader'
import { orderDetailSelector } from '../../../utils/selectors'

import styles from './BurgerConstructor.module.css'

const BurgerConstructor: FC = () => {
    const dispatch = useAppDispatch()
    const { number } = useAppSelector(orderDetailSelector)

    function closeModalHandler() {
        dispatch(clearOrder())
    }

    return (
        <>
            <div className={styles.constructor_wrapper}>
                <BurgerConstructorBlock />
                <OrderBlock />
            </div>
            {number && (
                <Modal onClose={closeModalHandler}>
                    <OrderDetails />
                </Modal>
            )}
        </>
    )
}

const BurgerConstructorBlock: FC = () => {
    const dispatch = useAppDispatch()
    const { isLoading } = useAppSelector(orderDetailSelector)

    const constructorClassName = isLoading ? styles.constructor_loading : styles.constructor_inner

    const [, dropRef] = useDrop<Ingredient>({
        accept: 'ingredient',
        drop(ingredient) {
            dispatch(addIngredientToConstructor({ ...ingredient, key: uuidV4() }))
        },
    })

    return (
        <div className={constructorClassName} ref={dropRef}>
            <BurgerConstructorBun position='top' />
            <BurgerConstructorIngredients />
            <BurgerConstructorBun position='bottom' />
            {isLoading && <Loader />}
        </div>
    )
}

export default BurgerConstructor
