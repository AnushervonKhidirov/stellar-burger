import type { FC } from 'react'
import OrderItem from '../order-item/OrderItem'

import styles from './OrderList.module.css'

interface IOrderList {
    orders: any[]
    headline?: string
}

const OrderList: FC<IOrderList> = ({ orders, headline }) => {
    return (
        <div className={styles.order_list_wrapper}>
            {headline && <h1 className='text text_type_main-large'>{headline}</h1>}

            <div className={`${styles.order_list} custom-scroll pr-2`}>
                {orders.map(order => (
                    <OrderItem
                        id={order.id}
                        date={order.date}
                        title={order.title}
                        price={order.price}
                        ingredientImages={order.images}
                        status={order.status}
                        key={order.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default OrderList
