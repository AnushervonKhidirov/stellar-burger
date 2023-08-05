import type { FC } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../utils/hooks'
import ConvertedNumber from '../converted-number/ConvertedNumber'
import { constructorIngredientSelector } from '../../../utils/selectors'

import styles from './TotalPrice.module.css'

const TotalPrice: FC = () => {
    const { bun, ingredients } = useAppSelector(constructorIngredientSelector)
    const totalPrice =
        ingredients?.reduce((acc, item) => acc + item.price, 0) + (bun?.price ? bun.price * 2 : 0)

    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>
                <ConvertedNumber number={totalPrice ? totalPrice : 0} />
            </span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

export default TotalPrice
