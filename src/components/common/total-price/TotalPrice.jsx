import PropTypes from 'prop-types'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './TotalPrice.module.css'

export default function TotalPrice({ price }) {
    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>{price}</span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

TotalPrice.propTypes = {
    price: PropTypes.number.isRequired
}