import type { FC } from 'react'
import { useLayoutEffect } from 'react'

import { useAppSelector, useAppDispatch } from '../../utils/hooks'
import { connectAction, disconnectAction } from '../../services/orders-list/actions'

import OrderList from '../../components/orders-components/order-list/OrderList'
import IdList from '../../components/feed-page-components/id-list/IdList'
import DoneOrders from '../../components/feed-page-components/done-orders/DoneOrders'
import PageTitle from '../../components/common/page-title/PageTitle'

import { WS_ORDERS_URL } from '../../utils/constants'

import styles from './Feed.module.css'

const Feed: FC = () => {
    const dispatch = useAppDispatch()
    const orders = useAppSelector(store => store.orderList)

    useLayoutEffect(() => {
        dispatch(connectAction(WS_ORDERS_URL))

        return () => {
            dispatch(disconnectAction())
        }
    }, [dispatch])

    return (
        <div className={styles.feed_page}>
            <PageTitle title='Лента заказов' />
            <OrderList orders={orders.list.orders} />

            <div className={styles.orders_wrapper}>
                <IdList title='Готовы' list={orders.doneIdList} ready />
                <IdList title='В работе' list={orders.restIdList} />

                <DoneOrders
                    extraClass={styles.done_order}
                    title='Выполнено за все время'
                    amount={orders.list.total}
                />
                <DoneOrders
                    extraClass={styles.done_order}
                    title='Выполнено за сегодня'
                    amount={orders.list.totalToday}
                />
            </div>
        </div>
    )
}

export default Feed
