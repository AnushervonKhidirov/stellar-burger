import type { FC, FormEvent } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../../utils/hooks'
import { sendOrder } from '../../../services/store/orders/action'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../../common/total-price/TotalPrice'

import { getAccessToken, LOGIN_PAGE } from '../../../utils/constants'
import { constructorIngredientSelector } from '../../../utils/selectors'

import styles from './OrderBlock.module.css'

const OrderBlock: FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { bun, ingredients } = useAppSelector(constructorIngredientSelector)

    function getOrder(e: FormEvent) {
        e.preventDefault()
        const accessToken = getAccessToken()

        const isBun = bun?._id
        const isBurgerInner = ingredients.length > 0
        const isAvailableToOrder = isBun && isBurgerInner

        if (!isBun && isBurgerInner) return alert("You can't eat burger without buns. Peak a bun)")
        if (!isBurgerInner && isBun) return alert("You can't eat only bun, it isn't tasty(")
        if (!isAvailableToOrder) return alert('Your attempt to order nothing is failed!')

        const ingredientIDs = [
            bun._id,
            ...ingredients.map(ingredient => ingredient._id),
            bun._id,
        ]

        accessToken ? dispatch(sendOrder(ingredientIDs)) : navigate(LOGIN_PAGE)
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
