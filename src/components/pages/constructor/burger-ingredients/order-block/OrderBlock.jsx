import ModalOrder from '../../../../common/modal/modal-order/ModalOrder'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../BurgerIngredients.module.css'

function OrderBlock({ totalPrice, modalHandler }) {
    return (
        <div className={styles.order_block}>
            <TotalPrice totalPrice={totalPrice} />
            <Button htmlType='button' type='primary' size='large' onClick={() => modalHandler(<ModalOrder />)}>
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

export default OrderBlock
