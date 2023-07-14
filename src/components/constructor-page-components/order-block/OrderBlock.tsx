import type { FC, FormEvent } from 'react'

import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { sendIngredientsId } from '../../../services/orders/action'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../../common/total-price/TotalPrice'

import styles from './OrderBlock.module.css'

const OrderBlock: FC = () => {
    const dispatch = useAppDispatch()
    const constructorBun = useAppSelector(store => store.constructorIngredientList.bun)
    const constructorList = useAppSelector(store => store.constructorIngredientList.ingredients)

    function getOrder(e: FormEvent) {
        e.preventDefault()

        const isBun = constructorBun?._id
        const isMain = constructorList.findIndex(ingredient => ingredient.type === 'main') !== -1
        const isSauce = constructorList.findIndex(ingredient => ingredient.type === 'sauce') !== -1
        const isAvailableToOrder = isBun && isMain

        if (!isAvailableToOrder) return alert('Your attempt to order nothing is failed!')
        if (!isBun && isMain) return alert("You can't eat burger without buns. Peak a bun)")
        if (!isMain && isBun) return alert("You can't eat only bun, it isn't tasty(")
        if (isSauce && !isAvailableToOrder) return alert("We think you don't want to order only sauce)")

        dispatch(
            sendIngredientsId([
                ...constructorList.map(ingredient => ingredient._id),
                constructorBun._id,
            ])
        )
    }

    return (
        <form className={styles.order_block} onSubmit={getOrder}>
            <TotalPrice />
            <Button htmlType='submit' type='primary' size='large'>
                Оформить заказ
            </Button>
        </form>
    )
}

export default OrderBlock
