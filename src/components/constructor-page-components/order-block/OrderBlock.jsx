import { useSelector, useDispatch } from 'react-redux'
import { sendIngredientsId } from '../../../services/orders/action'

import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import TotalPrice from '../../common/total-price/TotalPrice'

import styles from './OrderBlock.module.css'

export default function OrderBlock() {
    const dispatch = useDispatch()
    const constructorBun = useSelector(store => store.constructorIngredientList.bun)
    const constructorList = useSelector(store => store.constructorIngredientList.ingredients)
    const totalPrice = useSelector(store => store.constructorIngredientList.totalPrice)

    function getOrder() {
        const isBun = constructorBun._id
        const isMain = constructorList.findIndex(ing => ing.type === 'main') !== -1
        const isSauce = constructorList.findIndex(ing => ing.type === 'sauce') !== -1
        const isAvailableToOrder = isBun && isMain

        if (isAvailableToOrder) {
            // dispatch(openModal(<OrderDetails />))
            dispatch(
                sendIngredientsId([...constructorList.map(ing => ing._id), constructorBun._id])
            )
        } else if (!isBun && isMain) {
            alert("You can't eat burger without buns. Peak a bun)")
        } else if (!isMain && isBun) {
            alert("You can't eat only bun, it isn't tasty(")
        } else if (isSauce && !isAvailableToOrder) {
            alert("We think you don't want to order only sauce)")
        } else {
            alert('Your attempt to order nothing is failed!')
        }
    }

    return (
        <div className={styles.order_block}>
            <TotalPrice price={totalPrice} />
            <Button htmlType='button' type='primary' size='large' onClick={() => getOrder()}>
                Оформить заказ
            </Button>
        </div>
    )
}
