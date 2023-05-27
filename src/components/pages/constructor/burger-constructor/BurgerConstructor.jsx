import PropTypes from 'prop-types'
import { ingredientDataTypes } from '../../../../types'
import OrderBlock from './order-block/OrderBlock'
import BurgerConstructorBlock from './burger-constructor-block/BurgerConstructorBlock'
import styles from './BurgerConstructor.module.css'

export default function BurgerConstructor({ burgerListData, totalPrice, setBurgerListData, modalHandler }) {
    return (
        <div className={styles.ingredients}>
            <BurgerConstructorBlock list={burgerListData} setList={setBurgerListData} />
            <OrderBlock totalPrice={totalPrice} modalHandler={modalHandler} />
        </div>
    )
}

BurgerConstructor.propTypes = {
    burgerListData: PropTypes.arrayOf(ingredientDataTypes).isRequired,
    totalPrice: PropTypes.number.isRequired,
    setBurgerListData: PropTypes.func.isRequired,
    modalHandler: PropTypes.func.isRequired,
}