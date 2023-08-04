import type { FC } from 'react'

import { useAppSelector } from '../../../utils/hooks'
import Rejected from '../rejected/Rejected'
import doneImage from '../../../images/order_done.png'

import { orderDetailSelector } from '../../../utils/selectors'

import styles from './OrderDetails.module.css'


const OrderDetails: FC = () => {
    const { rejected, number } = useAppSelector(orderDetailSelector)

    return rejected ? (
        <Rejected />
    ) : (
        <>
            <p className={'text text_type_digits-large mb-8 mt-15 text-shadow'}>
                {number}
            </p>
            <h2 className='text text_type_main-medium mt-4'>Идентификатор заказа</h2>
            <img src={doneImage} alt='Done' className={`${styles.done_image} mt-15 mb-15`} />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}

export default OrderDetails
