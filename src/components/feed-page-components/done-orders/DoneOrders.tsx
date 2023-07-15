import type { FC } from 'react'

import ConvertedNumber from '../../common/converted-number/ConvertedNumber'

import styles from './DoneOrders.module.css'

interface IDoneOrders {
    title: string
    amount: number
    extraClass?: string
}

const DoneOrders: FC<IDoneOrders> = ({ title, amount, extraClass }) => {
    return (
        <div className={`${styles.id_list_wrapper} ${extraClass}`}>
            <h3 className='text text_type_main-medium'>{title}:</h3>
            <div className='text text_type_digits-large text-shadow'>
                <ConvertedNumber number={amount} />
            </div>
        </div>
    )
}

export default DoneOrders
