import type { FC } from 'react'

import OrderList from '../../components/orders-components/order-list/OrderList'
import IdList from '../../components/feed-page-components/id-list/IdList'
import DoneOrders from '../../components/feed-page-components/done-orders/DoneOrders'

import img from '../../images/order_done.png'

import styles from './Feed.module.css'

const Feed: FC = () => {
    const orderList = [
        {
            id: 1,
            date: new Date(),
            title: 'title',
            price: 5102,
            status: 'ready',
            images: [img, img, img, img, img, img, img, img, img],
        },
        {
            id: 2,
            date: new Date(),
            title: 'title',
            price: 512,
            images: [img, img, img],
        },
        {
            id: 3,
            date: new Date(),
            title: 'title',
            price: 512,
            images: [img, img, img, img, img, img, img],
        },
        {
            id: 4,
            date: new Date(),
            title: 'title',
            price: 512,
            images: [img, img, img],
        },
        {
            id: 5,
            date: new Date(),
            title: 'title',
            price: 512,
            images: [img, img, img, img],
        },
    ]

    const idList = ['312311231', '312351631', '312351131', '312351431', '312351232']

    return (
        <div className={styles.feed_page}>
            <OrderList headline='Лента заказов' orders={orderList} />

            <div className={styles.orders_wrapper}>
                <IdList title='Готовы' list={idList} ready />
                <IdList title='В работе' list={idList} />

                <DoneOrders extraClass={styles.done_order} title='Выполнено за все время' amount={28752} />
                <DoneOrders extraClass={styles.done_order} title='Выполнено за сегодня' amount={138} />
            </div>
        </div>
    )
}

export default Feed
