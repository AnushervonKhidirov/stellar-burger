import type { FC, FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { sendOrder } from '../../../services/orders/action'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../../common/total-price/TotalPrice'

import { getAccessToken } from '../../../utils/constants'

import styles from './OrderBlock.module.css'

const OrderBlock: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const constructorBun = useAppSelector(store => store.constructorIngredientList.bun)
    const constructorList = useAppSelector(store => store.constructorIngredientList.ingredients)

    function getOrder(e: FormEvent) {
        e.preventDefault()
        const accessToken = getAccessToken()

        const isBun = constructorBun?._id
        const isMain = constructorList.findIndex(ingredient => ingredient.type === 'main') !== -1
        const isSauce = constructorList.findIndex(ingredient => ingredient.type === 'sauce') !== -1
        const isAvailableToOrder = isBun && isMain

        if (!isBun && isMain) return alert("You can't eat burger without buns. Peak a bun)")
        if (!isMain && isBun) return alert("You can't eat only bun, it isn't tasty(")
        if (isSauce && !isAvailableToOrder) return alert("We think you don't want to order only sauce)")
        if (!isAvailableToOrder) return alert('Your attempt to order nothing is failed!')

        const ingredientIDs = [
            constructorBun._id,
            ...constructorList.map(ingredient => ingredient._id),
            constructorBun._id,
        ]

        accessToken ? dispatch(sendOrder(ingredientIDs)) : navigate('/login')
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
