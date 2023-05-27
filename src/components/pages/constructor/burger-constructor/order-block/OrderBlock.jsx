import PropTypes from 'prop-types'
import OrderDetails from '../../../../common/modal/order-details/OrderDetails'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerConstructor.module.css'

function OrderBlock({ totalPrice, modalHandler }) {
    return (
        <div className={styles.order_block}>
            <TotalPrice totalPrice={totalPrice} />
            <Button htmlType='button' type='primary' size='large' onClick={() => modalHandler(<OrderDetails />)}>
                Нажми на меня
            </Button>
        </div>
    )
}

function TotalPrice({ totalPrice }) {
    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>{totalPrice}</span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

OrderBlock.propTypes = {
    totalPrice: PropTypes.number,
    modalHandler: PropTypes.func,
}

TotalPrice.propTypes = {
    totalPrice: PropTypes.number,
}

export default OrderBlock
