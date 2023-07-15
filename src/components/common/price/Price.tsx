import type { FC } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ConvertedNumber from '../converted-number/ConvertedNumber'

import styles from './Price.module.css'

const Price: FC<{ price: number }> = ({ price }) => {
    return (
        <div className={`${styles.price} text text_type_digits-default`}>
            <span><ConvertedNumber number={price} /></span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

export default Price
