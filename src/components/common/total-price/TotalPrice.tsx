import type { FC } from 'react'

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../utils/hooks'

import styles from './TotalPrice.module.css'

const TotalPrice: FC = () => {
    const constructorBun = useAppSelector(store => store.constructorIngredientList.bun)
    const constructorList = useAppSelector(store => store.constructorIngredientList.ingredients)
    const totalPrice =
        constructorList?.reduce((acc, item) => acc + item.price, 0) +
        (constructorBun?.price ? constructorBun.price * 2 : 0)

    return (
        <div className={styles.total_price}>
            <span className='text text_type_digits-medium'>{totalPrice ? totalPrice : 0}</span>
            <CurrencyIcon type='primary' />
        </div>
    )
}

export default TotalPrice
