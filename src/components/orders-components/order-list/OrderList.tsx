import type { FC } from 'react'
import type { IOrderItem } from '../../../services/orders-list/types'

import OrderItem from '../order-item/OrderItem'

import styles from './OrderList.module.css'

interface IOrderList {
    orders: IOrderItem[]
}

const OrderList: FC<IOrderList> = ({ orders }) => {
    return (
        <div className={`${styles.order_list} custom-scroll pr-2`}>
            {orders.map(order => (
                <OrderItem
                    orderNumber={order.number}
                    date={order.createdAt}
                    ingredients={order.ingredients}
                    title={order.name}
                    status={order.status}
                    key={order.number}
                />
            ))}
        </div>
    )
}

export default OrderList
