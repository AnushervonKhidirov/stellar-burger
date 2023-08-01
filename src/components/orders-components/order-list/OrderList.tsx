import type { FC } from 'react'
import type { IOrderItem } from '../../../utils/interfaces'

import OrderItem from '../order-item/OrderItem'

import styles from './OrderList.module.css'

interface IOrderList {
    readonly orders: IOrderItem[]
    readonly showStatus?: boolean
}

const OrderList: FC<IOrderList> = ({ orders, showStatus }) => {
    return (
        <div className={`${styles.order_list} custom-scroll pr-2`}>
            {orders.map(order => (
                <OrderItem
                    orderNumber={order.number}
                    date={order.createdAt}
                    ingredients={order.ingredients}
                    title={order.name}
                    status={order.status}
                    showStatus={showStatus}
                    key={order.number}
                />
            ))}
        </div>
    )
}

export default OrderList
