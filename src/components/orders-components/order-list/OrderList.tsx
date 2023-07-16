import type { FC } from 'react'
import OrderItem from '../order-item/OrderItem'

import styles from './OrderList.module.css'

interface IOrderList {
    orders: any[]
}

const OrderList: FC<IOrderList> = ({ orders }) => {
    return (
        <div className={`${styles.order_list} custom-scroll pr-2`}>
            {orders.map(order => (
                <OrderItem
                    orderNumber={order.orderNumber}
                    date={order.date}
                    title={order.title}
                    price={order.price}
                    ingredientImages={order.images}
                    status={order.status}
                    key={order.orderNumber}
                />
            ))}
        </div>
    )
}

export default OrderList
