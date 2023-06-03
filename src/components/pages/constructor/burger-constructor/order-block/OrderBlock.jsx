import { useContext } from 'react'
import { ModalContext, ConstructorContext } from '../../../../../utils/context'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../../../../common/modal/order-details/OrderDetails'
import styles from '../BurgerConstructor.module.css'

function OrderBlock() {
    const { modalDispatch } = useContext(ModalContext)

    return (
        <div className={styles.order_block}>
            <TotalPrice />
            <Button
                htmlType='button'
                type='primary'
                size='large'
                onClick={() => modalDispatch({ type: 'open', payload: <OrderDetails /> })}
            >
                Оформить заказ
            </Button>
        </div>
    )
}

function TotalPrice() {
    const { totalPrice } = useContext(ConstructorContext)

    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>{totalPrice}</span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

export default OrderBlock
